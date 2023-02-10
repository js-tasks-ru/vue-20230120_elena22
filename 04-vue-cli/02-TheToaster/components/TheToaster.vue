<template>
  <div class="toasts">
    <ui-toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      @close="closeToats(toast.id)"
      />
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
      const id = Math.random();
      const timeOut = null
      this.toasts.push({
        id,
        timeOut,
        message,
        type: 'success'
      })
      this.hideToast(id, timeOut)
    },
    error(message) {
      const id = Math.random();
      const timeOut = null
      this.toasts.push({
        id,
        timeOut,
        message,
        type: 'error'
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
