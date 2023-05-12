import { bot } from './botInstance'
import i18next from 'i18next'
import backend from 'i18next-node-fs-backend'
import { Context } from 'grammy'
import { postChat, removeChat } from './database/firebase'
import { profanityFilter } from './features/profanityFilter'
import { sendReminder } from './features/sendReminder'
import { checkIsLeftFromChat, checkIsNewChat, getAllWords } from './utils'
import { menuDrinksMiddleware } from './features/drinks/drink'

// init translation
i18next.use(backend).init({
  fallbackLng: 'ua',
  resources: {
    en: { translation: require('./locales/en/translation.json') },
    ua: { translation: require('./locales/ua/translation.json') },
  },
})

// Use translation
bot.use((ctx: any, next) => {
  const lang = ctx.from.language_code
  i18next.changeLanguage(lang)
  ctx.i18n = i18next
  next()
})

bot.use(menuDrinksMiddleware)

// Listen greeting
const greetings = getAllWords('greeting')
const greetingsRegex = new RegExp(`^(${greetings})$`, 'i')
bot.hears(greetingsRegex, (ctx: Context) => {
  ctx.reply(
    `Здоров, ${(ctx.message && ctx.message.from.first_name) || ' пивозавр'}!`
  )
})

const startConversation = async (ctx: Context) => {
  const chatId = ctx.update.message && ctx.update.message.chat.id
  if (!chatId) return
  await postChat({ chatId })
  menuDrinksMiddleware.replyToContext(ctx)
}
bot.command('start', startConversation)

bot.command('stats', ctx => {
  // TODO statistics
  return ctx.reply('Stats')
})

bot.command('remind', sendReminder)

bot.on('chat_join_request', ctx => {
  console.log('🚀 ~> chat_join_request ctx:', ctx)
})

// Message handler
bot.on('message', async (ctx: Context) => {
  // Adding to new chat
  const isNewChat = checkIsNewChat(ctx)
  if (isNewChat) {
    // Add chatId to db
    const chatId = ctx.update.message && ctx.update.message.chat.id
    if (!chatId) return
    await postChat({ chatId })

    // Make greeting
    const GREETING = 'Здоров, пивозаври!'
    return bot.api.sendMessage(
      chatId,
      `${GREETING} 
Заходьте у гості!`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Go!',
                url: 'https://t.me/PivozavrThe_bot',
              },
            ],
          ],
        },
      }
    )
  }

  // Removing from chat
  const isLeftFromChat = checkIsLeftFromChat(ctx)
  if (isLeftFromChat) {
    const chatId = ctx.update.message && ctx.update.message.chat.id
    if (!chatId) return
    return removeChat({ chatId })
  }

  const createdChat =
    ctx.update.message && ctx.update.message.group_chat_created
  console.log('🚀 ~> createdChat:', createdChat)

  // Check profanity
  const answer = await profanityFilter(ctx)
  if (answer) {
    return ctx.reply(`Сам ти ${answer}! Тихіше будь`, {
      reply_to_message_id: ctx.msg && ctx.msg.message_id,
    })
  }

  try {
    console.log('Что-то пишет')
    ctx.reply('Натисни /start щоб побачити меню')
  } catch (error) {
    console.log('🚀 ~>ctx.reply error:', error)
  }
})

bot.on('callback_query:data', async (ctx: Context, next) => {
  if (!ctx.callbackQuery) return
  console.log('another callbackQuery happened', ctx.callbackQuery.data)

  if (ctx.callbackQuery.data === 'new_record') {
    // Remove prev. message
    const chatId =
      ctx.callbackQuery.message && ctx.callbackQuery.message.chat.id
    const messageId =
      ctx.callbackQuery.message && ctx.callbackQuery.message.message_id
    if (chatId && messageId) bot.api.deleteMessage(chatId, messageId)

    return menuDrinksMiddleware.replyToContext(ctx)
  }

  return next()
})

bot.catch(error => {
  console.log('🚀 ~>bot error:', error)
})

async function startup() {
  // await bot.launch()
  await bot.start()
  console.log(new Date(), 'Bot started as', bot.botInfo.username)
}
startup()

// Enable graceful stop
process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
