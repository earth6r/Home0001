import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

const ModalContext = createContext<
  [
    {
      availableOpen: any
      inventoryOpen: any
    },
    {
      setAvailableOpen: Dispatch<SetStateAction<any>>
      setInventoryOpen: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useModalContext() {
  return useContext(ModalContext)
}

export function ModalDataProvider({ children }: { children: ReactNode }) {
  const [availableOpen, setAvailableOpen] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)

  return (
    <ModalContext.Provider
      value={useMemo(
        () => [
          { availableOpen, inventoryOpen },
          { setAvailableOpen, setInventoryOpen },
        ],
        [availableOpen, inventoryOpen]
      )}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useAvailableModal() {
  const [{ availableOpen }, { setAvailableOpen }] = useModalContext()
  return [availableOpen, setAvailableOpen]
}

export function useInventoryModal() {
  const [{ inventoryOpen }, { setInventoryOpen }] = useModalContext()
  return [inventoryOpen, setInventoryOpen]
}
