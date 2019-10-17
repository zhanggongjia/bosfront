import axios from '@/libs/api.request'
export const funfile = (file) => {
  return axios.request({
    url: `/func/upload`,
    method: 'post',
    file,
    headers: {
      'Content-Type': ' multipart/form-data; ',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}
// 换取文件地址
export const getfunfileurl = (path) => {
  return axios.request({
    url: `/func/url?path=${path}`,
    method: 'get'

  })
}

// 查询地区
export const getarea = () => {
  return axios.request({
    url: `/area`,
    method: 'get'
  })
}
