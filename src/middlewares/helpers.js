import { CREATE_USER, UPDATE_USER } from '_actions/user';
import history from '_settings/history';
import { saveLocalStorage } from '_helpers';

export default () => (next) => (action) => {
  const { type, response } = action;

  // Переход на какую либо страницу, после обновления user.
  // Нужно для первоначальных настроек.
  if ((type === `${CREATE_USER}_SUCCESS` ||
       type === `${UPDATE_USER}_SUCCESS`) && action.moveNext) {
    saveLocalStorage({ authToken: response.data.id });
    history.push(action.moveNext);
  }

  next(action);
};
