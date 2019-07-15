<template>
  <section class="add-jump">
    <h1 class="t-title-large">Add Jump</h1>
    <div class="jump-form">
      <div class="jump-form__header">
        <h2 class="t-title-3">Add Jump</h2>
      </div>
      <div class="jump-form__content">
        <!-- Jump Number -->
        <div class="t-field">
          <label class="t-label">Jump Number</label>
          <div class="control">
            <input class="t-input" v-model.lazy.number="newJump.jumpNumber" type="number">
          </div>
          <!--<p class="help">This is a help text</p>-->
        </div>

        <!-- Location -->
        <div class="t-field">
          <label class="t-label">Location</label>
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
        <div class="t-field">
          <label class="t-label">Exit Altitude</label>
          <div class="control">
            <input class="t-input" v-model.lazy="newJump.exitAltitude" type="number" min="1500" max="15000"/>
          </div>
        </div>

        <!-- Jump Type -->
        <div class="t-field">
          <label class="t-label">Jump Type</label>
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
        <div class="t-field">
          <label class="t-label">Jumper Count</label>
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
        <div class="t-field">
          <label class="t-label">Notes</label>
          <div class="control">
            <textarea class="t-textarea" v-model.lazy="newJump.notes"/>
          </div>
        </div>
      </div>
      <div class="jump-form__actions">
        <button @click="addJump" class="t-button is-primary">Add Jump</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'add-jump',
  data () {
    return {
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
  methods: {
    addJump () {
      // Ensure that something is typed
      if (!this.newJump) {
        return
      }

      this.jumps.push(this.newJump)
      this.newJump = {
        id: null,
        jumpNumber: '',
        date: new Date().toISOString(),
        location: null,
        exitAltitude: 10000,
        notes: null,
        jumperCount: '',
        jumpType: null
      }
      this.saveJumps()
      this.$router.push({ path: '/' })
    },
    saveJumps () {
      const parsed = JSON.stringify(this.jumps)
      localStorage.setItem('jumps', parsed)
    },
  }
}
</script>
