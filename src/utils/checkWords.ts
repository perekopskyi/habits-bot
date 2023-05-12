const PROFANITY_LIST: string[] = ['лох', 'мудак', 'урод', 'пивозавр', 'loh']

export const checkForProfanity = (
  inputString: string | undefined
): string | null => {
  if (!inputString) return null

  for (const word of PROFANITY_LIST) {
    if (inputString.toLowerCase().includes(word.toLowerCase())) {
      return word
    }
  }
  return null
}
