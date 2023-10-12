const Storage = {
  setNickName(name) {
    removeLocalStorage('nickname');
    setlocalStorage('nickname', name);
  },

  removeNickName() {
    removeLocalStorage('nickname');
  },

  getNickName() {
    return window.localStorage.getItem('nickname');
  },
  setUserId(userId) {
    removeLocalStorage('userId');
    setlocalStorage('userId', userId);
  },

  removeUserId() {
    removeLocalStorage('userId');
  },

  getUserId() {
    return window.localStorage.getItem('userId');
  },
};

function setlocalStorage(key, value) {
  return window.localStorage.setItem(key, value);
}

function removeLocalStorage(key) {
  return window.localStorage.removeItem(key);
}

export default Storage;
