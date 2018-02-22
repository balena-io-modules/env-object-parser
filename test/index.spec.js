/*
 * Copyright 2018 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const ava = require('ava')
const envObjectParser = require('..')

ava.test('should return an empty object if there is no match', (test) => {
  test.deepEqual(envObjectParser({
    FOOBAR_BAZ: 'foo',
    FOO_BAR: 'baz',
    EDITOR: 'vim'
  }, {
    prefix: 'HELLO'
  }), {})
})

ava.test('should ignore variables that do not start with the prefix', (test) => {
  test.deepEqual(envObjectParser({
    FOOBAR_BAZ: 'foo',
    FOO_BAR: 'baz',
    EDITOR: 'vim'
  }, {
    prefix: 'FOO'
  }), {
    bar: 'baz'
  })
})

ava.test('should parse a single string single word variable', (test) => {
  test.deepEqual(envObjectParser({
    FOO_BAR: 'baz'
  }, {
    prefix: 'FOO'
  }), {
    bar: 'baz'
  })
})

ava.test('should parse two strings single word variables', (test) => {
  test.deepEqual(envObjectParser({
    FOO_BAR: 'baz',
    FOO_BAZ: 'qux'
  }, {
    prefix: 'FOO'
  }), {
    bar: 'baz',
    baz: 'qux'
  })
})

ava.test('should parse a single string multi word variable', (test) => {
  test.deepEqual(envObjectParser({
    FOO_BAR_BAZ: 'qux'
  }, {
    prefix: 'FOO'
  }), {
    barBaz: 'qux'
  })
})

ava.test('should parse two string multi word variables', (test) => {
  test.deepEqual(envObjectParser({
    FOO_BAR_BAZ: 'qux',
    FOO_BAZ_QUX: 'foo'
  }, {
    prefix: 'FOO'
  }), {
    barBaz: 'qux',
    bazQux: 'foo'
  })
})

ava.test('should parse a single string nested variable', (test) => {
  test.deepEqual(envObjectParser({
    FOO_CONFIGURATION__FOO__BAR: 'baz'
  }, {
    prefix: 'FOO'
  }), {
    configuration: {
      foo: {
        bar: 'baz'
      }
    }
  })
})

ava.test('should parse multiple string nested variables', (test) => {
  test.deepEqual(envObjectParser({
    FOO_CONFIGURATION__FOO__BAR: 'baz',
    FOO_CONFIGURATION__FOO__HELLO: 'world'
  }, {
    prefix: 'FOO'
  }), {
    configuration: {
      foo: {
        bar: 'baz',
        hello: 'world'
      }
    }
  })
})

ava.test('should accept a multi word prefix', (test) => {
  test.deepEqual(envObjectParser({
    FOO_BAR_BAZ: 'qux'
  }, {
    prefix: 'FOO_BAR'
  }), {
    baz: 'qux'
  })
})

ava.test('should not care about case', (test) => {
  test.deepEqual(envObjectParser({
    foo_CONFIGURATION__Foo__BAR: 'baz',
    FOO_configuration__foo__hello: 'world'
  }, {
    prefix: 'fOo'
  }), {
    configuration: {
      foo: {
        bar: 'baz',
        hello: 'world'
      }
    }
  })
})
