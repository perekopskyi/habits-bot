export const getYesterday = (): string => {
  const today = new Date()
  const yesterday = new Date(today.setDate(today.getDate() - 1))
  return formatDate(yesterday)
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}
