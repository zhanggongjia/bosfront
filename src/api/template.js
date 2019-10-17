import axios from '@/libs/api.request'
import store from '@/store'
// 创建模板
export const templateAdd = (data) => {
  return axios.request({
    url: '/boss/business/template/add',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    method: 'POST'
  })
}

export const templateCopy = (data) => {
  return axios.request({
    url: '/boss/business/template/copyTemplate',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    method: 'POST'
  })
}

export const templateList = (params) => {
  return axios.request({
    url: '/boss/business/template/list',
    params,
    method: 'GET'
  })
}

export const getAlltemplateList = (params) => {
  return axios.request({
    url: '/boss/business/template/listAll',
    params,
    method: 'GET'
  })
}

// 模板编辑
export const templateEdit = (data) => {
  return axios.request({
    url: '/boss/business/template/edit',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    method: 'PUT'
  })
}

// 获取详情
export const gettemplate = (templateId) => {
  return axios.request({
    url: `/boss/business/template/one/${templateId}`,
    method: 'GET'
  })
}

// 删除模板
export const deltemplate = (templateId) => {
  return axios.request({
    url: `/boss/business/template/one/${templateId}`,
    method: 'DELETE'
  })
}

// 删除步骤
export const delstepIdbyId = (params) => {
  return axios.request({
    url: `/boss/business/template/${params.templateId}/step/${params.stepId}`,
    method: 'DELETE'
  })
}
