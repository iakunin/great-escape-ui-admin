import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  FETCH_LOGS: 'administration/FETCH_LOGS',
  FETCH_LOGS_CHANGE_LEVEL: 'administration/FETCH_LOGS_CHANGE_LEVEL',
  FETCH_HEALTH: 'administration/FETCH_HEALTH',
  FETCH_CONFIGURATIONS: 'administration/FETCH_CONFIGURATIONS',
  FETCH_ENV: 'administration/FETCH_ENV',
  FETCH_AUDITS: 'administration/FETCH_AUDITS',
};

const initialState = {
  loading: false,
  errorMessage: null,
  logs: {
    loggers: [] as any[],
  },
  health: {} as any,
  configuration: {
    configProps: {} as any,
    env: {} as any,
  },
  audits: [] as any[],
  totalItems: 0,
};

export type AdministrationState = Readonly<typeof initialState>;

// Reducer

export default (state: AdministrationState = initialState, action): AdministrationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOGS):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGURATIONS):
    case REQUEST(ACTION_TYPES.FETCH_ENV):
    case REQUEST(ACTION_TYPES.FETCH_AUDITS):
    case REQUEST(ACTION_TYPES.FETCH_HEALTH):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LOGS):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGURATIONS):
    case FAILURE(ACTION_TYPES.FETCH_ENV):
    case FAILURE(ACTION_TYPES.FETCH_AUDITS):
    case FAILURE(ACTION_TYPES.FETCH_HEALTH):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGS):
      return {
        ...state,
        loading: false,
        logs: {
          loggers: action.payload.data.loggers,
        },
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGURATIONS):
      return {
        ...state,
        loading: false,
        configuration: {
          ...state.configuration,
          configProps: action.payload.data,
        },
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENV):
      return {
        ...state,
        loading: false,
        configuration: {
          ...state.configuration,
          env: action.payload.data,
        },
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUDITS):
      return {
        ...state,
        loading: false,
        audits: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_HEALTH):
      return {
        ...state,
        loading: false,
        health: action.payload.data,
      };
    default:
      return state;
  }
};

// Actions

export const systemHealth = () => ({
  type: ACTION_TYPES.FETCH_HEALTH,
  payload: axios.get('management/health'),
});

export const getLoggers = () => ({
  type: ACTION_TYPES.FETCH_LOGS,
  payload: axios.get('management/loggers'),
});

export const changeLogLevel: (name, configuredLevel) => void = (name, configuredLevel) => {
  const body = { configuredLevel };
  return async dispatch => {
    await dispatch({
      type: ACTION_TYPES.FETCH_LOGS_CHANGE_LEVEL,
      payload: axios.post('management/loggers/' + name, body),
    });
    dispatch(getLoggers());
  };
};

export const getConfigurations = () => ({
  type: ACTION_TYPES.FETCH_CONFIGURATIONS,
  payload: axios.get('management/configprops'),
});

export const getEnv = () => ({
  type: ACTION_TYPES.FETCH_ENV,
  payload: axios.get('management/env'),
});

export const getAudits = (page, size, sort, fromDate, toDate) => {
  let requestUrl = `management/audits${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  if (fromDate) {
    requestUrl += `&fromDate=${fromDate}`;
  }
  if (toDate) {
    requestUrl += `&toDate=${toDate}`;
  }
  return {
    type: ACTION_TYPES.FETCH_AUDITS,
    payload: axios.get(requestUrl),
  };
};
