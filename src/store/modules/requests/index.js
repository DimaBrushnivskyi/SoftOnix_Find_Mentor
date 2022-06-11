import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async contactMentor(context, payload) {
      const newRequest = {
        studentEmail: payload.email,
        message: payload.message,
      };

      const responce = await axios.post(
        `https://find-a-mentor-8432a-default-rtdb.firebaseio.com/requests/${payload.mentorId}.json`,
        {
          studentEmail: payload.email,
          message: payload.message,
        }
      );

      const data = await responce.data;

      newRequest.id = data.name;
      newRequest.mentorId = payload.mentorId;

      context.commit("addRequest", newRequest);
    },
    async getRequests(context) {
      const mentorId = context.rootGetters.userId;
      const token = context.rootGetters.token;

      const responce = await axios.get(
        `https://find-a-mentor-8432a-default-rtdb.firebaseio.com/requests/${mentorId}.json?auth=${token}`
      );
      const data = responce.data;
      console.log("responce data of requests", data);

      if (responce.status !== 200 || responce.statusText !== "OK") {
        throw new Error("Error status: ", responce.status);
      }

      const requestsForMentor = [];

      for (const key in data) {
        const request = {
          id: key,
          mentorId: mentorId,
          studentEmail: data[key].studentEmail,
          message: data[key].message,
        };

        requestsForMentor.push(request);
      }

      context.commit("setRequests", requestsForMentor);
    },
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const mentorId = rootGetters.userId;

      return state.requests.filter((request) => request.mentorId === mentorId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
