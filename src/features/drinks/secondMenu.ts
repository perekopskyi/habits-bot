import { Context } from 'grammy'
import { MenuTemplate, createBackMainMenuButtons } from 'grammy-inline-menu'
import { BUTTONS, NEW_RECORD_ADDED } from '../../utils/constants'
import { createAnswer } from '../../utils'
import { store } from '../../utils/store'
import { startMenuText } from './drink'

export const secondMenu = new MenuTemplate<Context>('Пив сьогодні?')

// Кнопки: Да / Нет / Выбрать день
secondMenu.interact(BUTTONS.NOPE.title, BUTTONS.NOPE.value, {
  do: async ctx => {
    // Save message for first menu
    store.message = await createAnswer(ctx)
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
    store.message = await createAnswer(ctx)
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
