import schedule from 'node-schedule'
import { saveFirebaseDataToJson } from '../database/saveToJson'
import { sendReminder, sendWeeklyReminder } from './sendReminder'
import { getStats } from './stats/getStats'
import { TopLeaders } from './stats/topLiders'
import { bot } from '../botInstance'

schedule.scheduleJob({ hour: 20, minute: 0, tz: 'Europe/Kiev' }, sendReminder)
schedule.scheduleJob(
  { dayOfWeek: 0, hour: 9, minute: 0, tz: 'Europe/Kiev' },
  sendWeeklyReminder
)

// TODO
// schedule.scheduleJob({ hour: 10, minute: 40, tz: 'Europe/Kiev' }, async () => {
//   const topLeaders = new TopLeaders()
//   // const MAIN_CHAT = -1001578913592 //! for PROD
//   const message = await topLeaders.getTopLeadersOfMonth()
//   // bot.api.sendMessage(MAIN_CHAT, message)
// })

schedule.scheduleJob({ hour: 1, tz: 'Europe/Kiev' }, () =>
  saveFirebaseDataToJson(`./dist/database`)
)
