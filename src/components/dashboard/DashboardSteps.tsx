import React, { FC, useEffect } from 'react'
import { TypedObject } from 'sanity'
import { useWeb3Client, Web3UserProps } from '@contexts/web3'
import { mintToken } from '@lib/util/web3'
import IconChevron from '@components/icons/IconChevron'
import { BuyCalendar } from '@components/buy'
import { getBookedCalendarDate } from './actions'

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
  const initMint = async () => {
    // console.log('Minting token for address:', user?.address)
    mintToken(user?.address as string)
      .then(res => {
        console.log('Minted token:', res)
        // if (!res?.result) {
        //   return console.error('No token ID returned from minting')
        // }
        // setUser({
        //   ...user,
        //   tokenIds: [res?.toString() as string],
        // })
      })
      .catch(err => {
        console.error('Error minting token:', err)
      })
  }

  const initGetCalendarDate = () => {
    getBookedCalendarDate(user?.email as string)
      .then(res => {
        if (updateUser && res?.data.date)
          updateUser({
            ...user,
            calendar_date: res?.data.date,
          })
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (user?.hasMadePayment) initGetCalendarDate()
  }, [])

  return (
    <div className={className}>
      <ul className="flex flex-col gap-y">
        <li className="relative pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 1</span>
          <p>
            Submit your application. A member of the collective will reach out
            to you. Speak with them.
          </p>

          {/* {!user?.hasFinishedProfile && (
            <Link
              href={`/apply`}
              target="_blank"
              className="inline-block mt-y font-medium"
            >
              <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-black text-white">
                <IconSmallArrow fill="white" width="15" height="11" />

                <span className="uppercase font-medium !leading-none">
                  {`Finish Application`}
                </span>
              </button>
            </Link>
          )} */}

          {user?.hasFinishedProfile && (
            <span className="absolute right-0 top-0 text-base font-medium m-0">
              Completed
            </span>
          )}
        </li>

        <li className="w-full pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 2</span>
          <p>
            Come hang at a 0001 home or meet us on a call if you’re far away.
          </p>
          {user?.calendar_date ? (
            <p>{`Appointment date: ${user.calendar_date}`}</p>
          ) : (
            <div className="flex flex-col gap-y w-full max-w-[420px]">
              {/* <div className="inline-block mt-y font-bold">
            <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-black text-white">
              <IconSmallArrow fill="white" width="15" height="11" />

              <span className="uppercase !leading-none">
                {`View Appointment`}
              </span>
            </button>
          </div> */}

              <div className="relative w-full">
                <select className="input select text-button font-sans">
                  <option>{`New York`}</option>
                </select>
                <IconChevron className="absolute w-[12px] right-x top-1/2 transform rotate-0 -translate-y-1/2" />
              </div>

              <BuyCalendar
                email={user?.email as string}
                unit={user?.unit as string}
                calendarDate={user?.calendar_date}
                // onMeetingSet={() => {
                //   initUpdateProcess('scheduleClosing')
                // }}
              />
            </div>
          )}
        </li>

        <li className="pb-y rich-text border-bottom--gray">
          <span className="text-base !font-bold uppercase">Step 3</span>
          <p>
            If your application is approved, you can mint your token here. If
            it’s not, your joining fee will be refunded.
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
