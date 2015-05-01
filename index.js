var flexSdk = require('flex-sdk');
var path = require('path');

var utils = {
	extend:function(destObj) {
		for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) destObj[key] = arguments[i][key];
		return destObj;
	},
	isArray:function($){
		return Object.prototype.toString.call($) === '[object Array]';
	}
};

var getFlexParams = function(params) {
	var resp = [];
	for(var i in params) resp.push((typeof params[i]==='object' ? objParam(i, params[i]) : i+'='+params[i]));
	return '-'+resp.join(' -');
}

var objParam = function(base, attr) {
	var toSum = ({ 'source-path':true, 'library-path':true }[base] ? '+' : '');
	var resp = [];

	if(utils.isArray(attr)) {
		for(var i in attr) resp.push(base+toSum+'="'+attr[i]+'"');
	} else {
		for (var i in attr) {
			resp.push(base+toSum+"="+i+',"'+(base=='define' && typeof attr[i]=='string' ? '\\\"'+attr[i]+'\\\"' : attr[i])+'"');
		}
	}
	return resp.join(' -');
}

var defaultSwfPath = function(input){
	var inputPath = path.parse(input);
	return path.resolve(path.format(utils.extend({}, inputPath, {ext:'.swf',base:inputPath.name+'.swf'})));
}

module.exports = function(input, output, params, callback) {
	if(!input || !path.parse(input).ext || path.parse(input).ext!='.as'){
		console.log('Invalid input file.');
		return;
	}

	if(typeof output === 'function') callback = output;
	if(typeof params === 'function') callback = params;
	if(typeof output === 'object') params = output;

	var defaults = {
		output:(typeof output==='string' ? path.resolve(output) : defaultSwfPath(input))
	};

	require('child_process').exec([
		flexSdk.bin.mxmlc,
		getFlexParams(utils.extend({}, defaults, (typeof params==='object' ? params : {}))),
		path.resolve(input)
	].join(" "), null, callback);
}
