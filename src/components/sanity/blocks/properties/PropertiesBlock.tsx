import { type FC } from 'react'
import type { PropertiesBlockProps } from './types'
import { Block } from '@components/sanity'
import { PropertyList } from '@components/property'

export const PropertiesBlock: FC<PropertiesBlockProps> = ({
  header,
  properties,
  className,
}) => {
  return (
    <Block className={className}>
      <PropertyList
        header={header}
        properties={properties}
        className="lg:max-w-[1000px] lg:mx-auto pl-x pr-menu md:px-fullmenu"
      />
    </Block>
  )
}

export default PropertiesBlock
