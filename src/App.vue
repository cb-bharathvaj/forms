<template>
  <div id="app" class="w-full bg-gray-200 flex justify-center items-center">
    <sign-up-form/>
  </div>
</template>

<script>
import SignUpForm from "./components/SignUpForm.vue";

export default {
  name: "App",
  components: {
    SignUpForm
  },
  data() {
    return {
      fname: "signup_form"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

html,
body {
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
