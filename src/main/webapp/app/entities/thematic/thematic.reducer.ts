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

import { IThematic, defaultValue } from 'app/shared/model/thematic.model';

export const ACTION_TYPES = {
  FETCH_THEMATIC_LIST: 'thematic/FETCH_THEMATIC_LIST',
  FETCH_THEMATIC: 'thematic/FETCH_THEMATIC',
  CREATE_THEMATIC: 'thematic/CREATE_THEMATIC',
  UPDATE_THEMATIC: 'thematic/UPDATE_THEMATIC',
  DELETE_THEMATIC: 'thematic/DELETE_THEMATIC',
  RESET: 'thematic/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IThematic>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ThematicState = Readonly<typeof initialState>;

// Reducer

export default (state: ThematicState = initialState, action): ThematicState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_THEMATIC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THEMATIC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_THEMATIC):
    case REQUEST(ACTION_TYPES.UPDATE_THEMATIC):
    case REQUEST(ACTION_TYPES.DELETE_THEMATIC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_THEMATIC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THEMATIC):
    case FAILURE(ACTION_TYPES.CREATE_THEMATIC):
    case FAILURE(ACTION_TYPES.UPDATE_THEMATIC):
    case FAILURE(ACTION_TYPES.DELETE_THEMATIC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_THEMATIC_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_THEMATIC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_THEMATIC):
    case SUCCESS(ACTION_TYPES.UPDATE_THEMATIC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_THEMATIC):
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

const apiUrl = 'admin-api/thematics';

// Actions

export const getEntities: ICrudGetAllAction<IThematic> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_THEMATIC_LIST,
    payload: axios.get<IThematic>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IThematic> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THEMATIC,
    payload: axios.get<IThematic>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IThematic> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THEMATIC,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IThematic> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THEMATIC,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IThematic> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_THEMATIC,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
