import schedule from 'node-schedule'
import { saveFirebaseDataToJson } from '../database/saveToJson'
import { sendReminder } from './sendReminder'
import { getStats } from './stats/getStats'

schedule.scheduleJob({ hour: 20, minute: 0, tz: 'Europe/Kiev' }, sendReminder)

// TODO need fix
// schedule.scheduleJob({ hour: 9, tz: 'Europe/Kiev' }, getStats)

schedule.scheduleJob({ hour: 1, tz: 'Europe/Kiev' }, () =>
  saveFirebaseDataToJson(`./dist/database`)
)
