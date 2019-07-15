<template>
  <div class="log">
    <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>
    <!-- All Jumps -->
    <section class="all-jumps" v-show="false">
      <ol class="jumps">
        <li v-for="jump in jumps" :key="jump.id" class="jump">
          <p class="jump__number">{{ jump.jumpNumber }}</p>
          <div class="jump__overview">
            <p class="jump__type"><span class="jump__jumper-count">{{ jumperCountName(jump.jumperCount) }}</span> {{ jumpTypeName(jump.jumpType) }}</p>
            <p class="jump__location">{{ jump.location }}</p>
            <p class="jump__date">{{ jumpDate(jump.date) }}</p>
            <!--<p>Aircraft: {{ jump.aircraft }}</p> -->
            <!--<p>Altitude: {{ jump.exitAltitude.toLocaleString() }}</p>-->
            <!--<p>Delay: {{ jump.freefallDelay }}s</p>-->
            <!--<p>Notes: {{ jump.notes }}</p>-->
            <!--
            <div class="t-buttons">
              <button class="t-button" @click="deleteJump(jump.id)">Delete</button>
            </div>
            -->
          </div>
        </li>
      </ol>
    </section>
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
  },
  methods: {
    deleteJump (id) {
      this.$store.commit('deleteJump', id)
    },
    jumpDate (d) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const formattedDate = new Date(d).toLocaleDateString('en-US', options)
      return formattedDate
    },
    jumperCountName (count) {
      let name = this.jumperCountOptions.find(o => o.value === count).text
      return name
    },
    jumpTypeName (value) {
      let name = this.jumpTypeOptions.find(o => o.value === value).text
      return name
    }
  },
  computed: {
    jumps () {
      return this.$store.state.jumps.slice(0).sort((b, a) => parseFloat(a.jumpNumber) - parseFloat(b.jumpNumber))
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

// All Jumps
.all-jumps {
  .t-large-title {
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
// Jump List
.jumps {
  list-style-type: none;
  padding: 0;
}
.jump {
  background: #fff;
  color: $text-light;
  border-bottom: px-rem(2px) solid $blue-grey-050;
  display: flex;

  &__number {
    display: flex;
    justify-content: center;
    align-self: stretch;
    align-items: center;
    flex: 0 0 5rem;
    font-size: px-rem(28px);
    font-weight: bold;
    color: $blue-grey-700;
    background: $blue-grey-025;
    @include desktop {
      flex: 0 0 6rem;
    }
  }
  &__overview {
    padding: $space-s;
  }
  &__type {
    @include title-2;
  }
  &__location {
    @include subhead;
    color: $muted;
    font-weight: bold;
    margin-bottom: $space-s;
  }
  &__date {
    @include caption-2();
    color: $blue-grey-500;
    margin-bottom: $space-xs;
    text-transform: uppercase;
  }
}
.child-view {
  position: absolute;
  transition: all .5s cubic-bezier(.55,0,.1,1);
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
