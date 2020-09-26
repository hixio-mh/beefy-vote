<template>
  <img
    :src="url"
    class="d-inline-block v-align-middle line-height-0"
    :style="{
      width: `${size || 22}px`,
      height: `${size || 22}px`
    }"
  />
</template>

<script>
export default {
  props: ['space', 'size', 'symbolIndex'],
  computed: {
    url() {
      return require(`@/spaces/${this.space}/logo.png`);
    }
  }
};
</script>
