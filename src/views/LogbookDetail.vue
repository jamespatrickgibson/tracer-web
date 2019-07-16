<template>
  <section class="logbook-detail">
    <router-link to="/" tag="button" class="t-button has-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M15 18l-6-6 6-6"/></svg>
      Back
    </router-link>
    <h1 class="t-large-title">{{ jumperCountName(jump.jumperCount) }} {{ jumpTypeName(jump.jumpType) }}</h1>
    <button class="t-button" @click="deleteJump()">Delete</button>
    <pre>{{ jump }}</pre>
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
  height: 100vh;
  padding: $space-m;
  .t-button.has-icon {
    line-height: 1.5;
    margin-bottom: $space-l;
  }
}
</style>
