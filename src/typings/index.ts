export * from './resource'

export type PronunciationType = 'us' | 'uk' | 'romaji' | 'zh' | 'ja' | 'de' | 'hapin' | 'kk' | 'id'
export type PhoneticType = 'us' | 'uk' | 'romaji' | 'zh' | 'ja' | 'de' | 'hapin' | 'kk' | 'id'
export type LanguageType = 'en' | 'romaji' | 'zh' | 'ja' | 'code' | 'de' | 'kk' | 'hapin' | 'id'
export type LanguageCategoryType = 'en' | 'ja' | 'de' | 'code' | 'kk' | 'id'

type Pronunciation2PhoneticMap = Record<PronunciationType, PhoneticType>

export const PRONUNCIATION_PHONETIC_MAP: Pronunciation2PhoneticMap = {
  us: 'us',
  uk: 'uk',
  romaji: 'romaji',
  zh: 'zh',
  ja: 'ja',
  de: 'de',
  hapin: 'hapin',
  kk: 'kk',
  id: 'id',
}

// 词性类型颜色映射表
export const POS_TYPE_COLOR_MAP: Record<string, string> = {
  'v.': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', // 动词
  'vt.': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', // 及物动词
  'vi.': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', // 不及物动词
  'n.': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', // 名词
  'adj.': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', // 形容词
  'adv.': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', // 副词
  'prep.': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200', // 介词
  'conj.': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200', // 连词
  'pron.': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200', // 代词
  'phrase.': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200', // 短语
  'num.': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200', // 数词
  'int.': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200', // 感叹词
}

export const POS_TYPE_MAP: Record<string, PosType> = {
  'n.': { name: 'n.', displayName: '名词' },
  'v.': { name: 'v.', displayName: '动词' },
  'vt.': { name: 'vt.', displayName: '及物动词' },
  'vi.': { name: 'vi.', displayName: '不及物动词' },
  'adj.': { name: 'adj.', displayName: '形容词' },
  'adv.': { name: 'adv.', displayName: '副词' },
  'prep.': { name: 'prep.', displayName: '介词' },
  'conj.': { name: 'conj.', displayName: '连词' },
  'pron.': { name: 'pron.', displayName: '代词' },
  'phrase.': { name: 'phrase.', displayName: '短语' },
  'num.': { name: 'num.', displayName: '数词' },
  'int.': { name: 'int.', displayName: '感叹词' },
}

export type PosType = {
  name: string
  displayName: string
}

export type Pos = {
  type: string
  definition: string
}

export type Word = {
  name: string
  trans: string[]
  pos?: Pos[]
  usphone: string
  ukphone: string
  notation?: string
}

export type WordWithIndex = Word & {
  // 在 chapter 中的原始索引
  index: number
}

export type InfoPanelType = 'donate' | 'vsc' | 'community' | 'redBook'

export type InfoPanelState = {
  [key in InfoPanelType]: boolean
}

export type LoopWordTimesOption = 1 | 3 | 5 | 8 | typeof Number.MAX_SAFE_INTEGER

export type WordDictationType = 'hideAll' | 'hideVowel' | 'hideConsonant' | 'randomHide'
/**
 * 标记用户是手动打开默写模式，还是通过点击 resultScreen 中的默写本章按钮打开的
 *
 * 预期行为是，在进入下一章节时，如果是手动打开的默写模式，则保持设定
 * 如果是通过点击 resultScreen 中的默写本章按钮打开的，则关闭默写模式
 */
export type WordDictationOpenBy = 'user' | 'auto'
