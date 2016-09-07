/**
 * Created with JetBrains PhpStorm.
 * User: layenlin
 * Date: 13-12-17
 * Time: 下午4:10
 * To change this template use File | Settings | File Templates.
 */

define(function(require, exports, module) {
	/** @module util/tpl */
	var _private = {};
	_private.cache = {};

	/**
	 * @description 模板引擎
	 * @function
	 * @param {string} str 模板字符串或模板所在的script标签id
	 * @param {object} [data] 渲染模板使用的数据对象
	 * @param {object} [env] 指定this指针，默认为data
	 * @returns {string|function} 当传入data时，返回渲染结果HTML; 否则返回渲染函数
	 * @example
	 * 用法1: qv.tpl.get(id, dataObject);
	 * 使用带id的script标签在页面中嵌入模板。使用这种方法，tmpl会自动将预编译后的模板缓存。
	 * <script type="text/html" id="user_tmpl">
	 *     <% for ( var i = 0; i < users.length; i++ ) { %>
	 *         <li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>
	 *     <% } %>
	 *
	 * <script type="text/javascript">
	 *     document.write(qv.tpl.get('user_tmpl', {
	 *         users: [{
	 *             name: 'xkli',
	 *             url: 'mailto:xkli@tencent.com'
	 *         }]
	 *     }));
	 * @example
	 * 用法2: var render = qv.tpl.get(template); render(dataObject);
	 * 将模板内容作为字符串传给tmpl。这会生成一个预编译后的渲染函数，此渲染函数内部缓存预编译后的模板。
	 * var template = '<% for ( var i = 0; i < users.length; i++ ) { %>'
	 *     + '<li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>'
	 *     + '<% } %>';
	 * var render = qv.tpl.get(template);
	 * document.write(render({
	 *     users:[{
	 *         name: 'xkli',
	 *         url: 'mailto:xkli@tencent.com'
	 *     }]
	 * }));
	 */
	exports.get = function (str, data, env) {
		if( !str ){return;}  //如果么有数据就退出
		// 判断str参数，如str为script标签的id，则取该标签的innerHTML，再递归调用自身
		// 如str为HTML文本，则分析文本并构造渲染函数
		var fn = !/[^\w\-\.:]/.test(str)
			? _private.cache[str] = _private.cache[str] || this.get(document.getElementById(str).innerHTML)
			: function (data, env) {
			var i, variable = [], value = []; // variable数组存放变量名，对应data结构的成员变量；value数组存放各变量的值
			for (i in data) {
				variable.push(i);
				value.push(data[i]);
			}
			return (new Function(variable, fn.code))
				.apply(env || data, value); // 此处的new Function是由下面fn.code产生的渲染函数；执行后即返回渲染结果HTML
		};

		fn.code = fn.code || "var $parts=[]; $parts.push('"
			+ str
			.replace(/\\/g, '\\\\') // 处理模板中的\转义
			.replace(/[\r\t\n]/g, " ") // 去掉换行符和tab符，将模板合并为一行
			.split("<%").join("\t") // 将模板左标签<%替换为tab，起到分割作用
			.replace(/(^|%>)[^\t]*/g, function(str) { return str.replace(/'/g, "\\'"); }) // 将模板中文本部分的单引号替换为\'
			.replace(/\t=(.*?)%>/g, "',$1,'") // 将模板中<%= %>的直接数据引用（无逻辑代码）与两侧的文本用'和,隔开，同时去掉了左标签产生的tab符
			.split("\t").join("');") // 将tab符（上面替换左标签产生）替换为'); 由于上一步已经把<%=产生的tab符去掉，因此这里实际替换的只有逻辑代码的左标签
			.split("%>").join("$parts.push('") // 把剩下的右标签%>（逻辑代码的）替换为"$parts.push('"
			+ "'); return $parts.join('');"; // 最后得到的就是一段JS代码，保留模板中的逻辑，并依次把模板中的常量和变量压入$parts数组

		return data ? fn(data, env) : fn; // 如果传入了数据，则直接返回渲染结果HTML文本，否则返回一个渲染函数
	};

	exports.getInstance = function(instance) {
		var cache = arguments.callee;
		var that = this;
		if (typeof(cache.methodName) !== 'string' || !cache.methodName) {
			cache.methodName = 'tplInvoke_' + (new Date().getTime());
			window[cache.methodName] = function(el, event, index) {
				var nameList = String(window[cache.methodName].list[index].method).split('.');
				var target = window[cache.methodName].list[index].instance;
				var eventProxy = {originalEvent: event};
				for (var i in event) {
					if (!/^([A-Z]|returnValue$|layer[XY]$)/.test(i) && typeof(event[i]) !== 'undefined') {
						eventProxy[i] = event[i];
					}
				}
				eventProxy.currentTarget = el;
				var i = 0;
				for (var iMax = nameList.length - 1; i < iMax; i ++) {
					target = target[nameList[i]];
				}
				return target[nameList[i]].apply(target, [].concat([eventProxy], window[cache.methodName].list[index].paramList));
			};
			window[cache.methodName].list = [];
		}
		return {
			getInvoke: function(name) {
				return 'window.' + cache.methodName + '(this, event, ' + (window[cache.methodName].list.push({
					instance: instance,
					method: name,
					paramList: Array.prototype.slice.call(arguments, 1)
				}) - 1) + ')';
			},
			getData: function(name) {
				var nameList = String(name).split('.');
				var target = instance;
				for (var i = 0, iMax = nameList.length; i < iMax; i ++) {
					target = target[nameList[i]];
				}
				if (typeof(target) === 'function') {
					return target.apply(instance, Array.prototype.slice.call(arguments, 1));
				} else {
					return target;
				}
			},
			getContent: function(str, data, env) {
				return that.get(str, data, env);
			}
		};
	};
});

