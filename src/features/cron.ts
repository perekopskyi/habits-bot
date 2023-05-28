import schedule from 'node-schedule'
import { saveFirebaseDataToJson } from '../database/saveToJson'
import { sendReminder } from './sendReminder'
import { getStats } from './stats/getStats'

const REMINDER_TIME = '00 20 * * *' // '00 20 * * *'
schedule.scheduleJob(REMINDER_TIME, sendReminder)

const TIME = '00 9 * * 1' // Каждый понедельник в 9:00
schedule.scheduleJob(TIME, getStats)

const BACKUP_TIME = '00 01 * * *'
schedule.scheduleJob(BACKUP_TIME, () =>
  saveFirebaseDataToJson(`./dist/database`)
)
