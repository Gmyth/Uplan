/**
 * Created with JetBrains PhpStorm.
 * User: layenlin
 * Date: 13-12-13
 * Time: 上午10:31
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
	/**@module util/uri */

	/**
	 * 获取绝对路径
	 * @param {string} path 相对路径
	 * @param {string} target 参考路径
	 * @return {string} 绝对路径
	 * @example
	 * getRealPath('./../file.txt', 'http://vip.qq.com/a/b/c?name=value') : http://vip.qq.com/a/b/file.txt
	 */
	exports.getRealPath = function(path, target) {
		var p = 0,
			arr = []; /* Save the root, if not given */
		var r = target || window.location.href; /* Avoid input failures */
		path = (path + '').replace('\\', '/'); /* Check if there's a port in path (like 'http://') */
		if (path.indexOf('://') !== -1) {
			p = 1;
		} /* Ok, there's not a port in path, so let's take the root */
		if (!p) {
			path = r.substring(0, r.lastIndexOf('/') + 1) + path;
		} /* Explode the given path into it's parts */
		arr = path.split('/'); /* The path is an array now */
		path = []; /* Foreach part make a check */
		for (var k in arr) { /* This is'nt really interesting */
			if (arr[k] == '.') {
				continue;
			} /* This reduces the realpath */
			if (arr[k] == '..') {
				/* But only if there more than 3 parts in the path-array.
				 * The first three parts are for the uri */
				if (path.length > 3) {
					path.pop();
				}
			} /* This adds parts to the realpath */
			else {
				/* But only if the part is not empty or the uri
				 * (the first three parts ar needed) was not
				 * saved */
				if ((path.length < 2) || (arr[k] !== '')) {
					path.push(arr[k]);
				}
			}
		} /* Returns the absloute path as a string */
		return path.join('/');
	};

	/**
	 * 解析url，返回组成部分
	 * @param {string} url url
	 * @return {object} 组成部分，参考window.location
	 * @example
	 * parseUrl('http://www.qq.com:80/?name=value#hash') : {
	 *     hash: "#hash",
	 *     host: "www.qq.com",
	 *     hostname: "www.qq.com",
	 *     href: "http://www.qq.com/?name=value#hash",
	 *     pathname: "/",
	 *     port: "80",
	 *     protocol: "http:",
	 *     search: "?name=value"
	 * };
	 */
	exports.parseUrl = function(url) {
		if (/^(([^:\/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/.test(url)) {
			var host = RegExp.$4.split(':');
			return {
				protocol: RegExp.$1,
				host: RegExp.$4,
				hostname: host[0],
				port: host[1] || '',
				pathname: RegExp.$5,
				search: RegExp.$6,
				hash: RegExp.$8,
				href: url
			};
		} else {
			return null;
		}
	};

	/**
	 * 将query string解析object
	 * @param {string} queryString url
	 * @return {object} object
	 * @example
	 * parseQueryString('name=value&hash[a]=A&hash[b]=B') : {
	 *     "name": "value",
	 *     "hash": {
	 *         "a": "A",
	 *         "b": "B"
	 *     }
	 * };
	 */
    var parseQueryStringCache = {};
	exports.parseQueryString = function(queryString) {
        var queryString = String(queryString).replace(/^[\?&#]/, '').replace(/&$/, '');
        if(parseQueryStringCache[queryString]) {
            return parseQueryStringCache[queryString];
        }
		var strArr = queryString.split('&'),
			sal = strArr.length,
			i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value,
			postLeftBracketPos, keys, keysLen,
			fixStr = function (str) {
				return decodeURIComponent(str.replace(/\+/g, '%20'));
			},
			array = {};

		for (i = 0; i < sal; i++) {
			tmp = strArr[i].split('=');
			key = fixStr(tmp[0]);
			value = (tmp.length < 2) ? '' : fixStr(tmp[1]);

			while (key.charAt(0) === ' ') {
				key = key.slice(1);
			}
			if (key.indexOf('\x00') > -1) {
				key = key.slice(0, key.indexOf('\x00'));
			}
			if (key && key.charAt(0) !== '[') {
				keys = [];
				postLeftBracketPos = 0;
				for (j = 0; j < key.length; j++) {
					if (key.charAt(j) === '[' && !postLeftBracketPos) {
						postLeftBracketPos = j + 1;
					}
					else if (key.charAt(j) === ']') {
						if (postLeftBracketPos) {
							if (!keys.length) {
								keys.push(key.slice(0, postLeftBracketPos - 1));
							}
							keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
							postLeftBracketPos = 0;
							if (key.charAt(j + 1) !== '[') {
								break;
							}
						}
					}
				}
				if (!keys.length) {
					keys = [key];
				}
				for (j = 0; j < keys[0].length; j++) {
					chr = keys[0].charAt(j);
					if (chr === ' ' || chr === '.' || chr === '[') {
						keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
					}
					if (chr === '[') {
						break;
					}
				}

				obj = array;
				for (j = 0, keysLen = keys.length; j < keysLen; j++) {
					key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '');
					lastIter = j !== keys.length - 1;
					lastObj = obj;
					if ((key !== '' && key !== ' ') || j === 0) {
						if (obj[key] === undef) {
							obj[key] = {};
						}
						obj = obj[key];
					}
					else { // To insert new dimension
						ct = -1;
						for (p in obj) {
							if (obj.hasOwnProperty(p)) {
								if (+p > ct && p.match(/^\d+$/g)) {
									ct = +p;
								}
							}
						}
						key = ct + 1;
					}
				}
				lastObj[key] = value;
			}
		}
		return parseQueryStringCache[queryString] = array;
	};
});
