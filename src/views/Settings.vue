<template>
  <section class="settings">
  <div class="t-buttons">
    <button class="t-button is-fullwidth" @click="loadSampleData()">Load Sample Data</button>
    <button class="t-button is-fullwidth" @click="clearLogbook()">Clear All Data</button>
  </div>
  </section>
</template>

<script>
import logbookData from '@/data/sample-logbook-data.json'

export default {
  name: 'settings',
  data () {
    return {
      logbook: logbookData
    }
  },
  methods: {
    loadSampleData () {
      const parsed = JSON.stringify(this.logbook)
      localStorage.setItem('jumps', parsed)
      alert('Sample data successfully loaded')
    },
    clearLogbook () {
      var clearLogbookConfirmation = confirm('Are you sure you want to clear your logbook? This cannot be undone.')
      if (clearLogbookConfirmation === true) {
        localStorage.removeItem('jumps')
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  padding: 0.5rem;

  .t-button:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}
</style>
