export default {
  SIGN_IN(state, payload) {
    if (payload.valid) {
      state.token = payload.token;
    } else {
      state.messageLogin = payload.message;
    }
  },
  SIGN_UP(state, payload) {
    state.messageRegister = payload.message;
  },
  FETCH_USER(state, payload) {
    state.user = payload;
  },
  SET_RECOVERED_USER(state, payload) {
    if (payload.user && payload.exists) {
      state.recoveredUser = payload;
      state.recoveryPhase = 2;
      state.haxballUser = payload.haxballUser
    }

    state.existsUser = payload.exists;
  },
  VERIFY_CODE(state, payload) {
    if(payload.valid) {
      state.recoveryPhase = 3
      state.recoveryCode = payload.code
    } else {
      state.messageRecovery2 = "Código incorreto"
    }
  },
  CHANGE_PASSWORD(state, payload) {
    if(payload.valid) {
      state.messageRecovery3 = "Sucesso, sua senha foi alterada.";
    } else {
      state.messageRecovery3 = payload.message;
    }
  }
};
