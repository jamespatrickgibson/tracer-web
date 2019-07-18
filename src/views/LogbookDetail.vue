<template>
  <section class="logbook-detail">
    <div class="logbook-detail__content">
      <p>Jump {{ jump.jumpNumber }}</p>
      <h1 class="t-large-title">{{ jumperCountName(jump.jumperCount) }} {{ jumpTypeName(jump.jumpType) }}</h1>
      <p class="jump__date">{{ jumpDate(jump.date) }}</p>
      <hr>
      <p>Aircraft: {{ jump.aircraft }}</p>
      <p>Location: {{ jump.location }}</p>
      <p>Exit Altitude: {{ jump.exitAltitude.toLocaleString() }}</p>
      <p>Deployment Altitude: {{ jump.deploymentAltitude.toLocaleString() }}</p>
      <p>Delay: {{ jump.freefallTime }}s</p>
      <p v-if="jump.cutaway">Cutaway!</p>
      <p>Notes: {{ jump.notes }}</p>
      <button class="t-button is-tertiary" @click="deleteJump()">Delete</button>
    </div>
  </section>
</template>

<script>
import jumpOptionsData from '@/data/jump-options.json'
export default {
  name: 'logbook-detail',
  data () {
    return {
      jumpData: this.$store.state.jumps,
      jumpTypeOptions: jumpOptionsData.jumpTypeOptions,
      jumperCountOptions: jumpOptionsData.jumperCountOptions
    }
  },
  methods: {
    deleteJump (id) {
      var deleteJumpConfirm = confirm('Are you sure you want to delete this jump? This action cannot be undone.')
      if (deleteJumpConfirm === true) {
        this.$store.commit('deleteJump', id)
        this.$router.push({ path: '/' })
      } else {
        return false
      }
    },
    jumperCountName (count) {
      let name = this.jumperCountOptions.find(o => o.value === count).text
      return name
    },
    jumpTypeName (value) {
      let name = this.jumpTypeOptions.find(o => o.value === value).text
      return name
    },
    jumpDate (d) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const formattedDate = new Date(d).toLocaleDateString('en-US', options)
      return formattedDate
    }
  },
  computed: {
    jump () {
      let number = Number(this.$route.params.jumpNumber)
      return this.jumpData.find(o => o.jumpNumber === number)
    }
  }
}
</script>

<style lang="scss" scoped>
.logbook-detail {
  padding-top: $app-padding-mobile-top;
  padding-bottom: $app-padding-mobile-bottom;
  color: $white;

  &__content {
    padding: ($space-m + $space-xs);
  }
  .t-button.has-icon {
    line-height: 1.5;
    margin-bottom: $space-l;
  }
}
</style>
