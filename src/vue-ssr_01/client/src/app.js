import Vue from 'vue'
import { createRouter } from './router'
import { createStore } from './store'
import App from './App.vue'


export function createApp() {

  const store = createStore()
  const router = createRouter()


  const app = new Vue({
    store,
    router,

    render: h => (h(App))
  })

  return {
    store,
    router,
    app
  }

}