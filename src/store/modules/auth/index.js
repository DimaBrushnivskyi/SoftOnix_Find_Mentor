import axios from "axios";

let timer;

export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
  },
  actions: {
    async login(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },
    async signup(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },
    async auth(context, payload) {
      const mode = payload.mode;
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3KS-ryeyZNjxr-uWi8HXfznwrHpjRdDg";

      if (mode === "signup") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3KS-ryeyZNjxr-uWi8HXfznwrHpjRdDg";
      }

      const responce = await axios.post(url, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      });

      const data = await responce.data;

      if (responce.status !== 200) {
        throw new Error("Error status: ", responce.status);
      }

      const timeLimit = +data.expiresIn * 1000;
      const sessionLimit = new Date().getTime() + timeLimit;

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      localStorage.setItem("sessionLimit", sessionLimit);

      timer = setTimeout(() => {
        context.dispatch("logout");
      }, timeLimit);

      context.commit("setUser", {
        token: data.idToken,
        userId: data.localId,
      });
    },
    autoLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("sessionLimit");
      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(() => {
        context.dispatch("logout");
      }, expiresIn);

      if (token && userId) {
        context.commit("setUser", {
          token,
          userId,
        });
      }
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      clearTimeout(timer);

      context.commit("setUser", {
        token: null,
        userId: null,
      });
    },
  },
};
