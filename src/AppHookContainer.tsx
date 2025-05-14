import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "./components/theme-provider";

export default function AppHookContainer() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <App>
          <AppRouter />
        </App>
      </BrowserRouter>
    </ThemeProvider>
  )
}
