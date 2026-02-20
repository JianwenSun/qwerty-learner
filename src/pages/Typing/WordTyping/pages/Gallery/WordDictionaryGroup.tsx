import WordDictionaryComponent from './WordDictionaryComponent'
import WordDictionaryTagSwitcher from './WordDictionaryTagSwitcher'
import { currentWordDictionaryInfoAtom } from '@/store'
import type { WordDictionary } from '@/typings'
import { findCommonValues } from '@/utils'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function WordDictionaryGroup({ groupedDictsByTag }: { groupedDictsByTag: Record<string, WordDictionary[]> }) {
  const tagList = useMemo(() => Object.keys(groupedDictsByTag), [groupedDictsByTag])
  const [currentTag, setCurrentTag] = useState(tagList.length > 0 ? tagList[0] : '')
  const currentWordDictionaryInfo = useAtomValue(currentWordDictionaryInfoAtom)

  const onChangeCurrentTag = useCallback((tag: string) => {
    setCurrentTag(tag)
  }, [])

  useEffect(() => {
    const commonTags = findCommonValues(tagList, currentWordDictionaryInfo.tags)
    if (commonTags.length > 0) {
      setCurrentTag(commonTags[0])
    }
  }, [currentWordDictionaryInfo.tags, tagList])

  return (
    <div>
      <WordDictionaryTagSwitcher tagList={tagList} currentTag={currentTag} onChangeCurrentTag={onChangeCurrentTag} />
      <div className="mt-8 grid gap-x-4 gap-y-8 px-1 pb-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {currentTag && groupedDictsByTag[currentTag] ? (
          groupedDictsByTag[currentTag].map((dict) => <WordDictionaryComponent key={dict.id} wordDictionary={dict} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">当前分类下没有可用的词典</div>
        )}
      </div>
    </div>
  )
}
