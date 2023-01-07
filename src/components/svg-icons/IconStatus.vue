<template>
  <div>
    <div
      :class="{ 'message__status_not-read': isRead }"
      class="message__status"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    isRead: Boolean,
  },
}
</script>
<style>
.message__status {
  visibility: hidden;
  background: var(--color-gray);
  border-radius: 50%;
  width: 6px;
  height: 6px;
  min-width: 6px;
  min-height: 6px;
}
</style>
