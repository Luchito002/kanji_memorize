import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "./components/theme-provider";
import { ModalProvider } from "./components/Modal/context/ModalContext";

export default function AppHookContainer() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModalProvider>
        <BrowserRouter>
          <App>
            <AppRouter />
          </App>
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider >
  )
}
