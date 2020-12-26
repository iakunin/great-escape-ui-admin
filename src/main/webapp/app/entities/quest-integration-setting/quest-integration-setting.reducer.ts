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

import { IQuestIntegrationSetting, defaultValue } from 'app/shared/model/quest-integration-setting.model';

export const ACTION_TYPES = {
  FETCH_QUESTINTEGRATIONSETTING_LIST: 'questIntegrationSetting/FETCH_QUESTINTEGRATIONSETTING_LIST',
  FETCH_QUESTINTEGRATIONSETTING: 'questIntegrationSetting/FETCH_QUESTINTEGRATIONSETTING',
  CREATE_QUESTINTEGRATIONSETTING: 'questIntegrationSetting/CREATE_QUESTINTEGRATIONSETTING',
  UPDATE_QUESTINTEGRATIONSETTING: 'questIntegrationSetting/UPDATE_QUESTINTEGRATIONSETTING',
  DELETE_QUESTINTEGRATIONSETTING: 'questIntegrationSetting/DELETE_QUESTINTEGRATIONSETTING',
  SET_BLOB: 'questIntegrationSetting/SET_BLOB',
  RESET: 'questIntegrationSetting/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuestIntegrationSetting>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type QuestIntegrationSettingState = Readonly<typeof initialState>;

// Reducer

export default (state: QuestIntegrationSettingState = initialState, action): QuestIntegrationSettingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUESTINTEGRATIONSETTING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUESTINTEGRATIONSETTING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_QUESTINTEGRATIONSETTING):
    case REQUEST(ACTION_TYPES.UPDATE_QUESTINTEGRATIONSETTING):
    case REQUEST(ACTION_TYPES.DELETE_QUESTINTEGRATIONSETTING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_QUESTINTEGRATIONSETTING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUESTINTEGRATIONSETTING):
    case FAILURE(ACTION_TYPES.CREATE_QUESTINTEGRATIONSETTING):
    case FAILURE(ACTION_TYPES.UPDATE_QUESTINTEGRATIONSETTING):
    case FAILURE(ACTION_TYPES.DELETE_QUESTINTEGRATIONSETTING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTINTEGRATIONSETTING_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_QUESTINTEGRATIONSETTING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUESTINTEGRATIONSETTING):
    case SUCCESS(ACTION_TYPES.UPDATE_QUESTINTEGRATIONSETTING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUESTINTEGRATIONSETTING):
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

const apiUrl = 'admin-api/quest-integration-settings';

// Actions

export const getEntities: ICrudGetAllAction<IQuestIntegrationSetting> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTINTEGRATIONSETTING_LIST,
    payload: axios.get<IQuestIntegrationSetting>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IQuestIntegrationSetting> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTINTEGRATIONSETTING,
    payload: axios.get<IQuestIntegrationSetting>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IQuestIntegrationSetting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUESTINTEGRATIONSETTING,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IQuestIntegrationSetting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUESTINTEGRATIONSETTING,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuestIntegrationSetting> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUESTINTEGRATIONSETTING,
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
