/**
 * @module
 */

class DirectiveProvider {
    constructor() {
        this._directives = {};
    }

    /**
     * Get directive by name
     * you can has project scope directive
     * for this place him to next paths:
     *   1. [PROJECT_DIR]/combine/directives/[NAME].js
     *   2. [PROJECT_DIR]/combine/directives/[NAME]/index.js
     *   3. [PROJECT_DIR]/combine/directives/[NAME]-directive.js
     *   4. [PROJECT_DIR]/combine/directives/[NAME]-directive/index.js
     *
     * @param name {String} directive name
     * @returns {*}
     */
    provide(name) {
        let cwd = process.cwd();

        if (! this._directives[name]) {
            try {
                this._directives[name] = require(`${cwd}/combine/directives/${name}`);
            } catch (e) {
                try {
                    this._directives[name] = require(`${cwd}/combine/directives/${name}-directive`);
                } catch (e) {
                    this._directives[name] = require(`@combinejs/${name}-directive`);
                }
            }
        }

        return this._directives[name];
    }

    /**
     * For special case you can define directive manual
     *
     * @param name {String} directive name
     * @param directive {EmptyDirective}
     */
    define(name, directive) {
        this._directives[name] = directive;
    }
}

module.exports = new DirectiveProvider();

