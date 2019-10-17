import { getModule, getBusinessTree, getBusinessList, getprovince, getcity, getarea, getFieldTypeList, getSelectContent } from '@/api/dict.js'
export default {
  state: {
    dictList: [],
    businessList: [],
    businessTree: [],
    provinceList: [],
    cityList: [],
    areaList: [],
    fieldList: [],
    contentList: []
  },
  actions: {
    getModuleAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getModule(params).then(res => {
          commit('DICTLIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getBusinessListAction ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getBusinessList().then(res => {
          commit('BUSINESSLIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getBusinessTreeAction ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getBusinessTree().then(res => {
          commit('BUSINESSTREE', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getprovinceAction ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getprovince().then(res => {
          commit('PROVINCELIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getcityAction ({ commit, state }, province) {
      return new Promise((resolve, reject) => {
        getcity(province).then(res => {
          commit('CITYLIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getareaAction ({ commit, state }, city) {
      return new Promise((resolve, reject) => {
        getarea(city).then(res => {
          commit('AREALIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getFieldTypeListAction ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getFieldTypeList().then(res => {
          commit('FIELDTYPELIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getSelectContentAction ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getSelectContent().then(res => {
          commit('SELECTCONTENT', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    DICTLIST (state, res) {
      state.dictList = res
    },
    BUSINESSLIST (state, res) {
      state.businessList = res
    },
    BUSINESSTREE (state, res) {
      state.businessTree = res
    },
    PROVINCELIST (state, res) {
      state.provinceList = res
    },
    CITYLIST (state, res) {
      state.cityList = res
    },
    AREALIST (state, res) {
      state.areaList = res
    },
    FIELDTYPELIST (state, res) {
      state.fieldList = res
    },
    SELECTCONTENT (state, res) {
      state.contentList = res
    }
  },
  getters: {
    getdictlist (state) {
      return state.dictList
    },
    getbusinesslist (state) {
      return state.businessList
    },
    getbusinesstree (state) {
      return state.businessTree
    },
    getprovincelist (state) {
      return state.provinceList
    },
    getcitylist (state) {
      return state.cityList
    },
    getarealist (state) {
      return state.areaList
    },
    getfieldlist (state) {
      return state.fieldList
    },
    getcontentlist (state) {
      return state.contentList
    }
  }
}
