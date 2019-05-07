<template>
  <div class="card-cntr col pull-apart">
    <div class="head row pull-left y-center">
      <div class="title">
        <div>{{ title }}</div>
      </div>
      <div class="sub_title row center">
        <div>{{ sub_title }}</div>
      </div>
    </div>
    <div class="body row pull-left y-center series">
      <div class="area">
        {{ area }}
      </div>
      <div class="locker_num">
        {{ locker_num }}
      </div>
    </div>
    <div class="cta row pull-right">
      <div class="btn ghost-btn">
        <div class="cta-label">
          <router-link to="/unit">VIEW DASHBOARD</router-link>
        </div>
      </div>
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
    sub_title: {
      type: String,
      default: ''
    },
    area: {
      type: String,
      default: ''
    },
    locker_num: {
      type: String,
      default: ''
    },
  }
}
</script>


<style lang="scss" scoped>

.card-cntr {
  width: 22rem;
  height: 6rem;
  border: 1px solid $divider-color--secondary;
  border-radius: 7px;
  padding: 12px;
}

.title, .sub_title {
  font-size: 14px;
  color: #666;
}

.title {
  font-weight: 600;
  div {
    margin-bottom: -4px;
  }
}

.sub_title {
  div {
    margin-bottom: -4px;
  }
  &::before {
    content: '';
    display: block;
    height: 11px;
    width: 1px;
    background-color: $divider-color;
    margin: 0 10px;
  }
}

.body {
  height: 100%;
  margin-bottom: -4px;
}

.area, .locker_num {
  color: #AAA;
}

.area {
  font-weight: 600;
}

.locker_num {
  font-weight: 300;
}

.cta-label {
  a {
    color: $blue;
  }
}

</style>
