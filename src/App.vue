<template>
  <div id="app">
    <header class="app-header">Tracer</header>
    <router-view/>
  </div>
</template>

<style lang="scss">
.app-header {
  background: $white;
  padding: 0.5rem;
  font-size: px-rem(24px);
  font-weight: 400;
  text-transform: lowercase;
  letter-spacing: -0.04em;
}
</style>
