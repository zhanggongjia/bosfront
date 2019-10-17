import axios from '@/libs/api.request'
export const getbannerall = (data) => {
  return axios.request({
    url: `/boss/dispatch/wxs/company/banner/query/`,
    method: 'post',
    data: {
      page: data.page - 1,
      size: 20,
      companyId: data.companyId

    }
  })
}

export const addbanner = (data) => {
  return axios.request({
    url: `/boss/dispatch/wxs/company/banner/add/`,
    method: 'post',
    data
  })
}

export const putbanner = (data) => {
  return axios.request({
    url: `/boss/dispatch/wxs/company/banner/update/`,
    method: 'post',
    data
  })
}
