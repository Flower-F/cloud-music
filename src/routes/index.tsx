import { Route, Routes } from 'react-router-dom'

import HomeLayout from '@/layouts/HomeLayout'
import AlbumPage from '@/pages/AlbumPage'
import NotFoundPage from '@/pages/NotFoundPage'
import RankPage from '@/pages/RankPage'
import RecommendPage from '@/pages/RecommendPage'
import SingersPage from '@/pages/SingersPage'

const Router = () => (
  <Routes>
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<RecommendPage />} />
      <Route path="recommend" element={<RecommendPage />} />
      <Route path="recommend/:id" element={<AlbumPage />} />
      <Route path="singer" element={<SingersPage />} />
      <Route path="rank" element={<RankPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default Router
