<template>
  <UiInput
    ref="ui-input"
    :modelValue="value"
    v-bind="$attrs"
    :type="type"
    :step="step"
    @input="handleInput">
    <template v-for="slotName in Object.keys($slots)" key="" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import moment from 'moment'
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',
  components: { UiInput },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    modelValue: {
      type: Number,
      default: null,
    },
    step: String
  },
  emits: ['update:modelValue'],
  computed: {
    value() {
      if (!this.modelValue) return null;
      let value;
      switch (this.type) {
        case 'date':
          value = moment(this.modelValue).utc().format('YYYY-MM-DD');
          break;
        case 'time':
          value = moment(this.modelValue).utc().format('HH:mm');
          break;
        case 'datetime-local':
          value = moment(this.modelValue).utc().format('YYYY-MM-DDTHH:mm');
          break;
        default:
          null;
          break;
      }
      return value;
    },
  },
  methods: {
    handleInput($event) {
      let target = $event.target.valueAsNumber;
      if (isNaN(target)) target = null;
      this.$emit('update:modelValue', target);
    },
  },
};
</script>
