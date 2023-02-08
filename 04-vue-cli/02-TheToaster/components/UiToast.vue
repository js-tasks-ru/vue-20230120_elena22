<template>
  <div class="toast" :class="toast.class">
    <ui-icon class="toast__icon" :icon="toast.icon" />
    <span>{{ toast.message }}</span>
    <button class="toast__close" @click="$emit('close', toast.id)">x</button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
export default {
  name: 'UiToast',
  components: { UiIcon },
  props: {
    toast: {
      type: Object,
      requared: true
    }
  },
  emits: ['close']
}
</script>

<style>
  .toasts {
    position: fixed;
    bottom: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    white-space: pre-wrap;
    z-index: 999;
  }

  @media all and (min-width: 992px) {
    .toasts {
      bottom: 72px;
      right: 112px;
    }
  }

  .toast {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 18px;
    line-height: 28px;
    width: auto;
    position: relative;
  }

  .toast + .toast {
    margin-top: 20px;
  }

  .toast__icon {
    margin-right: 12px;
  }

  .toast.toast_success {
    color: var(--green);
  }

  .toast.toast_error {
    color: var(--red);
  }

  .toast__close {
    position: absolute;
    top: 0;
    right: 3px;
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
  }
  .toast__close:hover {
    border: 1px solid var(--green);
  }
</style>
