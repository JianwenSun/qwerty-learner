import SentenceCard from './SentenceCard'
import Drawer from '@/components/Drawer'
import Tooltip from '@/components/Tooltip'
import { SentenceTypingContext, SentenceTypingStateActionType } from '@/pages/Typing/SentenceTyping/store'
import { LessonCourse } from '@/plugins/wxs/wxs'
import { isReviewModeAtom } from '@/store'
import { SentenceDictionary } from '@/typings'
import { Dialog } from '@headlessui/react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useAtomValue } from 'jotai'
import { useCallback, useContext, useState } from 'react'
import ListIcon from '~icons/tabler/list'
import IconX from '~icons/tabler/x'

export default function SentenceList({
  currentSentenceDictionary,
  currentSentenceChapter,
}: {
  currentSentenceDictionary: SentenceDictionary | undefined
  currentSentenceChapter: LessonCourse | undefined
}) {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(SentenceTypingContext)!

  const [isOpen, setIsOpen] = useState(false)
  const isReviewMode = useAtomValue(isReviewModeAtom)

  const currentDictTitleValue = isReviewMode
    ? `${currentSentenceDictionary?.name ?? ''} 错题复习`
    : `${currentSentenceDictionary?.name ?? ''} - ${currentSentenceChapter !== undefined ? currentSentenceChapter?.name || '' : ''}`

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    dispatch({ type: SentenceTypingStateActionType.SET_IS_TYPING, payload: false })
  }

  const onSelected = useCallback(
    (sentenceId: number) => {
      const newIndex = state.chapterData.sentences?.findIndex((s) => s.sentenceId === sentenceId) || 0
      dispatch({ type: SentenceTypingStateActionType.SKIP_SENTENCE_INDEX, newIndex })
    },
    [state.chapterData.sentences, dispatch],
  )

  return (
    <>
      <Tooltip content="List" placement="top" className="!absolute left-5 top-[50%] z-20">
        <button
          type="button"
          onClick={openModal}
          className="fixed left-0 top-[50%] z-20 rounded-lg rounded-l-none bg-indigo-50 px-2 py-3 text-lg hover:bg-indigo-200 focus:outline-none dark:bg-indigo-900 dark:hover:bg-indigo-800"
        >
          <ListIcon className="h-6 w-6 text-lg text-indigo-500 dark:text-white" />
        </button>
      </Tooltip>

      <Drawer open={isOpen} onClose={closeModal} classNames="bg-stone-50 dark:bg-gray-900">
        <Dialog.Title as="h3" className="flex items-center justify-between p-4 text-lg font-medium leading-6 dark:text-gray-50">
          {currentDictTitleValue}
          <IconX onClick={closeModal} className="cursor-pointer" />
        </Dialog.Title>
        <ScrollArea.Root className="flex-1 select-none overflow-y-auto ">
          <ScrollArea.Viewport className="h-full w-full px-3">
            <div className="flex flex-col gap-1">
              {state.chapterData.sentences?.map((sentence, index) => {
                return (
                  <SentenceCard
                    sentence={sentence}
                    key={`${sentence.sentenceId}`}
                    isActive={state.chapterData.index === index}
                    onSelected={onSelected}
                  />
                )
              })}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Drawer>
    </>
  )
}
