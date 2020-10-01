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
  border-radius: 2rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 900;
  outline: none;
  transition: 0.1s all ease-out;

  &:hover {
    background-color: var(--button-hover-bg);
    color: var(--button-hover-text);
    border-radius: 1rem;
  }

  &:active {
    background-color: var(--button-active-bg);
    color: var(--button-active-text);
  }

  &:disabled {
    background-color: var(--button-disabled-bg);
    color: var(--button-disabled-text);
    cursor: not-allowed;
  }

  &.button-header {
    background-color: transparent;
    color: #000;
    border: 1px solid var(--border-color);

    &:hover {
      background-color: var(--bg-color);
      border: 1px solid var(--bg-color);
    }

    &:active {
      background-color: var(--button-active-bg);
      border: 1px solid var(--button-active-bg);
      color: var(--button-active-text) !important;
    }
  }

  &.button-choice {
    color: #000;
    background-color: transparent;
    border: 1px solid var(--border-color);

    &:hover {
      color: white;
      background-color: var(--button-hover-bg);
      border: 1px solid var(--button-hover-bg);
    }
  }
}
</style>
