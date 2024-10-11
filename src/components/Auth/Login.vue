<template>
  <div class="pt-60">
    <form
      @submit.prevent="login"
      class="border border-lime-600 bg-lime-500 rounded-lg mx-auto p-10 flex flex-col w-96 gap-5 text-center"
    >
      <p class="text-lime-800 text-3xl">Login</p>
      <input
        v-model="username"
        type="email"
        placeholder="Email"
        class="h-10 rounded-md px-2 bg-white"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="h-10 rounded-md px-2 bg-white"
      />
      <button class="rounded-md bg-lime-900 h-10 px-2" @click.prevent="login">
        <div
          :class="stateLoading ? 'loading loading-spinner loading-sm text-primary' : ''"
        >
          Login
        </div>
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      stateLoading: ref(false),
      username: "",
      password: "",
      router: useRouter(),
    };
  },
  methods: {
    async login() {
      this.stateLoading = true;

      try {
        const api = "https://localhost:7294/api/Register/Login";
        const response = await axios.post(api, {
          username: this.username,
          password: this.password,
        });

        // console.log(response.data.data);

        const token = response.data.data;
        localStorage.setItem("token", token);

        const payload = JSON.parse(atob(token.split(".")[1]));
        const role = payload.role;

        // console.log(role);

        const redirectPath =
          this.$route.query.redirect || (role === "Admin" ? "/home" : "/dashboard");

        this.router.push(redirectPath);
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        this.stateLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
