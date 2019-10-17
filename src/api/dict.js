import axios from '@/libs/api.request'
export const getModule = (params) => {
  return axios.request({
    url: `/dict/module`,
    method: 'get'
  })
}
// 省
export const getprovince = () => {
  return axios.request({
    url: `/dict/province`,
    method: 'get'
  })
}
// 市
export const getcity = (province) => {
  return axios.request({
    url: `/dict/city/${province}`,
    method: 'get'
  })
}

// 区
export const getarea = (city) => {
  return axios.request({
    url: `/dict/city/${city}`,
    method: 'get'
  })
}

// 获取业务类型字典
export const getBusinessList = () => {
  return axios.request({
    url: `/dict/business_type `,
    method: 'get'
  })
}

// 获取业务类型字典 tree
export const getBusinessTree = () => {
  return axios.request({
    url: `/dict/getBusinessType `,
    method: 'get'
  })
}
// innerFields
export const getFieldTypeList = () => {
  return axios.request({
    url: `/dict/field_type`,
    method: 'get'
  })
}

// 下拉选项
export const getSelectContent = () => {
  return axios.request({
    url: `/dict/select_content`,
    method: 'get'
  })
}
