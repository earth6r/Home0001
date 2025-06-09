import React, { FC } from 'react'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { TypedObject } from 'sanity'
import { Web3UserProps } from '@contexts/web3'
import Link from 'next/link'

type TokenDashboardProps = {
  dashboardCopy?: TypedObject | TypedObject[]
  user: Web3UserProps
  className?: string
}

const DashboardSteps: FC<TokenDashboardProps> = ({ user, className }) => (
  <div className={className}>
    <ul className="flex flex-col gap-y">
      <li className="relative pb-y rich-text border-bottom">
        <span className="text-base font-bold uppercase">Step 1</span>
        <p>
          Submit your application. A member of the collective will reach out to
          you. Speak with them.
        </p>

        {!user?.hasFinishedProfile && (
          <Link
            href={`/apply`}
            target="_blank"
            className="inline-block mt-y font-bold"
          >
            <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black bg-black text-white">
              <IconSmallArrow fill="white" width="15" height="11" />

              <span className="uppercase font-medium leading-none text-xs">
                {`Finish Application`}
              </span>
            </button>
          </Link>
        )}

        {user?.hasFinishedProfile && (
          <span className="absolute right-0 top-0 text-base font-bold">
            Completed
          </span>
        )}
      </li>

      <li className="pb-y rich-text border-bottom">
        <span className="text-base font-bold uppercase">Step 2</span>
        <p>Come hang at a 0001 home or meet us on a call if you’re far away.</p>
        <div className="inline-block mt-y font-bold">
          <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black bg-black text-white">
            <IconSmallArrow fill="white" width="15" height="11" />

            <span className="uppercase font-medium leading-none text-xs">
              {`View Appointment`}
            </span>
          </button>
        </div>
      </li>

      <li className="pb-y rich-text border-bottom">
        <span className="text-base font-bold uppercase">Step 3</span>
        <p>
          If your application is approved, you can mint your token here. If it’s
          not, your joining fee will be refunded.
        </p>
      </li>

      <li className="pb-y rich-text border-bottom">
        <span className="text-base font-bold uppercase">Step 4</span>
        <p>Choose your new home, get financing if required, and buy it.</p>
      </li>

      <li className="pb-y rich-text md:border-bottom">
        <span className="text-base font-bold uppercase">Step 5</span>
        <p>Move in and get to know your neighbors.</p>
      </li>
    </ul>
  </div>
)

export default DashboardSteps
