import React, { FC } from 'react'
import { RichText } from '@components/sanity/rich-text'
import Link from 'next/link'
import { TypedObject } from 'sanity'
import { ArrowBtn } from '@components/btns'

type TokenDashboardProps = {
  dashboardCopy?: TypedObject | TypedObject[]
  className?: string
}

const TokenDashboard: FC<TokenDashboardProps> = ({
  dashboardCopy,
  className,
}) => (
  <div className={className}>
    {dashboardCopy && (
      <RichText blocks={dashboardCopy as TypedObject | TypedObject[]} />
    )}

    <div>
      <div className="mt-y rich-text">
        <p>1. Connect with our liason, Talin.</p>
      </div>
      <Link
        href={`mailto:talin@home0001.com`}
        target="_blank"
        className="inline-block mt-y font-bold"
      >
        <ArrowBtn text={`Get in touch`} background="white" />
      </Link>

      <div className="mt-y rich-text">
        <p>2. We’ll invite you to events, house viewings etc.</p>
      </div>
    </div>
  </div>
)

export default TokenDashboard
