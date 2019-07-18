<template>
  <section class="logbook-jumps">
    <!-- All Jumps -->
    <ol class="jumps">
      <router-link v-for="jump in jumps" :key="jump.id" class="jump" :to="'/jumps/' + jump.jumpNumber" tag="li">
        <p class="jump__number">{{ jump.jumpNumber }}</p>
        <div class="jump__overview">
          <p class="jump__type"><span class="jump__jumper-count">{{ jumperCountName(jump.jumperCount) }}</span> {{ jumpTypeName(jump.jumpType) }}</p>
          <p class="jump__location">{{ jump.location }}</p>
          <p class="jump__date">{{ jumpDate(jump.date) }}</p>
        </div>
      </router-link>
    </ol>
  </section>
</template>

<script>
import jumpOptionsData from '@/data/jump-options.json'

export default {
  name: 'logbook-detail',
  data () {
    return {
      jumpTypeOptions: jumpOptionsData.jumpTypeOptions,
      jumperCountOptions: jumpOptionsData.jumperCountOptions
    }
  },
  methods: {
    jumpDate (d) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const formattedDate = new Date(d).toLocaleDateString('en-US', options)
      return formattedDate
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
    jumps () {
      return this.$store.state.jumps.slice(0).sort((b, a) => parseFloat(a.jumpNumber) - parseFloat(b.jumpNumber))
    }
  }
}
</script>

<style lang="scss" scoped>
// Jump List
.jumps {
  list-style-type: none;
  padding: $space-s;
}
.jump {
  color: $text-light;
  display: flex;
  cursor: pointer;
  padding: $space-xs 0;

  &__number {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 3.5rem;
    font-size: px-rem(28px);
    font-weight: bold;
    color: $grey-500;
    background: $grey-700;
    border-radius: $radius;
    margin-bottom: $space-xs;
    @include desktop {
      flex: 0 0 6rem;
    }
  }
  &__overview {
    border-bottom: px-rem(1px) solid $grey-700;
    flex: 1 0 auto;
    margin-left: $space-m;
  }
  &__type {
    @include title-2;
    color: $white;
  }
  &__location {
    @include subhead;
    color: $muted;
    margin-bottom: $space-s;
  }
  &__date {
    @include caption-2();
    color: $grey-600;
    margin-bottom: $space-xs;
    text-transform: uppercase;
    display: none;
  }
}
</style>
