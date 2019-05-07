<template>
  <div class="tile-cntr col pull-apart -card--lvl-0" v-bind:class="{secondary: isSecondary, compact: isCompact}">
    <div class="title">{{ title }}</div>
    <div class="content row pull-right y-center">
      <span class="prefix">{{ prefix }}</span>
      <span class="value">{{ value }}</span>
      <span class="postfix" v-bind:class="{'stick-bottom': fixBottom}">{{ postfix }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSecondary: {
      type: Boolean,
      default: true
    },
    isCompact: {
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
    prefix: {
      type: null,
      default: ''
    },
    postfix: {
      type: null,
      default: ''
    },
    fixBottom: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .compact {
    &.tile-cntr {
      max-width: 7rem;
      max-height: 5rem;
    }
    .title {
      opacity: .55 !important;
    }
    .content {
      font-size: 28px !important;
    }
  }
  .tile-cntr {
    width: 100%;
    height: 6rem;
    border-radius: 10px;
    background-color: #222;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: white;
    .title {
      font-size: 11px;
      opacity: .75;
      font-weight: 600;
      margin: 12px 9px;
    }
    .content {
      font-size: 24px;
      padding: 4px;
      color: lighten($blue, 10%);
      padding: 0 12px;
      height: 2.5rem;
      background-color: #222;
    }
  }
  .prefix {
    font-weight: 600;
    opacity: .5;
    font-size: 12px;
    margin-right: 4px;
    margin-top: 2px;
  }
  .value {
    line-height:.8em;
    font-family: 'Operator Mono', serif;
    font-weight: 500;
  }
  
  .postfix {
    font-size: 18px;
    &.stick-bottom {
      padding-bottom: 4px;
    }
  }

  .secondary {
    background-color: white;
    color: #333;
    .content {
      color: #333;
      background-color: #F7F7F7;
    }
  }
</style>