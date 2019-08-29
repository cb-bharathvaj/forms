<template>
  <text-field v-bind="fieldObj" @input="updateFormInput" @blur="validateFormInput"/>
</template>

<script>
import TextField from "./TextField.vue";

export default {
  name: "text-field-form",
  components: {
    TextField
  },
  props: {
    fieldObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    updateFormInput(value) {
      this.$store.dispatch("updateFormInput", {
        formName: this.fname,
        fieldName: this.fieldObj.name,
        value
      });
    },
    validateFormInput() {
      this.$store.dispatch("validateField", {
        formName: this.fname,
        fieldName: this.fieldObj.name
      });
    }
  },
  watch: {
    fieldObj(data) {
      this.updateFormInput(data.value);
    }
  },
  created() {
    this.fname = this.$findParentForm();
    const formName = this.fname;
    this.$store.dispatch("initField", { formName, field: this.fieldObj });
  },
  destroyed() {
    const formName = this.fname;
    const fieldName = this.fieldObj.name;
    this.$store.dispatch("initField", { formName, fieldName });
  }
};
</script>

<style>
</style>
