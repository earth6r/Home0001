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
    },
    {
      setWaitlistOpen: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useModalContext() {
  return useContext(ModalContext)
}

export function ModalDataProvider({ children }: { children: ReactNode }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <ModalContext.Provider
      value={useMemo(
        () => [{ waitlistOpen }, { setWaitlistOpen }],
        [waitlistOpen]
      )}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useWaitlisModal() {
  const [{ waitlistOpen }, { setWaitlistOpen }] = useModalContext()
  return [waitlistOpen, setWaitlistOpen]
}
