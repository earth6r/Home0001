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
      waitlistOpen: any
      availableOpen: any
      inventoryOpen: any
    },
    {
      setWaitlistOpen: Dispatch<SetStateAction<any>>
      setAvailableOpen: Dispatch<SetStateAction<any>>
      setInventoryOpen: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useModalContext() {
  return useContext(ModalContext)
}

export function ModalDataProvider({ children }: { children: ReactNode }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const [availableOpen, setAvailableOpen] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)

  return (
    <ModalContext.Provider
      value={useMemo(
        () => [
          { waitlistOpen, availableOpen, inventoryOpen },
          { setWaitlistOpen, setAvailableOpen, setInventoryOpen },
        ],
        [waitlistOpen, availableOpen, inventoryOpen]
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

export function useWaitlisModal() {
  const [{ waitlistOpen }, { setWaitlistOpen }] = useModalContext()
  return [waitlistOpen, setWaitlistOpen]
}
