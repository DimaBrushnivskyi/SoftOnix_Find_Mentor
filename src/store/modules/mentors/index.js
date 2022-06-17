import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      mentors: [
        {
          id: "m1",
          firstName: "Dmytro",
          lastName: "Brushnivskyi",
          areas: ["frontend", "backend", "career"],
          description:
            "I'm Dima and I've worked as a web developer for years. Let me help you make first steps in Web Development!",
          hourlyRate: 20,
        },
        {
          id: "m2",
          firstName: "Sasha",
          lastName: "Smith",
          areas: ["frontend", "career"],
          description:
            "I am Oleksandra and as a Team Lead in a famous product company, I can help you to understand many aspects of your first job.",
          hourlyRate: 30,
        },
        {
          id: "m3",
          firstName: "Andriy",
          lastName: "Zebelev",
          areas: ["backend", "career"],
          description:
            "Hi, my name is Andriy and I've worked as a NodeJS Backend Developer for 3 years. With my expertise you will dive deep in the world of behind the scenes of Web Development!",
          hourlyRate: 40,
        },
        {
          id: "m4",
          firstName: "Elon",
          lastName: "Mask",
          areas: ["career"],
          description:
            "Hello humans, my name is The ELON MASK and my name speaks for itself. If you want to become a great entrepreneur as me, hire me. As a bonus I`ll get to know how to use Tesla without charging",
          hourlyRate: 400,
        },
      ],
    };
  },
  mutations: {
    registerMentor(state, payload) {
      state.mentors.push(payload);
    },
    setMentors(state, payload) {
      state.mentors = payload;
    },
  },
  actions: {
    async registerMentor(context, data) {
      const userId = context.rootGetters.userId;

      const mentorData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
      };

      const token = context.rootGetters.token;
      const responce = await axios.put(
        `https://find-a-mentor-8432a-default-rtdb.firebaseio.com/mentors/${userId}.json?auth=${token}`,
        {
          firstName: mentorData.firstName,
          lastName: mentorData.lastName,
          description: mentorData.description,
          hourlyRate: mentorData.hourlyRate,
          areas: mentorData.areas,
        }
      );

      if (responce.status !== 200) {
        throw new Error(
          "Unexpected error occured, with status: ",
          responce.status,
          responce.statusText
        );
      }

      context.commit("registerMentor", {
        ...mentorData,
        id: userId,
      });
    },
    async loadMentors(context) {
      const responce = await axios.get(
        `https://find-a-mentor-8432a-default-rtdb.firebaseio.com/mentors.json`
      );

      const result = await responce.data;

      const mentorsFromServer = [];

      for (const key in result) {
        const mentor = {
          id: key,
          firstName: result[key].firstName,
          lastName: result[key].lastName,
          description: result[key].description,
          hourlyRate: result[key].hourlyRate,
          areas: result[key].areas,
        };

        mentorsFromServer.push(mentor);
      }

      context.commit("setMentors", mentorsFromServer);
    },
  },
  getters: {
    mentors(state) {
      return state.mentors;
    },
    areMentors(state) {
      return state.mentors && state.mentors.length > 0;
    },
    isMentor(_, getters, _2, rootGetters) {
      const mentors = getters.mentors;
      const userId = rootGetters.userId;

      return mentors.some((mentor) => mentor.id === userId);
    },
  },
};
