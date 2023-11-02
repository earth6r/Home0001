import React from 'react'

import { ReactNode } from 'react'
import { HomeProvider } from './home'
import { ModalDataProvider } from './modals'

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <HomeProvider>
      <ModalDataProvider>{children}</ModalDataProvider>
    </HomeProvider>
  )
}
