<template>
  <div class="log">
    <h1>Log</h1>
    <section class="logbook">
      <ol class="jumps">
        <li v-for="jump in logbook" :key="jump.id" class="jump"> 
          <!--<p>{{ jump.jumpNumber }}</p>-->
          <p>{{ jumpDate(jump.date) }}</p>
          <p>Location: {{ jump.location }}</p>
          <p>Aircraft: {{ jump.aircraft }}</p>
          <p>Altitude: {{ jump.exitAltitude }}</p>
          <p>Delay: {{ jump.freefallDelay }}s</p>
          <p>Notes: {{ jump.notes }}</p>
          <p>Type: {{ jump.jumpType }}</p>
        </li>
      </ol>
    </section>
    <pre>
      {{ logbook }}
    </pre>
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
  methods: {
    jumpDate(d) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(d).toLocaleDateString('en-US', options);
      return formattedDate;
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
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
