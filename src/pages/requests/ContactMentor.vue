<template>
  <el-form class="m-4 p-4 border border-slate-300 rounded-xl">
    <el-form-item label="Your email" class="block my-2 m-0 mb-2 font-bold">
      <el-input
        type="email"
        class="w-full p-0.5 border-slate-300"
        v-model="email"
      />
    </el-form-item>
    <el-form-item label="Message" class="block my-2 m-0 mb-2 font-bold">
      <el-input
        type="textarea"
        class="w-full p-0.5 border-slate-300"
        v-model="message"
      />
    </el-form-item>

    <p v-if="!isValid" class="errors">Invalid input</p>
    <div class="actions my-2 m-0">
      <el-button type="primary" @click="onSubmit">Text Me</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      isValid: true,
    };
  },
  methods: {
    onSubmit() {
      this.isValid = true;

      if (
        this.email === "" ||
        this.message === "" ||
        !this.email.includes("@")
      ) {
        this.isValid = false;

        return;
      }

      this.$store.dispatch("requests/contactMentor", {
        email: this.email,
        message: this.message,
        mentorId: this.$route.params.id,
      });

      this.$router.replace("/mentors");
    },
  },
};
</script>

<style scoped>
.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
