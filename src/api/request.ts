import { IBanner } from '@/components/BannerList'
import { IRecommend } from '@/components/RecommendList'
import { ISinger } from '@/components/SingerList'

import { request } from './config'

// RecommendPage
export interface IBannerListApi {
  banners: IBanner[]
}
export const getBannerListApi = () => {
  return request<IBannerListApi>({
    method: 'GET',
    url: '/banner'
  })
}
export interface IRecommendListApi {
  result: IRecommend[]
}
export const getRecommendListApi = () => {
  return request<IRecommendListApi>({
    method: 'GET',
    url: '/personalized'
  })
}

// SingerPage
export interface ISingerListApi {
  artists: ISinger[]
}
export const getHotSingerListApi = (count: number) => {
  return request<ISingerListApi>({
    method: 'GET',
    url: `/top/artists?offset=${count}`
  })
}
export const getSingerListApi = (
  type: string,
  area: string,
  alpha: string,
  offset: number
) => {
  return request<ISingerListApi>({
    method: 'GET',
    url: `/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${offset}`
  })
}

// RankPage
export const getRankListApi = () => {
  return request({
    method: 'GET',
    url: '/toplist/detail'
  })
}
