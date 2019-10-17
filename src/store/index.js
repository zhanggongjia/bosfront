import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import role from './module/role'
import dict from './module/dict'
import shop from './module/shop'
import pay from './module/pay'
import tmpl from './module/template'
import business from './module/business'
import func from './module/func'
import banner from './module/banner'
import wechat from './module/wechat'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    role,
    dict,
    shop,
    pay,
    tmpl,
    business,
    func,
    banner,
    wechat
  }
})
