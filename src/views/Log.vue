<template>
  <div class="log">
    <h1>Log</h1>
    <section class="logbook">
      <ol>
        <li v-for="jump in logbook" :key="jump.id">
          <!--<p>{{ jump.jumpNumber }}</p>-->
          <p>{{ jumpDate(jump.date) }}</p>
          <p>Location: {{ jump.location }}</p>
          <p>Aircraft: {{ jump.aircraft }}</p>
          <p>Altitude: {{ jump.exitAltitude }}</p>
          <p>Delay: {{ jump.freefallDelay }}</p>
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
