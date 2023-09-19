import type { FC } from 'react'
import classNames from 'classnames'
import type { SanityBlockElement } from '@components/sanity'

export const RichTextBoilerplate: FC<SanityBlockElement> = ({
  className,
  style,
}) => (
  <div className={classNames(className, 'rich-text')} style={style}>
    <h1>Heading 1</h1>
    <p>
      <a href="https://google.com">This is a link.</a> Lorem ipsum dolor sit
      amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
      tincidunt ut <strong>laoreet dolore magna</strong> aliquam erat volutpat.
      Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
      suscipit <em>lobortis nisl ut aliquip ex ea</em> commodo consequat. Duis
      autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
      consequat
    </p>
    <h2>Heading 2</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
      wisi enim ad minim veniam.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
      wisi enim ad minim veniam.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
      wisi enim ad minim veniam.
    </p>
    <h3>Heading 3</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
      wisi enim ad minim veniam.
    </p>
    <h4>Heading 4</h4>
    <ul>
      <li>Unordered list item</li>
      <li>Unordered list item</li>
      <li>Unordered list item</li>
      <li>Unordered list item</li>
      <li>Unordered list item</li>
    </ul>
    <h5>Heading 5</h5>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
      wisi enim ad minim veniam.
    </p>
    <ol>
      <li>Ordered list item</li>
      <li>Ordered list item</li>
      <li>Ordered list item</li>
      <li>Ordered list item</li>
      <li>Ordered list item</li>
    </ol>
    <h6>Heading 6</h6>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
      wisi enim ad minim veniam.
    </p>
  </div>
)

export default RichTextBoilerplate
