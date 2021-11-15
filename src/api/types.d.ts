/* eslint-disable camelcase */

export interface IResponse {
  code: number
  msg: string
  data?: any
}

export interface iShopData {
  shop_id: number
  update_at: number
  page_title: string
  shop_data: string
  page_icon: string
  // page_scene_depict: string
}

export interface IGoods {
  goods_id: number
  original_img: string
  goods_name: string
  is_on_sale: number
  shop_price: number
  old_price: number
  store_count: number
  sales_sum: number
}

export interface IImages {
  img_id: number
  image_url: string
  image_description?: string
  active?: boolean
}
