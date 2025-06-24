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
  EssentialsForm,
} from './forms'

const ApplicationForm: FC<FormProps> = ({
  className,
  user,
  updateUser,
  joiningFee,
  cryptoPrice,
}) => {
  let stepNum = 1

  if (user?.step === 'priceRange') {
    stepNum = 2
  } else if (user?.step === 'whenToBuy') {
    stepNum = 3
  } else if (user?.step === 'bedrooms') {
    stepNum = 4
  } else if (user?.step === 'essentials') {
    stepNum = 5
  }

  return (
    <div className={classNames(className)}>
      <div className="h-full">
        {user?.hasMadePayment && (
          <div className="w-full px-x py-y bg-yellow text-caption font-bold">
            {`${stepNum}/5`}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-x px-x pt-ydouble rich-text">
          <div className="lg:col-start-2 pr-menu lg:pr-0">
            {user?.step === 'info' && (
              <UserInfoForm user={user} updateUser={updateUser} />
            )}

            {user?.step === 'paymentOption' && (
              <UserPaymentOptionForm user={user} updateUser={updateUser} />
            )}

            {user?.step === 'payment' && (
              <UserPaymentForm
                user={user}
                updateUser={updateUser}
                joiningFee={joiningFee}
                cryptoPrice={cryptoPrice}
                className="flex flex-col h-full"
              />
            )}

            {user?.step === 'location' && (
              <LocationForm user={user} updateUser={updateUser} />
            )}

            {user?.step === 'priceRange' && (
              <PriceRangeForm user={user} updateUser={updateUser} />
            )}

            {user?.step === 'whenToBuy' && (
              <TimelineForm user={user} updateUser={updateUser} />
            )}

            {user?.step === 'bedrooms' && (
              <RoomsForm user={user} updateUser={updateUser} />
            )}

            {user?.step === 'essentials' && (
              <EssentialsForm user={user} updateUser={updateUser} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm
