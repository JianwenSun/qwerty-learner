import { useSentenceDictionaries } from '../../hooks/useSentenceHooks'
import SentenceDictionaryGroup from './SentenceDictionaryGroup'
import { SentenceDictionaryTypeTabSwitcher } from './WordDictionaryTypeTabSwitcher'
import Layout from '@/components/Layout'
import { isOpenDarkModeAtom } from '@/store'
import type { Dictionary } from '@/typings'
import groupBy, { groupByDictTags } from '@/utils/groupBy'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useAtom } from 'jotai'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useLocation, useNavigate } from 'react-router-dom'

export const SentenceGalleryContext = createContext<{} | null>(null)

export default function SentenceGalleryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpenDarkMode] = useAtom(isOpenDarkModeAtom)
  const [forceUpdate, setForceUpdate] = useState(0)

  const { data: sentenceDictionaries, loading } = useSentenceDictionaries()

  // 确保每次路由变化时都重新计算数据
  useEffect(() => {
    // 强制重新渲染组件
    setForceUpdate((prev) => prev + 1)
  }, [location.key]) // 使用 location.key 而不是 pathname，确保每次导航都触发

  const { groupedByCategoryAndTag } = useMemo(() => {
    // 为了确保数据重新计算，使用 forceUpdate 作为依赖
    const groupedByCategory = Object.entries(groupBy(sentenceDictionaries || [], (dict) => dict.category))
    const groupedByCategoryAndTag = groupedByCategory.map(
      ([category, dicts]) => [category, groupByDictTags(dicts)] as [string, Record<string, Dictionary[]>],
    )
    return {
      groupedByCategoryAndTag,
    }
  }, [forceUpdate, sentenceDictionaries]) // 添加 forceUpdate 作为依赖

  const onBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  useHotkeys('enter,esc', onBack, { preventDefault: true })

  useEffect(() => {
    // 当路由变化时，强制更新组件，确保页面内容正确刷新
    setForceUpdate((prev) => prev + 1)
  }, [location.pathname])

  return (
    <Layout>
      <SentenceGalleryContext.Provider value={{}}>
        <div
          className={`relative mb-auto mt-auto flex w-full flex-1 flex-col ${
            !isOpenDarkMode ? 'bg-white px-5 pb-5' : 'bg-gray-900 px-5 pb-5'
          }`}
        >
          <button
            onClick={onBack}
            className={`absolute right-4 top-4 rounded-md bg-indigo-300 px-4 py-2 text-white shadow-sm hover:bg-indigo-400`}
          >
            返回
          </button>

          <div className="flex w-full flex-1 flex-col items-start justify-start">
            <div className="flex h-full flex-col">
              <div className="flex h-20 w-full items-start justify-between pb-6 pt-4">
                <SentenceDictionaryTypeTabSwitcher />
              </div>
              <ScrollArea.Root className="flex-1 overflow-y-auto overflow-x-hidden">
                <ScrollArea.Viewport className="h-full w-full">
                  <div className="flex flex-1 flex-col items-start justify-start gap-14">
                    {groupedByCategoryAndTag.map(([category, groupeByTag]) => (
                      <SentenceDictionaryGroup key={category} groupedDictsByTag={groupeByTag} />
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </div>
          </div>
        </div>
      </SentenceGalleryContext.Provider>
    </Layout>
  )
}
