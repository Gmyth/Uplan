(function(){
	var base;
	var host = location.host;

    // 安卓离线包情况下host变量为空
    // 外网情况下直接使用绝对路径base
    // 部分安卓手机SeaJS解析有问题会直接访问外网加载模块
    if(!host) {
        host = 'gamecenter.qq.com';
    }
	
	base = '../../js/';
	
    

    var preload = [];
    // 如果有模拟器则预加载相应模块
    if (/[?&]_simulator=([\w]+)/.test(window.location.href)) {
        preload = ['jsBridge/simulator/' + RegExp.$1];
    }

	seajs.config({
		base: base,
        preload: preload
	});
})();
