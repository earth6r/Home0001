import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

const InquiryContext = createContext<
  [
    {
      inquiryOpen: any
    },
    {
      setInquiryOpen: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useInquiryContext() {
  return useContext(InquiryContext)
}

export function InquiryDataProvider({ children }: { children: ReactNode }) {
  const [inquiryOpen, setInquiryOpen] = useState(false)

  return (
    <InquiryContext.Provider
      value={useMemo(
        () => [{ inquiryOpen }, { setInquiryOpen }],
        [inquiryOpen]
      )}
    >
      {children}
    </InquiryContext.Provider>
  )
}

export function useInquiryModal() {
  const [{ inquiryOpen }, { setInquiryOpen }] = useInquiryContext()
  return [inquiryOpen, setInquiryOpen]
}
