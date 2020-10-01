<template>
  <button
    :type="type || 'button'"
    @click="$emit('click')"
    class="button"
    :disabled="loading"
  >
    <UiLoading v-if="loading" />
    <slot v-else />
  </button>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    type: String,
  },
};
</script>

<style scoped lang="scss">
.button {
  background-color: var(--button-base-bg);
  color: var(--button-base-text);
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 900;
  outline: none;
  transition: 0.125s all ease-out;

  // &.button--submit {
  //   color: white;
  //   background-color: var(--primary-color);
  //   border: 1px solid var(--primary-color);

  //   &:hover {
  //     color: white;
  //     background-color: var(--primary-color);
  //     border: 1px solid var(--primary-color);
  //   }

  //   &:disabled {
  //     color: var(--link-color) !important;
  //     border: 1px solid var(--border-color);
  //     background-color: var(--border-color);
  //   }
  // }

  // &.button--active {
  //   border-color: var(--link-color) !important;
  // }

  &:hover {
    background-color: var(--button-hover-bg);
    color: var(--button-hover-text);
  }

  &:active {
    background-color: var(--button-active-bg);
    color: var(--button-active-text);
  }

  // &:disabled {
  //   color: var(--border-color) !important;
  //   cursor: not-allowed;
  // }
}
</style>
