import Vue from 'vue'
import Vuex from 'vuex'
import logbookData from '@/data/sample-logbook-data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jumps: [],
    jumpSheetIsActive: false
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
    addJump (state, jumpData) {
      state.jumps.push(jumpData)
    },
    deleteJump (state, id) {
      state.jumps.splice(state.jumps.findIndex(function (i) {
        return i.id === id
      }), 1)
    },
    loadSampleData (state) {
      state.jumps = []
      state.jumps = logbookData
    },
    clearLogbook (state) {
      state.jumps = []
    },
    closeJumpSheet (state) {
      state.jumpSheetIsActive = false
    },
    openJumpSheet (state) {
      state.jumpSheetIsActive = true
    }
  },
  actions: {

  }
})
