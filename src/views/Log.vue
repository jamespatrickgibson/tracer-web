<template>
  <div class="log">
    <h1>Log</h1>
    <section class="logbook">
      <ol class="jumps">
        <li v-for="jump in sortedJumps" :key="jump.jumpNumber" class="jump">
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
      logbook: logbookData
    }
  },
  computed: {
    sortedJumps () {
      return this.logbook.slice(0).sort((b, a) => parseFloat(a.jumpNumber) - parseFloat(b.jumpNumber))
    }
  },
  methods: {
    jumpDate (d) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      const formattedDate = new Date(d).toLocaleDateString('en-US', options)
      return formattedDate
    },
    sortItems () {
      // homes.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
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
