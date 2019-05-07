<template>
  <div class="unitOption" :class="{selectedOption: isSelected}">
    <div>
      {{ unitNum }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    unitNum: {
      type: null,
      default: 0
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .selectedOption {
    color: white;
    background-color: $accent--primary;
    border: 1px solid $accent--primary !important;
  }
  .unitOption {
    position: relative;
    border: 1px dashed $border-color--primary;
    padding: 3px 12px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 3px;
    cursor: pointer;
    div {
      margin-bottom: -4px;
    }
  }
</style>
