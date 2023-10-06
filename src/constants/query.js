const COOKIE = {
  COOKIE_NAME: 'myToken',
  REFRESH_NAME: 'myRefreshToken',
};

const AXIOS_PATH = {
  LOCAL: 'http://localhost:8888',
  SEVER: 'http://localhost:8888',
  LOGIN: '/api/users/login',
  SIGNUP: '/api/users/signup',
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
