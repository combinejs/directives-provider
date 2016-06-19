/* global before, after, beforeEach, describe, it */

const expect             = require('chai').expect,
      mkdirp             = require('mkdirp'),
      rimraf             = require('rimraf'),
      fs                 = require('fs'),
      path               = require('path'),
      directivesProvider = require('../index');

before('create project defined directives', function() {
    mkdirp.sync(path.resolve('./combine/directives/test1-directive'));
    mkdirp.sync(path.resolve('./combine/directives/test2'));

    let directive = fs.readFileSync(path.resolve('./node_modules/@combinejs/empty-directive/index.js'));

    fs.writeFileSync(path.resolve('./combine/directives/test1-directive/index.js'), directive);
    fs.writeFileSync(path.resolve('./combine/directives/test2/index.js'), directive);
    fs.writeFileSync(path.resolve('./combine/directives/test3.js'), directive);
    fs.writeFileSync(path.resolve('./combine/directives/test4-directive.js'), directive);
});

describe('provide directives', function() {
    it('provide %PROJECT%/combine/directives/%NAME%-directive/index.js', function() {
        expect(function() {
            directivesProvider('test1');
        }).to.not.throw(Error);
    });

    it('provide %PROJECT%/combine/directives/%NAME%/index.js', function() {
        expect(function() {
            directivesProvider('test2');
        }).to.not.throw(Error);
    });

    it('provide %PROJECT%/combine/directives/%NAME%.js', function() {
        expect(function () {
            directivesProvider('test3');
        }).to.not.throw(Error);
    });

    it('provide %PROJECT%/combine/directives/%NAME%-directive.js', function() {
        expect(function () {
            directivesProvider('test4');
        }).to.not.throw(Error);
    });

    it('provide node_modules', function() {
        expect(function() {
            directivesProvider('match');
        }).to.not.throw(Error);
    });
});

describe('provide directives fail', function() {
    it('provide', function() {
        expect(function() {
            directivesProvider('not-existed');
        }).to.throw();
    });
});

after('clear user defined directives', function() {
    rimraf.sync(path.resolve('./combine/'));
});
