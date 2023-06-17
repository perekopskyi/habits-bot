import { getRecords, getUsers } from '../../../database/firebase'
import { createFullName } from '../../../utils'
import { MEDALS } from '../../../utils/constants'

export class TopLeaders {
  leaders: any // Add the type declaration for the 'leaders' property

  constructor() {
    this.leaders = {}
  }

  setLeaders(leaders: any) {
    this.leaders = leaders
  }

  getLeader() {
    return this.leaders
  }

  async getLeadersFromDB() {
    // Get All Public Chats
    const records = await getRecords()
    const users = await getUsers()

    const recordsKeys = Object.keys(records)
    const positiveDays = recordsKeys.map(key => {
      const userPositiveDaysCount = Object.entries(records[key]).filter(
        item => item[1]
      ).length

      const userName = createFullName(users[key])
      return { userName, totalPositiveDaysCount: userPositiveDaysCount }
    })

    const leaders = Object.values(positiveDays).sort(
      (a, b) => b.totalPositiveDaysCount - a.totalPositiveDaysCount
    )

    this.setLeaders(leaders)
  }

  async sendMessage() {
    await this.getLeadersFromDB()
    const leaders = this.getLeader()

    const parsedLeaders = leaders.map(
      ({ userName, totalPositiveDaysCount }: any, index: number) => {
        const medal = MEDALS[index + 1] || MEDALS[4]
        const breaking = index === 3 ? `\n\n` : `\n`

        return `${breaking}${medal} ${userName} пив ${totalPositiveDaysCount} днів`
      }
    )

    const message = `За весь час існування бота:\n 
    ${parsedLeaders}
    
    * Статистика побудована на основі данних введенних самими пивозаврами`
    return message
  }
}
