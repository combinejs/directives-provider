# directives-provider

[![Build Status](http://travis-ci.org/combinejs/directives-provider.svg?branch=master)](https://travis-ci.org/combinejs/directives-provider)
[![Coverage Status](http://coveralls.io/repos/github/combinejs/directives-provider/badge.svg?branch=master)](https://coveralls.io/github/combinejs/directives-provider?branch=master)

### DirectiveProvider.provide(name)
directives provider resolve directive from project scope or node_modules folder.
for using your directive without publish in npm, place your directive to:

combinejs parsers call this method automatically, when parse blocks.

* [PROJECT]/combine/directives/[NAME].js
* [PROJECT]/combine/directives/[NAME]/index.js
* [PROJECT]/combine/directives/[NAME]-directive.js
* [PROJECT]/combine/directives/[NAME]-directive/index.js

```javascript
const DP = require('@combinejs/directives-provider');
let myDirective = new DP.provide('MyDirective');
```

### DirectiveProvider.define(name, directiveClass)
for special case you can define directive manual:

```javascript
const DP = require('@combinejs/directives-provider');
DP.define('myDirective', MyDirective);
```

