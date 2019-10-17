import axios from '@/libs/api.request'
import store from '@/store'
export const getList = (params) => {
  return axios.request({
    url: `/boss/business/assign/list`,
    params,
    method: 'get'
  })
}

// 根据公司获取已有的业务
export const getbusinessByid = (companyId) => {
  return axios.request({
    url: `/boss/business/assign/one/subBusinessType/${companyId}`,
    method: 'get'
  })
}

// 配置业务
export const addbusiness = (data) => {
  return axios.request({
    url: `/boss/business/assign/one`,
    data,
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}

// 业务大类下拉
export const busstypes = () => {
  return axios.request({
    url: `/dict/type_class`
  })
}
// 业务类别列表
export const getbussdictlist = (params) => {
  return axios.request({
    url: `/boss/dict/list`,
    params,
    method: 'get'
  })
}

// 业务类别列表 子
export const getsubbussdictlist = (params) => {
  return axios.request({
    url: `/boss/dictBusi/list`,
    params,
    method: 'get'
  })
}

// 大类停用 子
export const subbussdisable = (id) => {
  return axios.request({
    url: `/boss/dictBusi/one/disable/${id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}
// 大类启用 子
export const subbussenable = (id) => {
  return axios.request({
    url: `/boss/dictBusi/one/enable/${id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}

// 大类停用
export const bussdisable = (id) => {
  return axios.request({
    url: `/boss/dict/one/disable/${id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}
// 大类启用
export const bussenable = (id) => {
  return axios.request({
    url: `/boss/dict/one/enable/${id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}

export const addbuss = (params) => {
  return axios.request({
    url: `/boss/dict/one`,
    method: 'post',
    params,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}

// 查询详情
export const getbussbyid = (id) => {
  return axios.request({
    url: `/boss/dict/one/${id}`,
    method: 'get'
  })
}
export const putbuss = (params) => {
  return axios.request({
    url: `/boss/dict/one/${params.id}`,
    params,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    method: 'put'
  })
}
// 编辑业务
export const bussinesscf = (data) => {
  return axios.request({
    url: `/boss/business/assign/one/${data.companyId}/${data.business}`,
    data,
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}

export const addsubbuss = (params) => {
  return axios.request({
    url: `/boss/dictBusi/one`,
    method: 'post',
    params,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}

// 编辑业务
export const subbussinesscf = (data) => {
  return axios.request({
    url: `/boss/business/assign/oneSub/${data.companyId}/${data.business}/${data.businessTemplateId}`,
    // data,
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    }
  })
}

export const putsubbuss = (params) => {
  return axios.request({
    url: `/boss/dictBusi/one/${params.id}`,
    params,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    method: 'put'
  })
}

// 查询业务配置详情
export const getbussinesscf = (params) => {
  return axios.request({
    url: `/boss/business/assign/one/${params.companyId}/${params.business}`,
    method: 'get'
  })
}

// 查询业务配置详情
export const getsubbussinesscf = (params) => {
  return axios.request({
    url: `/boss/business/assign/oneSub/${params.companyId}/${params.business}`,
    method: 'get'
  })
}

// 业务字典详情信息
export const getbussinessbyId = (id) => {
  return axios.request({
    url: `/boss/dict/one/${id}`,
    method: 'get'
  })
}
