import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@lib/util'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        months: 'flex flex-col sm:flex-row',
        month: 'space-y-4',
        caption: 'flex justify-center relative items-center font-sansText',
        caption_label: 'w-full font-sans text-sm font-medium',
        nav: 'flex justify-end items-center gap-2 w-full',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-8 w-8 bg-white p-0'
        ),
        nav_button_previous: 'relative',
        nav_button_next: 'relative',
        table: 'w-full border-collapse space-y-1',
        head_row:
          'flex justify-between text-center w-full pb-3 px-1 border-bottom',
        head_cell: 'w-8 font-bold text-[11px] font-sansText',
        row: 'flex w-full border-bottom border-left',
        cell: cn(
          'relative border-right p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-[39.6px] w-[39.6px] p-0 aria-selected:opacity-100 aria-selected:font-bold'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'day-outside text-black',
        day_disabled: '',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
