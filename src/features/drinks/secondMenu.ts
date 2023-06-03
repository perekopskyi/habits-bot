import { Context } from 'grammy'
import { MenuTemplate, createBackMainMenuButtons } from 'grammy-inline-menu'
import { BUTTONS, NEW_RECORD_ADDED } from '../../utils/constants'
import { createAnswer } from '../../utils'
import { getYesterday } from '../../utils/dates'
import { store } from '../../utils/store'
import { startMenuText } from './drink'
import { handleDayMenu } from './choose_day'

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

secondMenu.interact(
  BUTTONS.DRINK_YESTERDAY.title,
  BUTTONS.DRINK_YESTERDAY.value,
  {
    do: async ctx => {
      const yesterday = getYesterday()
      store.message = await createAnswer(ctx, yesterday)
      await ctx.answerCallbackQuery(NEW_RECORD_ADDED)
      startMenuText(ctx)
      return '..'
    },
  }
)

secondMenu.submenu(
  BUTTONS.CHOOSE_DAY.title,
  BUTTONS.CHOOSE_DAY.value,
  handleDayMenu,
  {
    hide: () => false,
  }
)

secondMenu.manualRow(createBackMainMenuButtons())
