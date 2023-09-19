// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import type { FC } from 'react'

export const CenterMark: FC = ({ children }) => (
  <div style={{ display: 'block', textAlign: 'center' }}>{children}</div>
)

export default CenterMark
