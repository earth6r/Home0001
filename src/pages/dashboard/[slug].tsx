import {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import groq from 'groq'
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  NextPage,
  GetStaticPaths,
} from 'next'
import type { Dashboard as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { BODY_QUERY, client, filterDataToSingleItem } from '@studio/lib'
import { BlockContent } from '@components/sanity'
import PageTransition from '@components/transition/PageTransition'
import classNames from 'classnames'
import type { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { getUserProfile, getUserCurrentStep } from '@components/apply/actions'
import { saveError } from '@lib/util/save-error'
import { motion } from 'framer-motion'
import { fetchImageUrl, fetchTokenURI } from '@lib/util/web3'
import { useWalletUser, useWeb3ImageUrl, Web3UserProps } from '@contexts/web3'
import DashboardPopup from '@components/dashboard/DashboardPopup'
import { IconWaitlist } from '@components/icons'
import Link from 'next/link'
import { DashboardSidebar } from '@components/dashboard'
import { ApplicationContainer } from '@components/apply'
import ApplicationPrompt from '@components/apply/ApplicationPrompt'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const ALL_SLUGS_QUERY = groq`*[_type == "dashboard" && defined(slug.current)][].slug.current`
const PAGE_QUERY = groq`
  *[_type == "dashboard" && slug.current == $slug]{
    _id,
    _type,
    slug,
    seo,
    password,
    ${BODY_QUERY}
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await client.fetch(ALL_SLUGS_QUERY)
  return {
    paths: pages.map((slug: string) => `/dashboard/${slug}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: PAGE_QUERY })

const Page: NextPage<PageProps> = (
  {
    data,
    siteSettings,
    preview,
  }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)

  const { query } = useRouter()
  const [user, updateUser] = useWalletUser() as [
    Web3UserProps,
    React.Dispatch<React.SetStateAction<Web3UserProps>>
  ]
  const [imageUrl, setImageUrl] = useWeb3ImageUrl() as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ]
  const [loading, setLoading] = useState(true)

  const [showLogin, setShowLogin] = useState(true)
  const [showPopup, setShowPopup] = useState(false)

  const validatePassword = (e: FormEvent<HTMLInputElement>) => {
    if ((e.target as HTMLTextAreaElement).value === page.password) {
      setShowLogin(false)
      sessionStorage.setItem('loggedIn', 'true')
    }
  }

  // const fetchTokenIds = async (address: string, email: string) => {
  //   try {
  //     getTokensOwnedByAddress(address)
  //       .then(tokenIds => {
  //         updateUser({
  //           ...user,
  //           email: email || '',
  //           address: address as string,
  //           tokenIds: tokenIds as string[],
  //         })
  //         console.log('Token IDs owned by the address:', user)
  //       })
  //       .catch(err => console.log('Error:', err))
  //   } catch (error) {
  //     console.error('Error fetching tokens:', error)
  //   }
  // }

  const fetchImage = async () => {
    try {
      const uri = await fetchTokenURI(1) // assuming token ID 1
      const img = await fetchImageUrl(uri as unknown as string)
      setImageUrl(img)
    } catch (error) {
      console.error('Error fetching NFT image:', error)
    }
  }

  // TODO: MAYBE MOVE IMAGE FETCHING TO DASHBOARD PAGE SLUG, HAFEEZ TO REPORT BACK ON SIDEBAR PERSISTENCE

  const initGetUserStep = (email: string, address: string, name: string) => {
    try {
      getUserCurrentStep(email)
        .then(res => {
          const { data } = res || {}
          updateUser({
            ...user,
            first_name: name,
            address: address,
            email: email,
            step: data.tokenMinted
              ? 'token'
              : data.referralPaymentMade
              ? 'location'
              : data.walletConnectedProfileCreated
              ? 'paymentOption'
              : 'info',
            hasMadePayment: data.referralPaymentMade,
            hasFinishedProfile: data.questionnaireFinished,
          })
          if (data.tokenMinted) fetchImage()
        })
        .catch(err => {
          console.error('Error fetching user step:', err)
          saveError(err, 'initGetUserStep')
        })
        .finally(() => setLoading(false))
    } catch (error) {
      console.error('Error initializing user step:', error)
      saveError(error, 'initGetUserStep')
    }
  }

  const initUserProfile = (address: string) => {
    getUserProfile(address)
      .then(res => {
        if (res?.data.user) {
          initGetUserStep(res.data.user.email, address, res.data.user.firstName)

          if (localStorage.getItem('hasVisited') !== 'true') {
            setShowPopup(true)
            localStorage.setItem('hasVisited', 'true')
          }
        } else {
          updateUser({
            ...user,
            step: 'info',
            hasFinishedProfile: false,
            address: address as string,
          })
          console.log('No user profile found for this address, user:', user)
        }
      })
      .catch(err => {
        console.error(err)
        saveError(err, 'initUserProfile')
        setLoading(false)
      })
  }

  useEffect(() => {
    setShowLogin(sessionStorage.getItem('loggedIn') !== 'true')

    if (query.wallet) {
      initUserProfile(query.wallet as string)
    } else {
      setLoading(false)
      console.warn('No wallet address provided in query parameters.')
    }
  }, [query])

  return page?.body && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article className="py-page">
        {page?.password && showLogin ? (
          <div className="flex items-center justify-center w-full h-[60vh]">
            <form className="form">
              <input
                type="text"
                placeholder="Password"
                className="input"
                onInput={e => validatePassword(e)}
              />
            </form>
          </div>
        ) : (
          <div>
            {loading && <h2 className="container text-h3">Loading...</h2>}

            {showPopup && <DashboardPopup setShowPopup={setShowPopup} />}

            {!user && !loading && (
              <div className="container flex flex-col gap-y rich-text">
                <ApplicationPrompt header={`Login`} />
              </div>
            )}

            {user && user.hasFinishedProfile && (
              <div
                className={classNames(
                  'hidden md:flex flex-col justify-end gap-8 fixed w-[100svh] h-[calc(100vw+32px)] top-0 right-[calc(-100vw+44px)] md:right-[calc(-100vw+44px)] pl-header transform translate-x-[calc(100%+16px)] rotate-90 origin-top-left transition-all duration-500 border-none z-above'
                )}
              >
                <div className={classNames('flex items-end gap-2 ')}>
                  <h2 className="min-w-[635px] text-side">{`Your Dashboard`}</h2>
                </div>
              </div>
            )}

            {user && !loading && (
              <div
                className={classNames(
                  user.hasFinishedProfile
                    ? 'md:grid md:grid-cols-3 md:pl-x'
                    : '',
                  'flex flex-col gap-x'
                )}
              >
                {user.hasFinishedProfile && (
                  <DashboardSidebar
                    menu={siteSettings?.dashboardMenu}
                    user={user}
                    imageUrl={imageUrl}
                  />
                )}

                <div className="md:col-span-2 mt-ydouble md:mt-0">
                  <BlockContent
                    grid={true}
                    user={user}
                    blocks={page?.body}
                    className={classNames(
                      'w-full overflow-hidden md:overflow-visible'
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(Page as ForwardRefRenderFunction<unknown, {}>)
