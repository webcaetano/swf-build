[![Build Status](https://travis-ci.org/webcaetano/swf-build.svg)](https://travis-ci.org/webcaetano/swf-build) [![npm version](https://badge.fury.io/js/swf-build.svg)](http://badge.fury.io/js/swf-build)

# SWF Build

### Install
```
npm install swf-build
```

### Documentation

Simple Build
```javascript
var swfBuild = require('swf-build');

swfBuild('./test/main.as',function(err, stdout, stderr){
	// output './test/main.swf'
}); 
```


Set output
```javascript
swfBuild('./test/main.as','./test/swf/main.swf',function(err, stdout, stderr){
	// output './test/swf/main.swf'
}); 
```

Set parameters
```javascript
swfBuild('./test/main.as','./test/swf/main.swf',{
	'library-path': [
		'./test/libs'
	],
	'source-path': [
		'./test/zClass'
	],
	'swf-version': 13,
	'use-gpu': true
},function(err, stdout, stderr){
	// output './test/swf/main.swf'
}); 
```

[![NPM](https://nodei.co/npm/swf-build.png)](https://nodei.co/npm/swf-build/)

---------------------------------

The MIT [License](https://raw.githubusercontent.com/webcaetano/swf-build/master/LICENSE.md)
