import axios from '@/libs/api.request'
import store from '@/store'
import qs from 'qs'
export const getShopList = (params) => {
  return axios.request({
    url: `/boss/company/list/enable`,
    params,
    method: 'GET'
  })
}
// 创建商户
export const shopAdd = (data) => {
  return axios.request({
    url: '/boss/company/add',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded ',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    method: 'POST'
  })
}

// 客户编辑
export const shopEdit = (data) => {
  return axios.request({
    url: '/boss/company/edit',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded ',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    method: 'POST'
  })
}
// 根据客户id 查询
export const shopDetail = (companyId) => {
  return axios.request({
    url: `/boss/company/one/${companyId}`,
    method: 'GET'
  })
}
export const shopdel = (companyId) => {
  return axios.request({
    url: `/boss/company/delete/${companyId}`,
    method: 'POST'
  })
}
// 启用合作
export const enableshop = (companyId) => {
  return axios.request({
    url: `/boss/company/enable/${companyId}`,
    method: 'POST'
  })
}

// 添加、取消权限
export const shopAddPrivileges = (data) => {
  return axios.request({
    url: '/boss/company/privileges/grant',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded ',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    method: 'POST'
  })
}

export const shopPrivilegesTree = (companyId) => {
  return axios.request({
    url: `/boss/company/privileges/tree/${companyId}`,
    method: 'GET'
  })
}
