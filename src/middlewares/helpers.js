import { CREATE_USER } from '_actions/user';
import { saveLocalStorage } from '_helpers';

export default () => (next) => (action) => {
  const { type, response } = action;

  if (type === `${CREATE_USER}_SUCCESS`) {
    saveLocalStorage({ authToken: response.data.id });
  }

  next(action);
};
