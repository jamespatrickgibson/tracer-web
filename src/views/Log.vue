<template>
  <div class="log">
    <h1>Logbook</h1>
    <div class="jump-form">
      <h2>Add new jump</h2>
      <p>
        <label>Jump Number
          <input v-model.number="newJump.jumpNumber" type="number"/>
        </label>
      </p>
      <p>
        <label>Location
          <select v-model="newJump.location">
            <option disabled value="">Select a Location</option>
            <option>Skydive CNY</option>
            <option>Skydive The Ranch</option>
            <option>Jumptown</option>
          </select>
        </label>
      </p>
      <p>
        <label>Exit Altitude
          <input v-model.lazy="newJump.exitAltitude" type="number" min="1500" max="15000"/>
        </label>
      </p>
      <p>
        <label>Notes
          <textarea v-model.lazy="newJump.notes"/>
        </label>
      </p>
      <p>
        <label>Jump Type
          <input v-model.lazy="newJump.jumpType"/>
        </label>
      </p>
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
      <li v-for="(jump, n) in sortedJumps" :key="jump.jumpNumber" class="jump">
        <p class="jump__number">{{ jump.jumpNumber }}</p>
        <div class="jump__overview">
          <p class="jump__date">{{ jumpDate(jump.date) }}</p>
          <p>{{ jump.location }}</p>
          <p>Aircraft: {{ jump.aircraft }}</p>
          <p>Altitude: {{ jump.exitAltitude }}</p>
          <!--<p>Delay: {{ jump.freefallDelay }}s</p>-->
          <!--<p>Notes: {{ jump.notes }}</p>-->
          <p>Type: {{ jump.jumpType }}</p>
          <button @click="removeJump(n)">Delete Jump</button>
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
        exitAltitude: null,
        notes: null,
        jumpType: null
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
        exitAltitude: null,
        notes: null,
        jumpType: null
      }
      this.saveJumps()
    },

    removeJump (x) {
      this.jumps.splice(x, 1)
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
$text-dark: $blue-grey-050;
$muted: $blue-grey-400;
$background-dark: $blue-grey-900;

// Radii
$radius: 4px;

// Logbook Page
.log {
  border-top: 8px solid $teal-600;
  background: $background-dark;
  color: $text-dark;
  padding-left: 1rem;
  padding-right: 1rem;
}

// Jump Form
.jump-form {
  background: white;
  color: $text-light;
  padding: 0.5rem;
  border-radius: $radius;

  label {
    font-size: 0.75rem;
    font-weight: bold;
  }
}
// Jump List
.jumps {
  list-style-type: none;
  padding: 0.5rem;
}
.jump {
  background: #fff;
  color: $text-light;
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
  p {
    margin: 0;
  }
}
</style>
