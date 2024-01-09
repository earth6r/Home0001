import { HTMLAttributes, useState } from 'react'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export interface CheckboxPaneProps extends PaneProps {
  fieldCode: string
  fields: { label?: string; name?: string }[]
  type?: 'checkbox' | 'radio'
}

export interface PaneProps extends HTMLAttributes<HTMLElement> {
  register: UseFormRegister<FieldValues>
  onClick?: () => void
  onBack?: () => void
  broker?: boolean
}

export interface PreferencePaneInputsProps extends HTMLAttributes<HTMLElement> {
  block?: boolean
  header?: string
  copy?: RichTextType | string
  buttonCopy?: string
  register: UseFormRegister<FieldValues>
  trigger: () => Promise<boolean>
  setFullWidth?: () => void
  formValues?: any
  broker?: boolean
  formPanes?: string[]
}

export interface PreferenceSubmitButtonProps
  extends HTMLAttributes<HTMLElement> {
  onClick?: () => void
}
