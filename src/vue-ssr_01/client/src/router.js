
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/Home'
      },
      { 
        path: '/home',
        component: () => import('@/views/Home/Home'),
        children: [
          {
            path: 'two',
            component: () => import('@/views/Home/Two'),
            children: [
              {
                path: 'three',
                component: () => import('@/views/Home/Three'),
              }
            ]
          }
        ]
      },
      { 
        path: '/table',
        component: () => import('@/views/Table/Table'),
        children: [
          {
            path: '/table/two',
              component: () => import('@/views/Table/Two'),
              children: [
              {
                path: '/table/two/three',
                component: () => import('@/views/Table/Three'),
              }
            ]
          }
        ]
      },
    ]
  })
}