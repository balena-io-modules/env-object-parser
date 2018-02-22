env-object-parser
=================

[![npm](https://img.shields.io/npm/v/env-object-parser.svg?style=flat-square)](https://npmjs.com/package/env-object-parser)
[![npm license](https://img.shields.io/npm/l/env-object-parser.svg?style=flat-square)](https://npmjs.com/package/env-object-parser)
[![npm downloads](https://img.shields.io/npm/dm/env-object-parser.svg?style=flat-square)](https://npmjs.com/package/env-object-parser)
[![travis](https://img.shields.io/travis/resin-io-modules/env-object-parser/master.svg?style=flat-square&label=linux)](https://travis-ci.org/resin-io-modules/env-object-parser)

> Parse a set of environment variables as a JSON object

Installation
------------

Install `env-object-parser` by running:

```sh
npm install --save env-object-parser
```

Documentation
-------------

<a name="exp_module_env-object-parser--module.exports"></a>

### module.exports(environment, options) ⇒ <code>Object</code> ⏏
**Kind**: Exported function  
**Summary**: Parse an environment object  
**Returns**: <code>Object</code> - parsed object  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| environment | <code>Object</code> | environment object |
| options | <code>Object</code> | options |
| options.prefix | <code>String</code> | environment prefix |

**Example**  
```js
const envObjectParser = require('env-object-parser')

process.env.FOO_BAR = 'baz'

const result = envObjectParser(process.env, {
  prefix: 'FOO'
})

console.log(result.bar)
> 'baz'
```

Tests
-----

Run the `test` npm script:

```sh
npm test
```

Contribute
----------

- Issue Tracker: [github.com/resin-io-modules/env-object-parser/issues](https://github.com/resin-io-modules/env-object-parser/issues)
- Source Code: [github.com/resin-io-modules/env-object-parser](https://github.com/resin-io-modules/env-object-parser)

Before submitting a PR, please make sure that you include tests, and that the
linter runs without any warning:

```sh
npm run lint
```

Support
-------

If you're having any problem, please [raise an issue][newissue] on GitHub.

License
-------

This project is free software, and may be redistributed under the terms
specified in the [license].

[newissue]: https://github.com/resin-io-modules/env-object-parser/issues/new
[license]: https://github.com/resin-io-modules/env-object-parser/blob/master/LICENSE
