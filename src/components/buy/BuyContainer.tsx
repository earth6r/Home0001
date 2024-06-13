/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import axios from 'axios'
import SetPasswordForm from './SetPasswordForm'
import DepositForm from './DepositForm'
import { validateEmail } from '@lib/util/validate-email'
import BuyCalendar from './BuyCalendar'

const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

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

  const getBuyingProgress = async (email: string) => {
    return await axios.get(`/api/get-buying-progress?email=${email}`, CONFIG)
  }

  const accountSignIn = async () => {
    return await axios.post(
      `/api/login/signin`,
      { email: router.query.email, password: router.query.password },
      CONFIG
    )
  }

  const getAccount = async () => {
    return await axios.post(
      `/api/login/check-password-setup-for-email`,
      { email: router.query.email },
      CONFIG
    )
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

    if (router.query.password) {
      // perform sign in if password is provided
      accountSignIn()
        .then(res => {
          if (res.data.user) {
            setLoginError({ error: false, message: '' })
            setHasPassword(true)
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
    } else if (router.query.email) {
      // check if account exists
      getAccount().then(res => {
        if (res.data.user && res.data.user.email) {
          setLoginError({ error: false, message: '' })
          setUserData({
            ...userData,
            email: router.query.email,
          })
        } else {
          setLoginError({ error: true, message: 'No account found.' })
        }
      })
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

      {loginError.message && loginError.message.length > 1 && (
        <span className="text-button">
          {loginError.message || `No account found.`}
        </span>
      )}
    </div>
  )
}

export default BuyContainer
