<template>
  <div>
    <div class="navbar bg-base-100 drawer w-full">
      <div class="flex-none">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div class="flex-1">
        <router-link to="/home" class="btn btn-ghost text-xl">noixido</router-link>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <router-link to="/profile/admin" class="justify-between">
                Profile
                <!-- <span class="badge">New</span> -->
              </router-link>
            </li>
            <!-- <li><a>Settings</a></li> -->
            <li><a @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      router: useRouter(),
    };
  },
  setup() {
    return {};
  },
  methods: {
    logout() {
      // Clear token from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      this.router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
