<template>
  <input
    type="submit"
    class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
    :value="value"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "button"
    }
  }
};
</script>

<style>
</style>
