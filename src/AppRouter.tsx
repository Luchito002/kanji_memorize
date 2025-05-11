import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NewKanjiPage from "./pages/NewKanjiPage";
import BuildKanjiPage from "./pages/BuildKanjiPage";
import SelectKanjiPage from "./pages/SelectKanjiPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewKanjiPage />} />
        <Route path="/nuevo" element={<NewKanjiPage />} />
        <Route path="/armar" element={<BuildKanjiPage />} />
        <Route path="/seleccionar" element={<SelectKanjiPage />} />
        <Route path="/404" element={<h1>Not Found</h1>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  )
}
