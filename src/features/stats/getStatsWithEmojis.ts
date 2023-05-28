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
  const oneDay = 24 * 60 * 60 * 1000

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate.getTime() - i * oneDay)
    const formattedDate = formatDate(date) // Implement this function to format the date as 'dd-mm-yyyy'
    formattedDates.push(formattedDate)
  }

  return formattedDates.reverse()
}

function getPastWeekDates() {
  const today = new Date()
  const pastWeekDates: string[] = []
  const pastWeekDatesWithDays: any = {}

  const formattedDates = getFormattedDates(today)

  for (let i = 0; i < 7; i++) {
    const formattedDate = formattedDates[i]
    const smallerDate = formattedDate.split('-').slice(0, 2).join('/')
    const dayOfWeek = DAYS_OF_WEEK[i]
    pastWeekDates.push(`${formattedDate}`)
    pastWeekDatesWithDays[formattedDate] = `${dayOfWeek} (${smallerDate})`
  }

  return { pastWeekDates, pastWeekDatesWithDays }
}
