var swfBuild = require('../');
var expect = require('chai').expect;
var fs = require('fs');

describe('swf-build', function() {
	it('should build actionScript without parameters and output',function(done){
		this.timeout(5000);
		swfBuild('./test/main.as',function(err, stdout, stderr){
			expect(err).to.be.null;
			expect(typeof fs.readFileSync('./test/main.swf')).to.be.equals('object');
			fs.unlinkSync('./test/main.swf')
			done();
		});
	});

	it('should build actionScript without parameters',function(done){
		this.timeout(5000);

		var output = './test/swf/main.swf';
		swfBuild('./test/main.as',output,function(err, stdout, stderr){
			expect(err).to.be.null;
			expect(typeof fs.readFileSync(output)).to.be.equals('object');
			fs.unlinkSync(output)
			done();
		});
	});

	it('should build actionScript without output',function(done){
		this.timeout(5000);

		var output = './test/main.swf';
		swfBuild('./test/main.as',{
			'library-path': [
				'./test/libs'
			],
			'source-path': [
				'./test/zClass'
			],
			'swf-version': 13,
			'use-gpu': true
		},function(err, stdout, stderr){
			expect(err).to.be.null;
			expect(typeof fs.readFileSync(output)).to.be.equals('object');
			fs.unlinkSync(output)
			done();
		});
	});

	it('should build actionScript with parameters and output',function(done){
		this.timeout(5000);

		var output = './test/swf/main.swf';
		swfBuild('./test/main.as',output,{
			'library-path': [
				'./test/libs'
			],
			'source-path': [
				'./test/zClass'
			],
			'swf-version': 13,
			'use-gpu': true
		},function(err, stdout, stderr){
			expect(err).to.be.null;
			expect(typeof fs.readFileSync(output)).to.be.equals('object');
			fs.unlinkSync(output)
			done();
		});
	});
});
