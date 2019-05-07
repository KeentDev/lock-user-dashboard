<template>
  <div class="tile-cntr col pull-apart -card--lvl-0" :class='{overdue: isOverdue}'>
    <div class="title">{{ title }}</div>
    <div class="content row center">
      <span class="value">{{ ctaName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    ctaName: {
      type: null,
      default: ''
    },
    isOverdue: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .tile-cntr {
    width: 100%;
    height: 6rem;
    border-radius: 10px;
    background-color: lighten($blue, 30%);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: darken($blue, 15%);
    cursor: pointer;
    .title {
      font-size: 11px;
      opacity: .75;
      font-weight: 600;
      margin: 12px 9px;
    }
    .content {
      font-size: 20px;
      font-weight: 600;
      padding: 4px;
      color: white;
      padding: 0 12px;
      height: 2.5rem;
      background-color: $blue;
    }
  }

  .overdue {
    background-color: #ffe9e9;
    .content {
      background-color: #d66868;
      font-size: 16px;
    }
    .title {
      color: darken(#d66868, 10%);
    }
  }
</style>