import isPlainObject from 'lodash.isplainobject'

export const ActionType = Symbol('ActionType')

/**
 * Creates a map of action types with optional nested namespace support.
 *
 * @param {object} spec The action type specification.
 * @param {object} [options] The options.
 * @param {string} [options.namespace] The starter namespace.
 * @param {string} [options.separator='.'] The namespace separator.
 * @return {object} Returns a map of action types.
 */
export function createActionTypes (spec, { namespace, separator = '.' } = {}) {
  if (!isPlainObject(spec)) {
    throw new Error('param "spec" is not an object')
  }
  if (namespace && typeof namespace !== 'string') {
    throw new Error('option "namespace" is not a string')
  }
  if (typeof separator !== 'string') {
    throw new Error('option "separator" is not a string')
  }

  return Object.keys(spec).reduce((result, key) => {
    const value = spec[key]
    const namespacedKey = namespace ? `${namespace}${separator}${key}` : key

    if (value === ActionType) {
      return { ...result, [key]: namespacedKey }
    }
    if (isPlainObject(value)) {
      return {
        ...result,
        [key]: createActionTypes(value, {
          namespace: namespacedKey,
          separator
        })
      }
    }

    throw new Error(`value of key "${key}" of param "spec" is invalid`)
  }, {})
}
