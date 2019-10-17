import { rolelist, roleadd, roleedit, roledetail, roletree, roleprivilegesadd, privilegesbyroleid } from '@/api/role.js'
// import privilegeslist from '../../power/index.json'
const privilegeslist = require('../../power/index.json')
export default {
  state: {
    roleList: [],
    roleTree: []
  },
  actions: {
    getroleListAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        rolelist(params).then(res => {
          commit('ROlELIST', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    roleaddAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        roleadd(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    roleeditAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        roleedit(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    roledetailAction ({ commit, state }, roleId) {
      return new Promise((resolve, reject) => {
        roledetail(roleId).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    roletreeAction ({ commit, state }) {
      return new Promise((resolve, reject) => {
        roletree().then(res => {
          commit('ROLETRER', res.data.info)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    roleprivilegesaddAction ({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        roleprivilegesadd(params).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    privilegesbyroleidAction ({ commit, state }, roleid) {
      return new Promise((resolve, reject) => {
        privilegesbyroleid(roleid).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    privilegesListAction ({ commit, state }, roleid) {
      return new Promise((resolve, reject) => {
        resolve(privilegeslist)
      })
    }
  },
  mutations: {
    ROlELIST (state, res) {
      state.roleList = res
    },
    ROLETRER (state, res) {
      state.roleTree = res
    }
  },
  getters: {
    getrolelist (state) {
      return state.roleList
    },
    getroletree (state) {
      return state.roleTree
    }
  }
}
