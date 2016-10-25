define(function(require, exports, module) {
	/** @module util/tpl */
	var _private = {};
	_private.cache = {};

	exports.get = function (str, data, env) {
		if( !str ){return;}
		var fn = !/[^\w\-\.:]/.test(str)
			? _private.cache[str] = _private.cache[str] || this.get(document.getElementById(str).innerHTML)
			: function (data, env) {
			var i, variable = [], value = [];
			for (i in data) {
				variable.push(i);
				value.push(data[i]);
			}
			return (new Function(variable, fn.code))
				.apply(env || data, value);
		};

		fn.code = fn.code || "var $parts=[]; $parts.push('"
			+ str
			.replace(/\\/g, '\\\\')
			.replace(/[\r\t\n]/g, " ")
			.split("<%").join("\t")
			.replace(/(^|%>)[^\t]*/g, function(str) { return str.replace(/'/g, "\\'"); })
			.replace(/\t=(.*?)%>/g, "',$1,'")
			.split("\t").join("');")
			.split("%>").join("$parts.push('")
			+ "'); return $parts.join('');";

		return data ? fn(data, env) : fn;
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

