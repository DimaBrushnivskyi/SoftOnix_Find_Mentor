<template>
  <header
    class="w-full h-20 bg-sky-800 flex flex-row justify-center items-center"
  >
    <nav class="flex flex-row justify-between items-center w-11/12 m-auto">
      <h1 class="m-0 text-white">
        <router-link
          to="/"
          class="no-underline inline-block px-6 py-3 m-0 text-white text-3xl hover:bg-sky-700"
        >
          Find a Mentor
        </router-link>
      </h1>
      <ul class="flex flex-row justify-center items-center list-none m-0 p-0">
        <li class="my-0 mx-2">
          <router-link
            to="/mentors"
            class="border border-solid border-transparent text-pink-400 py-3 px-6 hover:bg-sky-700"
          >
            All Mentors
          </router-link>
        </li>
        <li v-if="isLoggedIn" class="my-0 mx-2">
          <router-link
            to="/requests"
            class="border border-solid border-transparent text-pink-400 py-3 px-6 hover:bg-sky-700"
          >
            Requests
          </router-link>
        </li>
        <li v-else>
          <router-link
            to="/auth"
            class="border border-solid border-transparent text-pink-400 py-3 px-6 hover:bg-sky-700"
          >
            Login
          </router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
    },
  },
};
</script>

<style scoped>
a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}
</style>
