<template>
  <section>
    <base-card>
      <header class="text-center">
        <h2 class="font-bold">Requests recieved</h2>
      </header>
      <ul v-if="hasRequests" class="list-none my-8 mx-auto p-0 max-w-lg">
        <request-item
          v-for="request in recievedRequests"
          :key="request.id"
          :email="request.studentEmail"
          :message="request.message"
        ></request-item>
      </ul>
      <h2 v-else class="text-center font-bold">
        You do not have any requests yet. Go back to the
        <router-link to="mentors/" class="underline">main page</router-link>
      </h2>
    </base-card>
  </section>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";

export default {
  components: {
    RequestItem,
  },
  computed: {
    recievedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    mentorsListLink() {
      return this.$router.push("mentors/");
    },
    loadRequests() {
      this.$store.dispatch("requests/getRequests");
    },
  },
};
</script>
