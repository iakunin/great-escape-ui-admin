import axios from 'axios';

import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { parseHeaderForLinks } from 'react-jhipster';

import reducer, {
  ACTION_TYPES,
  createEntity,
  deleteEntity,
  getEntities,
  getEntity,
  updateEntity,
  reset,
} from 'app/entities/booking/booking.reducer';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IBooking, defaultValue } from 'app/shared/model/booking.model';

describe('Entities reducer tests', () => {
  function isEmpty(element): boolean {
    if (element instanceof Array) {
      return element.length === 0;
    } else {
      return Object.keys(element).length === 0;
    }
  }

  const initialState = {
    loading: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<IBooking>,
    entity: defaultValue,
    links: {
      next: 0,
    },
    totalItems: 0,
    updating: false,
    updateSuccess: false,
  };

  function testInitialState(state) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
      updating: false,
      updateSuccess: false,
    });
    expect(isEmpty(state.entities));
    expect(isEmpty(state.entity));
  }

  function testMultipleTypes(types, payload, testFunction) {
    types.forEach(e => {
      testFunction(reducer(undefined, { type: e, payload }));
    });
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(reducer(undefined, {}));
    });
  });

  describe('Requests', () => {
    it('should set state to loading', () => {
      testMultipleTypes([REQUEST(ACTION_TYPES.FETCH_BOOKING_LIST), REQUEST(ACTION_TYPES.FETCH_BOOKING)], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          updateSuccess: false,
          loading: true,
        });
      });
    });

    it('should set state to updating', () => {
      testMultipleTypes(
        [REQUEST(ACTION_TYPES.CREATE_BOOKING), REQUEST(ACTION_TYPES.UPDATE_BOOKING), REQUEST(ACTION_TYPES.DELETE_BOOKING)],
        {},
        state => {
          expect(state).toMatchObject({
            errorMessage: null,
            updateSuccess: false,
            updating: true,
          });
        }
      );
    });

    it('should reset the state', () => {
      expect(
        reducer(
          { ...initialState, loading: true },
          {
            type: ACTION_TYPES.RESET,
          }
        )
      ).toEqual({
        ...initialState,
      });
    });
  });

  describe('Failures', () => {
    it('should set a message in errorMessage', () => {
      testMultipleTypes(
        [
          FAILURE(ACTION_TYPES.FETCH_BOOKING_LIST),
          FAILURE(ACTION_TYPES.FETCH_BOOKING),
          FAILURE(ACTION_TYPES.CREATE_BOOKING),
          FAILURE(ACTION_TYPES.UPDATE_BOOKING),
          FAILURE(ACTION_TYPES.DELETE_BOOKING),
        ],
        'error message',
        state => {
          expect(state).toMatchObject({
            errorMessage: 'error message',
            updateSuccess: false,
            updating: false,
          });
        }
      );
    });
  });

  describe('Successes', () => {
    it('should fetch all entities', () => {
      const payload = { data: [{ 1: 'fake1' }, { 2: 'fake2' }], headers: { 'x-total-count': 123, link: ';' } };
      const links = parseHeaderForLinks(payload.headers.link);
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.FETCH_BOOKING_LIST),
          payload,
        })
      ).toEqual({
        ...initialState,
        links,
        loading: false,
        totalItems: payload.headers['x-total-count'],
        entities: payload.data,
      });
    });

    it('should fetch a single entity', () => {
      const payload = { data: { 1: 'fake1' } };
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.FETCH_BOOKING),
          payload,
        })
      ).toEqual({
        ...initialState,
        loading: false,
        entity: payload.data,
      });
    });

    it('should create/update entity', () => {
      const payload = { data: 'fake payload' };
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.CREATE_BOOKING),
          payload,
        })
      ).toEqual({
        ...initialState,
        updating: false,
        updateSuccess: true,
        entity: payload.data,
      });
    });

    it('should delete entity', () => {
      const payload = 'fake payload';
      const toTest = reducer(undefined, {
        type: SUCCESS(ACTION_TYPES.DELETE_BOOKING),
        payload,
      });
      expect(toTest).toMatchObject({
        updating: false,
        updateSuccess: true,
      });
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.put = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.delete = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches ACTION_TYPES.FETCH_BOOKING_LIST actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_BOOKING_LIST),
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_BOOKING_LIST),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(getEntities()).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.FETCH_BOOKING actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_BOOKING),
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_BOOKING),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(getEntity(42666)).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.CREATE_BOOKING actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.CREATE_BOOKING),
        },
        {
          type: SUCCESS(ACTION_TYPES.CREATE_BOOKING),
          payload: resolvedObject,
        },
      ];
      await store
        .dispatch(createEntity({ id: '5c47b5a2-ef7e-4562-840f-062c695dbf19' }))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.UPDATE_BOOKING actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.UPDATE_BOOKING),
        },
        {
          type: SUCCESS(ACTION_TYPES.UPDATE_BOOKING),
          payload: resolvedObject,
        },
      ];
      await store
        .dispatch(updateEntity({ id: '2dd22678-d976-4b11-9914-e11f71ba0570' }))
        .then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.DELETE_BOOKING actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.DELETE_BOOKING),
        },
        {
          type: SUCCESS(ACTION_TYPES.DELETE_BOOKING),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(deleteEntity(42666)).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.RESET actions', async () => {
      const expectedActions = [
        {
          type: ACTION_TYPES.RESET,
        },
      ];
      await store.dispatch(reset());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
