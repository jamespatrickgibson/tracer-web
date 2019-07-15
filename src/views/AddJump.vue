<template>
  <section class="add-jump">
    <pre>{{ jumpData }}</pre>
    <div class="jump-form">
      <div class="jump-form__header">
        <h2 class="t-title-3">Add Jump</h2>
      </div>
      <div class="jump-form__content">
        <!-- Jump Number -->
        <div class="t-field">
          <label class="t-label">Jump Number</label>
          <div class="control">
            <input class="t-input" v-model.lazy.number="jumpData.jumpNumber" type="number">
          </div>
          <!--<p class="help">This is a help text</p>-->
        </div>

        <!-- Location -->
        <div class="t-field">
          <label class="t-label">Location</label>
          <div class="control">
            <input class="t-input" type="text" name="dropzones" list="dropzones" v-model="jumpData.location"/>
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
            <input class="t-input" v-model.lazy="jumpData.exitAltitude" type="number" min="1500" max="15000"/>
          </div>
        </div>

        <!-- Jump Type -->
        <div class="t-field">
          <label class="t-label">Jump Type</label>
          <div class="control">
            <select class="t-select" v-model="jumpData.jumpType">
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
            <select class="t-select" v-model="jumpData.jumperCount">
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
            <textarea class="t-textarea" v-model.lazy="jumpData.notes"/>
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
      jumpData: {
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
    let lastJump = this.$store.state.jumps.slice(0).sort((b, a) => parseFloat(a.jumpNumber) - parseFloat(b.jumpNumber))[0]
    this.jumpData.id = lastJump.id + 1
    this.jumpData.jumpNumber = lastJump.jumpNumber + 1
    this.jumpData.location = lastJump.location
    this.jumpData.exitAltitude = lastJump.exitAltitude
    this.jumpData.notes = lastJump.notes
    this.jumpData.jumperCount = lastJump.jumperCount
    this.jumpData.jumpType = lastJump.jumpType
  },
  methods: {
    addJump () {
      this.$store.commit('addJump', this.jumpData)
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
.add-jump {
  min-height: 100vh;
}
</style>
