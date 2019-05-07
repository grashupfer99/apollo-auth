import cookie from "js-cookie";

module.exports = {
  removeCookie: key => {
    if (process.browser) {
      cookie.remove(key, {
        expires: 1
      });
    }
  }
};
