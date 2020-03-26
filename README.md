# redux-dom-mutation-observer

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

Easily add the middleware to your Redux story with `applyMiddleware`. To do so, you have to create a middleware instance.

```js
import { applyMiddleware, createStore } from 'redux';
import createMutationObserver from 'redux-dom-mutation-observer';

import reducer from './store/reducer';

// Create the middleware instance.
const mutationObserverMiddleware = createMutationObserver();

// Create the Redux store.
const store = createStore(reducer, applyMiddleware(mutationObserverMiddleware));
```
