import { UPDATE_USER } from '_actions/user';
import history from '_settings/history';

export default () => (next) => (action) => {
  const { type } = action;

  if (type === `${UPDATE_USER}_SUCCESS`) {
    history.push('/playlist');
  }

  next(action);
};
