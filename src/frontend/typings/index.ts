export * from './resource'

export type PronunciationType = 'us' | 'uk'
export type PronunciationHumanType = 'male' | 'female'
export type PhoneticType = 'us' | 'uk'
export type LanguageType = 'en'

type Pronunciation2PhoneticMap = Record<PronunciationType, PhoneticType>

export const PRONUNCIATION_PHONETIC_MAP: Pronunciation2PhoneticMap = {
  us: 'us',
  uk: 'uk'
}

export interface Dictionary {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  icon_url?: string
  length: number
}

export interface SentenceDictionary extends Dictionary {

}

export interface WordDictionary extends Dictionary {
  url: string
  // calculated in the store
  chapterCount: number
}

export type Word = {
  id: string
  name: string
  sound: Sound
  pos?: Pos[]
  usphone: string
  ukphone: string
  notation?: string
}

export type Sound = {
  us_url: string
  uk_url: string
}
export type Pos = {
  type: string
  definition: string
}

export type WordWithIndex = Word & {
  // 在 chapter 中的原始索引
  index: number
}

export const POS_TYPE_MAP: Record<string, PosType> = {
  // 原有核心词性
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

  // 补充高频词性（按学习优先级）
  'art.': { name: 'art.', displayName: '冠词' },
  'aux.v.': { name: 'aux.v.', displayName: '助动词' },
  'modal.v.': { name: 'modal.v.', displayName: '情态动词' },
  'det.': { name: 'det.', displayName: '限定词' },
  'pl.': { name: 'pl.', displayName: '复数' },
  'abbr.': { name: 'abbr.', displayName: '缩写' },

  // 可选补充（动词变形/语法标注）
  'poss.': { name: 'poss.', displayName: '所有格' },
  'past.': { name: 'past.', displayName: '过去式' },
  'pp.': { name: 'pp.', displayName: '过去分词' },
  'ing.': { name: 'ing.', displayName: '现在分词/动名词' },
};

export type PosType = {
  name: string
  displayName: string
}

export type LoopWordTimesOption = 1 | 3 | 5 | 8 | typeof Number.MAX_SAFE_INTEGER
export type LoopSentenceTimesOption = 1 | 3 | 5 | 8 | typeof Number.MAX_SAFE_INTEGER

export type WordDictationType = 'hideAll' | 'hideVowel' | 'hideConsonant' | 'randomHide'

export type SentenceDictationType = 'hideAll' | 'hideVowel' | 'hideConsonant' | 'randomHide'

/**
 * 标记用户是手动打开默写模式，还是通过点击 resultScreen 中的默写本章按钮打开的
 *
 * 预期行为是，在进入下一章节时，如果是手动打开的默写模式，则保持设定
 * 如果是通过点击 resultScreen 中的默写本章按钮打开的，则关闭默写模式
 */
export type WordDictationOpenBy = 'user' | 'auto'
