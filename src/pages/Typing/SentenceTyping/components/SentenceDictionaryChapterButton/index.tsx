import {
  useCurrentSentenceChapterInfo,
  useCurrentSentenceDictionaryInfo,
  useCurrentSentenceChapterList,
} from '../../hooks/useSentenceHooks'
import Tooltip from '@/components/Tooltip'
import { currentSentenceChapterIdAtom, isOpenDarkModeAtom, isReviewModeAtom } from '@/store'
import { Listbox, Transition } from '@headlessui/react'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import IconCheck from '~icons/tabler/check'

export const SentenceDictionaryChapterButton = () => {
  const [currentSentenceChapterId, setCurrentSentenceChapterId] = useAtom(currentSentenceChapterIdAtom)

  const isReviewMode = useAtomValue(isReviewModeAtom)
  const [isOpenDarkMode] = useAtom(isOpenDarkModeAtom)

  const { data: currentSentenceDictionary } = useCurrentSentenceDictionaryInfo()
  const { data: currentSentenceChapter } = useCurrentSentenceChapterInfo()
  const { data: sentenceChapters } = useCurrentSentenceChapterList()

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
    }
  }
  return (
    <>
      <Tooltip content="词典切换">
        <NavLink
          className={`block rounded-lg px-3 py-1 text-lg transition-colors duration-300 ease-in-out hover:bg-indigo-400 hover:text-white focus:outline-none ${
            isOpenDarkMode ? 'text-white text-opacity-60 hover:text-opacity-100' : 'text-gray-800 hover:text-white'
          }`}
          to="/sentence-typing/gallery"
        >
          {currentSentenceDictionary?.name || '选择字典'} {isReviewMode && '错题复习'}
        </NavLink>
      </Tooltip>
      {!isReviewMode && (
        <Tooltip content="章节切换">
          <Listbox value={currentSentenceChapterId} onChange={setCurrentSentenceChapterId}>
            <Listbox.Button
              onKeyDown={handleKeyDown}
              className={`rounded-lg px-3 py-1 text-lg transition-colors duration-300 ease-in-out hover:bg-indigo-400 hover:text-white focus:outline-none ${
                isOpenDarkMode ? 'text-white text-opacity-60 hover:text-opacity-100' : 'text-gray-800 hover:text-white'
              }`}
            >
              {currentSentenceChapter?.name || '选择章节'}
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="listbox-options z-50 w-auto whitespace-nowrap">
                {sentenceChapters?.map((chapter, index) => (
                  <Listbox.Option key={chapter.id} value={chapter.id}>
                    {({ selected }) => (
                      <div className="group flex cursor-pointer items-center justify-between">
                        {selected ? (
                          <span className="listbox-options-icon">
                            <IconCheck className="focus:outline-none" />
                          </span>
                        ) : null}
                        <span>{chapter.name}</span>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </Tooltip>
      )}
    </>
  )
}
