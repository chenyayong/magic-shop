import request from '@/utils/request'
import { IResponse } from './types'
export const getShops = (params?: any) =>
  (request({
    url: '/shops',
    // url: '/test/index.php/Admin/DiyApi/shopList',
    method: 'get',
    params
  }) as unknown) as IResponse

export const getShop = (shopId: number) =>
  (request({
    url: `/shops/${shopId}`,
    // url: `/test/index.php/Admin/DiyApi/shopInfo?id=${shopId}`,
    method: 'get'
  }) as unknown) as IResponse

export const deleteShop = (shopId: number) =>
  (request({
    url: `/shops/${shopId}`,
    method: 'delete'
  }) as unknown) as IResponse

export const updateShop = (shopId: number, data: any) => {
  data = {
    id: shopId,
    ...data
  }
  return (request({
    // url: `/shops/${shopId}`,
    // method: 'put',
    url: '/test/index.php/Admin/DiyApi/editShop',
    method: 'post',
    data
  }) as unknown) as IResponse
}

export const createShop = (data: any) =>
  (request({
    // url: '/shops',
    url: '/test/index.php/Admin/DiyApi/addShop',
    method: 'post',
    data
  }) as unknown) as IResponse
