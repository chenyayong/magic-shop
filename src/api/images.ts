import request from '@/utils/request'

export const getImages = (params: any) =>
  request({
    url: '/images',
    method: 'get',
    params
  })
