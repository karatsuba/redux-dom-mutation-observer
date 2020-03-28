# redux-dom-mutation-observer 👀

[![build status](https://img.shields.io/travis/karatsuba/redux-dom-mutation-observer.svg?style=flat-square)](https://travis-ci.org/karatsuba/redux-dom-mutation-observer)
[![npm version](https://img.shields.io/npm/v/redux-dom-mutation-observer.svg?style=flat-square)](https://www.npmjs.com/package/redux-dom-mutation-observer)

`redux-dom-mutation-observer` is a Redux middleware for managing DOM tree changes over [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) Web API.

This middleware uses actions to interact with a MutationObserver instance: observe mutations, disconnecting and receiving mutation records.

### Features

-   Written in TypeScript.
-   Interact with a MutationObserver by dispatching actions.
-   Handle mutation records with Redux middleware, integrate with Saga, and use reducers to persist state.

## Installation

```sh
$ npm i redux-dom-mutation-observer
```

## Configuration

Easily add the middleware to your Redux store with `applyMiddleware`. To do so, you have to create a middleware instance.

```js
import { applyMiddleware, createStore } from 'redux';
import createMutationObserver from 'redux-dom-mutation-observer';

import reducer from './store/reducer';

// Create the middleware instance.
const mutationObserverMiddleware = createMutationObserver();

// Create the Redux store.
const store = createStore(reducer, applyMiddleware(mutationObserverMiddleware));
```

## Usage

`redux-dom-mutation-observer` will dispatch every mutation record action automatically, based on what the internal MutationObserver will get. Some actions will need to be dispatched by you.

### User dispatched actions

Feel free to use action creator functions included in the module.

---

##### `REDUX_DOM_MUTATION_OBSERVER::OBSERVE`

Action is used to start receiving DOM changes notifications that match the given target node and [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit) options.

###### Example:

```js
import { observe } from 'redux-dom-mutation-observer';

store.dispatch(observe('root', { subtree: true }));
```

###### Arguments:

1. `targetId` _(`string`)_: A DOM node Id within the DOM tree to watch for changes.
2. `options` _(`MutationObserverInit`)_: configuration of a mutation observer.

---

##### `REDUX_DOM_MUTATION_OBSERVER::DISCONNECT`

Stops the MutationObserver instance from receiving further notifications.

###### Example:

```js
import { disconnect } from 'redux-dom-mutation-observer';

store.dispatch(disconnect());
```

---

### Middleware dispatched actions

##### `REDUX_DOM_MUTATION_OBSERVER::MUTATION_RECORD`

Dispatched when the MutationObserver receives a DOM change that qualifies given the targeted node or subtree and options. The payload includes a `mutation` key which is a [MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord).

###### Structure

```js
{
    type: 'REDUX_DOM_MUTATION_OBSERVER::MUTATION_RECORD',
    payload: {
        mutation: {
            // MutationRecord data
        }
    };
}
```

## Projects using redux-dom-mutation-observer

-   [workflowy-link-preview](https://github.com/karatsuba/workflowy-link-preview) - URLs previewer browser extension for [WorkFlowy](https://workflowy.com/).

## Support

If you have discovered a bug or have a feature suggestion, feel free to create an issue on Github.

Also, you can drop me a message on my twitter - [@roman_chukhan](https://twitter.com/roman_chukhan).

## License

[MIT](LICENSE)
