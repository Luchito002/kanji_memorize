import { createContext, ReactNode, useState } from "react";

export const ModalContext = createContext<{
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  state: false,
  setState: () => null
})

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<boolean>(false)

  return <ModalContext.Provider value={{ state, setState }}>{children}</ModalContext.Provider>
}
