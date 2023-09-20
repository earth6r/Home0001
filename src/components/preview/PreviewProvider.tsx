import { LiveQueryProvider } from 'next-sanity/preview'
import { getClient } from '@sanity/lib/client'
import { useMemo } from 'react'

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode
  token?: string
}) {
  if (!token) throw new TypeError('Missing token')
  const client = useMemo(() => getClient(token), [token])

  return (
    <LiveQueryProvider client={client} token={token} logger={console}>
      {children}
    </LiveQueryProvider>
  )
}
