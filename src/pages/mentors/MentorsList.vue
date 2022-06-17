<template>
  <section>
    <mentor-filter @update-filter="setFilter"></mentor-filter>
  </section>
  <section>
    <base-card>
      <div class="flex flex-row justify-between">
        <div @click="loadMentors">
          <base-button mode="outline">Refresh</base-button>
        </div>
        <div
          class="underline decoration-white text-white flex justify-center items-center"
        >
          <base-button v-if="!isMentor && isLoggedIn" link to="/register">
            Become a Mentor
          </base-button>
        </div>
      </div>
      <ul v-if="areMentors" class="list-none m-0 p-0">
        List of Mentors:
        <mentor-item
          v-for="mentor in visibleMentors"
          :key="mentor.id"
          :id="mentor.id"
          :areas="mentor.areas"
          :first-name="mentor.firstName"
          :last-name="mentor.lastName"
          :rate="mentor.hourlyRate"
          :isLoggedIn="isLoggedIn"
          :mentor="mentor"
        ></mentor-item>
      </ul>
      <p v-else>
        Currently we can`t find sane people, you may go to
        <a
          href="https://stackoverflow.com/"
          title="Seek for help here"
          class="underline"
        >
          <strong>Stackoverflow</strong>
        </a>
        resourse
      </p>
    </base-card>
  </section>
</template>

<script>
import MentorItem from "../../components/mentors/MentorItem.vue";
import MentorFilter from "../../components/mentors/MentorFilter.vue";

export default {
  components: {
    MentorItem,
    MentorFilter,
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isMentor() {
      return this.$store.getters["mentors/isMentor"];
    },
    visibleMentors() {
      const mentors = this.$store.getters["mentors/mentors"];

      const filteredMentorsList = mentors.filter((mentor) => {
        if (this.activeFilters.frontend && mentor.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && mentor.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && mentor.areas.includes("career")) {
          return true;
        }

        return false;
      });

      return filteredMentorsList;
    },
    areMentors() {
      return this.$store.getters["mentors/areMentors"];
    },
  },
  created() {
    this.loadMentors();
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    loadMentors() {
      this.$store.dispatch("mentors/loadMentors");
    },
  },
};
</script>
