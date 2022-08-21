import { Route, Routes } from 'react-router-dom'

import HomeLayout from '@/layouts/HomeLayout'
import AlbumPage from '@/pages/AlbumPage'
import ArtistPage from '@/pages/ArtistPage'
import NotFoundPage from '@/pages/NotFoundPage'
import RankPage from '@/pages/RankPage'
import RecommendPage from '@/pages/RecommendPage'
import SearchPage from '@/pages/SearchPage'
import SingersPage from '@/pages/SingersPage'

const Router = () => (
  <Routes>
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<RecommendPage />} />
      <Route path="recommend" element={<RecommendPage />} />
      <Route path="recommend/:id" element={<AlbumPage />} />
      <Route path="singer" element={<SingersPage />} />
      <Route path="singer/:id" element={<ArtistPage />} />
      <Route path="rank" element={<RankPage />} />
      <Route path="rank/:id" element={<AlbumPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default Router
