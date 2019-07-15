<template>
  <div id="app">
    <header class="app-header">
      <h1 v-if="this.$route.path === '/'" class="t-large-title is-bold">{{ this.$route.name }}</h1>
      <div v-else>
        <h1 class="t-large-title is-bold"> {{ this.$route.name }}</h1>
      </div>
      <div class="app-header__actions"></div>
    </header>
    <router-view/>
    <nav class="app-tab-bar">
      <router-link class="t-button" to="/" tag="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="bevel"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>
      </router-link>
      <router-link class="t-button" to="add-jump" tag="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="bevel"><path d="M3 3h18v18H3zM12 8v8m-4-4h8"/></svg>
      </router-link>
      <router-link class="t-button" to="settings" tag="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="bevel"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </router-link>
    </nav>
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
  }
}
@supports(padding: max(0px)) {
  .app-header {
      padding-top: max(1rem, 1.5rem + env(safe-area-inset-top));
  }
}

.app-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: $white;
  border-top: 1px solid $blue-grey-100;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  .t-button {
    height: 2.5rem;
    background: transparent;
    &:active,
    &:hover {
      background: transparent;
    }
  }
  .t-button.is-active {
    color: $teal-400;
  }
}
@supports(padding: max(0px)) {
  .app-tab-bar {
      padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }
}
</style>
