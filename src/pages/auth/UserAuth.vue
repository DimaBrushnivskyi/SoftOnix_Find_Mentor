<template>
  <!-- <dialog v-if="error">Warning</dialog> -->
  <base-card>
    <dialog v-if="error">Warning</dialog>
    <el-form
      @submit.prevent="onSubmit"
      class="m-4 p-4 border border-slate-300 rounded-xl"
    >
      <el-form-item label="Email" class="block my-2 m-0 mb-2 font-bold">
        <el-input
          type="email"
          class="w-full p-0.5 border-slate-300"
          v-model.trim="email"
        />
      </el-form-item>
      <el-form-item label="Password" class="block my-2 m-0 mb-2 font-bold">
        <el-input
          type="password"
          class="w-full p-0.5 border-slate-300"
          v-model.trim="password"
        />
      </el-form-item>
      <p v-if="!formIsValid">
        Please use valid email and password must be at least 8 characters long
      </p>
      <base-button type="submit">
        {{ submitButtonText }}
      </base-button>
      <base-button type="button" mode="flat" @click.prevent="switchAuthMode">
        {{ switchModeButtonText }}
      </base-button>
    </el-form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      error: false,
    };
  },
  computed: {
    submitButtonText() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "SignUp";
      }
    },
    switchModeButtonText() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async onSubmit() {
      this.formIsValid = true;

      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 8
      ) {
        this.formIsValid = false;

        return;
      }

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
        this.$router.replace("/mentors");
      } catch (error) {
        this.error = error;
        alert("User with such email already exists");
        this.$router.replace("/auth");
      }
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>
