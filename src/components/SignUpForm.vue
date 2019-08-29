<template>
  <form
    @submit.prevent="submitForm"
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-h-1/2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
  >
    <text-field-form
      :fieldObj="{
        name:'user_name',
        value: '',
        label: 'User Name',
        placeholder: 'Bruce Wayne',
        errorMsg: ''      
      }"
    />
    <text-field-form
      :fieldObj="{
        name:'user_password',
        value: '',
        label: 'Password',
        type:'password',
        placeholder: '******************' ,
        errorMsg: ''  
      }"
    />
    <div class="flex">
      <button-form value="Sign Up"/>
    </div>
  </form>
</template>

<script>
import TextFieldForm from "./lib/TextFieldForm.vue";
import ButtonForm from "./lib/Button.vue";
import mockHttp from "../utils/MockHttp";

const validations = {
  user_name: {
    presence: true,
    length: {
      message: " should not have more than 100 characters",
      maximum: 100
    }
  },
  user_password: {
    presence: true,
    length: {
      message: " should have minimum 8 characters",
      minimum: 8
    }
  }
};

export default {
  name: "signup-form",
  components: {
    TextFieldForm,
    ButtonForm
  },
  data() {
    return {
      fname: "signup_form"
    };
  },
  methods: {
    initFormWithValidations() {
      this.$store.dispatch("initForm", { formName: this.fname, validations });
    },
    submitForm() {
      this.$store
        .dispatch("validateForm", this.fname)
        .then(() => {
          const formValues = this.$store.getters.formValues(this.fname);
          return mockHttp.post(formValues);
        })
        .then(result => {
          result && this.$toast(result.message);
        })
        .catch(error => {
          this.$formError(error, this.fname);
        });
    }
  },
  created() {
    this.initFormWithValidations();
  }
};
</script>

<style>
.max-h-1\/2 {
  max-height: 50%;
}
</style>
