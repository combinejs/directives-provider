/* global before, after, beforeEach, describe, it */

const {expect, assert}   = require('chai'),
      mkdirp             = require('mkdirp'),
      rimraf             = require('rimraf'),
      fs                 = require('fs'),
      path               = require('path'),
      DP                 = require('../index');

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

    it('provide from [PROJECT]/combine/directives/[NAME]-directive/index.js', function() {
        expect(function() {
            DP.provide('test1');
        }).to.not.throw(Error);
    });

    it('provide from [PROJECT]/combine/directives/[NAME]/index.js', function() {
        expect(function() {
            DP.provide('test2');
        }).to.not.throw(Error);
    });

    it('provide from [PROJECT]/combine/directives/[NAME].js', function() {
        expect(function () {
            DP.provide('test3');
        }).to.not.throw(Error);
    });

    it('provide from [PROJECT]/combine/directives/[NAME]-directive.js', function() {
        expect(function () {
            DP.provide('test4');
        }).to.not.throw(Error);
    });

    it('provide from node_modules', function() {
        expect(function() {
            DP.provide('match');
        }).to.not.throw(Error);
    });
});

describe('define and provide special case', function() {
    it('compare', function() {
        class Test5Directive {
            constructor() {

            }

            run() {

            }

            pitch() {

            }
        }

        DP.define('test5', Test5Directive);

        assert.equal(DP.provide('test5'), Test5Directive);
    });
});

describe('provide directives fail', function() {

    it('provide', function() {
        expect(function() {
            DP.provide('not-existed');
        }).to.throw();
    });
});

after('clear user defined directives', function() {
    rimraf.sync(path.resolve('./combine/'));
});
