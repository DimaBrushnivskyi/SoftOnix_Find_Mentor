<template>
  <li
    :class="{ 'is-mentor': isLoggedIn && !mentorId }"
    class="list-none my-4 mx-0 border rounded-lg border-solid border-1 border-slate-500 p-2"
  >
    <h3 class="text-3xl my-2 mx-0">{{ fullName }}</h3>
    <h4 class="text-xl my-2 mx-0">${{ rate }}/hour</h4>
    <div class="my-2 mx-0">
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
        :value="area"
      ></base-badge>
    </div>
    <div class="actions my-2 mx-0 flex justify-end">
      <base-button
        mode="outline"
        link
        :to="mentorContactLink"
        v-if="(isLoggedIn && mentorId) || (!isLoggedIn && mentorId)"
      >
        Contact
      </base-button>
      <base-button link :to="mentorDetailsLink"> Show Details </base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: String,
    firstName: String,
    lastName: String,
    rate: Number,
    areas: Array,
    isLoggedIn: Boolean,
  },
  computed: {
    mentorId() {
      return this.$store.getters.userId !== this.id;
    },
    isLogged() {
      return this.isLoggedIn;
    },
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    mentorContactLink() {
      return `${this.$route.path}/${this.id}/contact`; // incase route will change
    },
    mentorDetailsLink() {
      return `${this.$route.path}/${this.id}`;
    },
  },
};
</script>

<style scoped>
.is-mentor {
  background-color: rgba(11, 209, 244, 0.484);
}
</style>
