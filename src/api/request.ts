import { request } from './config'

interface IBannerList {
  imageUrl: string
}
export interface IBannerListApi {
  banners: IBannerList[]
}
export const getBannerListApi = () => {
  return request<IBannerListApi>({
    method: 'GET',
    url: '/banner'
  })
}

interface IRecommendList {
  picUrl: string
  id: number
  playCount: number
  name: string
}
export interface IRecommendListApi {
  result: IRecommendList[]
}
export const getRecommendListApi = () => {
  return request<IRecommendListApi>({
    method: 'GET',
    url: '/personalized'
  })
}
