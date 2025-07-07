import { Route, Routes } from "react-router-dom";
import NewKanjiPage from "./pages/NewKanjiPage";
import BuildKanjiPage from "./pages/BuildKanjiPage";
import SelectKanjiPage from "./pages/SelectKanjiPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import HomeLayout from "./layouts/HomeLayout";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import ProfilePage from "./pages/ProfilePage";
import SrsPage from "./pages/SrsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/new" element={<NewKanjiPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/armar" element={<BuildKanjiPage />} />
        <Route path="/seleccionar" element={<SelectKanjiPage />} />
        <Route path="/srs" element={<SrsPage />} />
      </Route>

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}
