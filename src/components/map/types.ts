import type { HTMLAttributes } from 'react'

export interface MapDialogProps extends HTMLAttributes<HTMLDivElement> {
  text?: string
  height?: number
  coordinates?: { lat?: string; long?: string }
}
