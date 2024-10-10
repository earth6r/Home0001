import { SCREENS } from '../../../src/globals/screens'

export type Breakpoints = { [key in keyof typeof SCREENS]: boolean }

/**
 * Returns an object of screen size/boolean key/values
 * based on comparing each size defined in the `SCREENS`
 * global object to a given screen width
 */
export const getBreakpoints = (size: number): Breakpoints =>
  Object.fromEntries(
    Object.entries(SCREENS).map(([key, val]) => [key, (val as number) <= size])
  ) as Breakpoints

export default getBreakpoints
