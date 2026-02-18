export * from './resource'

export type PronunciationType = 'us' | 'uk'
export type PhoneticType = 'us' | 'uk'
export type LanguageType = 'en'

type Pronunciation2PhoneticMap = Record<PronunciationType, PhoneticType>

export const PRONUNCIATION_PHONETIC_MAP: Pronunciation2PhoneticMap = {
  us: 'us',
  uk: 'uk'
}

export type DictionaryType = 'word' | 'sentence'

export interface Dictionary {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  url: string
  icon_url?: string
  length: number
  type: DictionaryType
  app?: string
}

export interface WordDictionary extends Dictionary {
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

export type Sentence = {
  id: string;
  dictionaryId: string;
  content: string;
  chinese: string;
  explanation: string;
  tokens: SentenceToken[];
  words: Word[] | null;
  chunks: SentenceChunk[];
  clauses: SentenceClause[];
  practices: SentencePractice[];
}

export interface SentenceToken {
  id: number;
  text: string;
  pos: string;
  dep: string;
  head: number;
}

export interface SentenceChunk {
  chunkIndex: number;
  chunkKey: string;
  content: string;
  chinese: string;
  clauseIndex: number;
  sentenceFunction: string;
  wordIndexes: number[];
  grammarType?: string;
  explanation?: string;
}

export interface SentenceClause {
  clauseIndex: number;
  type: string;
  explanation: string;
  chunkIndexes: number[];
}

export interface SentencePractice {
  id: number;
  kind: string;
  sort: number;
  content: string;
  chinese: string;
  alignTokenIds: number[];
  phonetic_uk: string;
  phonetic_us: string;
  part_of_speech: string;
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
