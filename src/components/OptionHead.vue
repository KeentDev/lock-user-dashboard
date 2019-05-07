<template>
  <div class="step-row row y-center pull-apart" :class="{ active: isActive }">
    <div class="head" :class="{ selected: head != defaultHead }">
      {{ head }}
    </div>
    <div class="indicator">
      <div class="input_guide">
        <div>{{ label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    head: {
      type: null,
      default: ''
    },
    label: {
      type: String,
      default: 'Input your option'
    },
    isActive: {
      type: Boolean,
      default: false
    },
    defaultHead: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .input_guide {
    font-size: 12px;
    padding: 4px 18px;
    border: 1px dashed #E2E2E2;
    border-radius: 5px;
    div {
      margin-bottom: -2px;
    }
  }

  .active {
    .head {
      color: #212121;
    }
    .input_guide {
      color: $blue;
      border: 1px dashed $blue;
    }
  }

  .head.selected {
    color: $text-dark !important;
    font-weight: 400;
    font-size: 18px;
  }

  .head, .input_guide {
    color: #D0D0D0;
  }

  .head {
    font-weight: 800;
    font-size: 14px;
  }

  .input_guide {
    border: 1px dashed #E2E2E2;
  }

  .step-row {
    cursor: pointer;
  }

  span {
    font-size: 24px;
    color: #777;
  }
</style>
