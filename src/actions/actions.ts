import { OBSERVE, DISCONNECT, MUTATION_RECORD, Actions } from './types';

export const observe = (targetId: string): Actions => ({
    type: OBSERVE,
    payload: {
        targetId
    }
});

export const disconnect = (): Actions => ({
    type: DISCONNECT
});

export const mutationRecord = (mutation: MutationRecord): Actions => ({
    type: MUTATION_RECORD,
    payload: {
        mutation
    }
});
