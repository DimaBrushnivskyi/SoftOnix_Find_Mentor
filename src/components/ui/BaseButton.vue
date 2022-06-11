<template>
  <button
    @click="$emit('click', $event)"
    v-if="!link"
    :class="mode"
    :type="type"
    class="text-none py-3 px-6 font-inherit bg-sky-400 border rounded-2xl border-sky-400 text-white cursor-pointer mr-2 inline-block hover:bg-sky-600 hover:border-sky-600 hover:text-white active:bg-sky-600"
  >
    <slot></slot>
  </button>
  <button>
    <router-link
      v-if="link"
      :to="to"
      :class="mode"
      class="text-none py-3 px-6 font-inherit bg-sky-400 border rounded-xl border-solid border-sky-400 text-white cursor-pointer mr-2 inline-block hover:bg-sky-600 hover:border-sky-600 active:bg-sky-600"
    >
      <slot></slot>
    </router-link>
  </button>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
    },
  },
};
</script>

<style scoped>
.flat {
  background-color: rgb(56 189 248);
  color: rgb(56 189 248);
  border: none;
}

.outline {
  background-color: transparent;
  border-color: rgb(56 189 248);
  color: rgb(56 189 248);
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: rgb(2 132 199);
}
</style>
