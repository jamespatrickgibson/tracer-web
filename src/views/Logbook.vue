<template>
  <div class="log">
    <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>
  </div>
</template>

<script>
import jumpOptionsData from '@/data/jump-options.json'

export default {
  name: 'log',
  data () {
    return {
      transitionName: 'slide-left',
      jumpTypeOptions: jumpOptionsData.jumpTypeOptions,
      jumperCountOptions: jumpOptionsData.jumperCountOptions
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="scss">
// Logbook Page
.log {
  @include desktop() {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.child-view {
  position: absolute;
  // transition: all .5s cubic-bezier(.55,0,.1,1);
  transition: all .3s $ease-in-out;
  z-index: 0;
  width: 100vw;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
