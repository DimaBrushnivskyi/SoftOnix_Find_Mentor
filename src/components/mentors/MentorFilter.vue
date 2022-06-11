<template>
  <base-card>
    <h2 class="my-2 mx-0">Pick your Mentors:</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">FrontEnd</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">BackEnd</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["update-filter"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(e) {
      const id = e.target.id;
      const isChecked = e.target.checked;
      const updatedFilters = {
        ...this.filters,
        [id]: isChecked,
      };

      this.filters = updatedFilters;
      this.$emit("update-filter", updatedFilters);
    },
  },
};
</script>

<style scoped>
.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
