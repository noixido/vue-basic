<template>
  <div>
    <img
      alt="Tailwind CSS Navbar component"
      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      class="rounded-full w-40 my-12 mx-auto"
    />
    <h1 class="text-black text-center my-10 text-9xl font-bold flex justify-center gap-3">
      {{ profiles.fullName }}
      <a
        class="text-2xl text-amber-800 cursor-pointer hover:text-amber-500"
        title="Edit Profile"
      >
        <i class="fas fa-pencil-alt"></i>
      </a>
    </h1>
    <h3 class="text-black text-center my-10 text-5xl font-bold">
      {{ profiles.roleName }}
    </h3>
    <div class="w-full text-amber-800 text-xl">
      <table class="table w-4/6 mx-auto text-center">
        <tr class="text-lg">
          <th class="bg-white opacity-50 rounded-l-3xl">Email</th>
          <th class="bg-white opacity-50">Phone Number</th>
          <th class="bg-white opacity-50 rounded-r-3xl">Birth Date</th>
        </tr>
        <tr class="text-2xl font-bold">
          <td>{{ profiles.email }}</td>
          <td>{{ profiles.phone }}</td>
          <td>{{ profiles.birthDate }}</td>
        </tr>
        <tr class="text-lg">
          <th class="bg-white opacity-50 rounded-l-3xl">Degree</th>
          <th class="bg-white opacity-50">GPA</th>
          <th class="bg-white opacity-50 rounded-r-3xl">University Name</th>
        </tr>
        <tr class="text-2xl font-bold">
          <td>{{ profiles.degree }}</td>
          <td>{{ profiles.gpa }}</td>
          <td>{{ profiles.univ_Name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "adminProfile",
  data() {
    return {
      profiles: [],
    };
  },
  setup() {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const username = payload.Username;
    return {
      token,
      payload,
      username,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const api = "https://localhost:7294/api/Register/getByEmail/" + this.username;
      return axios
        .get(api, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          //   console.log(response.data.data);
          this.profiles = response.data.data;
          //   console.log(this.profiles);
        })
        .catch((error) => {
          console.error(error.response.data.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
