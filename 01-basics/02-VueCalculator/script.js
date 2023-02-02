import { createApp } from './vendor/vue.esm-browser.js';

const vm = createApp({
  data() {
    return {
      numberOne: null,
      numberTwo: null,
      operator: null
    };
  },
  computed: {
    output () {
      let result = undefined
      switch (this.operator) {
        case 'sum':
          result = this.numberOne + this.numberTwo
          break;
        case 'subtract':
          result = this.numberOne - this.numberTwo
          break;
        case 'multiply':
          result = this.numberOne * this.numberTwo
          break;
        case 'divide':
          result = this.numberOne / this.numberTwo
          break;
      }
      return result;
    },
  },
}).mount('#app');
