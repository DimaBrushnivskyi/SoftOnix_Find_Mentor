<template>
  <el-form>
    <el-form-item label="Firstname">
      <el-input
        v-model="firstName.val"
        @blur="clearValidity('firstName')"
        :class="{ warning: !formIsValid }"
      />
    </el-form-item>

    <p v-if="!firstName.isValid" :class="{ warning: !formIsValid }">
      Write your first name
    </p>

    <div class="my-2 m-0">
      <el-form-item label="Lastname">
        <el-input v-model="lastName.val" @blur="clearValidity('lastName')" />
      </el-form-item>
    </div>
    <p v-if="!lastName.isValid" :class="{ warning: !formIsValid }">
      Write your last name
    </p>

    <div class="my-2 m-0">
      <el-form-item label="Description">
        <el-input
          type="textarea"
          v-model="description.val"
          @blur="clearValidity('description')"
        />
      </el-form-item>
    </div>
    <p v-if="!description.isValid" :class="{ warning: !formIsValid }">
      Tell something about yourself
    </p>

    <div class="my-2 m-0">
      <el-form-item label="Hourly rate">
        <el-input-number
          v-model.number="rate.val"
          @blur="clearValidity('rate')"
        />
      </el-form-item>
    </div>
    <p v-if="!rate.isValid" :class="{ warning: !formIsValid }">
      Enter your requested hourly rate
    </p>

    <div class="my-2 m-0">
      <el-form-item label="Areas of Expertise">
        <el-checkbox-group
          v-model="areas.val"
          :class="{ invalid: !areas.isValid }"
          @blur="clearValidity('areas')"
        >
          <el-checkbox
            label="frontend"
            name="areas"
            value="frontend"
            v-model="areas.val"
          />
          <el-checkbox
            label="backend"
            name="areas"
            value="backend"
            v-model="areas.val"
          />
          <el-checkbox
            label="career"
            name="areas"
            value="career"
            v-model="areas.val"
          />
        </el-checkbox-group>
      </el-form-item>
    </div>
    <p v-if="!areas.isValid" :class="{ warning: !formIsValid }">
      Choose at least one Expertise area
    </p>

    <p v-if="!formIsValid" :class="{ warning: !formIsValid }">
      Please check if all fields have valid inputs
    </p>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    onSubmit() {
      this.formIsValid = true;

      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.warning {
  color: red;
}

.border_warning {
  color: red;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
