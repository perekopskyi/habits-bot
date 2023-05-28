import { StatisticsData } from '../../utils/types'

export const generateMessage = (
  user: string,
  statsData: StatisticsData
): string => {
  const { startDate, endDate, count, percentage, data } = statsData

  const message = `На минулому тижні з ${startDate} по ${endDate} пивозавр ${user} випивав ${count}/7 днів (${percentage.toFixed(
    2
  )}%)\n\n`
  const emojisWeek = data.join('\n')
  return message + emojisWeek
}
