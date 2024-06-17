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

  const [showLogin, setShowLogin] = useState(false)
  const [loading, setLoading] = useState(true)

  const [loginError, setLoginError] = useState<{
    error: boolean | null
    message: string
  }>({ error: false, message: '' })
  const [hasPassword, setHasPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const [showDepositForm, setShowDepositForm] = useState(false)
  const [userData, setUserData] = useState<any | null>({
    email: null,
    hasPassword: true, // assume user has a password at first
    password: null,
    unit: null,
    buyingProgress: null,
  })

  // const [showMemberPage, setShowMemberPage] = useState(false)

  const initGetBuyingProgress = () => {
    getBuyingProgress(userData.email).then(res => {
      if (res.data.buyingProgress === null || res.data.buyingProgress === 2) {
        // show deposit form
        setShowDepositForm(true)
        setUserData({
          ...userData,
          buyingProgress: null,
        })
      } else {
        // show member page eventually, for now show available calendar slots
        if (res.data.buyingProgress > 1) {
          setUserData({
            ...userData,
            buyingProgress: res.data.buyingProgress,
          })
        }
      }
    })
  }

  const setLoginSuccess = (email: string, unit: string) => {
    setLoginError({ error: false, message: '' })
    setLoggedIn(true)
    setUserData({
      ...userData,
      email: email,
      unit: unit,
    })
  }

  const attemptSignIn = (email: string, password: string) => {
    setHasPassword(true)
    accountSignIn(email, password)
      .then(res => {
        if (res.data.user.user) {
          if (res.data.userMetadata && res.data.userMetadata[0]) {
            setLoginSuccess(
              email,
              res.data.userMetadata[0].userBuyingPropertyType
            )
          }
        } else {
          // if no password is set, show set password form
          setLoginError({ error: true, message: 'Wrong password.' })
          setHasPassword(false)
          setUserData({
            ...userData,
            email: router.query.email,
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
        })
        if (res.data.password_set) {
          setHasPassword(true)
          if (router.query.password || userData.password) {
            attemptSignIn(
              email,
              (router.query.password as string) || userData.password
            )
          }
        }
      } else {
        setLoginError({ error: true, message: 'No account found.' })
      }
    })
  }

  useEffect(() => {
    if (userData.password) {
      checkAccount(userData.email)
    }
  }, [userData.password])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }, [loginError])

  useEffect(() => {
    if (loggedIn && userData.email) {
      initGetBuyingProgress()
    }
  }, [loggedIn])

  useEffect(() => {
    const routerEmail = router.query.email as string
    if (routerEmail) {
      setUserData({ ...userData, email: routerEmail })
      checkAccount(routerEmail)
    } else {
      setShowLogin(true)
    }
  }, [])

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

      {showLogin && <LoginForm attemptSignIn={attemptSignIn} />}

      {!loginError.error && !userData.hasPassword && (
        <SetPasswordForm
          email={router.query.email as string}
          onPasswordSet={password => {
            setLoading(true)
            setUserData({ ...userData, password: password })
            setHasPassword(true)
          }}
        />
      )}

      {showDepositForm && (
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

      {loggedIn && userData.buyingProgress === 3 && (
        <BuyCalendar
          email={userData.email as string}
          unit={userData.unit as string}
        />
      )}

      {!loginError.error &&
        hasPassword &&
        !router.query.password &&
        !userData.password && (
          <span className="text-button">{`Account found. Add password as query.`}</span>
        )}

      {loginError.message && loginError.message.length > 1 && (
        <span className="text-button">
          {loginError.message || `No account found.`}
        </span>
      )}
    </div>
  )
}

export default BuyContainer
