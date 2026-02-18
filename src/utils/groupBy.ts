import type { WordDictionary } from '@/typings'

export default function groupBy<T>(elements: T[], iteratee: (value: T) => string) {
  return elements.reduce<Record<string, T[]>>((result, value) => {
    const key = iteratee(value)
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result[key].push(value)
    } else {
      result[key] = [value]
    }
    return result
  }, {})
}

export function groupByDictTags(dicts: WordDictionary[]) {
  return dicts.reduce<Record<string, WordDictionary[]>>((result, dict) => {
    dict.tags.forEach((tag) => {
      if (Object.prototype.hasOwnProperty.call(result, tag)) {
        result[tag].push(dict)
      } else {
        result[tag] = [dict]
      }
    })
    return result
  }, {})
}
