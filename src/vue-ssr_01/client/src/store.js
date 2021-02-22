
import Vue from 'vue'
import Vuex from 'vuex'
import { fetchData, changeData } from './api.js'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      one: '',
      two: '',
      three: ''
    },
    actions: {
      fetchData({ commit }, key) {
        return fetchData(key).then(res => {
          commit('SET_DATA', { key, data: res.data.data })
        })
      },

      changeData({ commit }) {
        return changeData().then(res => {
          commit('CHANGE_DATA', { data: res.data.data })
        })
      }
    },
    mutations: {
      SET_DATA(state, { key, data }) {
        state[key] = data
      },
      CHANGE_DATA(state, { data }) {
        state.one = data.one
        state.two = data.two
        state.three = data.three
      }
    }

  })
}