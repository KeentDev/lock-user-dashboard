<template>
  <div>
    <div class="row pull-left y-center list" :class="{selectedOption: isSelected}">
      <div class="label">
        <div class="label-text">
          {{ label }}
        </div>
      </div>
      <div class="divider" />
      <div class="title">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'N/A'
    },
    label: {
      type: null,
      default: 'N/A'
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    position: relative;
    cursor: pointer;
  }
  .divider {
    height: 11px;
    width: 1px;
    margin-right: 12px;
    background-color: $divider-color--secondary;
    position: relative;
  }
  .label {
    position: absolute;
    font-family: 'Roboto';
    left: -12px;
    top: 50%;
    font-weight: 600;
    transform: translate(-100%, -50%);
    padding: 1px 8px;
    border: 1px solid $border-color--primary;
    border-radius: 3px;
    font-size: 10px;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: -4px;
  }
  .selectedOption {
    .title {
      color: $accent--primary;
    }
    .label {
      background-color: $accent--primary;
      color: white;
      border: 1px solid $accent--primary;
    }
  }
</style>
