const Storage = {
  setNickName(nickname) {
    removeLocalStorage('nickname');
    setlocalStorage('nickname', nickname);
  },

  removeNickName() {
    removeLocalStorage('nickname');
  },

  getNickName() {
    return window.localStorage.getItem('nickname');
  },
};

function setlocalStorage(key, value) {
  return window.localStorage.setItem(key, value);
}

function removeLocalStorage(key) {
  return window.localStorage.removeItem(key);
}

export default Storage;
