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
            <input class="t-input" type="text" name="dropzones" list="dropzones" v-model="jumpData.location" placeholder="Dropzone name"/>
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
              <option v-for="option in jumpTypeOptions" :key="option.value" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
            <!--
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
            -->
          </div>
        </div>

        <!-- Jumper Count -->
        <div class="t-field">
          <label class="t-label">Jumper Count</label>
          <div class="control">
            <select class="t-select" v-model="jumpData.jumperCount">
              <option v-for="option in jumperCountOptions" :key="option.value" v-bind:value="option.value">
                {{ option.text }}
              </option>
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
        id: 1,
        jumpNumber: 1,
        date: new Date().toISOString(),
        location: '',
        aircraft: '',
        exitAltitude: 13500,
        deploymentAltitude: 4500,
        freefallTime: 60,
        cutaway: false,
        jumperCount: 1,
        jumpType: 'fs',
        notes: null
      },
      jumpTypeOptions: [
        { text: 'Formation Skydive', value: "fs" },
        { text: 'Freefly', value: "ff" },
        { text: 'Tracking', value: "tr" },
        { text: 'Hop and Pop', value: "hp" },
        { text: 'CReW', value: "cr" },
        { text: 'Vertical Formation', value: "vfs" },
        { text: 'Wingsuit', value: "ws" }
      ],
      jumperCountOptions: [
        { text: 'Solo',   value: "1" },
        { text: '2 Way',  value: "2" },
        { text: '3 Way',  value: "3" },
        { text: '4 Way',  value: "4" },
        { text: '5 Way',  value: "5" },
        { text: '6 Way',  value: "6" },
        { text: '7 Way',  value: "7" },
        { text: '8 Way',  value: "8" },
        { text: '9+ Way', value: "9" }
      ]
    }
  },
  mounted () {
    let lastJump = this.$store.state.jumps.slice(0).sort((b, a) => parseFloat(a.jumpNumber) - parseFloat(b.jumpNumber))[0]
    if (lastJump != null) {
      this.jumpData.id = lastJump.id + 1
      this.jumpData.jumpNumber = lastJump.jumpNumber + 1
      this.jumpData.location = lastJump.location
      this.jumpData.aircraft = lastJump.aircraft
      this.jumpData.exitAltitude = lastJump.exitAltitude
      this.jumpData.deploymentAltitude = lastJump.deploymentAltitude
      this.jumpData.freefallTime = lastJump.freefallTime
      this.jumpData.cutaway = lastJump.cutaway
      this.jumpData.jumperCount = lastJump.jumperCount
      this.jumpData.jumpType = lastJump.jumpType
      this.jumpData.notes = lastJump.notes
    }
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
