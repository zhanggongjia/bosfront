import { getbannerall, addbanner, putbanner } from '@/api/banner.js'
export default {
  state: {
    bannerlists: []
  },
  actions: {
    getbannerallAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getbannerall(params).then(res => {
          commit('BANNERLIST', res.data.result)
          resolve(res.data.result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addbannerAction ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        addbanner(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    putbannerAction ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        putbanner(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    BANNERLIST (state, res) {
      state.bannerlists = res
    }
  },
  getters: {
    getbannerlist (state) {
      return state.bannerlists
    }
  }
}
