import axios from 'axios';
import QUERY from '../../constants/query';
import { getCookie, setCookie } from '../cookie';
import jwt_decode from 'jwt-decode';
import Storage from '../localStorage';

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      withCredentials: true, // CORS
    });
    console.log("기본URL : " + url);

    this.instance.interceptors.response.use(
      response => {
        const token = response.headers.authorization;
        console.log("api"  + token);
        if (token) {
          const [, parseToken] = token.split(' ');
          setCookie(QUERY.COOKIE.COOKIE_NAME, parseToken);

          const nickname = jwt_decode(parseToken);
          Storage.setNickName(nickname.nickname);
          Storage.setUserId(nickname.userId);
        }
        return response;
      },
      error => {
        alert(error.response.data.result);
        return Promise.reject(error);
      }
    );
  }

  async get(path) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.get(path, option);
  }

  async post(path, payload) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.post(path, payload, option);
  }

  async delete(path) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.delete(`${path}`, option);
  }

  async put(path, payload) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.put(`${path}`, payload, option);
  }
}
