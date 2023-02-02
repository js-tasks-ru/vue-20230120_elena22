import { createApp } from './vendor/vue.esm-browser.js';

const vm = createApp({
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    count () {
      this.counter += 1
    }
  }
}).mount('#app');

