<template>
  <li class="my-4 mx-0 p-4 border-slate-300">
    <div>
      <a
        :href="link"
        target="_blank"
        rel="noopener"
        noreferrer
        class="text-sky-500 text-none font-bold hover:text-purple-400 active:text-purple-400"
      >
        {{ email }}
      </a>
    </div>
    <p class="mt-2 mx-0 mb-0">{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: ["email", "message"],
  computed: {
    link() {
      return `mailto:${this.email}`;
    },
  },
};
</script>
