var flexSdk = require('flex-sdk');
var path = require('path');
var fs = require('fs');

var utils = {
	extend:function(destObj) {
		for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) destObj[key] = arguments[i][key];
		return destObj;
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

	if(Array.isArray(attr)) {
		for(var i in attr) resp.push(base+toSum+'="'+attr[i]+'"');
	} else {
		for (var i in attr) {
			resp.push(base+toSum+"="+i+',"'+(base=='define' && typeof attr[i]=='string' ? '\\\"'+attr[i]+'\\\"' : attr[i])+'"');
		}
	}
	return resp.join(' -');
}

var removeEmpty = function(arr){
	for(var i in arr){
		if(Array.isArray(arr[i]) && !arr[i].length) arr.splice(arr.indexOf(arr[i]),1);
	}
	return arr;
}

module.exports = function(input, output, params, callback) {
	if(!input || !path.extname(input) || path.extname(input)!='.as'){
		console.log('Invalid input file.');
		return;
	}

	if(typeof output === 'function') callback = output;
	if(typeof params === 'function') callback = params;
	if(typeof output === 'object') params = output;

	removeEmpty(params);

	var defaults = {
		output:path.resolve((typeof output==='string' ? output : path.dirname(input)+'/'+path.basename(input,'.as')+'.swf'))
	};

	require('child_process').exec([
		flexSdk.bin.mxmlc,
		getFlexParams(utils.extend({}, defaults, (typeof params==='object' ? params : {}))),
		path.resolve(input)
	].join(" "), null, callback);
}


