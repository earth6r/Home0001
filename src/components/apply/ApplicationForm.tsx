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
  return (
    <div className={classNames(className)}>
      <div className="h-full">
        <div className="grid md:grid-cols-2 gap-x rich-text">
          <h1 className="hidden md:block">{`HOME0001 APPLICATION:`}</h1>

          <div className="pr-menu">
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
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm
