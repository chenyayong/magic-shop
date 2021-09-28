import request from '@/utils/request'
export const getShops = (params: any) =>
  request({
    url: '/shops',
    method: 'get',
    params
  })
