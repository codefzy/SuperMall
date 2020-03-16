import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action.js'
import mutations from './mutations.js'
import getters from './getters.js'


Vue.use(Vuex);


const state = {
  cartList:[]
}

const store = new Vuex.Store({

  //   1.state 里面填的是一些 公共数据，谁都可以拿到的那种
    state,
  //   2.mutations 里面定义的是一些方法,用来操作 上面 state 里面的数据之类的
    mutations,
   //  3.actions 里面 用来弄异步操作的东西，例如 请求url等用法
    actions,
  //   4.getters 相当于计算属性
    getters
})

export default store
