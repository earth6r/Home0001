import type { Ref, FC } from 'react'
import classNames from 'classnames'
import NextLink from 'next/link'
import styles from './btn.module.css'
import type { BtnProps } from './types'

export const Btn: FC<BtnProps> = props => {
  const { custom, children, className } = props
  const style = props.style || {}
  const classes = {
    [styles.active]: props.active,
  }
  if (props.as === 'link') {
    const { href, external, onClick, innerRef } = props
    return (
      <NextLink href={href} passHref>
        <a
          href={`${href}`}
          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
          className={classNames(styles.btn, classes, className)}
          style={style}
          ref={innerRef as Ref<HTMLAnchorElement>}
          onClick={onClick}
        >
          {custom ? (
            children
          ) : (
            <>
              <span className={classNames(styles.text, 'text')}>
                {children}
              </span>
              <i className={classNames(styles.shadow, 'shadow')} />
            </>
          )}
        </a>
      </NextLink>
    )
  }
  if (props.as === 'span') {
    const { onClick, innerRef } = props
    return (
      <span
        className={classNames(styles.btn, classes, className, 'btn')}
        style={style}
        ref={innerRef as Ref<HTMLSpanElement>}
        onClick={onClick}
      >
        {custom ? (
          children
        ) : (
          <>
            <span className={classNames(styles.text, 'text')}>{children}</span>
            <i className={classNames(styles.shadow, 'shadow')} />
          </>
        )}
      </span>
    )
  }
  const { type = 'button', onClick, innerRef } = props
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={classNames(styles.btn, classes, className, 'btn')}
      style={style}
      ref={innerRef as Ref<HTMLButtonElement>}
      onClick={onClick}
    >
      {custom ? (
        children
      ) : (
        <>
          <span className={classNames(styles.text, 'text')}>{children}</span>
          <i className={classNames(styles.shadow, 'shadow')} />
        </>
      )}
    </button>
  )
}

export default Btn
