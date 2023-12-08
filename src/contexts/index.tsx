import React from 'react'

import { ReactNode } from 'react'
import { HomeProvider } from './home'
import { InquiryDataProvider, ModalDataProvider } from './modals'
import { HeaderProvider } from './header'

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <HomeProvider>
      <HeaderProvider>
        <ModalDataProvider>
          <InquiryDataProvider>{children}</InquiryDataProvider>
        </ModalDataProvider>
      </HeaderProvider>
    </HomeProvider>
  )
}
