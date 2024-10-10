<template>
  <div class="container mx-auto py-6 px-1">
    <div class="mb-3 flex gap-2">
      <button @click="openAddModal" class="btn btn-primary" title="Add Data">
        <i class="fas fa-plus"></i>
      </button>

      <button @click="fetchData" class="btn btn-accent" title="Reload Table">
        <i class="fas fa-rotate-right"></i>
      </button>
    </div>

    <dialog ref="theModal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 class="text-lg font-bold">University</h3>
        <form @submit.prevent="submitUniv" id="univForm" class="mt-5">
          <input
            type="text"
            v-model="university.univ_Name"
            placeholder="University Name"
            class="input input-bordered w-full max-w-xs"
            autofocus
          />
          <button
            type="submit"
            :class="isEditing ? 'btn-warning' : 'btn-primary'"
            class="btn btn-primary ml-5 w-28"
          >
            {{ isEditing ? "Edit" : "Submit" }}
          </button>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <div class="flex justify-between items-center mb-4 text-amber-800">
      <!-- Rows Per Page -->
      <div class="flex items-center">
        <label class="mr-2">Show</label>
        <select
          v-model="itemsPerPage"
          @change="currentPage = 1"
          class="border border-gray-300 rounded p-2 bg-white"
        >
          <option v-for="option in [1, 10, 25, 50, 100]" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <span class="ml-2">entries</span>
      </div>

      <!-- Live Search Input -->
      <div class="relative w-full max-w-xs">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search universities..."
          class="bg-white text-black border border-gray-300 rounded p-2 w-full pr-8"
        />
        <!-- Clear button (shown when searchTerm is not empty) -->
        <button
          v-if="searchTerm"
          @click="clearSearch"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="table text-amber-800 min-w-full border border-amber-800">
        <thead class="text-amber-800 border-b">
          <tr>
            <th class="text-left py-3 px-4">#</th>
            <th @click="sortTable('univ_Id')" class="text-left cursor-pointer py-3 px-4">
              University Id
            </th>
            <th
              @click="sortTable('univ_Name')"
              class="text-left cursor-pointer py-3 px-4"
            >
              University Name
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(univ, index) in paginatedUniversities" :key="univ.univ_Id">
            <td class="py-3 px-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td class="py-3 px-4">{{ univ.univ_Id }}</td>
            <td class="py-3 px-4">{{ univ.univ_Name }}</td>
            <td class="py-3 px-4">
              <div class="flex gap-5 justify-center">
                <button class="btn btn-warning" @click="editUniv(univ)" title="Edit Data">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button
                  class="btn btn-error"
                  @click="deleteUniv(univ.univ_Id)"
                  title="Delete Data"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredUniversities.length === 0">
            <td colspan="3" class="text-center py-4">No data found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center mt-4">
      <!-- Summary -->
      <div>
        <p class="text-gray-600">
          Showing
          {{
            Math.min((currentPage - 1) * itemsPerPage + 1, filteredUniversities.length)
          }}
          to {{ Math.min(currentPage * itemsPerPage, filteredUniversities.length) }} of
          {{ filteredUniversities.length }} entries
        </p>
      </div>

      <!-- Pagination Controls -->
      <div class="flex items-center space-x-2 text-amber-800">
        <!-- Prev Button -->
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="bg-white p-2 rounded disabled:opacity-50"
          id="prev"
        >
          &lt; Prev
        </button>

        <!-- First Page Button -->
        <button
          @click="goToPage(1)"
          :class="{
            'bg-amber-500 text-white': currentPage === 1,
            'bg-white': currentPage !== 1,
          }"
          class="p-2 rounded"
        >
          1
        </button>

        <!-- Show ellipsis before the visible pages range -->
        <span
          v-if="visiblePages.length && visiblePages[0] > 2"
          class="p-2 rounded bg-white opacity-50"
          disabled
        >
          ...
        </span>

        <!-- Visible middle pages -->
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="{
            'bg-amber-500 text-white': currentPage === page,
            'bg-white': currentPage !== page,
          }"
          class="p-2 rounded"
        >
          {{ page }}
        </button>

        <!-- Show ellipsis after the visible pages range -->
        <span
          v-if="
            visiblePages.length && visiblePages[visiblePages.length - 1] < totalPages - 1
          "
          class="p-2 rounded bg-white opacity-50"
          disabled
        >
          ...
        </span>

        <!-- Last Page Button -->
        <button
          v-if="totalPages > 1"
          @click="goToPage(totalPages)"
          :class="{
            'bg-amber-500 text-white': currentPage === totalPages,
            'bg-white': currentPage !== totalPages,
          }"
          class="p-2 rounded"
        >
          {{ totalPages }}
        </button>

        <!-- Next Button -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="bg-white p-2 rounded disabled:opacity-50"
        >
          Next &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "home",
  data() {
    return {
      universities: [], // Array to store fetched data
      university: {
        univ_Id: "",
        univ_Name: "",
      },
      isEditing: false,
      currentPage: 1,
      itemsPerPage: 10,
      searchTerm: "",
      sortKey: "", // Data property to track the current sort key
      sortOrder: "asc", // Data property to track the current sort order
    };
  },
  computed: {
    // Filter universities based on search term
    filteredUniversities() {
      if (this.searchTerm) {
        return this.universities.filter(
          (univ) =>
            univ.univ_Id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            univ.univ_Name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      return this.universities;
    },
    // Get the universities for the current page
    paginatedUniversities() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUniversities.slice(start, end);
    },
    // Calculate total number of pages
    totalPages() {
      return Math.ceil(this.filteredUniversities.length / this.itemsPerPage);
    },

    visiblePages() {
      const pages = [];
      const totalVisiblePages = 5; // Number of pages to display in the range

      if (this.totalPages <= totalVisiblePages + 2) {
        // If total pages are small, just return all pages without ellipsis
        for (let i = 2; i < this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // If total pages exceed the visible range, calculate the range
        const rangeStart = Math.max(
          2,
          this.currentPage - Math.floor(totalVisiblePages / 2)
        );
        const rangeEnd = Math.min(
          this.totalPages - 1,
          this.currentPage + Math.floor(totalVisiblePages / 2)
        );

        for (let i = rangeStart; i <= rangeEnd; i++) {
          pages.push(i);
        }
      }

      return pages;
    },
  },
  watch: {
    searchTerm() {
      this.currentPage = 1; // Reset to first page whenever the search term changes
    },
  },
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
  },
  methods: {
    fetchData() {
      const apiUrl = `https://localhost:7294/api/University`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.universities = response.data.data;
          this.sortTable(this.sortKey); // Sort the data initially if there's a sort key
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    sortTable(key) {
      // Toggle sort order
      this.sortOrder = this.sortKey === key && this.sortOrder === "asc" ? "desc" : "asc";
      this.sortKey = key; // Update the sort key

      // Perform sorting
      this.universities.sort((a, b) => {
        const modifier = this.sortOrder === "asc" ? 1 : -1;

        // Use the appropriate key for sorting
        if (key === "index") {
          return 0; // Avoid sorting by index, just use the display index
        }

        if (a[key] < b[key]) return -1 * modifier;
        if (a[key] > b[key]) return 1 * modifier;
        return 0;
      });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    clearForm() {
      this.university = { univ_Id: "", univ_Name: "" };
    },
    clearSearch() {
      this.searchTerm = ""; // Clear the search term
    },
    openAddModal() {
      // alert("test");
      this.clearForm();
      this.isEditing = false;
      this.$refs.theModal.showModal();
    },
    submitUniv() {
      if (this.isEditing) {
        this.updateUniv();
      } else {
        this.addUniv();
      }
    },
    addUniv() {
      const api = "https://localhost:7294/api/University";
      return axios
        .post(api, this.university)
        .then((response) => {
          this.$refs.theModal.close();
          alert(response.data.message);
          this.fetchData();
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    },
    getById(id) {
      const api = "https://localhost:7294/api/University/" + id;
      return axios
        .get(api)
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching university by ID:", error);
        });
    },
    editUniv(university) {
      this.isEditing = true;
      this.getById(university.univ_Id).then((data) => {
        this.university = data;
        this.$refs.theModal.showModal();
      });
    },
    updateUniv() {
      const api = "https://localhost:7294/api/University/" + this.university.univ_Id;
      return axios
        .put(api, this.university)
        .then((response) => {
          this.$refs.theModal.close();
          alert(response.data.message);
          this.fetchData();
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    },
    deleteUniv(id) {
      const api = "https://localhost:7294/api/University/" + id;
      return axios
        .delete(api)
        .then((response) => {
          alert(response.data.message);
          // $("#prev").click();
          this.prevPage();
          this.fetchData();
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
