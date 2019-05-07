<template>
  <div class="tile-cntr col pull-apart" v-bind:class="{'first-child': isFirstChild}">
    <div class="title">
      {{ title }}
    </div>
    <div class="value-cntr col pull-right">
      <div class="value row">
        <div class="fix prefix">{{ prefix }}</div>
        <div class="value-body">{{ value }}</div>
        <div class="fix postfix">{{ postfix }}</div>
      </div>
      <div class="sub_value">
        {{ subValue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isFirstChild: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      default: ''
    },
    subValue: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    postfix: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

.tile-cntr {
  width: 11rem;
  height: 5rem;
  border-right: 1px solid $divider-color--secondary;
  margin: 1rem 0;
  padding: 0 1rem;
  padding-bottom: .75rem;
  &.first-child {
    border-left: 1px solid $divider-color--secondary;
  }
}

.title {
  font-size: 12px;
  font-weight: 600;
  color: #AAA;
}

.value-body {
  font-size: 24px;
  font-weight: 600;
  color: #555;
  line-height: 1em;
}

.prefix {
  margin-right: 4px;
}

.fix {
  font-size: 12px;
  color: #555;
}

.sub_value {
  font-size: 12px;
  color: #555;
  font-weight: 600;
}

</style>
