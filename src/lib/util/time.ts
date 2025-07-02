import moment from 'moment-timezone'

export const convertSeconds = (seconds: number) => {
  const duration = moment.duration(seconds, 'seconds')
  const hours = duration.hours()
  const minutes = duration.minutes()

  return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`
}

export const setUpcomingDates = (lengthInWeeks: number) => {
  const dates: moment.Moment[] = []
  const today = moment()
  const endDate = moment().add(lengthInWeeks, 'weeks')

  let currentDate = today.clone()
  while (currentDate.isSameOrBefore(endDate)) {
    dates.push(currentDate.clone())
    currentDate.add(1, 'day')
  }
  return dates
}

export const createEasternTimeDate = (
  dateStr: string,
  timeStr: string
): { start: string; end: string } => {
  const dateTimeString = `${dateStr} ${timeStr}`
  const easternTime = moment.tz(
    dateTimeString,
    'YYYY-MM-DD HH:mm',
    'America/New_York'
  )

  return {
    start: easternTime.toISOString(),
    end: easternTime.clone().add(1, 'hour').toISOString(),
  }
}
