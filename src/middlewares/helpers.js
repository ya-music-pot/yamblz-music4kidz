import { UPDATE_USER } from '_actions/user';
import history from '_settings/history';

export default () => (next) => (action) => {
  const { type } = action;

  // Переход на какую либо страницу, после обновления user.
  // Нужно для первоначальных настроек.
  if (type === `${UPDATE_USER}_SUCCESS` && action.moveNext) {
    history.push(action.moveNext);
  }

  next(action);
};
