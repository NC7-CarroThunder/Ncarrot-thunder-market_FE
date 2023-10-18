const COOKIE = {
  COOKIE_NAME: 'myToken',
  REFRESH_NAME: 'myRefreshToken',
};

const AXIOS_PATH = {
  LOCAL: 'http://localhost:8888',
  SEVER: 'http://localhost:8888',
  KAKAOSERVER: 'https://kauth.kakao.com',
  LOGIN: '/api/users/login',
  SIGNUP: '/api/users/signup',
  TOKEN: '/oauth/token',
  KAKAO: '/api/users/kakao/callback',
  ADDPOST: '/api/posts',
  POSTLIST: '/api/posts/list',
  POSTDETAIL: '/api/posts/:postId',
  MYPAGE: '/api/mypage/',
  TOGGLE_WISHLIST: '/api/wishlist/toggle',
  CHECK_WISHLIST: '/api/wishlist/check',
  POSTDELETE: '/api/posts/:postId',
  WISHLIST: '/api/wishlist',
  MYPOSTS: '/api/mypost',
  PURCHASE: '/api/payments/purchase',
  CANCEL: '/api/payments/cancel',
  CONFIRMEDPURCHASE: '/api/payments/ConfirmedPurchase'
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
