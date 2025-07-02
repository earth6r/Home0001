import React, { FC, memo, useEffect, useRef, useState } from 'react'
import { TypedObject } from 'sanity'
import { Web3UserProps } from '@contexts/web3'
import { mintToken } from '@lib/util/web3'
import { BuyCalendar } from '@components/buy'
import { getBookedCalendarDates } from './actions'
import moment from 'moment-timezone'
import classNames from 'classnames'
import Link from 'next/link'
import { IconCheck, IconTelegramQR, IconWhatsAppQR } from '@components/icons'
import { ArrowBtn } from '@components/btns'

type TokenDashboardProps = {
  dashboardCopy?: TypedObject | TypedObject[]
  user?: Web3UserProps
  updateUser?: (user: Web3UserProps) => void
  className?: string
}

const isDev = process.env.NODE_ENV === 'development'

const CalendarComponent: FC<{
  user: Web3UserProps
  loading?: boolean
  eventDates?: { start_time: string; event_id: string }[] | null
  showCalendar?: boolean
  setShowCalendar: (args0: boolean) => void
}> = ({ user, loading, eventDates, showCalendar, setShowCalendar }) => {
  return (
    <div>
      {loading && <p className="">LOADING...</p>}

      {/* Display the meeting date if available */}
      {!loading && eventDates && eventDates.length > 0 && (
        <>
          <p className="font-medium">
            {`You have a meeting on ${moment(eventDates[0].start_time)
              .tz('America/New_York')
              .format('dddd, MMMM Do [at] h:mma')} EST.`}
          </p>
          <p className="font-medium mb-y">
            {`We’ve sent you an email with all the details.`}
          </p>
          {!showCalendar && (
            <button onClick={() => setShowCalendar(true)}>
              <span className="mt-y underline">{`Change of plans? Re-book your appointment`}</span>
            </button>
          )}
        </>
      )}

      {!loading && showCalendar && (
        <div className="flex flex-col gap-y w-full max-w-[520px]">
          <div className="relative w-full">
            <p>
              {eventDates && eventDates[0]
                ? `Reschedule your appointment:`
                : `Book a tour of our homes in the Lower East Side:`}
            </p>
            {/* <select className="input select text-button font-sans">
          <option>{`New York`}</option>
          <option>{`Los Angeles`}</option>
          <option>{`on a Call`}</option>
        </select>
        <IconChevron className="absolute w-[12px] right-x top-3/4 transform rotate-0 -translate-y-1/2" /> */}
          </div>

          <BuyCalendar
            email={user?.email as string}
            unit={user?.unit as string}
            eventId={eventDates && eventDates[0] && eventDates[0].event_id}
          />
        </div>
      )}
    </div>
  )
}

const DashboardStepsComponent: FC<TokenDashboardProps> = ({
  user,
  updateUser,
  className,
}) => {
  const [eventDates, setEventDates] = useState<
    { start_time: string; event_id: string }[] | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [showCalendar, setShowCalendar] = useState(false)

  // const initMint = async () => {
  //   // console.log('Minting token for address:', user?.address)
  //   mintToken(user?.address as string)
  //     .then(res => {
  //       console.log('Minted token:', res)
  //       // if (!res?.result) {
  //       //   return console.error('No token ID returned from minting')
  //       // }
  //       // setUser({
  //       //   ...user,
  //       //   tokenIds: [res?.toString() as string],
  //       // })
  //     })
  //     .catch(err => {
  //       console.error('Error minting token:', err)
  //     })
  // }

  const initGetCalendarDate = () => {
    if (!user?.email) return
    getBookedCalendarDates(user?.email as string)
      .then(res => {
        setEventDates(res?.data.events)
        if (res?.data.events.length === 0) {
          setShowCalendar(true)
        }
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (user?.hasMadePayment) {
      initGetCalendarDate()
    }
  }, [user?.hasMadePayment])

  return (
    <div className={className}>
      <ul className="flex flex-col gap-y pb-page">
        <li
          className={classNames(
            user?.hasFinishedProfile ? 'opacity-40' : '',
            'relative pb-y rich-text border-bottom--gray'
          )}
        >
          <span className="text-base !font-bold uppercase">Step 1</span>
          <p>Submit your application.</p>

          {user?.hasFinishedProfile && (
            <span className="absolute right-0 top-0 !mt-0 h-auto w-[14px] lg:w-[20px]">
              <IconCheck />
            </span>
          )}
        </li>

        <li
          className={classNames(
            user?.userSentMessage ? 'opacity-40 pointer-events-none' : '',
            'relative w-full pb-y rich-text border-bottom--gray'
          )}
        >
          <span className="text-base !font-bold uppercase">Step 2</span>
          <p>
            {`Chat with a member of the collective. They’ll guide you through the next steps.`}
          </p>
          <p className="hidden md:block !mx-0 mb-y">
            Either scan the QR code or hit the chat button if you haven’t
            already been connected.
          </p>

          {!user?.userSentMessage && (
            <div className="flex flex-col gap-y">
              {user?.comms === 'WhatsApp' ? (
                <div className="hidden md:block w-[200px] border-black">
                  <IconWhatsAppQR className="w-full" />
                </div>
              ) : (
                <div className="hidden md:block w-[200px] border-black">
                  <IconTelegramQR className="w-full" />
                </div>
              )}

              <Link
                href={
                  user?.comms === 'WhatsApp'
                    ? `https://wa.me/12135771277/?text=Hi%2C%20I'm%20interested%20in%20joining%20HOME0001`
                    : `http://t.me/Home0001_USA/?text=Hi%2C%20I%20am%20interested%20in%20joining%20HOME0001`
                }
                target="_blank"
                className="block"
              >
                <ArrowBtn text={`Chat`} />
              </Link>
            </div>
          )}

          {user?.userSentMessage && (
            <span className="absolute right-0 top-0 !mt-0 h-auto w-[14px] lg:w-[20px]">
              <IconCheck />
            </span>
          )}
        </li>

        <li className="w-full pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 3</span>
          <p>
            {`Come hang at a 0001 home or meet us on a call if you’re far away.`}
          </p>

          {(isDev || user?.userSentMessage) && (
            <CalendarComponent
              user={user as Web3UserProps}
              loading={loading}
              eventDates={eventDates}
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
            />
          )}
        </li>

        <li className="pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 4</span>
          <p>
            Once the selection committee approves your application you can mint
            your token here.
          </p>
          <p>
            (If your application is not successful your joining fee will be
            refunded).
          </p>
        </li>

        <li className="pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 5</span>
          <p>Choose your new home, get financing if required, and buy it.</p>
        </li>

        <li className="pb-y rich-text md:border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 6</span>
          <p>Move in and get to know your neighbors.</p>
        </li>
      </ul>
    </div>
  )
}

export const DashboardSteps = memo(DashboardStepsComponent)

export default DashboardSteps
