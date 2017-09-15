import { CREATE_USER } from '_actions/user';
import { saveLocalStorage } from '_helpers';

export default () => (next) => (action) => {
  const { type, response } = action;

  // Переход на какую либо страницу, после обновления user.
  // Нужно для первоначальных настроек.
  if (type === `${CREATE_USER}_SUCCESS` && action.moveNext) {
    saveLocalStorage({ authToken: response.data.id });
  }

  next(action);
};
