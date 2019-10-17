import { getShopList, shopAdd, shopEdit, shopDetail, shopdel, shopAddPrivileges, shopPrivilegesTree, enableshop } from '@/api/shop.js'
export default {
  state: {
    shoplist: []
  },
  actions: {
    getShopListAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getShopList(params).then(res => {
          commit('SHOPLIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    shopAddAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        shopAdd(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    shopDetailAction ({ commit, state }, companyId) {
      return new Promise((resolve, reject) => {
        shopDetail(companyId).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    shopEditAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        shopEdit(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    shopdelAction ({ commit, state }, companyId) {
      return new Promise((resolve, reject) => {
        shopdel(companyId).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    shopAddPrivilegesAction ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        shopAddPrivileges(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    shopPrivilegesTreeAction ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        shopPrivilegesTree(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    enableshopAction ({ commit, state }, companyId) {
      return new Promise((resolve, reject) => {
        enableshop(companyId).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    SHOPLIST (state, res) {
      state.shoplist = res
    }
  },
  getters: {
    getshoplist (state) {
      return state.shoplist
    }
  }
}
