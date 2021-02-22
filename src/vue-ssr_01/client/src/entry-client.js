
// 前端激活


// import { create } from 'lodash'
import Vue from 'vue'
import { createApp } from './app'


const { store, router, app } = createApp()

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options

    if (asyncData) {}
  },

  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options


    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})