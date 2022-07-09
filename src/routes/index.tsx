import { Routes, Route } from 'react-router-dom'
import {
  SingersPage,
  RecommendPage,
  HomePage,
  RankPage,
  NotFoundPage
} from '@/pages'

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />}>
      <Route index element={<RecommendPage />}></Route>
      <Route path="recommend" element={<RecommendPage />}></Route>
      <Route path="singers" element={<SingersPage />}></Route>
      <Route path="rank" element={<RankPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Route>
  </Routes>
)

export default Router
