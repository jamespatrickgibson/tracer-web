<template>
  <div class="log">
    <button class="t-button" @click="loadSampleData()">Load Sample Data</button>
    <button class="t-button" @click="clearLogbook()">Clear All Data</button>
    <!-- All Jumps -->
    <section class="all-jumps">
      <ol class="jumps">
        <li v-for="jump in jumps" :key="jump.jumpNumber" class="jump">
          <p class="jump__number">{{ jump.jumpNumber }}</p>
          <div class="jump__overview">
            <p class="jump__type"><span class="jump__jumper-count">{{ jump.jumperCount }}</span> {{ jump.jumpType }}</p>
            <p class="jump__location">{{ jump.location }}</p>
            <p class="jump__date t-subhead">{{ jumpDate(jump.date) }}</p>
            <!-- <p>Aircraft: {{ jump.aircraft }}</p> -->
            <!--<p>Altitude: {{ jump.exitAltitude.toLocaleString() }}</p>-->
            <!--<p>Delay: {{ jump.freefallDelay }}s</p>-->
            <!--<p>Notes: {{ jump.notes }}</p>-->
            <!--
            <div class="t-buttons">
              <button class="t-button">Edit</button>
              <button class="t-button" @click="removeJump(jump.jumpNumber)">Delete</button>
            </div>
            -->
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
// Generated from Mockaroo
// https://mockaroo.com/schemas/116940
import logbookData from '@/data/sample-logbook-data.json'

export default {
  name: 'log',
  data () {
    return {
      logbook: logbookData,
      jumps: [],
      newJump: {
        id: null,
        jumpNumber: null,
        date: new Date().toISOString(),
        location: '',
        exitAltitude: 10000,
        notes: null,
        jumperCount: '',
        jumpType: ''
      }
    }
  },
  mounted () {
    if (localStorage.getItem('jumps')) {
      try {
        let jumpData = JSON.parse(localStorage.getItem('jumps'))
        this.jumps = jumpData
      } catch (e) {
        localStorage.removeItem('jumps')
      }
    }
  },
  computed: {
    sortedJumps () {
      return this.jumps.slice(0).sort((b, a) => parseFloat(a.jumpNumber) - parseFloat(b.jumpNumber))
    }
  },
  methods: {
    loadSampleData () {
      const parsed = JSON.stringify(this.logbook)
      localStorage.setItem('jumps', parsed)
      if (localStorage.getItem('jumps')) {
        try {
          let jumpData = JSON.parse(localStorage.getItem('jumps'))
          this.jumps = jumpData
        } catch (e) {
          localStorage.removeItem('jumps')
        }
      }
    },
    clearLogbook () {
      var clearLogbookConfirmation = confirm('Are you sure you want to clear your logbook? This cannot be undone!')
      if (clearLogbookConfirmation === true) {
        localStorage.removeItem('jumps')
        this.jumps = []
      } else {
        return false
      }
    },
    removeJump (x) {
      this.jumps.splice(this.jumps.findIndex(function (i) {
        return i.jumpNumber === x
      }), 1)
      // confirm('Jump Successfully Deleted');
      this.saveJumps()
    },
    jumpDate (d) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      const formattedDate = new Date(d).toLocaleDateString('en-US', options)
      return formattedDate
    }
  }
}
</script>

<style lang="scss">
// Mixins
@mixin mobile {
  @media screen and (max-width: $tablet - 1px) {
    @content;
  }
}
@mixin desktop {
  @media screen and (min-width: $desktop) {
    @content;
  }
}

// Logbook Page
.log {
  @include desktop() {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

// Jump Form
.jump-form {
  background: white;
  box-shadow: $box-shadow;
  color: $text-light;
  border-radius: $radius;
  overflow: hidden;
  margin-bottom: 2rem;
  &__header {
    padding: 1rem 1rem (1rem - px-rem(1px)) 1rem;
    color: $blue-grey-900;
    border-bottom: px-rem(1px) solid transparent;
  }
  &__content {
    padding: 1rem;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    padding: 0.75rem 0.5rem;
    background: hsl(210, 37.2%, 97%);
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
  // box-shadow: $box-shadow;
  // margin-bottom: 0.25rem;
  // border-radius: $radius;
  border-bottom: px-rem(1px) solid $blue-grey-100;
  display: flex;

  &__number {
    display: flex;
    justify-content: center;
    align-self: center;
    flex: 0 0 20%;
    font-size: 2rem;
    font-weight: bold;
    color: $blue-grey-900;
    @include desktop {
      flex: 0 0 6rem;
    }
  }
  &__overview {
    padding: 1rem;
  }
  &__date {
    font-weight: bold;
    text-transform: uppercase;
    color: $muted;
  }
  &__location {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
  &__type {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }
}
</style>
