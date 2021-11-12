import request from '@/utils/request'
export const getShops = (params?: any) =>
  request({
    url: '/shops',
    method: 'get',
    params
  })

export const getShop = (shopId: number) =>
  request({
    url: `/shops/${shopId}`,
    method: 'get'
  })

export const deleteShop = (shopId: number) =>
  request({
    url: `/shops/${shopId}`,
    method: 'delete'
  })

export const updateShop = (shopId: number, data: any) =>
  request({
    url: `/shops/${shopId}`,
    method: 'put',
    data
  })
export const createShop = (data: any) =>
  request({
    url: '/shops',
    method: 'post',
    data
  })
