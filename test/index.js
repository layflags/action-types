import test from 'tape'
import { ActionType, createActionTypes } from '../src/action-types'

test('Module provides named export `ActionType`', (assert) => {
  const expected = 'symbol'
  const actual = typeof ActionType

  assert.equal(actual, expected, '`ActionType` should be a symbol')

  assert.end()
})

test('Module provides named export `createActionTypes`', (assert) => {
  const expected = 'function'
  const actual = typeof createActionTypes

  assert.equal(actual, expected, '`createActionTypes` should be a function')

  assert.end()
})

test('`createActionTypes` fails if param `spec` is missing', (assert) => {
  const expected = /spec.+is not an object/
  const actual = () => createActionTypes()

  assert.throws(actual, expected, 'should throw a `spec` related error')

  assert.end()
})

test('`createActionTypes` fails if param `spec` is not an object', (assert) => {
  const expected = /spec.+is not an object/
  const actual = () => createActionTypes('invalid')

  assert.throws(actual, expected, 'should throw a `spec` related error')

  assert.end()
})

test('`createActionTypes` fails if some key of param `spec` has invalid value', (assert) => {
  const expected = /value of.+FOO.+is invalid/
  const actual = () => createActionTypes({ FOO: 1 })

  assert.throws(actual, expected, 'should throw a `spec` value related error')

  assert.end()
})

test('`createActionTypes` fails if option `namespace` is defined and not a string', (assert) => {
  const expected = /namespace.+is not a string/
  const actual = () => createActionTypes({}, { namespace: true })

  assert.throws(actual, expected, 'should throw a `namespace` related error')

  assert.end()
})

test('`createActionTypes` fails if option `separator` is defined and not a string', (assert) => {
  const expected = /separator.+is not a string/
  const actual = () => createActionTypes({}, { separator: 1 })

  assert.throws(actual, expected, 'should throw a `separator` related error')

  assert.end()
})

test('`createActionTypes` succeeds for empty `spec`', (assert) => {
  const expected = {}
  const actual = createActionTypes({})

  assert.deepEqual(actual, expected, 'should return an empty object')

  assert.end()
})

test('`createActionTypes` succeeds for simple `spec`', (assert) => {
  const expected = { FOO: 'FOO' }
  const actual = createActionTypes({ FOO: ActionType })

  assert.deepEqual(actual, expected, 'value and key should be equivalent')

  assert.end()
})

test('`createActionTypes` succeeds with namespaces in `spec`', (assert) => {
  const expected = { FOO: 'FOO', bar: { BAZ: 'bar.BAZ' } }
  const actual = createActionTypes({ FOO: ActionType, bar: { BAZ: ActionType } })

  assert.deepEqual(actual, expected, 'namespace should be added to action value')

  assert.end()
})

test('`createActionTypes` succeeds with nested namespaces in `spec`', (assert) => {
  const expected = { foo: { bar: { BAZ: 'foo.bar.BAZ' } } }
  const actual = createActionTypes({ foo: { bar: { BAZ: ActionType } } })

  assert.deepEqual(actual, expected, 'all namespaces should be added to action value')

  assert.end()
})

test('`createActionTypes` allows having an inital namespaces', (assert) => {
  const expected = { FOO: 'ns.FOO', BAR: 'ns.BAR' }
  const actual = createActionTypes({ FOO: ActionType, BAR: ActionType }, { namespace: 'ns' })

  assert.deepEqual(actual, expected, 'initial namespace should be added to action values')

  assert.end()
})

test('`createActionTypes` allows having a custom namespace separator', (assert) => {
  const expected = { foo: { bar: { BAZ: 'foo::bar::BAZ' } } }
  const actual = createActionTypes({ foo: { bar: { BAZ: ActionType } } }, { separator: '::' })

  assert.deepEqual(actual, expected, 'separator should be used for action values')

  assert.end()
})
