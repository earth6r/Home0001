import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import PasswordForm from './PasswordForm'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { IconRightArrow } from '@components/icons'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import axios from 'axios'

interface BuyProps extends HTMLAttributes<HTMLFormElement> {}

export const BuyContainer: FC<BuyProps> = ({ className }) => {
  const router = useRouter()

  const [hasAccount, setHasAccount] = useState<boolean | null>(null)
  const [hasPassword, setHasPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const getAccount = async () => {
    return await axios.post(
      `/api/login/check-email-existence`,
      { email: router.query.email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  useEffect(() => {
    if (router.query.email) {
      getAccount().then(res => {
        console.log('useffect res: ', res)
        if (res.data.user && res.data.user.email) {
          setHasAccount(true)
        } else {
          // shows back home link
          setHasAccount(false)
        }
      })
    } else if (router.query.password) {
      // perform signin instead
    }
  }, [router.query.email])

  return (
    <div className={classNames(className)}>
      {hasAccount && !hasPassword ? (
        <PasswordForm email={router.query.email as string} />
      ) : (
        hasAccount === false && (
          <span className="text-button">{`Oops, looks like we can't find your account.`}</span>
        )
      )}
    </div>
  )
}

export default BuyContainer
