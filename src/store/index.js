import Vue from 'vue'
import Vuex from 'vuex'
import axiox from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    databases: [],
    database: {
      name: "",
      table: []
    },
  },
  getters: {
    getDataBases(state) {
      return state.databases;
    }
  },
  mutations: {
    async setDatabases(state) {
      await axiox.get('http://localhost:8888/dbm/Database.php')
        .then(res => {
          state.databases = res.data
        });
    },

    async deleteDatabase(state, dbName) {
      state.databases = state.databases.filter(item => item.Database != dbName);
      await axiox.delete('http://localhost:8888/dbm/Database.php?database_name=' + dbName)
        .then(res => {
          console.log(res);
        });
    },

    async setUseDatabase(state, database) {
      await axiox.get(`http://localhost:8888/dbm/table.php?database=${database}`).then(res => {
        console.log(res);
        console.log(state.database);
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
