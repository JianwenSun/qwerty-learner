import { sentenceDictionaryResourcesPromise } from '@/plugins/sb/adepter'
import type { WordDictionary, SentenceDictionary } from '@/typings/index'
import { calcChapterCount } from '@/utils'
import { wordDictionaryResources } from './wordDictionary'

// 初始化为空数组
export let wordDictionaries: WordDictionary[] = [];

// 初始化为空对象
export let wordDictionaryMap: Record<string, WordDictionary> = {};

// 更新 wordDictionaries 和 wordDictionaryMap 的函数
export function updateWordDictionaries() {
  wordDictionaries = wordDictionaryResources.map((resource) => ({
    ...resource,
    url: resource.url || '',
    chapterCount: calcChapterCount(resource.length),
  }));

  wordDictionaryMap = Object.fromEntries(wordDictionaries.map((dict) => [dict.id, dict]));

  console.log('[dictionary.ts] wordDictionaries updated:', wordDictionaries.length);
  console.log('[dictionary.ts] wordDictionaryMap updated:', Object.keys(wordDictionaryMap).length);
}

// 初始调用一次
updateWordDictionaries();

// 初始化为空数组
export const sentenceDictionaries: SentenceDictionary[] = [];

// 异步初始化 sentenceDictionaries
sentenceDictionaryResourcesPromise().then((result) => {
  // 清空数组并添加结果
  sentenceDictionaries.length = 0;
  sentenceDictionaries.push(...result);
});

// 初始化为空对象
export const sentenceDictionaryMap: Record<string, SentenceDictionary> = {};

// 异步初始化 sentenceDictionaryMap
sentenceDictionaryResourcesPromise().then((result) => {
  // 清空对象并添加结果
  Object.keys(sentenceDictionaryMap).forEach(key => delete sentenceDictionaryMap[key]);
  Object.assign(sentenceDictionaryMap, Object.fromEntries(result.map((dict) => [dict.id, dict])));
});
