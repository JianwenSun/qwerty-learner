import { UrlDictionaryResource } from "@/typings";
import { updateWordDictionaries } from './dictionary';

// 初始化为空数组
export let wordDictionaryResources: UrlDictionaryResource[] = [];

// 异步加载 dictionary.json 文件
fetch('/dicts/vocabulary/dictionary.json')
  .then(response => response.json())
  .then(data => {
    wordDictionaryResources = data as UrlDictionaryResource[];
    // 加载完成后更新 wordDictionaries 和 wordDictionaryMap
    updateWordDictionaries();
  })
  .catch(error => {
    console.error('[wordDictionary.ts] Failed to load wordDictionary:', error);
  });
