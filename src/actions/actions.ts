import { OBSERVE, DISCONNECT, Actions } from './types';

export const observe = (targetId: string): Actions => ({
    type: OBSERVE,
    payload: {
        targetId
    }
});

export const disconnect = (): Actions => ({
    type: DISCONNECT
});
