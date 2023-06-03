import { formatDate } from '../../utils'
import { StatisticsData } from '../../utils/types'

export const getStatsWithEmojis = (stats: {
  [date: string]: boolean
}): StatisticsData => {
  const { pastWeekDates, pastWeekDatesWithDays } = getPastWeekDates()
  let count = 0
  const data: string[] = []

  for (const date of pastWeekDates) {
    const value = stats[date]
    const emoji = value === undefined ? '🤷‍♂' : value === false ? '😕' : '🍺'
    data.push(`${pastWeekDatesWithDays[date]}: ${emoji}`)
    if (value === true) {
      count++
    }
  }

  const startDate = pastWeekDates[0]
  const endDate = pastWeekDates[pastWeekDates.length - 1]
  const percentage = (count / pastWeekDates.length) * 100

  return { startDate, endDate, count, percentage, data }
}

const DAYS_OF_WEEK = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

function getFormattedDates(startDate: Date): string[] {
  const formattedDates: string[] = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const formattedDate = formatDate(date)
    formattedDates.push(formattedDate)
  }

  return formattedDates
}

const getMonday = (): Date => {
  const today = new Date()

  // Get the current day of the week (0-6, where Sunday is 0)
  const dayOfWeek = today.getDay()

  // Calculate the date of the Monday before today
  const mondayBeforeToday = new Date(
    today.setDate(today.getDate() - ((dayOfWeek + 6) % 7))
  )

  return dayOfWeek === 1
    ? /* Previous Monday */ new Date(
        mondayBeforeToday.setDate(mondayBeforeToday.getDate() - 7)
      )
    : mondayBeforeToday
}

function getPastWeekDates() {
  const pastWeekDates: string[] = []
  const pastWeekDatesWithDays: any = {}

  const startDate = getMonday()
  const formattedDates = getFormattedDates(startDate)

  for (let i = 0; i < 7; i++) {
    const formattedDate = formattedDates[i]
    const smallerDate = formattedDate.split('-').slice(0, 2).join('/')
    const dayOfWeek = DAYS_OF_WEEK[i]
    pastWeekDates.push(`${formattedDate}`)
    pastWeekDatesWithDays[formattedDate] = `${dayOfWeek} (${smallerDate})`
  }

  return { pastWeekDates, pastWeekDatesWithDays }
}
