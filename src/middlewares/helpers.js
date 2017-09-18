import { CREATE_USER, GET_USER_BY_LOGIN, createUser } from '_actions/user';
import { saveLocalStorage } from '_helpers';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { type, response } = action;

  if (type === `${GET_USER_BY_LOGIN}_FAIL`) {
    const store = getState();
    const { user, settings } = store;
    const { firstName, lastName, login } = user.data;
    const { moodId, actionId, tracks } = settings;

    const userInfo = {
      firstName,
      lastName,
      login,
      moodId,
      actionId,
      tracks,
    };

    const createUserAction = createUser(userInfo);
    return dispatch(createUserAction);
  }

  if (type === `${CREATE_USER}_SUCCESS`) {
    saveLocalStorage({ authToken: response.data.id });
  }

  next(action);
};
