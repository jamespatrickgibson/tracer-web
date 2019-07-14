<template>
  <div class="log">
    <div class="jump-form">
      <h2>Add new jump</h2>

      <!-- Jump Number -->
      <div class="field">
        <label class="label">Jump Number</label>
        <div class="control">
          <input class="t-input" v-model.lazy.number="newJump.jumpNumber" type="number">
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
          <input class="t-input" type="text" name="dropzones" list="dropzones" v-model="newJump.location"/>
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
          <select class="t-select" v-model="newJump.jumpType">
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
          <select class="t-select" v-model="newJump.jumperCount">
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
          <textarea class="t-textarea" v-model.lazy="newJump.notes"/>
        </div>
      </div>

      <!-- Actions -->
      <button @click="addJump" class="t-button is-primary">Add Jump</button>
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
          <button class="t-button">Edit</button>
          <button class="t-button" @click="removeJump(jump.jumpNumber)">Delete</button>
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
