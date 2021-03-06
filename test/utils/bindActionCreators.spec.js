import expect from 'expect';
import { bindActionCreators, createStore } from '../../src';
import { todos } from '../helpers/reducers';
import * as actionCreators from '../helpers/actionCreators';

describe('bindActionCreators', () => {
  let store;

  beforeEach(() => {
    store = createStore(todos);
  });

  it('should wrap the action creators with the dispatch function', () => {
    const boundActionCreators = bindActionCreators(actionCreators, store.dispatch);
    expect(
      Object.keys(boundActionCreators)
    ).toEqual(
      Object.keys(actionCreators)
    );

    const action = boundActionCreators.addTodo('Hello');
    expect(action).toEqual(
      actionCreators.addTodo('Hello')
    );
    expect(store.getState()).toEqual([
      { id: 1, text: 'Hello' }
    ]);
  });

  it('should support wrapping a single function only', () => {
    const actionCreator = actionCreators.addTodo;
    const boundActionCreator = bindActionCreators(actionCreator, store.dispatch);

    const action = boundActionCreator('Hello');
    expect(action).toEqual(actionCreator('Hello'));
    expect(store.getState()).toEqual([
      { id: 1, text: 'Hello' }
    ]);
  });

  it('should throw an invariant violation for an undefined actionCreator', () => {
    expect(() => {
      bindActionCreators(undefined, store.dispatch);
    }).toThrow(
      'bindActionCreators expected an object or a function, instead received undefined. ' +
      'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
    );
  });

  it('should throw an invariant violation for a null actionCreator', () => {
    expect(() => {
      bindActionCreators(null, store.dispatch);
    }).toThrow(
      'bindActionCreators expected an object or a function, instead received null. ' +
      'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
    );
  });

  it('should throw an invariant violation for a primitive actionCreator', () => {
    expect(() => {
      bindActionCreators('string', store.dispatch);
    }).toThrow(
      'bindActionCreators expected an object or a function, instead received string. ' +
      'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
    );
  });
});
