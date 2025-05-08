import React from 'react'

import { ReactNode } from 'react'
import { HomeProvider } from './home'
import { InquiryDataProvider, ModalDataProvider } from './modals'
import { HeaderProvider } from './header'
import { CookiesProvider } from './cookies'
import { Web3Provider } from './web3'

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <HomeProvider>
      <HeaderProvider>
        <CookiesProvider>
          <Web3Provider>
            <ModalDataProvider>
              <InquiryDataProvider>{children}</InquiryDataProvider>
            </ModalDataProvider>
          </Web3Provider>
        </CookiesProvider>
      </HeaderProvider>
    </HomeProvider>
  )
}
