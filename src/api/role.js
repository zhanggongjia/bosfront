import axios from '@/libs/api.request'
import store from '@/store'
// 展示列表
export const rolelist = (params) => {
  return axios.request({
    url: `/role/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}&keyword=${params.keyword}`,
    method: 'get'

  })
}

// 创建用户角色
export const roleadd = (params) => {
  const data = {
    // eslint-disable-next-line no-unneeded-ternary
    consoleLogin: params.consoleLogin === '1' ? true : false,
    parentRole: params.parentRole,
    roleDesc: params.roleDesc,
    defaultModule: params.defaultModule,
    roleName: params.roleName
  }
  return axios.request({
    url: '/role/add',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    method: 'post'
  })
}

// 编辑用户角色
export const roleedit = (params) => {
  const data = {
    roleId: params.roleId,
    // eslint-disable-next-line no-unneeded-ternary
    consoleLogin: params.consoleLogin === '1' ? true : false,
    parentRole: params.parentRole,
    roleDesc: params.roleDesc,
    defaultModule: params.defaultModule,
    roleName: params.roleName,
    // eslint-disable-next-line no-unneeded-ternary
    state: params.state === '1' ? true : false
  }
  return axios.request({
    url: '/role/edit',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    method: 'post'
  })
}

// 查询详情
export const roledetail = (roleId) => {
  return axios.request({
    url: `/role/one/${roleId}`,
    method: 'get'
  })
}

// 角色树
export const roletree = () => {
  return axios.request({
    url: `/role/tree`,
    method: 'get'
  })
}

// 添加权限
export const roleprivilegesadd = (params) => {
  let data = {
    privileges: params.privileges,
    roleId: params.roleId
  }
  return axios.request({
    url: '/role/privileges',
    data,
    headers: {
      'Content-Type': 'application/json',
      'Token': store.state.user === undefined ? '' : store.state.user.token
    },
    method: 'post'
  })
}
// 根据角色查询用户角色
export const privilegesbyroleid = (roleId) => {
  return axios.request({
    url: `/role/privileges/${roleId}`,
    method: 'get'
  })
}
