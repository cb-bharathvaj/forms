import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/index.css";
import App from "./App.vue";
import store from "./store/form";

Vue.use(VueToast);

Vue.config.productionTip = false;

Vue.prototype.$findParentForm = function() {
  if ((this.$props && this.$props.fname) || this.fname) {
    return this.fname || (this.$props || {}).fname;
  }
  return (
    this.$parent &&
    this.$parent.$findParentForm &&
    this.$parent.$findParentForm()
  );
};

Vue.prototype.$toast = function(payload) {
  Vue.$toast.open(payload);
};

Vue.prototype.$formError = function(error = {}, formName) {
  // 400 errors
  if (typeof error === "object") {
    this.$store.dispatch("fieldError", {
      formName,
      fieldName: error["paramName"],
      value: error["paramMessage"]
    });
  }

  this.$toast({
    message: "There were errors while submitting",
    type: "error"
  });
};

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
