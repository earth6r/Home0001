import React from 'react'

import { ReactNode } from 'react'
import { HomeProvider } from './home'
import { InquiryDataProvider, ModalDataProvider } from './modals'
import { HeaderProvider } from './header'
import { CookiesProvider } from './cookies'

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <HomeProvider>
      <HeaderProvider>
        <CookiesProvider>
          <ModalDataProvider>
            <InquiryDataProvider>{children}</InquiryDataProvider>
          </ModalDataProvider>
        </CookiesProvider>
      </HeaderProvider>
    </HomeProvider>
  )
}
