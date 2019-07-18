<template>
  <div id="app" class="app">
    <header class="app-header">
      <div class="navigation-bar">
        <button v-if="this.$route.path.split('/').length > 2" to="/" @click="$router.go(-1)" class="t-button has-icon is-tertiary">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M15 18l-6-6 6-6"/></svg>
          Back
        </button>
      </div>
      <div class="navigation-bar__title">
        <h1 v-if="this.$route.path === '/'" class="t-large-title">{{ this.$route.name }}</h1>
        <div v-else>
          <h1 class="t-large-title"> {{ this.$route.name }}</h1>
        </div>
      </div>
    </header>
    <router-view/>
    <div class="app-tab-bar">
      <nav class="app-tab-bar__tabs">
        <router-link class="t-button is-tertiary" to="/" tag="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="bevel"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>
        </router-link>
        <button class="t-button is-tertiary" @click="openJumpSheet">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="bevel"><path d="M3 3h18v18H3zM12 8v8m-4-4h8"/></svg>
        </button>
        <router-link class="t-button is-tertiary" to="settings" tag="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="bevel"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </router-link>
      </nav>
    </div>
    <add-jump-sheet/>
  </div>
</template>

<script>
import addJumpSheet from '@/views/AddJumpSheet.vue'

export default {
  components: {
    addJumpSheet
  },
  methods: {
    openJumpSheet () {
      this.$store.commit('openJumpSheet')
    },
    closeJumpSheet () {
      this.$store.commit('closeJumpSheet')
    },
    afterLeave () {
      this.$root.$emit('triggerScroll')
    }
  }
}
</script>

<style lang="scss">
.app {
  min-height: 100vh;
}
.app-header {
  // background: $grey-800;
  background: rgba($grey-900, 0.8);
  color: $white;
  padding-top: env(safe-area-inset-top);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: auto;
  z-index: 10;
  &__actions {
    margin-left: auto;
  }
  .t-button {
    background: $teal-100;
    color: $teal-800;
  }
}

.navigation-bar {
  padding: 0 $space-s 0 $space-xs;
  display: flex;
  align-items: center;
  height: $app-nav-bar-mobile-height;
  &__title {
    height: $app-nav-title-mobile-height;
    display: flex;
    align-items: center;
    padding: 0 ($space-m + $space-xs);
  }
}
.app-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: auto;
  background: rgba($grey-900, 0.95);
  padding-bottom: env(safe-area-inset-bottom);
}
.app-tab-bar__tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ($space-m + $space-xs);
  height: $app-tab-bar-mobile-height;
  .t-button {
    height: 2.5rem;
    background: transparent;
    color: $white;
    touch-action: manipulation;
    &:active,
    &:hover {
      background: transparent;
    }
  }
  .t-button.is-active {
    color: $teal-500;
  }
}
@supports(padding: max(0px)) {
  .app-tab-bar {
  }
}
</style>
