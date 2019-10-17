import { funfile, getfunfileurl, getarea } from '@/api/func.js'
export default {
  state: {
    cstcompanylist: []
  },
  actions: {
    funfileAction ({ commit, state }, file) {
      return new Promise((resolve, reject) => {
        funfile(file).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getfunfileurlAction ({ commit, state }, path) {
      return new Promise((resolve, reject) => {
        getfunfileurl(path).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getareasAction ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getarea().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }

  },
  mutations: {

  },
  getters: {

  }
}
