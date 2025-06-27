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
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import { step } from 'viem/chains'

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
      <div className="relative h-full">
        {user?.hasMadePayment && (
          <div className="w-full px-x py-y bg-yellow text-caption font-bold">
            {`${stepNum}/5`}
          </div>
        )}

        {user?.step !== 'location' && (
          <button
            onClick={() => {
              updateUser({
                ...user,
                step:
                  stepNum === 2
                    ? 'location'
                    : stepNum === 3
                    ? 'priceRange'
                    : stepNum === 4
                    ? 'whenToBuy'
                    : stepNum === 5
                    ? 'bedrooms'
                    : '',
              })
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center justify-center relative lg:absolute w-[31px] h-[26px] left-x top-y lg:top-[calc(48px+var(--space-y-double))] bg-black"
          >
            <IconRightArrowBold className="w-[15px] transform rotate-[180deg]" />
          </button>
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
