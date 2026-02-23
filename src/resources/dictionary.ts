import { sentenceDictionaryConverter } from '@/plugins/sb/adepter'
import { getLessons } from '@/plugins/wxs/wxsApi';
import { updateWordDictionaryMap } from '@/store';
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
  // 通知依赖的 atom 重新计算
  updateWordDictionaryMap();
}

// 初始调用一次
updateWordDictionaries();