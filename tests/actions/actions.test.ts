import { JSDOM } from 'jsdom';
import * as actions from '../../src/actions/actions';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
        }
    }
}

global.document = new JSDOM().window.document;

describe('actions', () => {
    it('should create observe action', () => {
        const action = {
            type: 'REDUX_DOM_MUTATION_OBSERVER:OBSERVE',
            payload: {
                targetId: 'targetId'
            }
        };

        expect(action).toEqual(actions.observe('targetId'));
    });

    it('should create disconnect action', () => {
        const action = {
            type: 'REDUX_DOM_MUTATION_OBSERVER:DISCONNECT'
        };

        expect(action).toEqual(actions.disconnect());
    });

    it('should create mutation record action', () => {
        const div = global.document.createElement('div');
        const mutation: MutationRecord = {
            type: 'childList',
            target: div,
            addedNodes: div.childNodes,
            removedNodes: div.childNodes,
            attributeName: null,
            attributeNamespace: null,
            nextSibling: null,
            previousSibling: null,
            oldValue: null
        };

        const action = {
            type: 'REDUX_DOM_MUTATION_OBSERVER:MUTATION_RECORD',
            payload: {
                mutation
            }
        };

        expect(action).toEqual(actions.mutationRecord(mutation));
    });
});
