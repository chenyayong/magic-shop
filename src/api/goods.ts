import request from '@/utils/request'

export const getGoods = (params: any) =>
  request({
    url: '/goods',
    method: 'get',
    params
  })
