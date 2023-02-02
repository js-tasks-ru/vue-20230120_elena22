import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: {
    count:{
      type: Number,
      default: () => 0
    }
  },
  emits: ['update:count'],
  computed: {
    value: {
      get() {
        return this.count
      },
      set(value) {
        this.$emit('update:count', value)
      }
    }
  },

  template: `<button type="button" @click="value+=1">{{count}}</button>`,
});
