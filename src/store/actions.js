import Axios from 'axios';

export default {
  signIn({ commit }, user) {
    Axios
      .post("https://volley-api2.herokuapp.com/auth/signin", user)
      .then(res => {
        if (res.status === 200 && res.headers.authorization) {
          localStorage.setItem("token", res.headers.authorization);

          commit("SIGN_IN", {
            valid: true,
            token: res.headers.authorization
          });

          window.location.reload();
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          commit("SIGN_IN", {
            valid: false,
            message: error.response.data.message
          });
        }
      });
  },
  signUp({ commit }, user) {
    Axios
      .post("https://volley-api2.herokuapp.com/auth/signup", user)
      .then(res => {
        if (res.status === 200) {
          commit("SIGN_UP", {
            valid: true,
            message:
              "Conta criada com sucesso, <a href='/login' style='color: color'>clique aqui para entrar</a>"
          });
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          commit("SIGN_UP", {
            valid: false,
            message: error.response.data.message
          });
        }
      });
  },
  fetchUser({ getters, commit }, user) {
    Axios
      .get("https://volley-api2.herokuapp.com/user/fetch", {
        headers: {
          Authorization: getters.isAuthenticated
        }
      })
      .then(res => {
        if (res.status === 200) {
          commit("FETCH_USER", res.data);
        }
      });
  },
  existsUser({ commit }, user) {
    Axios
      .get("https://volley-api2.herokuapp.com/user/exists", {
        headers: {
          Authorization: JSON.stringify({ tag: user.discordTag, haxballUser: user.haxballUser })
        }
      })
      .then(res => {
        if (res.status === 200 && res.data.exists) {
          commit("SET_RECOVERED_USER", { exists: true, user: res.data.user, haxballUser: user.haxballUser });

          Axios.post('https://volley-api2.herokuapp.com/recovery/create_code', {
            haxballUser: user.haxballUser,
            discordTag: user.discordTag
          })
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          commit("SET_RECOVERED_USER", { exists: false });
        }
      });
  },
  verifyCode({ commit }, user) {
    Axios.post("https://volley-api2.herokuapp.com/recovery/verify_code", user)
    .then((res) => {
      if(res.status === 200) {
        commit("VERIFY_CODE", { valid: true, code: user.code } );
      }
    })
    .catch((res) => {
      if(res.response.status === 401) {
        commit("VERIFY_CODE", { valid: false });
      }
    })
  },
  changePassword({ commit, state }, user) {
    Axios.post("https://volley-api2.herokuapp.com/recovery/change_pass", {
      code: state.recoveryCode,
      password: user.password,
      haxballUser: state.haxballUser
    }).then((res) => {
      if(res.status === 200) {
        commit("CHANGE_PASSWORD", { valid: true });
      }
    }).catch((error) => {
      if(error.response.status === 401) {
        commit("CHANGE_PASSWORD", { valid: false, message: error.response.data.message })
      }
    })
  }
};
