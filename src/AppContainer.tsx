import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "./components/theme-provider";
import { ModalProvider } from "./components/Modal/context/ModalContext";
import { Provider } from "react-redux"
import { store } from "./redux/store";

export default function AppContainer() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModalProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App>
              <AppRouter />
            </App>
          </Provider>
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider >
  )
}
