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
import type { Dispatch, FormEvent, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { getUserProfile, getUserCurrentStep } from '@components/apply/actions'
import { saveError } from '@lib/util/save-error'
import { fetchImageUrl, fetchTokenURI } from '@lib/util/web3'
import { useWalletUser, useWeb3ImageUrl, Web3UserProps } from '@contexts/web3'
import DashboardPopup from '@components/dashboard/DashboardPopup'
import { DashboardSidebar } from '@components/dashboard'
import ApplicationPrompt from '@components/apply/ApplicationPrompt'
import WalletPopup from '@components/dashboard/WalletPopup'

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
    Dispatch<SetStateAction<Web3UserProps>>
  ]
  const [imageUrl, setImageUrl] = useWeb3ImageUrl() as [
    string | null,
    Dispatch<SetStateAction<string | null>>
  ]
  const [loading, setLoading] = useState(true)

  const [showLogin, setShowLogin] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [showWalletPopup, setShowWalletPopup] = useState(true)

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

  // const fetchImage = async () => {
  //   try {
  //     const uri = await fetchTokenURI(1) // assuming token ID 1
  //     const img = await fetchImageUrl(uri as unknown as string)
  //     setImageUrl(img)
  //   } catch (error) {
  //     console.error('Error fetching NFT image:', error)
  //   }
  // }

  const initGetUserStep = (user: any) => {
    try {
      getUserCurrentStep(user.email)
        .then(res => {
          const { data } = res || {}
          updateUser({
            id: user.id,
            address: user.walletAddress,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            phone_number: user.phoneNumber,
            step: data.tokenMinted
              ? 'token'
              : data.referralPaymentMade
              ? 'location'
              : data.walletConnectedProfileCreated
              ? 'payment'
              : 'info',
            hasMadePayment: data.referralPaymentMade,
            hasFinishedProfile: data.questionnaireFinished,
          })
          // if (data.tokenMinted) fetchImage()
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
          initGetUserStep(res.data.user)
        } else {
          updateUser({
            ...user,
            step: 'prompt',
            hasFinishedProfile: false,
            address: address as string,
          })
          setLoading(false)
        }
        if (sessionStorage.getItem('allowAnalytics') !== 'false')
          localStorage.setItem('walletAddress', address)
      })
      .catch(err => {
        console.error(err)
        saveError(err, 'initUserProfile')
        setLoading(false)
      })
  }

  useEffect(() => {
    if (user && user.hasFinishedProfile) {
      if (localStorage.getItem('hasVisited') !== 'true') {
        setShowPopup(true)
        localStorage.setItem('hasVisited', 'true')
      }
    }
  }, [user])

  useEffect(() => {
    setShowLogin(sessionStorage.getItem('loggedIn') !== 'true')

    if (
      query.wallet ||
      (localStorage.getItem('walletAddress') &&
        (localStorage.getItem('walletAddress') as string).length > 4)
    ) {
      initUserProfile(
        (query.wallet as string) ||
          (localStorage.getItem('walletAddress') as string)
      )
    } else {
      setLoading(false)
      console.warn('No wallet address provided in query parameters.')
    }
  }, [query])

  return page?.body && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article className="pt-header pb-page md:py-page">
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

            {user && user.step === 'prompt' && showWalletPopup && (
              <WalletPopup
                user={user}
                setShowPopup={() => setShowWalletPopup(false)}
              />
            )}
            {showPopup && <DashboardPopup setShowPopup={setShowPopup} />}

            {!loading && !user && (
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
                    ? 'md:grid md:grid-cols-3 pl-x pr-fullmenu md:pr-0'
                    : '',
                  'flex flex-col gap-block md:gap-x'
                )}
              >
                {user.hasFinishedProfile && (
                  <DashboardSidebar
                    image={siteSettings?.dashImage}
                    menu={siteSettings?.dashboardMenu}
                    user={user}
                    imageUrl={imageUrl}
                  />
                )}

                <div className="md:col-span-2">
                  <BlockContent
                    grid={true}
                    user={user}
                    updateUser={updateUser}
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
