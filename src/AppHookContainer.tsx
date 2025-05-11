import App from "./App";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "./components/theme-provider";

export default function AppHookContainer() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App>
        <AppRouter />
      </App>
    </ThemeProvider>
  )
}
