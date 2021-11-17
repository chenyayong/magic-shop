import request from '@/utils/request'
import { IResponse } from './types'
export const getShops = (params?: any) => {
  const url = process.env.NODE_ENV === 'production' ? '/index.php/Admin/DiyApi/shopList' : '/test/index.php/Admin/DiyApi/shopList'
  return (request({
    // url: '/shops',
    // url: '/test/index.php/Admin/DiyApi/shopList',
    // url: '/index.php/Admin/DiyApi/shopList',
    url: url,
    method: 'get',
    params
  }) as unknown) as IResponse
}

export const getShop = (shopId: number) => {
  const url = process.env.NODE_ENV === 'production' ? `/index.php/Admin/DiyApi/shopInfo?id=${shopId}` : `/test/index.php/Admin/DiyApi/shopInfo?id=${shopId}`
  return (request({
    // url: `/shops/${shopId}`,
    // url: `/test/index.php/Admin/DiyApi/shopInfo?id=${shopId}`,
    // url: `/index.php/Admin/DiyApi/shopInfo?id=${shopId}`,
    url: url,
    method: 'get'
  }) as unknown) as IResponse
}

export const deleteShop = (shopId: number) => {
  const url = process.env.NODE_ENV === 'production' ? '/index.php/Admin/DiyApi/delShop' : '/test/index.php/Admin/DiyApi/delShop'
  return (request({
    // url: `/shops/${shopId}`,
    // url: '/test/index.php/Admin/DiyApi/delShop',
    // url: '/index.php/Admin/DiyApi/delShop',
    // method: 'delete'
    url: url,
    method: 'post',
    data: { id: shopId }
  }) as unknown) as IResponse
}

export const updateShop = (shopId: number, data: any) => {
  const url = process.env.NODE_ENV === 'production' ? '/index.php/Admin/DiyApi/editShop' : '/test/index.php/Admin/DiyApi/editShop'
  return (request({
    // url: `/shops/${shopId}`,
    // url: '/test/index.php/Admin/DiyApi/editShop',
    // url: '/index.php/Admin/DiyApi/editShop',
    // method: 'put',
    url: url,
    method: 'post',
    data
  }) as unknown) as IResponse
}

export const createShop = (data: any) => {
  const url = process.env.NODE_ENV === 'production' ? '/index.php/Admin/DiyApi/addShop' : '/test/index.php/Admin/DiyApi/addShop'
  return (request({
    // url: '/shops',
    // url: '/test/index.php/Admin/DiyApi/addShop',
    // url: '/index.php/Admin/DiyApi/addShop',
    url: url,
    method: 'post',
    data
  }) as unknown) as IResponse
}
