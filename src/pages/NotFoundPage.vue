<template>
  <div class="flex flex-col justify-center items-center w-full">
    <h2>Ooops, The page you were looking for, does not exist</h2>
    <p>
      Come back to the
      <base-button>
        <router-link to="/mentors">Main Page</router-link>
      </base-button>
    </p>
  </div>
</template>

<script>
import BaseButton from "../components/ui/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
};
</script>
