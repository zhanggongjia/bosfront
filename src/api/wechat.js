import axios from '@/libs/api.request'
export const getwechatall = (data) => {
  return axios.request({
    url: `/boss/dispatch/wxs/company/config/query/`,
    method: 'post',
    data: {
      page: data.page - 1,
      size: 20,
      companyId: data.companyId
    }
  })
}

export const addwechat = (data) => {
  return axios.request({
    url: `/boss/dispatch/wxs/company/config/add/`,
    method: 'post',
    data
  })
}

export const putwechat = (data) => {
  return axios.request({
    url: `/boss/dispatch/wxs/company/config/update/`,
    method: 'post',
    data
  })
}
