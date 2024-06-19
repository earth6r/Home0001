/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import SetPasswordForm from './SetPasswordForm'
import DepositForm from './DepositForm'
import { validateEmail } from '@lib/util/validate-email'
import BuyCalendar from './BuyCalendar'
import {
  accountSignIn,
  getAccount,
  getBuyingProgress,
  updateBuyingProgress,
} from './actions'
import LoginForm from './LoginForm'
import { SanityMedia, SanityMediaProps } from '@components/sanity'

type BuyUnitProps = {
  title: string
  slug: string
  price: string
  area: string
  photographs: SanityMediaProps[]
  file?: any
}

interface BuyContainerProps extends HTMLAttributes<HTMLFormElement> {
  units?: BuyUnitProps[]
}

export const BuyContainer: FC<BuyContainerProps> = ({ units, className }) => {
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
    buyingProgress: {
      escrowDeposit: false,
      scheduleClosing: false,
      downloadDocuments: false,
      fullPayment: false,
      completed: false,
    },
  })

  const [filteredUnit, setFilteredUnit] = useState<BuyUnitProps | undefined>(
    undefined
  )

  const filterUnits = (id: string) => {
    if (id) {
      return units?.find(unit => (unit?.slug as any)?.current === id)
    }
  }

  const initGetBuyingProgress = () => {
    getBuyingProgress(userData.email)
      .then(res => {
        setUserData({
          ...userData,
          buyingProgress: res.data.buyingProgress,
        })
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  const initUpdateProcess = (step: string) => {
    setLoading(true)
    updateBuyingProgress(userData.email, step)
      .then(res => {
        console.log(res)
        initGetBuyingProgress()
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  const setLoginSuccess = (email: string, password: string, unit: string) => {
    setLoginError({ error: false, message: '' })
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
    if (userData.unit) setFilteredUnit(filterUnits(userData.unit))
  }, [userData.unit])

  useEffect(() => {
    if (userData.loggedIn) {
      initGetBuyingProgress()
    }
  }, [userData.loggedIn])

  useEffect(() => {
    const routerEmail = router.query.email as string
    if (routerEmail) {
      checkAccount(routerEmail)
    } else {
      setShowLogin(true)
      setLoading(false)
    }
  }, [router.query.email])

  console.log(userData)

  return (
    <div className={classNames(className)}>
      {filteredUnit && (
        <div className="rich-text mb-y">
          <div className="max-w-[350px]">
            {filteredUnit.photographs && (
              <SanityMedia
                {...(filteredUnit.photographs[0] as SanityMediaProps)}
                imageProps={{
                  alt: 'Unit image',
                  quality: 8,
                  priority: true,
                  lqip: (filteredUnit.photographs[0].image as any)?.asset
                    ?.metadata?.lqip,
                }}
                className="w-full h-auto object-contain"
              />
            )}
          </div>
          <h2>{filteredUnit.title}</h2>
          <p>{filteredUnit.area}</p>
          <p>{filteredUnit.price}</p>
        </div>
      )}

      {!userData.loggedIn && showLogin && (
        <>
          <LoginForm attemptSignIn={attemptSignIn} />
          <button
            className="mt-y text-button underline decoration-[2px] underline-offset-2 pb-[2px]"
            onClick={() => {
              setShowLogin(false)
              setUserData({ ...userData, hasPassword: false })
            }}
          >{`Or finish setting up account`}</button>
        </>
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

      {userData.loggedIn && !userData.buyingProgress.escrowDeposit && (
        <DepositForm
          email={userData.email}
          unit={userData.unit as string}
          onStripeSuccess={() => {
            setTimeout(() => {
              setLoading(true)
              initGetBuyingProgress()
            }, 5000)
          }}
        />
      )}

      {userData.loggedIn && userData.buyingProgress.escrowDeposit && (
        <>
          <BuyCalendar
            email={userData.email as string}
            unit={userData.unit as string}
            onMeetingSet={() => initUpdateProcess('scheduleClosing')}
          />

          {filteredUnit && (
            <div className="flex gap-x items-start mt-y rich-text">
              <a href={filteredUnit.file?.asset.url} target="_blank" download>
                <button
                  className="button text-button"
                  disabled={loading}
                  onClick={() => initUpdateProcess('downloadDocuments')}
                >
                  {`Download documents`}
                </button>
              </a>

              {userData.buyingProgress.downloadDocuments && (
                <span className="m-0">✅</span>
              )}
            </div>
          )}
        </>
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
