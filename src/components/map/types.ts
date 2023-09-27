import type { HTMLAttributes } from 'react'

export interface MapDialogProps extends HTMLAttributes<HTMLDivElement> {
  text?: string
  coordinates?: { lat?: string; long?: string }
}
