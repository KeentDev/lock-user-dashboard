<template>
  <div id="app">
    <Header />
    <router-view class="main"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  data() {
    return {
      userValue: '',
      passValue: ''
    }
  },
  components: {
    Header
  },
  methods: {
    login: () => {
      // eslint-disable-next-line
      console.log(userValue, passValue)
    }
  },
}
</script>

<style lang="scss">
@import '@/scss/style.scss';
@import '@/scss/keen.scss';

.main {
  min-height: calc(100vh - 4rem);
  height: 100%;
}
</style>
