<template>
  <slot :name="slot.name" v-bind="slot.data" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      state: null,
      result: null,
      error: null,
    };
  },

  computed: {
    slot() {
      return {
        name: this.state,
        data: {
          result: this.result,
          error: this.error,
        },
      };
    },
  },

  watch: {
    promise: {
      immediate: true,
      handler() {
        this.state = 'pending';
        this.promise
          .then((value) => {
            this.state = 'fulfilled';
            this.result = value;
          })
          .catch((error) => {
            this.state = 'rejected';
            this.error = error;
          });
      },
    },
  },
};
</script>
