import { useCurrentSentenceDictionaryInfo } from '../../hooks/useSentenceHooks'
import SentenceDictionaryComponent from './SentenceDictionaryComponent'
import SentenceDictionaryTagSwitcher from './SentenceDictionaryTagSwitcher'
import { Dictionary } from '@/typings'
import { findCommonValues } from '@/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function SentenceDictionaryGroup({ groupedDictsByTag }: { groupedDictsByTag: Record<string, Dictionary[]> }) {
  const tagList = useMemo(() => Object.keys(groupedDictsByTag), [groupedDictsByTag])
  const [currentTag, setCurrentTag] = useState(tagList.length > 0 ? tagList[0] : '')

  const { data: currentSentenceDictionary } = useCurrentSentenceDictionaryInfo()

  const onChangeCurrentTag = useCallback((tag: string) => {
    setCurrentTag(tag)
  }, [])

  useEffect(() => {
    const commonTags = findCommonValues(tagList, currentSentenceDictionary?.tags || [])
    if (commonTags.length > 0) {
      setCurrentTag(commonTags[0])
    }
  }, [currentSentenceDictionary?.tags, tagList])

  return (
    <div>
      <SentenceDictionaryTagSwitcher tagList={tagList} currentTag={currentTag} onChangeCurrentTag={onChangeCurrentTag} />
      <div className="mt-8 grid gap-x-4 gap-y-8 px-1 pb-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {currentTag && groupedDictsByTag[currentTag] ? (
          groupedDictsByTag[currentTag].map((dict) => <SentenceDictionaryComponent key={dict.id} dictionary={dict} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">当前分类下没有可用的词典</div>
        )}
      </div>
    </div>
  )
}
