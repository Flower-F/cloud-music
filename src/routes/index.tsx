import { Route, Routes } from 'react-router-dom'

import HomeLayout from '@/layouts/HomeLayout'
import NotFoundPage from '@/pages/NotFoundPage'
import RankPage from '@/pages/RankPage'
import RecommendPage from '@/pages/RecommendPage'
import SingerPage from '@/pages/SingerPage'

const Router = () => (
  <Routes>
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<RecommendPage />} />
      <Route path="recommend" element={<RecommendPage />} />
      <Route path="singer" element={<SingerPage />} />
      <Route path="rank" element={<RankPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default Router
