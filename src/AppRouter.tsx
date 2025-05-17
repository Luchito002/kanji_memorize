import { Navigate, Route, Routes } from "react-router-dom";
import NewKanjiPage from "./pages/NewKanjiPage";
import BuildKanjiPage from "./pages/BuildKanjiPage";
import SelectKanjiPage from "./pages/SelectKanjiPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import HomeLayout from "./layouts/HomeLayout";
import AppLayout from "./layouts/AppLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<h1>Not Found</h1>} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/nuevo" element={<NewKanjiPage />} />
        <Route path="/armar" element={<BuildKanjiPage />} />
        <Route path="/seleccionar" element={<SelectKanjiPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}
