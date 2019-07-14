<template>
  <div class="log">
    <div class="jump-form">
      <h2>Add new jump</h2>

      <!-- Jump Number -->
      <div class="field">
        <label class="label">Jump Number</label>
        <div class="control">
          <input class="input" v-model.lazy.number="newJump.jumpNumber" type="number">
        </div>
        <!--<p class="help">This is a help text</p>-->
      </div>

      <!-- Location -->
      <!-- TODO: Use this for dropzone recommendation
      <input type="text" name="dropzones" list="dropzones" />
      <datalist id="dropzones">
        <option>Skydive CNY</option>
        <option>Skydive The Ranch</option>
        <option>Jumptown</option>
      </datalist>
      -->
      <div class="field">
        <label class="label">Location</label>
        <div class="control">
          <input class="input" type="text" name="dropzones" list="dropzones" v-model="newJump.location"/>
          <datalist id="dropzones">
            <option>Skydive CNY</option>
            <option>Skydive The Ranch</option>
            <option>Jumptown</option>
          </datalist>
        </div>
      </div>


      <!-- Exit Altitude -->
      <div class="field">
        <label class="label">Exit Altitude</label>
        <div class="control">
          <input v-model.lazy="newJump.exitAltitude" type="number" min="1500" max="15000"/>
        </div>
      </div>

      <!-- Jump Type -->
      <div class="field">
        <label class="label">Jump Type</label>
        <div class="control">
          <select v-model="newJump.jumpType">
            <option disabled value="">Select a Jump Type</option>
            <option>Formation Skydive</option>
            <option>Freefly</option>
            <option>Tracking</option>
            <option>Hop and Pop</option>
            <option>CReW</option>
            <option>Vertical Formation</option>
            <option>Wingsuit</option>
          </select>
        </div>
      </div>


      <!-- Jumper Count -->
      <div class="field">
        <label class="label">Jumper Count</label>
        <div class="control">
          <select v-model="newJump.jumperCount">
            <option disabled value="">Jumper Count</option>
            <option>Solo</option>
            <option>2 Way</option>
            <option>3 Way</option>
            <option>4 Way</option>
            <option>5 Way</option>
            <option>6 Way</option>
            <option>7 Way</option>
            <option>8 Way</option>
            <option>9+ Way</option>
          </select>
        </div>
      </div>

      <!-- Notes -->
      <div class="field">
        <label class="label">Notes</label>
        <div class="control">
          <textarea v-model.lazy="newJump.notes"/>
        </div>
      </div>

      <!-- Actions -->
      <button @click="addJump">Add Jump</button>
    </div>
    <!--<pre>{{ newJump }}</pre>-->

    <h2>All Jumps</h2>
    <!--
    <div class="jump-list" v-for="(jump, n) in jumps" :key="jump.name">
      <p>
        <span><pre>{{ jump }}</pre></span>
        <button @click="removeJump(n)">Delete Jump</button>
      </p>
    </div>
    -->
    <ol class="jumps">
      <li v-for="jump in sortedJumps" :key="jump.jumpNumber" class="jump">
        <p class="jump__number">{{ jump.jumpNumber }}</p>
        <div class="jump__overview">
          <p class="jump__date">{{ jumpDate(jump.date) }}</p>
          <p class="jump__location">{{ jump.location }}</p>
          <p class="jump__type"><span class="jump__jumper-count">{{ jump.jumperCount }}</span> {{ jump.jumpType }}</p>
          <!-- <p>Aircraft: {{ jump.aircraft }}</p> -->
          <!--<p>Altitude: {{ jump.exitAltitude.toLocaleString() }}</p>-->
          <!--<p>Delay: {{ jump.freefallDelay }}s</p>-->
          <!--<p>Notes: {{ jump.notes }}</p>-->
          <button>Edit</button>
          <button @click="removeJump(jump.jumpNumber)">Delete</button>
        </div>
      </li>
    </ol>

    <section class="logbook" v-show="false">
      <ol class="jumps">
        <li v-for="jump in logbook" :key="jump.jumpNumber" class="jump">
          <p class="jump__number">{{ jump.jumpNumber }}</p>
          <div class="jump__overview">
            <p class="jump__date">{{ jumpDate(jump.date) }}</p>
            <p>Location: {{ jump.location }}</p>
            <p>Aircraft: {{ jump.aircraft }}</p>
            <p>Altitude: {{ jump.exitAltitude }}</p>
            <!--<p>Delay: {{ jump.freefallDelay }}s</p>-->
            <!--<p>Notes: {{ jump.notes }}</p>-->
            <p>Type: {{ jump.jumpType }}</p>
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
// Generated from Mockaroo
// https://mockaroo.com/schemas/116940
import logbookData from '@/data/Logbook.json'

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
    addJump () {
      // Ensure that something is typed
      if (!this.newJump) {
        return
      }

      this.jumps.push(this.newJump)
      this.newJump = {
        id: null,
        jumpNumber: (this.sortedJumps[0].jumpNumber + 1),
        date: new Date().toISOString(),
        location: null,
        exitAltitude: 10000,
        notes: null,
        jumperCount: '',
        jumpType: null
      }
      this.saveJumps()
    },

    removeJump (x) {
      this.jumps.splice(this.jumps.findIndex(function (i) {
        return i.jumpNumber === x
      }), 1)
      this.saveJumps()
    },
    saveJumps () {
      const parsed = JSON.stringify(this.jumps)
      localStorage.setItem('jumps', parsed)
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
// Color
// Primary
$teal-050: #EFFCF6;
$teal-100: #C6F7E2;
$teal-200: #8EEDC7;
$teal-300: #65D6AD;
$teal-400: #3EBD93;
$teal-500: #27AB83;
$teal-600: #199473;
$teal-700: #147D64;
$teal-800: #0C6B58;
$teal-900: #014D40;

// Neutrals
$blue-grey-050: #F0F4F8;
$blue-grey-100: #D9E2EC;
$blue-grey-200: #BCCCDC;
$blue-grey-300: #9FB3C8;
$blue-grey-400: #829AB1;
$blue-grey-500: #627D98;
$blue-grey-600: #486581;
$blue-grey-700: #334E68;
$blue-grey-800: #243B53;
$blue-grey-900: #102A43;

// Semantic Colors
$text-light:  $blue-grey-800;
$background-light: $blue-grey-050;

$text-dark: $blue-grey-050;
$background-dark: $blue-grey-900;
$muted: $blue-grey-400;

// Radii
$radius: 6px;

// Shadows
$box-shadow: 0 30px 60px -12px rgba($blue-grey-700, 0.25),0 18px 36px -18px rgba(0,0,0,.3),0 -12px 36px -8px rgba(0,0,0,.025);

// Responsive Sizes
// 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
$tablet: 769px;
$desktop: 960px;
$widescreen: 1152px;
$fullhd: 1344px;

// Basic Type
h1,
h2,
h3,
h4 {
  font-weight: 400;
}

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
  border-top: 8px solid $teal-600;
  background: $background-light;
  color: $text-light;
  padding: 0.5rem;

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
  padding: 0.5rem;
  border-radius: $radius;

  label {
    // font-size: 0.75rem;
    font-weight: bold;
  }
  input,
  select,
  textarea {
    font-size: 1.125rem;
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
  box-shadow: $box-shadow;
  margin-bottom: 0.25rem;
  border-radius: $radius;
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
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    color: $muted;
  }
  &__location {
    font-size: 0.875rem;
  }
  &__type {
    font-size: 1.25rem;
  }
  p {
    margin: 0;
  }
}
</style>
