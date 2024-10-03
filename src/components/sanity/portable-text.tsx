import type { PortableTextBlockStyle } from '@portabletext/types'
import type {
  PortableTextReactComponents,
  PortableTextBlockComponent,
} from '@portabletext/react'
import { reactNodeToString } from '@lib/util'
import { SanityLink, SanityMedia, SanityMediaProps } from '.'
import { SanityTooltip } from './tooltip'
import { useCookiesPrefs } from '@contexts/cookies'
import { useEffect, useRef, type FC, type HTMLAttributes } from 'react'
import { ImageCarousel } from '@components/carousel'
import { SanityInventoryModal } from './table-modal'
import { Media } from '@studio/gen/sanity-schema'
import classNames from 'classnames'
import PhotoSwipeLightbox from 'photoswipe/lightbox'

interface SanityCookiesToggleProps extends HTMLAttributes<HTMLElement> {
  linkedCopy?: string
  cookiesToggle?: boolean
}

const ICON_LEFT = `<svg width="80" style="transform: rotate(180deg); position: relative; left: 15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 45 29" > <path fill='#fff' fillRule="evenodd" d="M30.452 0 45 14.5 30.452 29l-3.943-3.93 7.818-7.791H0V11.72h34.327l-7.818-7.79L30.452 0Z" clipRule="evenodd" /> </svg>`
const ICON_RIGHT = `<svg width="80" style="position: relative; right: 15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 45 29" > <path fill='#fff' fillRule="evenodd" d="M30.452 0 45 14.5 30.452 29l-3.943-3.93 7.818-7.791H0V11.72h34.327l-7.818-7.79L30.452 0Z" clipRule="evenodd" /> </svg>`
const ICON_CLOSE = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 49 12"><path fill="#FFF" d="M5.572 11.224c-.756 0-1.442-.14-2.058-.406a4.437 4.437 0 0 1-1.582-1.134A5.064 5.064 0 0 1 .924 7.976 6.276 6.276 0 0 1 .56 5.82c0-.77.112-1.498.35-2.156a5.27 5.27 0 0 1 1.008-1.722A4.52 4.52 0 0 1 3.5.794C4.116.528 4.816.388 5.586.388c.602 0 1.134.07 1.624.224.49.154.91.364 1.26.63.42.322.756.714 1.008 1.176.238.462.392.966.462 1.512H8.008c-.098-.56-.35-1.022-.77-1.372-.42-.35-.98-.532-1.666-.532-.49 0-.924.098-1.302.28-.378.196-.7.462-.952.798-.266.35-.462.742-.588 1.204a5.727 5.727 0 0 0-.196 1.512c0 .546.07 1.05.224 1.512.14.462.35.868.616 1.19.266.336.574.602.952.784.378.182.798.28 1.26.28.392 0 .742-.056 1.036-.182.294-.126.56-.294.77-.504.21-.21.364-.448.49-.728.126-.266.196-.56.224-.882h1.946a3.865 3.865 0 0 1-.364 1.512c-.238.49-.532.924-.896 1.274-.77.77-1.834 1.148-3.22 1.148ZM11.507.584h1.932v8.722h5.068V11h-7V.584Zm12.675 10.654a5.44 5.44 0 0 1-2.128-.406 4.422 4.422 0 0 1-1.61-1.134 5.067 5.067 0 0 1-1.022-1.722 6.335 6.335 0 0 1-.364-2.156c0-.784.126-1.512.364-2.17a5.067 5.067 0 0 1 1.022-1.722c.434-.476.98-.854 1.61-1.134a5.44 5.44 0 0 1 2.128-.406c.784 0 1.498.14 2.128.406.63.28 1.176.658 1.624 1.134.434.49.784 1.064 1.022 1.722.238.658.35 1.386.35 2.17 0 .77-.112 1.498-.35 2.156a5.302 5.302 0 0 1-1.022 1.722c-.448.49-.994.868-1.624 1.134a5.44 5.44 0 0 1-2.128.406Zm.014-1.638c.518 0 .966-.098 1.358-.294.392-.182.714-.448.98-.784s.462-.742.588-1.204a5.62 5.62 0 0 0 .196-1.498c0-.546-.07-1.05-.196-1.512a3.52 3.52 0 0 0-.588-1.218 2.75 2.75 0 0 0-.98-.812c-.392-.196-.84-.294-1.358-.294-.518 0-.98.098-1.372.294a2.75 2.75 0 0 0-.98.812c-.266.35-.476.756-.602 1.218-.14.462-.21.966-.21 1.512s.07 1.036.21 1.498c.126.462.336.868.602 1.204.266.336.588.602.98.784.392.196.854.294 1.372.294Zm10.605 1.638c-.714 0-1.358-.084-1.904-.266-.56-.168-1.036-.406-1.414-.728a3.266 3.266 0 0 1-.882-1.12 3.54 3.54 0 0 1-.35-1.456h1.946c.14 1.344 1.008 2.016 2.618 2.016.28 0 .546-.028.798-.098.252-.056.476-.154.672-.28.182-.126.336-.28.448-.476.098-.182.154-.406.154-.672 0-.28-.056-.518-.182-.7a1.5 1.5 0 0 0-.546-.462 4.794 4.794 0 0 0-.84-.322c-.336-.084-.714-.168-1.12-.266-.49-.112-.938-.238-1.372-.364a3.858 3.858 0 0 1-1.134-.532 2.375 2.375 0 0 1-.77-.854c-.196-.336-.294-.77-.294-1.288 0-.49.098-.924.294-1.302.182-.364.448-.672.798-.924.35-.238.756-.434 1.218-.56.462-.126.98-.182 1.54-.182 1.218 0 2.17.266 2.856.812.672.546 1.064 1.302 1.162 2.268h-1.89c-.07-.518-.294-.91-.672-1.19-.378-.266-.868-.406-1.484-.406-.588 0-1.05.112-1.4.336-.35.238-.532.56-.532.98 0 .238.056.448.182.602.126.154.294.294.532.406.224.112.504.21.826.294.322.084.672.168 1.078.252.49.098.952.224 1.4.364.434.14.826.322 1.176.56.35.238.616.546.826.924.21.378.308.84.308 1.4 0 .518-.098.98-.308 1.386-.21.406-.49.742-.84 1.008a4.071 4.071 0 0 1-1.288.616 5.393 5.393 0 0 1-1.61.224ZM40.382.584h7.616v1.652h-5.684v2.576h5.026v1.554h-5.026v2.94h5.81V11h-7.742V.584Z"/></svg>`

const SanityCookiesToggle: FC<SanityCookiesToggleProps> = ({
  className,
  ...props
}) => {
  const [showPrefs, setShowPrefs] = useCookiesPrefs()
  return (
    <button
      className="underline"
      onClick={() => {
        setShowPrefs(true)
      }}
    >
      {props.linkedCopy}
    </button>
  )
}

const SanityZoomMedia: FC<Media> = media => {
  const slidesRef = useRef(null)

  useEffect(() => {
    if (!slidesRef.current || !(media?.image?.asset as any).path) return
    const lightbox = new PhotoSwipeLightbox({
      gallery: slidesRef.current,
      children: '.zoom-wrapper',
      arrowPrevSVG: ICON_LEFT,
      arrowNextSVG: ICON_RIGHT,
      closeSVG: ICON_CLOSE,

      showHideAnimationType: 'none',
      zoomAnimationDuration: false,

      counter: false,

      initialZoomLevel: 'fit',
      secondaryZoomLevel: 2.0,
      maxZoomLevel: 2.0,

      pswpModule: () => import('photoswipe'),
    })
    lightbox.init()

    return () => {
      lightbox.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return media?.image?.asset && (media?.image?.asset as any).path ? (
    <div ref={slidesRef}>
      <div className="zoom-wrapper">
        <a
          href={`https://cdn.sanity.io/${(media?.image?.asset as any).path}`}
          data-pswp-width={1000}
          data-pswp-height={1100}
          className={classNames('overflow-hidden')}
        >
          <SanityMedia
            imageProps={{
              alt: media?.alt || 'Media',
              lqip: (media?.image as any)?.asset?.metadata?.lqip,
            }}
            className="w-full h-auto object-cover"
            {...(media as any)}
          />
        </a>
      </div>
    </div>
  ) : (
    <div>
      <SanityMedia
        imageProps={{
          alt: media?.alt || 'Media',
          lqip: (media?.image as any)?.asset?.metadata?.lqip,
        }}
        className="w-full h-auto object-cover"
        {...(media as any)}
      />
    </div>
  )
}

/**
 * PortableText types used globally
 */
export const blockTypes: Partial<PortableTextReactComponents['types']> = {
  media: ({ value }) => {
    return <SanityZoomMedia {...value} />
  },
  tooltip: ({ value }) => {
    return <SanityTooltip {...value} />
  },
  divider: () => {
    return <span className="block h-[2px]" />
  },
  embed: ({ value }) => {
    return <script type="text/javascript">{value.embed}</script>
  },
  cookiesToggle: ({ value }) => {
    return <SanityCookiesToggle {...value} />
  },
  carousel: ({ value }) => {
    return (
      <ImageCarousel
        slides={value.images}
        carousel={true}
        perView={2}
        className="w-full"
        placement="property details"
      />
    )
  },
}

/**
 * PortableText marks used globally
 */
export const blockMarks: Partial<PortableTextReactComponents['marks']> = {
  link: ({ children, value }) => {
    const text = reactNodeToString(children)
    return <SanityLink {...{ ...value, text }} />
  },
  anchor: ({ children, value }) => {
    return <span id={value.anchorId}>{children}</span>
  },
  indented: ({ children }) => {
    return <span className="indented">{children}</span>
  },
  inventoryToggle: ({ value }) => {
    return (
      value.inventory.items && (
        <SanityInventoryModal
          title="Inventory"
          inventory={value.inventory}
          buttonLabel={value.linkedCopy}
          className="inline"
          buttonType="link"
          unit={value.title}
        />
      )
    )
  },
}

/**
 * PortableText blocks used globally
 */
export const blockBlock: Record<
  PortableTextBlockStyle,
  PortableTextBlockComponent | undefined
> = {
  caption: ({ children }) => <p className="caption">{children}</p>,
  small: ({ children }) => <p className="small">{children}</p>,
  large: ({ children }) => <p className="large">{children}</p>,
}
