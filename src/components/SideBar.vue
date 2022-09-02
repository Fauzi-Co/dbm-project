<template>
  <div>
    <p class="p-2 pt-4 brand">DATABASE MANAGEMENT</p>
    <b-card class="mb-2 border-0 sidebar">
      <p>Database</p>

      <div class="hr">
        <hr />
      </div>

      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
          v-for="(item, i) in this.$store.getters.getDataBases"
          v-bind:key="i"
        >
          <router-link :to="'/database/' + item.Database" :key="$route.path">
            <small>{{ item.Database }}</small>
          </router-link>
          <small v-if="filterDatabase(item.Database)" @click="handleDeleteDatabase(item.Database)">
            <b-icon-trash></b-icon-trash>
          </small>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "SideBar",

  mounted() {},

  methods: {
    filterDatabase(data) {
      return (
        data != "performance_schema" &&
        data != "information_schema" &&
        data != "sys" &&
        data != "mysql"
      );
    },

    handleDeleteDatabase(database) {
      Swal.fire({
        title: `Are you sure deleted ${database}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Delete",
        denyButtonText: `Cancel`
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.commit("deleteDatabase", database);
          this.$toast.success("Database Deleted.", {
            position: "top-right",
            duration: 3000,
            dismissible: true
          });
        }
      });
    }
  }
};
</script>

<style>
.card.sidebar {
  background: linear-gradient(0deg, #ba54f5 0%, #e14eca 100%) !important;
  height: 80vh;
}

.card.sidebar .card-body {
  height: 100%;
  padding-right: 0.5rem;
}

.card.sidebar .card-body .hr {
  padding-right: 0.95rem !important;
  box-sizing: border-box;
}

#app .list-group {
  overflow: auto;
  height: 85%;
}

.list-group-item {
  background: rgba(0, 0, 0, 0) !important;
  border: none !important;
  padding: 0.3rem 0 !important;
  font-size: 0.8rem;
  padding-right: 0.95rem !important;
}

.list-group-item a {
  text-decoration: none;
}

.list-group-item a small {
  transition: 0.3s;
}

.list-group-item a:hover {
  text-decoration: none;
}

.dark .list-group-item a:hover small {
  color: #fff !important;
}

.list-group-item a small {
  color: rgba(255, 255, 255, 0.8) !important;
}

.list-group-item small svg {
  cursor: pointer;
}
</style>