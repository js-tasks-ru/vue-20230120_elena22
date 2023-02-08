<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast.id" :toast="toast" @close="closeToats"/>
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',
  components: { UiToast },
  data: () => ({
    toasts: []
  }),
  methods: {
    success(message) {
      const id = message;
      const timeOut = null
      this.toasts.push({
        id,
        icon: 'check-circle',
        class: 'toast_success',
        timeOut,
        message
      })
      this.hideToast(id, timeOut)
    },
    error(message) {
      const id = message;
      const timeOut = null
      this.toasts.push({
        id,
        icon: 'alert-circle',
        class: 'toast_error',
        timeOut,
        message
      })
      this.hideToast(id, timeOut)
    },
    closeToats (id) {
      this.toasts.forEach((el, i) => {
        if (el.id === id) this.toasts.splice(i, 1)
      })
    },
    hideToast(id, timeOut) {
      setTimeout(() => {
        this.closeToats(id);
      }, timeOut || 5000);
    },
  }
};
</script>

<style scoped></style>
