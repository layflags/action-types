# action-types

[![es6](https://camo.githubusercontent.com/d25414161ebfbbdd0f69a4a3e6a188a76ae2e82a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f65732d362d627269676874677265656e2e737667)](https://babeljs.io/docs/usage/polyfill/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Conveniently create action types with multi-level namespace support.

**A note about compatibility**

The [npm package](https://www.npmjs.com/package/action-types) should be used in
an **ES6 environment**. Even though the published code has ES5 syntax it uses
some ES6 features, so you have to make sure to use ES5 and ES6 polyfills if you
are in an ancient environment.

## Install

```sh
npm install action-types
```

## Usage

```javascript
import { ActionType, createActionTypes } from './action-types'

createActionTypes({
  START_APP: ActionType,
  user: {
    ADD: ActionType,
    REMOVE: ActionType,
    current: {
      SET: ActionType,
      CHANGE: ActionType
    }
  }
})

// results in:

{
  START_APP: 'START_APP',
  user: {
    ADD: 'user.ADD',
    REMOVE: 'user.REMOVE',
    CHANGE: 'user.CHANGE',
    current: {
      SET: 'user.current.SET',
      CHANGE: 'user.current.CHANGE'
    }
  }
}
```

### With initial namespace

```javascript
import { ActionType, createActionTypes } from './action-types'

createActionTypes({
  ADD: ActionType,
  REMOVE: ActionType
}, {
  namespace: 'user'
})

// results in:

{
  ADD: 'user.ADD',
  REMOVE: 'user.REMOVE'
}
```

### With custom namespace separator

```javascript
import { ActionType, createActionTypes } from './action-types'

createActionTypes({
  user: {
    ADD: ActionType,
    REMOVE: ActionType
  }
}, {
  separator: '::'
})

// results in:

{
  ADD: 'user::ADD',
  REMOVE: 'user::REMOVE'
}
```

## Test

```sh
npm test
```

## License

[MIT](LICENSE)

