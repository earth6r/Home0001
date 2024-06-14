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

interface BuyProps extends HTMLAttributes<HTMLFormElement> {}

export const BuyContainer: FC<BuyProps> = ({ className }) => {
  const router = useRouter()

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
    unit: null,
    buyingProgress: null,
  })

  // const [showMemberPage, setShowMemberPage] = useState(false)

  const attemptSignIn = (email: string, password: string) => {
    setHasPassword(true)
    accountSignIn(email, password)
      .then(res => {
        if (res.data.user_exists) {
          setLoginError({ error: false, message: '' })
          setLoggedIn(true)
          if (res.data.userMetadata && res.data.userMetadata[0]) {
            setUserData({
              ...userData,
              email: router.query.email,
              unit: res.data.userMetadata[0].userBuyingPropertyType,
            })
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
          if (router.query.password) {
            attemptSignIn(email, router.query.password as string)
          }
        }
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
    if (loggedIn && userData.email) {
      getBuyingProgress(userData.email).then(res => {
        if (res.data.buyingProgress === null) {
          // show deposit form
          setShowDepositForm(true)
          setUserData({
            ...userData,
            buyingProgress: null,
          })
        } else {
          // show member page eventually, for now show available calendar slots
          if (res.data.buyingProgress === 3) {
            setUserData({
              ...userData,
              buyingProgress: 3,
            })
          }
        }
      })
    }
  }, [loggedIn])

  useEffect(() => {
    const validEmail =
      router.query.email && validateEmail(router.query.email as string)
    if (!validEmail) {
      setLoginError({ error: true, message: 'Invalid email.' })
      return
    }

    const routerEmail = router.query.email as string

    if (routerEmail) {
      checkAccount(routerEmail)
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

      {showDepositForm && (
        <DepositForm email={userData.email} unit={userData.unit as string} />
      )}

      {loggedIn && userData.buyingProgress === 3 && (
        <BuyCalendar email={userData.email as string} />
      )}

      {!loginError.error && !hasPassword && (
        <SetPasswordForm
          email={router.query.email as string}
          onPasswordSet={() => setTimeout(() => setHasPassword(true), 2000)}
        />
      )}

      {!loginError.error && hasPassword && !router.query.password && (
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
