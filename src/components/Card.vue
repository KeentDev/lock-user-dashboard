<template>
  <div class="card-cntr col pull-apart" :class='{overdue: isOverdue}'>
    <div class="row pull-apart">
      <div v-show="showHead" class="head">
        {{ tag }}
      </div>
    </div>
    <div class="cta-cntr">
      <div v-show="showCta" class="cta-content col center">
        <div class="cta-desc">
          You have no rental unit yet.
        </div>
        <router-link to="/rental">
          <div class="cta-btn">
            <div>
              GET A UNIT
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row center pull-apart">
      <div class="metaInfo row center" v-show='showMetaInfo'>
        <div>
          {{ metaInfo }}
        </div>
      </div>
      <div v-show="showContent" class="content row pull-right stick-right">
        {{ head }}
      </div>
    </div>
    <div class="card-bg">
      <svg width="400" height="245" viewBox="0 0 400 245" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="245" rx="11" fill="url(#paint0_radial)" />
        <rect width="400" height="245" rx="11" fill="url(#paint1_linear)" />
        <rect width="400" height="245" rx="11" fill="url(#paint2_radial)" />
        <rect
          x="0.5"
          y="0.5"
          width="399"
          height="244"
          rx="10.5"
          stroke="black"
          stroke-opacity="0.05"
        />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(208.36 189.808) rotate(104.726) scale(430.088 642.908)"
          >
            <stop stop-color="#E9A3FB" />
            <stop offset="1" stop-color="#E9A3FB" stop-opacity="0" />
          </radialGradient>
          <linearGradient
            id="paint1_linear"
            x1="200"
            y1="0"
            x2="200.704"
            y2="316.346"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#417BEC" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <radialGradient
            id="paint2_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(331.833 -51.8269) rotate(127.984) scale(336.462 569.184)"
          >
            <stop stop-color="#50EABC" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tag: {
      type: String,
      default: ''
    },
    head: {
      type: null,
      default: ''
    },
    metaInfo: {
      type: String,
      default: ''
    },
    showCta: {
      type: Boolean,
      default: false
    },
    showContent: {
      type: Boolean,
      default: true
    },
    showHead: {
      type: Boolean,
      default: true
    },
    showMetaInfo: {
      type: Boolean,
      default: false
    },
    isOverdue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  }
}

</script>

<style lang="scss" scoped>
  .card-cntr {
    width: 400px;
    height: 245px;
    border-radius: 9px;
    padding: 1.5rem 1rem;
    padding-bottom: .75rem;
    position: relative;
    color: white;
    box-sizing: border-box;
  }

  .overdue {
    .metaInfo {
      background-color: $red;
    }
  }

  .content {
    font-size: 2.5rem;
  }

  .cta-cntr {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .head {
    opacity: .9;
  }

  .head, .content {
    font-weight: 600;
  }

  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .cta-desc {
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    white-space: nowrap;
    margin-bottom: .5rem;
  }

  .cta-btn {
    padding: 10px 2rem;
    border-radius: 7px;
    background-color: $blue;
    font-weight: 14px;
    font-weight: 600;
    cursor: pointer;
    div {
      margin-bottom: -4px;
    }
  }
     
  a {
    text-decoration: none;
    color: white;
  }

  .metaInfo {
    font-size: 14px;
    padding: 4px 11px;
    background-color: $blue;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    div {
      margin-bottom: -3px;
    }
  }
</style>
