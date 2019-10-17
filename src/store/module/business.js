import {
  getList,
  getbusinessByid,
  addbusiness,
  getbussdictlist,
  busstypes,
  bussdisable,
  bussenable,
  addbuss,
  getbussbyid,
  bussinesscf,
  subbussinesscf,
  getbussinesscf,
  getsubbussinesscf,
  putbuss,
  getbussinessbyId,
  getsubbussdictlist,
  subbussdisable,
  subbussenable,
  addsubbuss,
  putsubbuss
} from '@/api/business.js'

export default {
  state: {
    bussesslist: [],
    dictbussesslist: [],
    subdictbussesslist: [],
    dicttypes: []
  },
  actions: {
    getListAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getList(params).then(res => {
          commit('BUSINESSLIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getbusinessByidAction ({ commit, state }, companyid) {
      return new Promise((resolve, reject) => {
        getbusinessByid(companyid).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addbusinessAction ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        addbusiness(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getbussdictlistAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getbussdictlist(params).then(res => {
          commit('DICBUSSINESSLIST', res.data.info)
          resolve(res.data.info)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getsubbussdictlistAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getsubbussdictlist(params).then(res => {
          commit('SUBDICBUSSINESSLIST', res.data.info)
          resolve(res.data.info)
        }).catch(err => {
          reject(err)
        })
      })
    },
    subbussenableAction ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        subbussenable(id).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    subbussdisableAction ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        subbussdisable(id).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    busstypesAction ({ commit, state }) {
      return new Promise((resolve, reject) => {
        busstypes().then(res => {
          commit('BUSSTYPELIST', res.data.info)
          resolve(res.data.info)
        }).catch(err => {
          reject(err)
        })
      })
    },
    bussenableAction ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        bussenable(id).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    bussdisableAction ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        bussdisable(id).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addbussAction ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        addbuss(data).then(res => {
          console.log(res)
          resolve(res.data)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    addsubbussAction ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        addsubbuss(data).then(res => {
          console.log(res)
          resolve(res.data)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    getbussbyidAction ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        getbussbyid(id).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    bussinesscfAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        bussinesscf(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    subbussinesscfAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        subbussinesscf(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getbussinesscfAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getbussinesscf(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getsubbussinesscfAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getsubbussinesscf(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    putbussAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        putbuss(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    putsubbussAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        putsubbuss(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getbussinessbyIdAction ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        getbussinessbyId(id).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    BUSINESSLIST (state, res) {
      state.bussesslist = res
    },
    DICBUSSINESSLIST (state, res) {
      state.dictbussesslist = res
    },
    SUBDICBUSSINESSLIST (state, res) {
      state.subdictbussesslist = res
    },
    BUSSTYPELIST  (state, res) {
      state.dicttypes = res
    }
  },
  getters: {
    getlist (state) {
      return state.bussesslist
    },
    getdicbussinesslist (state) {
      return state.dictbussesslist
    },
    getsubdicbussinesslist (state) {
      return state.subdictbussesslist
    },
    getbusstypelist (state) {
      return state.dicttypes
    }
  }
}
