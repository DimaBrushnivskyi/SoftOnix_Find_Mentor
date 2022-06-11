<template>
  <span
    :class="type"
    class="bg-slate-300 color-black border rounded-full py-2 px-6 inline-block mr-2"
  >
    {{ position }}
  </span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    position() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&family=Roboto+Mono:ital,wght@1,400&display=swap");

span {
  font-family: "Kdam Thmor Pro", monospace;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
