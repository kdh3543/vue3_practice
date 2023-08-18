<template>
  <div
    class="toast-box alert"
    :class="status ? 'alert-success' : 'alert-danger'"
    role="alert"
  >
    {{ message }}
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
<style>
.toast-box {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>
