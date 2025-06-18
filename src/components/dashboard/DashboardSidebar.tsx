/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import classNames from 'classnames'
import { mintToken } from '@lib/util/web3'
import { DashboardSidebarProps } from './types'
import { SanityImage, SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'
import { useRouter } from 'next/router'

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  user,
  image,
  menu,
  imageUrl,
  className,
}) => {
  const { asPath } = useRouter()

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

  console.log('DashboardSidebar image:', image)

  return user ? (
    <div className="flex flex-col gap-y rich-text">
      <h3>{`Hello, ${user.first_name}.`}</h3>

      <div className="max-w-[290px] aspect-square">
        {image && (
          <SanityImage
            asset={image.asset}
            props={{ alt: 'Token image', sizes: '580px', quality: 80 }}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {/* {(!user?.tokenIds || user.tokenIds.length === 0) && (
            <div className="flex flex-col gap-y mt-y">
              <div className="rich-text">
                <p>No tokens found matching wallet address.</p>
              </div>

              <button
                onClick={initMint}
                className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black bg-white"
              >
                <IconSmallArrow fill="black" width="15" height="11" />

                <span className="uppercase font-medium leading-none text-xs">
                  {`Mint a token`}
                </span>
              </button>
            </div>
          )} */}

      {user?.tokenIds && user.tokenIds.length > 0 && (
        <div className="grid grid-cols-2 gap-x p-x mt-ydouble bg-gray">
          {user.tokenIds && user.tokenIds.length > 0 && (
            <>
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="NFT"
                  className="w-full h-auto object-cover"
                />
              )}

              <div className="w-full rich-text">
                <p className="mb-y">TokenID: </p>
                <p className="text-lg">{user.tokenIds[0].toString()}</p>
              </div>
            </>
          )}
        </div>
      )}

      <p className="!m-0 pb-y uppercase border-bottom--gray">{`Membership status: Awaiting judgement`}</p>
      <p className="!m-0 pb-y uppercase border-bottom--gray">{`Connected wallet ...${user.address?.slice(
        user.address.length - 4,
        user.address.length
      )}`}</p>

      <nav className="!m-0">
        {menu && (
          <div className="flex flex-col gap-yhalf">
            {menu.items?.map((item, index) => (
              <SanityLink
                key={`${item.text}-${index}`}
                {...(item.link as SanityLinkType)}
                className={classNames(
                  asPath !== '' &&
                    asPath ===
                      `/${
                        (item.link as SanityLinkType)?.internalLink?.slug
                          ?.current
                      }`
                    ? 'underline'
                    : '',
                  'flex items-center font-medium'
                )}
              >
                {item.text}
              </SanityLink>
            ))}
          </div>
        )}
      </nav>
    </div>
  ) : null
}

export default DashboardSidebar
