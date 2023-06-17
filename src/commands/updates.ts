import { bot } from '../botInstance'
import { sendUpdatesMessage } from '../features/sendUpdatesMessage'

bot.command('updates', sendUpdatesMessage)
