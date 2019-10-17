import { getwechatall, addwechat, putwechat } from '@/api/wechat.js'
export default {
  state: {
    wechatalllist: []
  },
  actions: {
    getwechatallAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getwechatall(params).then(res => {
          commit('WECHATLLLIST', res.data.result)
          resolve(res.data.result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addwechatAction ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        addwechat(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    putwechatAction ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        putwechat(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    WECHATLLLIST (state, res) {
      state.wechatalllist = res
    }
  },
  getters: {
    getweichatalllist (state) {
      return state.wechatalllist
    }
  }
}
