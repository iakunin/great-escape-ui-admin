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

import { IMetro, defaultValue } from 'app/shared/model/metro.model';

export const ACTION_TYPES = {
  FETCH_METRO_LIST: 'metro/FETCH_METRO_LIST',
  FETCH_METRO: 'metro/FETCH_METRO',
  CREATE_METRO: 'metro/CREATE_METRO',
  UPDATE_METRO: 'metro/UPDATE_METRO',
  DELETE_METRO: 'metro/DELETE_METRO',
  RESET: 'metro/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMetro>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type MetroState = Readonly<typeof initialState>;

// Reducer

export default (state: MetroState = initialState, action): MetroState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_METRO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_METRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_METRO):
    case REQUEST(ACTION_TYPES.UPDATE_METRO):
    case REQUEST(ACTION_TYPES.DELETE_METRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_METRO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_METRO):
    case FAILURE(ACTION_TYPES.CREATE_METRO):
    case FAILURE(ACTION_TYPES.UPDATE_METRO):
    case FAILURE(ACTION_TYPES.DELETE_METRO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_METRO_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_METRO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_METRO):
    case SUCCESS(ACTION_TYPES.UPDATE_METRO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_METRO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/metros';

// Actions

export const getEntities: ICrudGetAllAction<IMetro> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_METRO_LIST,
    payload: axios.get<IMetro>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IMetro> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_METRO,
    payload: axios.get<IMetro>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMetro> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_METRO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMetro> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_METRO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMetro> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_METRO,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
