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

import { IQuestPhoto, defaultValue } from 'app/shared/model/quest-photo.model';

export const ACTION_TYPES = {
  FETCH_QUESTPHOTO_LIST: 'questPhoto/FETCH_QUESTPHOTO_LIST',
  FETCH_QUESTPHOTO: 'questPhoto/FETCH_QUESTPHOTO',
  CREATE_QUESTPHOTO: 'questPhoto/CREATE_QUESTPHOTO',
  UPDATE_QUESTPHOTO: 'questPhoto/UPDATE_QUESTPHOTO',
  DELETE_QUESTPHOTO: 'questPhoto/DELETE_QUESTPHOTO',
  RESET: 'questPhoto/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuestPhoto>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type QuestPhotoState = Readonly<typeof initialState>;

// Reducer

export default (state: QuestPhotoState = initialState, action): QuestPhotoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUESTPHOTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUESTPHOTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_QUESTPHOTO):
    case REQUEST(ACTION_TYPES.UPDATE_QUESTPHOTO):
    case REQUEST(ACTION_TYPES.DELETE_QUESTPHOTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_QUESTPHOTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUESTPHOTO):
    case FAILURE(ACTION_TYPES.CREATE_QUESTPHOTO):
    case FAILURE(ACTION_TYPES.UPDATE_QUESTPHOTO):
    case FAILURE(ACTION_TYPES.DELETE_QUESTPHOTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTPHOTO_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_QUESTPHOTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUESTPHOTO):
    case SUCCESS(ACTION_TYPES.UPDATE_QUESTPHOTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUESTPHOTO):
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

const apiUrl = 'admin-api/quest-photos';

// Actions

export const getEntities: ICrudGetAllAction<IQuestPhoto> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTPHOTO_LIST,
    payload: axios.get<IQuestPhoto>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IQuestPhoto> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTPHOTO,
    payload: axios.get<IQuestPhoto>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IQuestPhoto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUESTPHOTO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IQuestPhoto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUESTPHOTO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuestPhoto> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUESTPHOTO,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
