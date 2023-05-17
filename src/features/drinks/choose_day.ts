import { Context } from 'grammy'
import { MenuTemplate, createBackMainMenuButtons } from 'grammy-inline-menu'

export const handleDayMenu = new MenuTemplate<Context>(
  '📅 Напишіть дату коли пив у форматі "дд-мм-рррр"'
)

handleDayMenu.manualRow(createBackMainMenuButtons())
