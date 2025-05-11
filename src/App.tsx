import { ReactNode } from "react";
import Navbar from "./components/Navbar";

interface Props {
  children: ReactNode
}

export default function App({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <>Footer</>
    </>
  );
}
