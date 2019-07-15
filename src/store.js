import Vue from 'vue'
import Vuex from 'vuex'
import logbookData from '@/data/sample-logbook-data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jumps: []
  },
  mutations: {
    initialiseStore (state) {
      // Check if the ID exists
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    },
    loadSampleData (state) {
      state.jumps = logbookData
    },
    clearLogbook (state) {
      state.jumps = []
    }
  },
  actions: {

  }
})

// Subscribe to store updates
// store.subscribe((mutation, state) => {
//   // Store the state object as a JSON string
//   localStorage.setItem('store', JSON.stringify(state))
// })
