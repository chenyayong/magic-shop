import request from '@/utils/request'
import { IResponse } from './types'
export const getImages = (params: any) => {
  const url = process.env.NODE_ENV === 'production' ? '/index.php/Admin/DiyApi/images' : '/test/index.php/Admin/DiyApi/images'
  return (request({
    // url: '/images',
    // url: '/test/index.php/Admin/DiyApi/images',
    // url: '/index.php/Admin/DiyApi/images',
    url: url,
    method: 'get',
    params
  }) as unknown) as IResponse
}
