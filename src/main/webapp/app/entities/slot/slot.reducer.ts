import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISlot, defaultValue } from 'app/shared/model/slot.model';

export const ACTION_TYPES = {
  FETCH_SLOT_LIST: 'slot/FETCH_SLOT_LIST',
  FETCH_SLOT: 'slot/FETCH_SLOT',
  CREATE_SLOT: 'slot/CREATE_SLOT',
  UPDATE_SLOT: 'slot/UPDATE_SLOT',
  DELETE_SLOT: 'slot/DELETE_SLOT',
  SET_BLOB: 'slot/SET_BLOB',
  RESET: 'slot/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISlot>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type SlotState = Readonly<typeof initialState>;

// Reducer

export default (state: SlotState = initialState, action): SlotState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SLOT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SLOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SLOT):
    case REQUEST(ACTION_TYPES.UPDATE_SLOT):
    case REQUEST(ACTION_TYPES.DELETE_SLOT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SLOT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SLOT):
    case FAILURE(ACTION_TYPES.CREATE_SLOT):
    case FAILURE(ACTION_TYPES.UPDATE_SLOT):
    case FAILURE(ACTION_TYPES.DELETE_SLOT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SLOT_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_SLOT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SLOT):
    case SUCCESS(ACTION_TYPES.UPDATE_SLOT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SLOT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/slots';

// Actions

export const getEntities: ICrudGetAllAction<ISlot> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SLOT_LIST,
    payload: axios.get<ISlot>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ISlot> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SLOT,
    payload: axios.get<ISlot>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISlot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SLOT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<ISlot> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SLOT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISlot> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SLOT,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
