/* eslint-disable no-console */
import React, { FC } from 'react'
import classNames from 'classnames'
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
  console.log(user)
  return (
    <div className={classNames(className)}>
      <div className="h-full">
        <div className="grid lg:grid-cols-3 gap-x rich-text">
          <div className="lg:col-start-2 pr-menu lg:pr-0">
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
