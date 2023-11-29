import { type FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { useWaitlisModal } from '@contexts/modals'

interface WaitlistProps extends HTMLAttributes<HTMLDivElement> {
  buttonText?: string
}

export const Waitlist: FC<WaitlistProps> = ({ buttonText, className }) => {
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
  return (
    <div className={classNames(className)}>
      <div className="pl-x pr-[calc(var(--space-menu)+var(--space-x))] md:px-x py-ydouble md:p-14 bg-yellow">
        <div className="md:max-w-[436px]">
          <h2 className="text-title">{`Join the waitlist:`}</h2>

          <div className="rich-text my-ydouble md:my-y">
            <p>0001 homes are released exclusively to our waitlist.</p>
            <p>
              Sign up here to schedule a tour and for updates on upcoming
              buildings and new locations.
            </p>
          </div>

          <div className="">
            <button
              aria-label={buttonText || 'Join the waitlist'}
              onClick={() => {
                setWaitlistOpen(true)
              }}
              className={classNames(
                `w-full relative border-1 border-black border-solid flex flex-row justify-between items-center bg-black text-white font-bold text-xs z-above p-4`
              )}
            >
              <span className="text-left uppercase">
                {buttonText || 'Join the waitlist'}
              </span>
              <IconSmallArrow width="22" height="10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Waitlist
