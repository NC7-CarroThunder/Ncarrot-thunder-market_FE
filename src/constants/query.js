const COOKIE = {
  COOKIE_NAME: 'myToken',
  REFRESH_NAME: 'myRefreshToken',
};

const AXIOS_PATH = {
  LOCAL: 'http://localhost:4000',
  SEVER: 'http://175.45.194.45',
  LOGIN: '/users/login',
  SIGNUP: '/signup',
};

const STALETIME = {
  FIVE_MIN: 5 * 60 * 1000,
};

const QUERY = {
  AXIOS_PATH,
  COOKIE,
  STALETIME,
};

export default QUERY;
