import { type ReactNode, createContext, useContext, useState } from "react"

type ModalPersistenceContextType = {
  setModalVisibility: (visibility: boolean) => void
  isModalVisible: boolean
}

const ModalPersistenceContext =
  createContext<ModalPersistenceContextType | null>(null)

type ModalPersistenceProviderProps = {
  children: ReactNode
}

export const useModalPersistence = () => {
  const context = useContext(ModalPersistenceContext)

  if (!context) {
    throw new Error(
      "useModalPersistence must be used within a ModalPersistenceProvider",
    )
  }

  return context
}

export const ModalPersistenceProvider: React.FC<
  ModalPersistenceProviderProps
> = ({ children }) => {
  const [isModalVisible, setModalVisibility] = useState(false)

  return (
    <ModalPersistenceContext.Provider
      value={{
        setModalVisibility,
        isModalVisible,
      }}
    >
      {children}
    </ModalPersistenceContext.Provider>
  )
}
