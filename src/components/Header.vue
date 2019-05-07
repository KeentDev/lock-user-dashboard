<template>
  <nav id="site-nav" class="row center">
    <div class="nav-wrap row pull-apart y-center">
      <div class="site-brand row y-center">
        <router-link to="/">
          <div class="logo row center">
            <img src="@/assets/icons/lock--light.svg" alt="LOCK icon">
          </div>
        </router-link>
        
        <div class="divider" />
        <div class="page-sub_header">
          Automated Rental Locker System
        </div>
      </div>
      <div class="site-cta">
        <router-link to="/login" v-show="this.$store.getters.isLoggedIn">
          <div class="btn ghost-btn --guide">
            <div class="--guide">
              <div>A</div>
            </div>
            <div class="cta-label">Logout</div>
          </div> 
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>

.nav-wrap {
  max-width: $max-width;
  width: 100%;
}

nav {
  height: 4rem;
}

.divider {
  height: 11px;
  width: 1px;
  background-color: #CECECE;
  margin: 0 1rem;
}

.page-sub_header {
  font-weight: 600;
  color: #919191;
  font-size: 14px;
}

.cta-btn {
  font-color: #333;
  font-size: 14px;
  font-weight: 600;
}

a {
  text-decoration: none;
}

</style>
