import { ReactNode } from "react";
//import Footer from "./components/Footer";

interface Props {
  children: ReactNode
}

export default function App({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}
