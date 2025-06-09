/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import classNames from 'classnames'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from './types'
import {
  UserInfoForm,
  UserPaymentOptionForm,
  UserPaymentForm,
  LocationForm,
  PriceRangeForm,
  TimelineForm,
  RoomsForm,
} from './forms'

const ApplicationForm: FC<FormProps> = ({
  className,
  user,
  setUser,
  joiningFee,
  cryptoPrice,
}) => {
  const [formStarted, setFormStarted] = useState(false)

  return (
    <div className={classNames(className)}>
      <div className="h-full">
        <div className="gap-x pr-x md:mx-auto lg:max-w-[480px] rich-text">
          {/* <h2>{`YOUR HOME0001 APPLICATION:`}</h2> */}

          {formStarted ? (
            <div>
              {user?.step === 'info' && (
                <UserInfoForm user={user} setUser={setUser} />
              )}

              {user?.step === 'paymentOption' && (
                <UserPaymentOptionForm user={user} setUser={setUser} />
              )}

              {user?.step === 'payment' && (
                <UserPaymentForm
                  user={user}
                  setUser={setUser}
                  joiningFee={joiningFee}
                  cryptoPrice={cryptoPrice}
                  className="flex flex-col h-full"
                />
              )}

              {user?.step === 'location' && (
                <LocationForm user={user} setUser={setUser} />
              )}

              {user?.step === 'priceRange' && (
                <PriceRangeForm user={user} setUser={setUser} />
              )}

              {user?.step === 'whenToBuy' && (
                <TimelineForm user={user} setUser={setUser} />
              )}

              {user?.step === 'bedrooms' && (
                <RoomsForm user={user} setUser={setUser} />
              )}
            </div>
          ) : (
            <div className="mt-0 flex flex-col justify-between min-h-[calc(80svh-var(--header-height))] md:h-[calc(88svh-var(--header-height))]">
              <div>
                <p className="large mb-y">{`Your wallet has been successfully connected and your membership profile has been created.`}</p>
                <p className="large">{`The next step is for you to tell us a little about yourself, pay the application fee (if needed) and fill out the questionnaire.`}</p>
              </div>
              <button
                onClick={() => {
                  setFormStarted(true)
                  scroll.scrollToTop({ behavior: 'smooth' })
                }}
                className={classNames(
                  'relative flex justify-between items-center w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above'
                )}
              >
                {'Continue'}
                <IconSmallArrow className="w-[1.1em]" height="10" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm
