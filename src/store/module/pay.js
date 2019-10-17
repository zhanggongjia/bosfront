import { getAllCompany, getPayList, payAdd, payEdit, payDetail, enablePay, disablePay } from '@/api/pay.js'
export default {
  state: {
    paylist: [],
    companylist: []
  },
  actions: {
    getAllCompanysAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getAllCompany(params).then(res => {
          commit('ALLCOMPANY', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getPayListAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getPayList(params).then(res => {
          commit('PAYLIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    payAddAction ({ commit, state }, params) {
      console.log('...payAddAction', params)
      return new Promise((resolve, reject) => {
        payAdd(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    payDetailAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        payDetail(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    payEditAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        payEdit(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    enablepayAction ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        enablePay(id).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    disablepayAction ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        disablePay(id).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    PAYLIST (state, res) {
      state.paylist = res
    },
    ALLCOMPANY (state, res) {
      state.companylist = res
    }
  },
  getters: {
    getpaylist (state) {
      console.log(state)
      return state.paylist
    },
    getallcompanys (state) {
      console.log(state)
      return state.companylist
    }
  }
}
