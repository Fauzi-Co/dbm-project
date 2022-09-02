<template>
  <b-row>
    <b-col md="12">
      <NavBar />

      <b-card title="Database" tag="article" class="mb-2">
        <hr />
        <p>
          <span>New Database</span>
        </p>
        <b-form-input
          v-model.trim="newDatabase"
          class="new-database mr-3"
          type="text"
          placeholder="Database name"
        ></b-form-input>
        <button class="btn btn-xyz" @click.prevent="handleCreateDatabase">Create</button>

        <!-- <p v-if="this.$v.$invalid">
          <small>Database name is required.</small>
        </p>-->

        <b-row class="mt-4">
          <div class="col-sm-8">
            <b-form-input
              v-model="search"
              class="new-database mr-3 mb-3"
              type="text"
              placeholder="Search database ..."
              @keyup="find"
            ></b-form-input>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Database</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="this.$store.getters.getDataBases && !search">
                    <tr v-for="(item, i) in this.$store.getters.getDataBases" :key="i">
                      <td>
                        <b-form-checkbox
                          v-if="filterDatabase(item.Database)"
                          type="checkbox"
                          v-model="databasesChecked"
                          v-bind:value="item.Database"
                        ></b-form-checkbox>
                      </td>
                      <td>
                        <b-form-input class="tabel-input" :value="item.Database"></b-form-input>
                      </td>
                      <td></td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr v-for="(item, i) in resultFind" :key="i">
                      <td>
                        <b-form-checkbox
                          v-if="filterDatabase(item.Database)"
                          type="checkbox"
                          v-model="databasesChecked"
                          v-bind:value="item.Database"
                        ></b-form-checkbox>
                      </td>
                      <td>
                        <b-form-input class="tabel-input" :value="item.Database"></b-form-input>
                      </td>
                      <td></td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar";
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  name: "HomeView",
  components: {
    NavBar
  },

  data() {
    return {
      newDatabase: "",
      databasesChecked: [],
      search: "",
      resultFind: []
    };
  },

  validations: {
    newDatabase: {
      required
    }
  },

  methods: {
    filterDatabase(data) {
      return (
        data != "performance_schema" &&
        data != "information_schema" &&
        data != "sys" &&
        data != "mysql"
      );
    },

    find() {
      let data = this.$store.getters.getDataBases;
      this.resultFind = [];

      data.forEach(item => {
        if (item.Database.search(this.search) > -1) {
          this.resultFind.push(item);
        }
      });
    },

    handleCreateDatabase() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$toast.error("Database name required.", {
          position: "top-right",
          duration: 3000,
          dismissible: true
        });
      } else {
        let data = JSON.stringify({ databaseName: this.newDatabase });
        axios.post("http://localhost:8888/dbm/Database.php", data).then(res => {
          if (res.data.success) {
            this.newDatabase = "";
            this.$toast.success("Database Added.", {
              position: "top-right",
              duration: 3000,
              dismissible: true
            });
            this.$store.commit("setDatabases");
          } else {
            this.$toast.error("Fail Added.", {
              position: "top-right",
              duration: 3000,
              dismissible: true
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="css">
.table tbody {
  overflow-x: scroll;
  height: 200px;
}

.form-control.new-database {
  display: inline-block !important;
}

.dark .form-control.new-database {
  background: none !important;
  color: #fff !important;
  font-size: 0.85rem;
  font-weight: 200;
  width: 250px !important;
}

.dark .form-control.new-database::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

.dark .form-control.new-database:active {
  outline: none;
}
</style>
