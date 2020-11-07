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

import { IQuest, defaultValue } from 'app/shared/model/quest.model';

export const ACTION_TYPES = {
  FETCH_QUEST_LIST: 'quest/FETCH_QUEST_LIST',
  FETCH_QUEST: 'quest/FETCH_QUEST',
  CREATE_QUEST: 'quest/CREATE_QUEST',
  UPDATE_QUEST: 'quest/UPDATE_QUEST',
  DELETE_QUEST: 'quest/DELETE_QUEST',
  SET_BLOB: 'quest/SET_BLOB',
  RESET: 'quest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuest>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type QuestState = Readonly<typeof initialState>;

// Reducer

export default (state: QuestState = initialState, action): QuestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_QUEST):
    case REQUEST(ACTION_TYPES.UPDATE_QUEST):
    case REQUEST(ACTION_TYPES.DELETE_QUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_QUEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUEST):
    case FAILURE(ACTION_TYPES.CREATE_QUEST):
    case FAILURE(ACTION_TYPES.UPDATE_QUEST):
    case FAILURE(ACTION_TYPES.DELETE_QUEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUEST_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_QUEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUEST):
    case SUCCESS(ACTION_TYPES.UPDATE_QUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUEST):
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

const apiUrl = 'api/quests';

// Actions

export const getEntities: ICrudGetAllAction<IQuest> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_QUEST_LIST,
    payload: axios.get<IQuest>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IQuest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUEST,
    payload: axios.get<IQuest>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IQuest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IQuest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUEST,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuest> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUEST,
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
