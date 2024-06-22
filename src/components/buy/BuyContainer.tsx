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
  getBookedCalendarDate,
  getBuyingProgress,
  updateBuyingProgress,
} from './actions'
import LoginForm from './LoginForm'
import UnitBuySummary, { BuyUnitProps } from '@components/unit/UnitBuySummary'

interface BuyContainerProps extends HTMLAttributes<HTMLFormElement> {
  units?: BuyUnitProps[]
}

const STEPS = [
  {
    title: 'Step 1',
    description: 'Schedule your homebuying session whenever suits you',
  },
  {
    title: 'Step 2',
    description: 'Single session homebuying call.',
  },
  {
    title: 'Step 3',
    description: 'Make the payment.',
  },
  {
    title: 'Step 4',
    description: 'Move in.',
  },
]

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
    firstName: null,
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
    calendarDate: null,
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
        console.log('initUpdateProcess res:', res)
        initGetBuyingProgress()
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  const initGetCalendarDate = () => {
    getBookedCalendarDate(userData.email)
      .then(res => {
        setUserData({
          ...userData,
          calendarDate: res.data.date,
        })
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  const setLoginSuccess = (
    email: string,
    password: string,
    unit: string,
    firstName: string
  ) => {
    setLoginError({ error: false, message: '' })
    setUserData({
      ...userData,
      loggedIn: true,
      email: email,
      password: password,
      unit: unit,
      firstName: firstName,
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
        console.log('res:', res)
        if (res.data.user.user) {
          if (res.data.userMetadata && res.data.userMetadata[0]) {
            setLoginSuccess(
              email,
              password,
              res.data.userMetadata[0].userBuyingPropertyType,
              res.data.userMetadata[0].firstName
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
    if (userData.buyingProgress.scheduleClosing) initGetCalendarDate()
  }, [userData.buyingProgress.scheduleClosing])

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

  return (
    <div className={classNames(className, 'mb-page')}>
      {filteredUnit && (
        <div className="px-x mb-page">
          <div className="mb-ydouble">
            <h2 className="text-h2">Hello,</h2>
            <h2 className="mb-ydouble text-h2 break-words">
              {userData.firstName}
            </h2>

            {userData.loggedIn &&
            !userData.buyingProgress.escrowDeposit &&
            !loading ? (
              <div className="mb-ydouble font-sansText text-md">
                <p className="mb-y">{`You are at the first step to securing a 0001 home.`}</p>
                <p className="mb-y">{`To begin, we require a deposit to secure your home and your purchase.`}</p>
                <p className="mb-y">{`The deposit amount is:`}</p>
                <p className="my-ydouble">{`$1000.00 USD`}</p>
                <p className="">{`If you have any questions please scroll down.`}</p>
              </div>
            ) : (
              <div className="mb-ydouble font-sansText text-md">
                <p className="mb-y">{`${filteredUnit.title} is nearly yours.`}</p>
                <p className="">{`Here you’ll find details on the home and on your next steps to buy it.`}</p>
              </div>
            )}
            <p className="text-md uppercase font-sansText">{`Your 0001 Home`}</p>
          </div>
          <UnitBuySummary unit={filteredUnit} />
        </div>
      )}

      {!userData.loggedIn && showLogin && (
        <LoginForm className="px-x" attemptSignIn={attemptSignIn} />
      )}

      {userData.loggedIn && !userData.unit && (
        <span className="px-x text-button">{`No unit found for user.`}</span>
      )}

      {!loginError.error && !userData.hasPassword && (
        <SetPasswordForm
          className="px-x"
          email={router.query.email as string}
          onPasswordSet={password => {
            setLoading(true)
            setUserData({
              ...userData,
              loggedIn: true,
              password: password,
              hasPassword: true,
            })
          }}
        />
      )}

      {userData.loggedIn &&
        userData.unit &&
        !userData.buyingProgress.escrowDeposit &&
        !loading && (
          <DepositForm
            className="px-x"
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
          <div className="px-x mb-ydouble">
            <div className="rich-text">
              <p className="mb-ydouble text-base uppercase font-sansText">{`The HOME0001 buying experience`}</p>
              <p>{`We’ve reinvented the typical months-long ordeal of buying a home and streamlined every part of it so you can buy your home online in a single session, safely and securely.`}</p>
              <p>
                {`We’ll guide you through each step of completing the purchase online at your pace.`}
              </p>
            </div>

            <div className="flex flex-wrap gap-x mt-ydouble">
              {STEPS.map((step, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 w-full h-[102px] bg-lightgray p-x gap-x text-base uppercase font-sansText leading-[0.95]"
                >
                  <p className="m-0 text-left">{step.title}</p>
                  <p className="m-0 text-left">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <BuyCalendar
            email={userData.email as string}
            unit={userData.unit as string}
            calendarDate={userData.calendarDate}
            onMeetingSet={() => {
              initUpdateProcess('scheduleClosing')
            }}
          />
        </>
      )}

      {loginError.message && (
        <span className="inline-block px-x mt-y text-button">
          {loginError.message || `No account found.`}
        </span>
      )}

      {loading && <p className="px-x !mx-0 mt-y text-button">{`Loading...`}</p>}
    </div>
  )
}

export default BuyContainer
