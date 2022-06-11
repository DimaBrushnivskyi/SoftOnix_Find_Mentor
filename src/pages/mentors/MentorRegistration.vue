<template>
  <section class="flex flex-col justify-center items-center">
    <base-card>
      <h2>Become our new Mentor</h2>
      <mentor-form @save-data="saveData"></mentor-form>
    </base-card>
  </section>
</template>

<script>
import MentorForm from "../../components/mentors/MentorForm.vue";

export default {
  components: {
    MentorForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("mentors/registerMentor", data);
      this.$router.push("/mentors");
    },
  },
};
</script>
