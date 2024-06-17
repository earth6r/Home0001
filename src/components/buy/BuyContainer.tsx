/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import SetPasswordForm from './SetPasswordForm'
import DepositForm from './DepositForm'
import { validateEmail } from '@lib/util/validate-email'
import BuyCalendar from './BuyCalendar'
import { accountSignIn, getAccount, getBuyingProgress } from './actions'
import LoginForm from './LoginForm'

interface BuyProps extends HTMLAttributes<HTMLFormElement> {}

export const BuyContainer: FC<BuyProps> = ({ className }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [loginError, setLoginError] = useState<{
    error: boolean | null
    message: string
  }>({ error: false, message: '' })

  const [showLogin, setShowLogin] = useState(false)

  const [userData, setUserData] = useState<any | null>({
    loggedIn: false,
    email: null,
    hasPassword: true, // assume user has a password at first
    password: null,
    unit: null,
    buyingProgress: null,
  })

  const initGetBuyingProgress = () => {
    getBuyingProgress(userData.email).then(res => {
      setLoading(false)
      setUserData({
        ...userData,
        buyingProgress: res.data.buyingProgress,
      })
    })
  }

  const setLoginSuccess = (email: string, password: string, unit: string) => {
    setLoginError({ error: false, message: '' })
    setLoading(false)
    setUserData({
      ...userData,
      loggedIn: true,
      email: email,
      password: password,
      unit: unit,
    })
  }

  const attemptSignIn = (email: string, password: string) => {
    if (!validateEmail(email)) {
      setLoginError({ error: true, message: 'Invalid email.' })
      return
    }
    setLoading(true)

    accountSignIn(email, password)
      .then(res => {
        if (res.data.user.user) {
          if (res.data.userMetadata && res.data.userMetadata[0]) {
            setLoginSuccess(
              email,
              password,
              res.data.userMetadata[0].userBuyingPropertyType
            )
          } else {
            setLoginError({
              error: true,
              message: 'No unit associated with account.',
            })
            setLoading(false)
          }
        }
      })
      .catch(err => {
        setLoading(false)
        setLoginError({ error: true, message: err.response.data.message })
      })
  }

  const checkAccount = (email: string) => {
    console.log('checking account')
    setLoading(true)
    getAccount(email).then(res => {
      if (res.data.user_exists) {
        setLoginError({ error: false, message: '' })
        setUserData({
          ...userData,
          email: email,
          hasPassword: res.data.password_set,
        })
        if (!userData.loggedIn) setShowLogin(res.data.password_set)
      } else {
        setLoginError({ error: true, message: 'No account found.' })
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    if (userData.loggedIn && !userData.buyingProgress) {
      initGetBuyingProgress()
    }
  }, [userData.loggedIn])

  useEffect(() => {
    console.log('here', router.query.email)
    const routerEmail = router.query.email as string
    if (routerEmail) {
      checkAccount(routerEmail)
    } else {
      setShowLogin(true)
      setLoading(false)
    }
  }, [])

  return (
    <div className={classNames(className)}>
      {userData.unit && (
        <div className="rich-text mb-y">
          <h2>{userData.unit}</h2>
          <p>Unit info</p>
        </div>
      )}

      {!userData.loggedIn && showLogin && (
        <LoginForm attemptSignIn={attemptSignIn} />
      )}

      {userData.loggedIn && !userData.unit && (
        <span className="text-button">{`No unit found for user.`}</span>
      )}

      {!loginError.error && !userData.hasPassword && (
        <SetPasswordForm
          email={router.query.email as string}
          onPasswordSet={password => {
            setLoading(true)
            setUserData({ ...userData, password: password, hasPassword: true })
          }}
        />
      )}

      {userData.buyingProgress === 'escrow-deposit' && (
        <DepositForm
          email={userData.email}
          unit={userData.unit as string}
          onStripeSuccess={() => {
            setTimeout(() => {
              setLoading(true)
              initGetBuyingProgress()
            }, 2000)
          }}
        />
      )}

      {userData.buyingProgress === 'schedule-closing' && (
        <BuyCalendar
          email={userData.email as string}
          unit={userData.unit as string}
        />
      )}

      {loginError.message && (
        <span className="inline-block mt-y text-button">
          {loginError.message || `No account found.`}
        </span>
      )}

      {loading && <p className="!mx-0 mt-y text-button">{`Loading...`}</p>}
    </div>
  )
}

export default BuyContainer
