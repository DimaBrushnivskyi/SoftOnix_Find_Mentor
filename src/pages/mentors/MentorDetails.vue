<template>
  <section>
    <base-card>
      <h2 class="text-3xl font-medium">{{ fullName }}</h2>
      <h3 class="text-xl font-medium">${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2 class="text-2xl font-medium">Interested?! Contact me right now!</h2>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-badge>
      <p class="text-xl font-medium">{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedMentor: null,
    };
  },
  computed: {
    fullName() {
      return `${this.selectedMentor.firstName} ${this.selectedMentor.lastName}`;
    },
    contactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    areas() {
      return this.selectedMentor.areas;
    },
    description() {
      return this.selectedMentor.description;
    },
    rate() {
      return this.selectedMentor.hourlyRate;
    },
  },
  created() {
    this.selectedMentor = this.$store.getters["mentors/mentors"].find(
      (mentor) => mentor.id === this.id
    );
  },
};
</script>
