import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import axios from 'axios'
import SetPasswordForm from './SetPasswordForm'

interface BuyProps extends HTMLAttributes<HTMLFormElement> {}

export const BuyContainer: FC<BuyProps> = ({ className }) => {
  const router = useRouter()

  const [hasAccount, setHasAccount] = useState<boolean | null>(null)
  const [hasPassword, setHasPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const [showDepositForm, setShowDepositForm] = useState(false)

  const getBuyingProgress = async () => {
    return await axios.post(
      `/api/get-buying-progress?email=${router.query.email}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const accountSignIn = async () => {
    return await axios.post(
      `/api/login/signin`,
      { email: router.query.email, password: router.query.password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const getAccount = async () => {
    return await axios.post(
      `/api/login/check-password-setup-for-email`,
      { email: router.query.email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  useEffect(() => {
    if (loggedIn) {
      getBuyingProgress().then(res => {
        console.log('getBuyingProgress res: ', res)
        if (res.data.buyingProgress === null) {
          // show deposit form
          setShowDepositForm(true)
        }
      })
    }
  }, [loggedIn])

  useEffect(() => {
    if (router.query.password) {
      // perform sign in if password is provided
      accountSignIn().then(res => {
        console.log('accountSignIn res: ', res)
        if (res.data.user) {
          setHasAccount(true)
          setHasPassword(true)
          setLoggedIn(true)
        } else {
          // if no password is set, show set password form
          setHasAccount(true)
          setHasPassword(false)
        }
      })
    } else if (router.query.email) {
      // check if account exists
      getAccount().then(res => {
        console.log('getAccount res: ', res)
        if (res.data.user && res.data.user.email) {
          setHasAccount(true)
        } else {
          // shows back home link
          setHasAccount(false)
        }
      })
    }
  }, [router.query.email])

  return (
    <div className={classNames(className)}>
      {showDepositForm && (
        <span className="text-button">{`Deposit form here`}</span>
      )}

      {/* {loggedIn && <span className="text-button">{`You're logged in.`}</span>} */}

      {hasAccount && !hasPassword && (
        <SetPasswordForm
          email={router.query.email as string}
          onPasswordSet={() => setTimeout(() => setHasPassword(true), 2000)}
        />
      )}

      {hasAccount === false && (
        <span className="text-button">{`Oops, looks like we can't find your account.`}</span>
      )}

      {!showDepositForm && !hasAccount && (
        <span className="text-button">{`Loading...`}</span>
      )}
    </div>
  )
}

export default BuyContainer
