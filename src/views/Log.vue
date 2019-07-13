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
          <input v-model.lazy="newJump.location"/>
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

    <hr>
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
          <p>Location: {{ jump.location }}</p>
          <p>Aircraft: {{ jump.aircraft }}</p>
          <p>Altitude: {{ jump.exitAltitude }}</p>
          <!--<p>Delay: {{ jump.freefallDelay }}s</p>-->
          <!--<p>Notes: {{ jump.notes }}</p>-->
          <p>Type: {{ jump.jumpType }}</p>
          <button @click="removeJump(n)">Delete Jump</button>
        </div>
      </li>
    </ol>

    <hr>

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
        location: null,
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
.jumps {
  list-style-type: none;
  padding: 0.5rem;
}
.jump {
  background: #fff;
  margin-bottom: 0.25rem;
  border-radius: 4px;
  display: flex;

  &__number {
    display: flex;
    justify-content: center;
    align-self: center;
    flex: 0 0 20%;
    font-size: 2rem;
    font-weight: bold;
  }
  &__overview {
    padding: 1rem;
  }
  &__date {
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
  }
  p {
    margin: 0;
  }
}
</style>
