import store from '_settings/store';
import { GET_USER } from '_actions/user';
import { saveError } from '_actions/errors';
import { removeLocalStorage } from '_helpers';

export const AUDIO_PLAYER_ERROR = 'AUDIO_PLAYER_ERROR';
export const SVG_LOAD_ERROR = 'SVG_LOAD_ERROR';
/**
 * AppError
 * @param {String} property
 * @param {Object} error
 */
export function AppError(property, error) {
  this.name = 'AppError';

  this.property = property;
  this.message = `Ошибка: ${error.message}`;
  this.status = error.status;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, AppError);
  } else {
    this.stack = (new Error()).stack;
  }
}

/**
 * errorHandling
 * @param  {Object} error
 */
export function errorHandling(error) {
  const { message, status, property } = error;

  // TODO: Добавить случании 500 ошибок
  if (error instanceof AppError) {
    switch (property) {
      case AUDIO_PLAYER_ERROR:
        store.dispatch(saveError(500));
        break;
      case GET_USER:
        if (status === 404) {
          removeLocalStorage(['authToken']);
        }
        break;
      default:
        break;
    }
    throw new Error(message);

  } else if (error instanceof SyntaxError) {
    throw new Error(`Ошибка в синтаксисе данных: ${message}`);

  } else {
    throw error;
  }
}
