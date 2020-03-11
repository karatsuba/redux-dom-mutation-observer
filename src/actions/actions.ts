import { OBSERVE, DISCONNECT, Actions } from './types';

export const observe = (): Actions => ({
    type: OBSERVE,
    payload: null
});

export const disconnect = (): Actions => ({
    type: DISCONNECT
});
