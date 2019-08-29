<template>
  <label class="block text-gray-700 text-sm text-left font-bold mb-2">
    {{ label }}
    <input
      :type="type"
      :name="name"
      :value="internalValue"
      :placeholder="placeholder"
      v-on="inputListeners"
      :class="{'border-red-500': errorMsg}"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
    >
    <transition name="fade">
      <p class="text-red-500 text-xs italic mt-2 ml-1" v-if="errorMsg">{{errorMsg}}</p>
    </transition>
  </label>
</template>

<script>
import { capitalize } from "../../utils/validators";

export default {
  name: "text-field",
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    },
    errorMsg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      internalValue: this.value || null
    };
  },
  computed: {
    inputListeners: function() {
      return Object.assign({}, this.$listeners, {
        input: this.updateInput
      });
    }
  },
  methods: {
    updateInput(event) {
      const unformatted = event.target.value.trim() || "";
      this.internalValue =
        this.type === "text" ? capitalize(unformatted) : unformatted;
      this.$emit("input", this.internalValue);
    }
  },
  watch: {
    value: function(newValue) {
      this.internalValue =
        this.type === "text" ? capitalize(newValue) : newValue;
    }
  }
};
</script>

<style>
</style>
