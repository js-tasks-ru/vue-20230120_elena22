import { createApp } from './vendor/vue.esm-browser.js';

const vm = createApp({
  data() {
    return {
      output: 0,
      numberOne: null,
      numberTwo: null
    };
  },
  computed: {
    sum () {
      return this.numberOne + this.numberTwo
    },
    subtract () {
      return this.numberOne - this.numberTwo
    },
    multiply () {
      return this.numberOne * this.numberTwo
    },
    divide () {
      return this.numberOne / this.numberTwo
    }
  },
  methods: {
    calc (operator) {
      switch (operator) {
        case 'sum':
          this.output = this.sum
          break
        case 'subtract':
          this.output = this.subtract
          break
        case 'multiply':
          this.output = this.multiply
          break
        case 'divide':
          this.output = this.divide
          break
      }
    }
  }
}).mount('#app');
