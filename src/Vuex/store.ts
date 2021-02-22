import { applyMixin } from "./mixins";

let Vue
// type Vm = Vue;
export class Store {
  _mutations: any;
  _vm: typeof Vue = null;
  constructor(options) {
    const store: Store = this
    this._mutations = options.mutations
    const state = options.state;
    // bind commit and dispatch to self

    const { commit, dispatch } = this

    this.dispatch = function boundDispatch(type, payload) {
      dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload, options) {
      commit.call(store, type, payload, options)
    }
    resetStoreVM(this, state);
  }


  commit(type, payload, options) {
    this._mutations[type](this._vm.$$state, payload)
  }
  dispatch(type, payload) {

  }
}




function resetStoreVM(store: Store, state: any, hot?: boolean) {
  store._vm = new Vue({
    data: {
      $$state: state
    }
  })
}



export function install(_Vue) {
  if (Vue && _Vue === Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    )
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}