<template>
  <section class="settings">
    <div class="t-buttons">
      <button class="t-button is-fullwidth is-secondary" @click="loadSampleData()">Load Sample Data</button>
      <button class="t-button is-fullwidth is-secondary" @click="clearLogbook()">Clear All Data</button>
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
      var loadSampleConfirm = confirm('Loading sample data will clear your current logbook data. Are you sure you want to load?')
      if (loadSampleConfirm === true) {
        this.$store.commit('loadSampleData')
      } else {
        return false
      }
    },
    clearLogbook () {
      var clearLogbookConfirmation = confirm('Are you sure you want to clear your logbook? This cannot be undone.')
      if (clearLogbookConfirmation === true) {
        this.$store.commit('clearLogbook')
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  padding-top: $app-padding-mobile-top;
  padding-bottom: $app-padding-mobile-bottom;

  .t-button:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .t-buttons {
    padding: ($space-m + $space-xs);
    color: $white;
  }
}
</style>
