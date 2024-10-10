<template>
  <div id="layout">
    <Drawer />
    <div class="content">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Drawer from "./Partials/Drawer.vue";

export default {
  name: "layout",
  components: {
    Drawer,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
