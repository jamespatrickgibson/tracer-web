<template>
  <section class="logbook-detail">
    <router-link to="/" tag="button" class="t-button has-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M15 18l-6-6 6-6"/></svg>
      Back
    </router-link>
    <h1 class="t-large-title">Solo Wingsuit</h1>
  </section>
</template>

<script>
export default {
  name: 'logbook-detail'
}
</script>

<style lang="scss" scoped>
.logbook-detail {
  height: 100vh;
  padding: $space-m;
  .t-button.has-icon {
    line-height: 1.5;
    margin-bottom: $space-l;
  }
}
</style>
