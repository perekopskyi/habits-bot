require('dotenv').config()
import { Bot } from 'grammy'

const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}
export const bot = new Bot(token)
