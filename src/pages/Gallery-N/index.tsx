import DictionaryGroup from './DictionaryGroup'
import { DictionaryTypeTabSwitcher } from './DictionaryTypeTabSwitcher'
import Layout from '@/components/Layout'
import { dictionaries } from '@/resources/dictionary'
import { currentDictInfoAtom, isOpenDarkModeAtom } from '@/store'
import type { WordDictionary, DictionaryType } from '@/typings'
import groupBy, { groupByDictTags } from '@/utils/groupBy'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useAtom, useAtomValue } from 'jotai'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Updater } from 'use-immer'
import { useImmer } from 'use-immer'

export type GalleryState = {
  currentTypeTab: DictionaryType
}

const initialGalleryState: GalleryState = {
  currentTypeTab: 'word',
}

export const GalleryContext = createContext<{
  state: GalleryState
  setState: Updater<GalleryState>
} | null>(null)

export default function GalleryPage() {
  const [galleryState, setGalleryState] = useImmer<GalleryState>(initialGalleryState)
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpenDarkMode] = useAtom(isOpenDarkModeAtom)
  const currentDictInfo = useAtomValue(currentDictInfoAtom)
  const [forceUpdate, setForceUpdate] = useState(0)

  // 确保每次路由变化时都重新计算数据
  useEffect(() => {
    // 强制重新渲染组件
    setForceUpdate((prev) => prev + 1)
  }, [location.key]) // 使用 location.key 而不是 pathname，确保每次导航都触发

  const { groupedByCategoryAndTag } = useMemo(() => {
    // 为了确保数据重新计算，使用 forceUpdate 作为依赖
    const currentDictionaryTypes = dictionaries.filter((dict) => dict.type === galleryState.currentTypeTab)
    const groupedByCategory = Object.entries(groupBy(currentDictionaryTypes, (dict) => dict.category))
    const groupedByCategoryAndTag = groupedByCategory.map(
      ([category, dicts]) => [category, groupByDictTags(dicts)] as [string, Record<string, WordDictionary[]>],
    )
    return {
      groupedByCategoryAndTag,
    }
  }, [galleryState.currentTypeTab, forceUpdate]) // 添加 forceUpdate 作为依赖

  const onBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  useHotkeys('enter,esc', onBack, { preventDefault: true })

  useEffect(() => {
    if (currentDictInfo) {
      setGalleryState((state) => {
        state.currentTypeTab = currentDictInfo.type
      })
    }
  }, [currentDictInfo, setGalleryState])

  useEffect(() => {
    // 当路由变化时，强制更新组件，确保页面内容正确刷新
    setForceUpdate((prev) => prev + 1)
  }, [location.pathname])

  return (
    <Layout>
      <GalleryContext.Provider value={{ state: galleryState, setState: setGalleryState }}>
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
                <DictionaryTypeTabSwitcher />
              </div>
              <ScrollArea.Root className="flex-1 overflow-y-auto overflow-x-hidden">
                <ScrollArea.Viewport className="h-full w-full">
                  <div className="flex flex-1 flex-col items-start justify-start gap-14">
                    {groupedByCategoryAndTag.map(([category, groupeByTag]) => (
                      <DictionaryGroup key={category} groupedDictsByTag={groupeByTag} />
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </div>
          </div>
        </div>
      </GalleryContext.Provider>
    </Layout>
  )
}
