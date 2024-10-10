<template>
  <div data-theme="halloween" class="bg-lime-200 h-auto min-h-screen">
    <RouterView />
  </div>
</template>

<script>
import Login from "./components/Auth/Login.vue";
import { RouterView } from "vue-router";
export default {
  components: {
    Login,
    RouterView,
  },
  setup() {},
};
</script>

<style lang="scss" scoped></style>
