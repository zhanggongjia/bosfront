import { templateCopy, templateAdd, templateList, getAlltemplateList, templateEdit, gettemplate, deltemplate, delstepIdbyId } from '@/api/template.js'
export default {
  state: {
    templists: [],
    alltemplists: []
  },
  actions: {
    templateAddAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        const theBusinessType = [...params.businessType]
        params.businessType = theBusinessType[0]
        params.subBusinessType = theBusinessType[1]
        templateAdd(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    templateListAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        templateList(params).then(res => {
          commit('TEMPLATELIST', res.data.info)
          if (res.data.code === '0') {
            resolve({
              content: []
            })
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    allTemplateListAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getAlltemplateList(params).then(res => {
          commit('ALLTEMPLATELIST', res.data.info)
          if (res.data.code === '0') {
            resolve({
              content: []
            })
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    templateEditAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        const theBusinessType = [...params.businessType]
        params.businessType = theBusinessType[0]
        params.subBusinessType = theBusinessType[1]
        templateEdit(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    templateCopyAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        const theBusinessType = [...params.businessType]
        params.businessType = theBusinessType[0]
        params.subBusinessType = theBusinessType[1]
        templateCopy(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    gettemplateAction ({ commit, state }, templateid) {
      return new Promise((resolve, reject) => {
        gettemplate(templateid).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    deltemplateAction ({ commit, state }, templateid) {
      return new Promise((resolve, reject) => {
        deltemplate(templateid).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delstepIdbyIdAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        delstepIdbyId(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    TEMPLATELIST (state, res) {
      state.templists = res
    },
    ALLTEMPLATELIST (state, res) {
      state.alltemplists = res
    }
  },
  getters: {
    gettemplatelist (state) {
      return state.templists
    },
    getalltemplatelist (state) {
      return state.alltemplists
    }
  }
}
