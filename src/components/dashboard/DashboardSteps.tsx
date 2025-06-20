import React, { FC, useEffect, useState } from 'react'
import { TypedObject } from 'sanity'
import { Web3UserProps } from '@contexts/web3'
import { mintToken } from '@lib/util/web3'
import { BuyCalendar } from '@components/buy'
import { getBookedCalendarDates } from './actions'
import moment from 'moment-timezone'

type TokenDashboardProps = {
  dashboardCopy?: TypedObject | TypedObject[]
  user?: Web3UserProps
  updateUser?: (user: Web3UserProps) => void
  className?: string
}

const DashboardSteps: FC<TokenDashboardProps> = ({
  user,
  updateUser,
  className,
}) => {
  const [eventDates, setEventDates] = useState<{ start_time: string }[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)

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
    getBookedCalendarDates(user?.email as string)
      .then(res => {
        console.log('Booked calendar dates:', res)
        setEventDates(res?.data.events)
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
  }, [user?.email, user?.hasMadePayment])

  return (
    <div className={className}>
      <ul className="flex flex-col gap-y">
        <li className="relative pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 1</span>
          <p className="lg:pr-fullmenu">
            Submit your application. A member of the collective will reach out
            to you. Speak with them.
          </p>

          {user?.hasFinishedProfile && (
            <span className="absolute right-0 top-0 !mt-0 h-auto w-[14px] lg:w-[20px]">
              <svg
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7279 0.399902L8.02207 12.2058L2.875 6.91546L0.5 9.35832L8.41543 17.4999L19.5 2.84276L16.7279 0.399902Z"
                  fill="black"
                />
              </svg>
            </span>
          )}
        </li>

        <li className="w-full pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 2</span>
          <p className="lg:pr-fullmenu">
            Come hang at a 0001 home or meet us on a call if you’re far away.
          </p>

          {loading && <p className="">LOADING...</p>}

          {/* Display the meeting date if available */}
          {!loading && eventDates ? (
            <p className="font-medium">{`You have a meeting on ${moment(
              eventDates[0].start_time
            )
              .tz('America/New_York')
              .format('dddd, MMMM Do [at] h:mma')} EST`}</p>
          ) : (
            !loading && (
              <div className="flex flex-col gap-y w-full max-w-[420px]">
                <div className="relative w-full">
                  <p className="mt-y">
                    Book a tour of our homes in the Lower East Side:
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
                  calendarDate={user?.calendar_dates}
                />
              </div>
            )
          )}
        </li>

        <li className="pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 3</span>
          <p className="pr-fullmenu">
            Once the selection committee approves your application you can mint
            your token here.
          </p>
          <p>
            (If your application is not successful your joining fee will be
            refunded).
          </p>
        </li>

        <li className="pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 4</span>
          <p>Choose your new home, get financing if required, and buy it.</p>
        </li>

        <li className="pb-y rich-text md:border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 5</span>
          <p>Move in and get to know your neighbors.</p>
        </li>
      </ul>
    </div>
  )
}

export default DashboardSteps
