<template>
  <div id="app">
    <header class="app-header">
      <h1 v-if="this.$route.path === '/'" class="t-title-3 is-bold">{{ this.$route.name }}</h1>
      <h1 v-else class="t-title-3 is-bold"><router-link to="/">Back</router-link> {{ this.$route.name }}</h1>
      <div class="app-header__actions">
        <router-link class="t-button" to="add-jump" tag="button">Add New</router-link>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">
.app-header {
  background: $primary;
  color: $white;
  padding: 0.75rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  &__actions {
    margin-left: auto;
  }
  .t-button {
    background: $teal-100;
    color: $teal-800;
    // border: px-rem(1px) solid $white;
  }
}
@supports(padding: max(0px)) {
  .app-header {
      padding-top: max(1rem, env(safe-area-inset-top));
  }
}
</style>
