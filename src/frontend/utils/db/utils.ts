import type { WordLetterMistakes } from './wordRecord'

export function mergeLetterMistake(letterMistake1: WordLetterMistakes, letterMistake2: WordLetterMistakes): WordLetterMistakes {
  const result: WordLetterMistakes = {}

  for (const mistakes of [letterMistake1, letterMistake2]) {
    for (const key in mistakes) {
      if (result[key]) {
        result[key].push(...mistakes[key])
      } else {
        result[key] = [...mistakes[key]]
      }
    }
  }

  return result
}
