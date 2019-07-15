<template>
  <div id="app">
    <header class="app-header">
      <h1 class="t-title-3 is-bold">Jumps</h1>
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
}
@supports(padding: max(0px)) {
  .app-header {
      padding-top: max(1rem, env(safe-area-inset-top));
  }
}
</style>
