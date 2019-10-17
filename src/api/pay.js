import axios from '@/libs/api.request'
import store from '@/store'
import qs from 'qs'

export const getAllCompany = () => {
  console.log('...getAllCompany')
  return axios.request({
    url: `/boss/company/list/all`,
    method: 'get'
  })
}

export const getPayList = (params) => {
  return axios.request({
    url: `/boss/pay/list`,
    params,
    method: 'get'
  })
}
// 创建商户
export const payAdd = (data) => {
  return axios.request({
    url: '/boss/pay/add',
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
export const payEdit = (data) => {
  return axios.request({
    url: '/boss/pay/edit',
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
// 启用合作
export const enablePay = (companyId) => {
  return axios.request({
    url: `/boss/pay/enable/${companyId}`,
    method: 'POST'
  })
}

// 禁止合作
export const disablePay = (companyId) => {
  return axios.request({
    url: `/boss/pay/disable/${companyId}`,
    method: 'POST'
  })
}

export const payDetail = (id) => {
  return axios.request({
    url: `/boss/pay/detail/${id}`,
    method: 'get'
  })
}
