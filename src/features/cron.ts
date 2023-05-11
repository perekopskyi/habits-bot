import schedule from 'node-schedule'
import { sendReminder } from './sendReminder'
import { saveFirebaseDataToJson } from '../database/saveToJson'

const TIME = '00 20 * * *' // '00 20 * * *'
schedule.scheduleJob(TIME, sendReminder)

const BACKUP_TIME = '00 01 * * *'
schedule.scheduleJob(BACKUP_TIME, saveFirebaseDataToJson(`./dist/database`))
