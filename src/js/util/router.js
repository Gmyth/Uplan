/**
 * 路由模块
 */
define(function(require, exports, module){
	var $            = require('lib/jquery');
	var uri          = require('util/uri');
	var cookie       = require('util/cookie');
    var net          = require('util/net');
	var pageSrc;
    var enableSwipe = false;
    var shareParam;
    var userId;
    var packageName;
    var packageDefer;
    //设置webview导航栏颜色,产品策略可以接受这种情形：webview顶部先是蓝色，执行到这里逻辑后再变成黑色(ambermu)。
	/*if(mqq && mqq.ui && mqq.ui.setWebViewBehavior){
		mqq.ui.setWebViewBehavior({navBgColor:0x15191c});//这里颜色码从重构处获取
	}*/

    // 防止其他库的Deferred覆盖到原始的
    var Deferred = $.proxy($.Deferred, $);

	/**
	 * @exports business/开启右滑退出router
	 */
	var router = exports;

    



	/**
	 * 页面切换，屏蔽具体实现
	 * @param {string} route 路由名称
	 * @param {object} [params] 自定义参数
	 * @params {boolean} 可选参数，标记该次是否采用新窗口打开 true表示采用新窗口,不传该参数默认为false
	 */
	router.redirect = function(route, params,ops) {
		ops=true;
		router.canShow(function(){   //苹果ios审核期间，所有跳转都干掉
			common.openUrl({
				newWindow:(typeof ops == "undefined" || ops === false) ? false : true,
				url: router.createUrl(route, params),
				target: 1,
				style: 1
			});
		});
	};

    /**
     * 首页跳转出去，带上indexShow=1参数，表示已显示过首页，不需要显示返回首页的头
     */
    router.indexRedirect = function(route, params, ops) {
        params = params || {};
        params.indexShow = 1;
        this.redirect( route, params, ops);
    };

	function getString(params) {
		return $.param(params).replace(/(?:^|&)[^\=]*\=(?:null|undefined)(?=&|#|$)/g, '');
	};
	
	
	
	//获取cookie中的uin
	router.getCookieUin = function(){
	
		var uin = cookie('uin');
		if (!uin) {
			return 0;
		}
		uin = /^o(\d+)$/.exec(uin);
		if (uin && (uin = new Number(uin[1]) + 0) > 10000) {
			return uin;
		}
		return 0;
	};


    
    /**
     * 获取当前用户QQ号
     */
    router.getUin = function() {
        var defaultParams = $.extend(true, {}, uri.parseQueryString(window.location.search));
        return defaultParams.uin;
    };

	/**
	 * 获取当前页面的输入参数
	 * @params {string} [name] 参数名称
	 * @return {object} 参数
	 * @example
	 * getParams() : {a: 0, b: {c: 1}}
	 * getParams('a') : 0
	 * getParams('b.c') : 1
	 */
	router.getParams = function( name ) {
		var cache = arguments.callee;
		var params;
		if (!cache.params) {
			params = cache.params = uri.parseQueryString(window.location.search);
		} else {
			params = cache.params;
		}
		if (name) {
			var nameList = name.split('.');
			for (var i = 0, iMax = nameList.length; i < iMax; i ++) {
				if (params.hasOwnProperty(nameList[i])) {
					params = params[nameList[i]];
				} else {
					var undefined = undefined;
					return undefined;
				}
			}
		}
		return params;
	};
	
	/**
	*	@method getHashParam 
	*	@desc   获取hash中的参数
	*	@param  name string 需要获取的url的参数
	*	@return string 返回对应的值，有可能为空
	*/
	router.getHashParam = function( name ){
		var r = new RegExp("(\\?|#|&)"+name+"=([^&]*)(&|$)")
		var m = window.location.hash.match(r)
		if(!m || m==""){
			m = window.location.hash.match(r)
		}
		return (!m?"":m[2]);
	};
});
