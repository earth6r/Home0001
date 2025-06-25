import React, { FC, memo, useEffect, useState } from 'react'
import { TypedObject } from 'sanity'
import { Web3UserProps } from '@contexts/web3'
import { mintToken } from '@lib/util/web3'
import { BuyCalendar } from '@components/buy'
import { getBookedCalendarDates } from './actions'
import moment from 'moment-timezone'
import classNames from 'classnames'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import Link from 'next/link'

type TokenDashboardProps = {
  dashboardCopy?: TypedObject | TypedObject[]
  user?: Web3UserProps
  updateUser?: (user: Web3UserProps) => void
  className?: string
}

const DashboardStepsComponent: FC<TokenDashboardProps> = ({
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
    if (!user?.email) return
    getBookedCalendarDates(user?.email as string)
      .then(res => {
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
          <p>
            {`Chat with a member of the collective. They’ll guide you through the next steps.`}
          </p>

          <Link
            href={
              user?.comms === 'WhatsApp' ? `https://wa.me/` : `https://t.me/`
            }
            target="_blank"
            className="block"
          >
            <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-black text-white">
              <IconSmallArrow fill="white" width="15" height="11" />
              <span className="uppercase font-medium leading-none text-xs">
                {`Chat`}
              </span>
            </button>
          </Link>
        </li>

        <li className="w-full pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 3</span>
          <p>
            {`Come hang at a 0001 home or meet us on a call if you’re far away.`}
          </p>

          {loading && <p className="">LOADING...</p>}

          {/* Display the meeting date if available */}
          {!loading && eventDates && eventDates.length > 0 ? (
            <p className="font-medium">{`You have a meeting on ${moment(
              eventDates[0].start_time
            )
              .tz('America/New_York')
              .format('dddd, MMMM Do [at] h:mma')} EST`}</p>
          ) : (
            !loading && (
              <div className="flex flex-col gap-y w-full max-w-[520px]">
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
