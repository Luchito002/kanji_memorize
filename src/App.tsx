import { ReactNode } from "react";
import Navbar from "./components/NavbarHomePage";
import Footer from "./components/Footer";

interface Props {
  children: ReactNode
}

export default function App({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
