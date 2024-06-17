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
import { init } from 'next/dist/compiled/@vercel/og/satori'

interface BuyProps extends HTMLAttributes<HTMLFormElement> {}

export const BuyContainer: FC<BuyProps> = ({ className }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [loginError, setLoginError] = useState<{
    error: boolean | null
    message: string
  }>({ error: false, message: '' })

  const [showLogin, setShowLogin] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const [userData, setUserData] = useState<any | null>({
    email: null,
    hasPassword: true, // assume user has a password at first
    password: null,
    unit: null,
    buyingProgress: null,
  })

  const initGetBuyingProgress = () => {
    getBuyingProgress(userData.email).then(res => {
      console.log('initGetBuyingProgress', res)
      setUserData({
        ...userData,
        buyingProgress: res.data.buyingProgress,
      })
    })
  }

  const setLoginSuccess = (email: string, password: string, unit: string) => {
    setLoginError({ error: false, message: '' })
    setLoggedIn(true)
    setUserData({
      ...userData,
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
          }
        } else {
          // if no password is set, show set password form
          setLoginError({ error: true, message: 'Wrong password.' })
          setUserData({
            ...userData,
            email: router.query.email,
            hasPassword: false,
          })
        }
      })
      .catch(err => {
        setLoginError({ error: true, message: err.response.data.message })
      })
  }

  const checkAccount = (email: string) => {
    getAccount(email).then(res => {
      if (res.data.user_exists) {
        setLoginError({ error: false, message: '' })
        setUserData({
          ...userData,
          email: email,
          hasPassword: res.data.password_set,
        })
        if (!loggedIn) setShowLogin(res.data.password_set)
      } else {
        setLoginError({ error: true, message: 'No account found.' })
      }
    })
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }, [loginError])

  useEffect(() => {
    if (loggedIn) {
      initGetBuyingProgress()
    }
  }, [loggedIn])

  useEffect(() => {
    if (userData.password) {
      attemptSignIn(userData.email, userData.password)
    }
  }, [userData.password])

  useEffect(() => {
    const routerEmail = router.query.email as string
    if (routerEmail) {
      checkAccount(routerEmail)
    } else {
      setShowLogin(true)
    }
  }, [router.query.email])

  return loading ? (
    <div className={classNames(className)}>
      {userData.unit && (
        <div className="rich-text mb-y">
          <h2>{userData.unit}</h2>
          <p>Unit info</p>
        </div>
      )}

      <span className="text-button">{`Loading...`}</span>
    </div>
  ) : (
    <div className={classNames(className)}>
      {userData.unit && (
        <div className="rich-text mb-y">
          <h2>{userData.unit}</h2>
          <p>Unit info</p>
        </div>
      )}

      {loggedIn && !userData.unit && (
        <span className="text-button">{`No unit found for user.`}</span>
      )}

      {!loggedIn && showLogin && <LoginForm attemptSignIn={attemptSignIn} />}

      {!loginError.error && !userData.hasPassword && (
        <SetPasswordForm
          email={router.query.email as string}
          onPasswordSet={password => {
            setLoading(true)
            setUserData({ ...userData, password: password, hasPassword: true })
          }}
        />
      )}

      {loggedIn && userData.buyProgress === 'escrow-deposit' && (
        <>
          {userData.unit ? (
            <DepositForm
              email={userData.email}
              unit={userData.unit as string}
            />
          ) : (
            <span className="text-button">{`No unit found for user.`}</span>
          )}
        </>
      )}

      {loggedIn && userData.buyingProgress === 'schedule-closing' && (
        <BuyCalendar
          email={userData.email as string}
          unit={userData.unit as string}
        />
      )}

      {loginError.message && (
        <span className="text-button">
          {loginError.message || `No account found.`}
        </span>
      )}
    </div>
  )
}

export default BuyContainer
