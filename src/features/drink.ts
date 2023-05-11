import { Context } from 'grammy'
import { BUTTONS, START_MENU_MESSAGE } from '../utils/constants'
import {
  MenuMiddleware,
  MenuTemplate,
  createBackMainMenuButtons,
} from 'grammy-inline-menu'
import { createAnswer } from '../utils'

const NEW_RECORD_ADDED = 'Новий запис створено'

let message: string = ''
function startMenuText(ctx: Context) {
  // TODO Check if it's first touch

  const callbackQuery = ctx.update?.callback_query
  if (!callbackQuery) return START_MENU_MESSAGE

  const data = callbackQuery.data
  switch (data) {
    case '/new_record/yes':
      return message || NEW_RECORD_ADDED
    case '/new_record/nope':
      console.log('CASE /new_record/nope')
      return message

    default:
      return START_MENU_MESSAGE
  }
}

export const startMenu = new MenuTemplate<Context>(startMenuText)

const secondMenu = new MenuTemplate<Context>('Пив сьогодні?')

// Кнопки: Да / Нет / Выбрать день
secondMenu.interact(BUTTONS.NOPE.title, BUTTONS.NOPE.value, {
  do: async ctx => {
    // Save message for first menu
    message = await createAnswer(ctx)
    console.log('🚀 ~> message:', message)
    startMenuText(ctx)

    // Show alert on top
    await ctx.answerCallbackQuery(NEW_RECORD_ADDED)

    // Return to main menu
    return '..'
  },
})

secondMenu.interact(BUTTONS.YES.title, BUTTONS.YES.value, {
  joinLastRow: true,
  do: async ctx => {
    message = await createAnswer(ctx)
    await ctx.answerCallbackQuery(NEW_RECORD_ADDED)
    startMenuText(ctx)
    return '..'
  },
})

// TODO add button
// secondMenu.interact('Вибрати інший день', 'choose_day', {
//   do: async ctx => {
//     console.log('🚀 ~> Вибрати інший день:')
//     await ctx.answerCallbackQuery('yaay')
//     return false
//   },
// })

secondMenu.manualRow(createBackMainMenuButtons())
// TODO change button if record already  exists
startMenu.submenu('Новий запис', 'new_record', secondMenu)

export const menuDrinksMiddleware = new MenuMiddleware('/', startMenu)
console.log(menuDrinksMiddleware.tree())
