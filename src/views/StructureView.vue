<template>
  <b-row>
    <b-col md="12">
      <NavBar />

      <b-card title="Structure" tag="article" class="mb-2">
        <hr />
        <p>
          <span>New Table</span>
        </p>
        <b-form-input
          v-model="newTable"
          class="new-database mr-3"
          type="text"
          placeholder="Table name"
        ></b-form-input>
        <b-form-input
          type="number"
          class="new-database mr-3"
          style="width: 100px !important"
          v-model="amount"
        ></b-form-input>
        <button class="btn btn-xyz" @click.prevent="handleCreateDatabase">Create</button>
      </b-card>
      {{ useDatabase }}
    </b-col>
  </b-row>
</template>

<script>
import NavBar from "@/components/NavBar";
// import axios from "axios";
export default {
  name: "StructureView",
  components: {
    NavBar
  },

  mounted() {
    let { databaseName } = this.$route.params;
    this.$store.commit("setUseDatabase", databaseName);
  },

  watch: {
    // handle perubahan pada route
    // "$route.path": function(val, oldVal) {
    "$route.path": function() {
      let { databaseName } = this.$route.params;
      this.$store.commit("setUseDatabase", databaseName);
    }
  },

  data() {
    return {
      newTable: "",
      amount: 2,
      useDatabase: this.$route.params.databaseName
    };
  }
};
</script>

<style>
</style>