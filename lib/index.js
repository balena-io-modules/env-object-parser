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

/**
 * @module env-object-parser
 */

const _ = require('lodash')
const SEPARATOR = '__'

/**
 * @summary Parse an environment object
 * @function
 * @public
 *
 * @param {Object} environment - environment object
 * @param {Object} options - options
 * @param {String} options.prefix - environment prefix
 * @returns {Object} parsed object
 *
 * @example
 * const envObjectParser = require('env-object-parser')
 *
 * process.env.FOO_BAR = 'baz'
 *
 * const result = envObjectParser(process.env, {
 *   prefix: 'FOO'
 * })
 *
 * console.log(result.bar)
 * > 'baz'
 */
module.exports = (environment, options) => {
  return _.reduce(environment, (accumulator, value, key) => {
    const regex = new RegExp(`^${options.prefix}_(.+)$`)

    const result = key.match(regex)
    if (!result) {
      return accumulator
    }

    const name = _.map(_.split(result[1], SEPARATOR), _.camelCase)
    _.set(accumulator, name, value)
    return accumulator
  }, {})
}
