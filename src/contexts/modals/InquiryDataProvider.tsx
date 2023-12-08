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
      brokerInquiryOpen: any
    },
    {
      setInquiryOpen: Dispatch<SetStateAction<any>>
      setBrokerInquiryOpen: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useInquiryContext() {
  return useContext(InquiryContext)
}

export function InquiryDataProvider({ children }: { children: ReactNode }) {
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useState(false)

  return (
    <InquiryContext.Provider
      value={useMemo(
        () => [
          { inquiryOpen, brokerInquiryOpen },
          { setInquiryOpen, setBrokerInquiryOpen },
        ],
        [inquiryOpen, brokerInquiryOpen]
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

export function useBrokerInquiryModal() {
  const [{ brokerInquiryOpen }, { setBrokerInquiryOpen }] = useInquiryContext()
  return [brokerInquiryOpen, setBrokerInquiryOpen]
}
