import { useCurrentSentenceChapterInfo, useCurrentSentenceDictionaryInfo } from '../../hooks/useSentenceHooks'
import { SentenceTypingContext, SentenceTypingStateActionType } from '../../store'
import ConclusionBar from './ConclusionBar'
import RemarkRing from './RemarkRing'
import SentenceChip from './SentenceChip'
import Tooltip from '@/components/Tooltip'
import { SentenceAndSound } from '@/plugins/wxs/wxs'
import {
  isReviewModeAtom,
  randomConfigAtom,
  sentenceDictationConfigAtom,
  currentSentenceChapterIdAtom,
  sentenceReviewModeInfoAtom,
  currentSentenceDictionaryIdAtom,
} from '@/store'
import { Transition } from '@headlessui/react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useContext, useEffect, useMemo } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useNavigate } from 'react-router-dom'
import IexportWords from '~icons/icon-park-outline/excel'
import IconX from '~icons/tabler/x'

const ResultScreen = () => {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(SentenceTypingContext)!

  const setSentenceDictationConfig = useSetAtom(sentenceDictationConfigAtom)

  const [currentSentenceDictionaryId, setCurrentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
  const currentSentenceDictionaryInfo = useCurrentSentenceDictionaryInfo()

  const [currentSentenceChapterId, setCurrentSentenceChapterId] = useAtom(currentSentenceChapterIdAtom)
  const currentSentenceChapterInfo = useCurrentSentenceChapterInfo()

  const randomConfig = useAtomValue(randomConfigAtom)
  const navigate = useNavigate()

  const setSentenceReviewModeInfo = useSetAtom(sentenceReviewModeInfoAtom)
  const isReviewMode = useAtomValue(isReviewModeAtom)

  useEffect(() => {
    // tick a zero timer to calc the stats
    dispatch({ type: SentenceTypingStateActionType.TICK_TIMER, addTime: 0 })
  }, [dispatch])

  const exportWords = useCallback(() => {
    const { sentences, userInputLogs } = state.chapterData
    const exportData = userInputLogs.map((log) => {
      const sentence = sentences[log.sentenceIndex]
      const sentenceContent = sentence.content
      return {
        ...sentence,
        sentenceContent,
      }
    })

    import('xlsx')
      .then(({ utils, writeFileXLSX }) => {
        const ws = utils.json_to_sheet(exportData)
        const wb = utils.book_new()
        utils.book_append_sheet(wb, ws, 'Data')
        writeFileXLSX(wb, `${currentSentenceDictionaryInfo.data?.name}_${currentSentenceChapterInfo?.data?.name}章.xlsx`)
      })
      .catch(() => {
        console.log('写入 xlsx 模块导入失败')
      })
  }, [currentSentenceChapterId, currentSentenceDictionaryId, state.chapterData])

  const wrongSentences = useMemo(() => {
    return state.chapterData.userInputLogs
      .filter((log) => log.hasWrong)
      .map(
        (log) =>
          ({
            ...state.chapterData.sentences[log.sentenceIndex],
            soundUrl: log.soundUrl,
          } as SentenceAndSound),
      )
      .filter((sentence): sentence is SentenceAndSound => sentence !== undefined)
  }, [state.chapterData.userInputLogs, state.chapterData.sentences])

  const correctRate = useMemo(() => {
    const chapterLength = state.chapterData.sentences.length
    const correctCount = chapterLength - wrongSentences.length
    return Math.floor((correctCount / chapterLength) * 100)
  }, [state.chapterData.sentences.length, wrongSentences.length])

  const mistakeLevel = useMemo(() => {
    if (correctRate >= 85) {
      return 0
    } else if (correctRate >= 70) {
      return 1
    } else {
      return 2
    }
  }, [correctRate])

  const timeString = useMemo(() => {
    const seconds = state.timerData.time
    const minutes = Math.floor(seconds / 60)
    const minuteString = minutes < 10 ? '0' + minutes : minutes + ''
    const restSeconds = seconds % 60
    const secondString = restSeconds < 10 ? '0' + restSeconds : restSeconds + ''
    return `${minuteString}:${secondString}`
  }, [state.timerData.time])

  const dictationButtonHandler = useCallback(async () => {
    if (isReviewMode) {
      return
    }

    setSentenceDictationConfig((old) => ({ ...old, isOpen: true, openBy: 'auto' }))
    dispatch({ type: SentenceTypingStateActionType.REPEAT_CHAPTER, shouldShuffle: randomConfig.isOpen })
  }, [isReviewMode, setSentenceDictationConfig, dispatch, randomConfig.isOpen])

  useHotkeys('enter', () => {}, { preventDefault: true })

  useHotkeys(
    'space',
    (e) => {
      // 火狐浏览器的阻止事件无效，会导致按空格键后 再次输入正确的第一个字母会报错
      e.stopPropagation()
    },
    { preventDefault: true },
  )

  useHotkeys(
    'shift+enter',
    () => {
      dictationButtonHandler()
    },
    { preventDefault: true },
  )

  const exitButtonHandler = useCallback(() => {
    dispatch({ type: SentenceTypingStateActionType.REPEAT_CHAPTER, shouldShuffle: false })
  }, [dispatch, isReviewMode, setCurrentSentenceChapterId, setSentenceReviewModeInfo])

  const repeatButtonHandler = useCallback(async () => {
    if (isReviewMode) {
      return
    }

    dispatch({ type: SentenceTypingStateActionType.REPEAT_CHAPTER, shouldShuffle: randomConfig.isOpen })
  }, [isReviewMode, dispatch, randomConfig.isOpen])

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto">
      <div className="absolute inset-0 bg-gray-300 opacity-80 dark:bg-gray-600"></div>
      <Transition
        show={true}
        enter="ease-in duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex h-screen items-center justify-center">
          <div className="my-card fixed flex w-[90vw] max-w-6xl flex-col overflow-hidden rounded-3xl bg-white pb-14 pl-10 pr-5 pt-10 shadow-lg dark:bg-gray-800 md:w-4/5 lg:w-3/5">
            <div className="text-center font-sans font-normal text-gray-900 dark:text-gray-400 md:text-2xl">
              {`${currentSentenceDictionaryInfo?.data?.name} - ${
                isReviewMode ? '错题复习' : (currentSentenceChapterInfo?.data?.name || '') + '章'
              }`}
            </div>
            <button className="absolute right-7 top-5" onClick={exitButtonHandler}>
              <IconX className="text-gray-400" />
            </button>
            <div className="mt-10 flex flex-row gap-2 overflow-hidden">
              <div className="flex flex-shrink-0 flex-grow-0 flex-col gap-3 px-4 sm:px-1 md:px-2 lg:px-4">
                <RemarkRing remark={`${state.timerData.accuracy}%`} caption="正确率" percentage={state.timerData.accuracy} />
                <RemarkRing remark={timeString} caption="章节耗时" />
                <RemarkRing remark={state.timerData.wpm + ''} caption="WPM" />
              </div>
              <div className="z-10 ml-6 flex-1 overflow-visible rounded-xl bg-indigo-50 dark:bg-gray-700">
                <div
                  className="customized-scrollbar z-20  ml-8 mr-1 flex h-80 flex-row flex-wrap content-start gap-4 overflow-y-auto overflow-x-hidden pr-7 pt-9 text-xs"
                  style={{ userSelect: 'none' }}
                >
                  {wrongSentences.map((sentence, index) => (
                    <SentenceChip key={`${sentence.sentenceId}`} sentence={sentence} />
                  ))}
                </div>
                <div className="align-center flex w-full flex-row justify-start rounded-b-xl bg-indigo-200 px-4 dark:bg-indigo-400">
                  <ConclusionBar mistakeLevel={mistakeLevel} mistakeCount={wrongSentences.length} />
                </div>
              </div>
              <div className="ml-2 flex flex-col items-center justify-end gap-3 text-xl">
                {!isReviewMode && (
                  <>
                    <IexportWords fontSize={18} className="cursor-pointer text-gray-500" onClick={exportWords}></IexportWords>
                  </>
                )}
              </div>
            </div>
            <div className="mt-10 flex w-full justify-center gap-5 px-5 text-xl">
              {!isReviewMode && (
                <>
                  <Tooltip content="快捷键：shift + enter">
                    <button
                      className="my-btn-primary h-12 border-2 border-solid border-gray-300 bg-white text-base text-gray-700 dark:border-gray-700 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
                      type="button"
                      onClick={dictationButtonHandler}
                      title="默写本章节"
                    >
                      默写本章节
                    </button>
                  </Tooltip>
                  <Tooltip content="快捷键：space">
                    <button
                      className="my-btn-primary h-12 border-2 border-solid border-gray-300 bg-white text-base text-gray-700 dark:border-gray-700 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
                      type="button"
                      onClick={repeatButtonHandler}
                      title="重复本章节"
                    >
                      重复本章节
                    </button>
                  </Tooltip>
                </>
              )}

              {isReviewMode && (
                <button className="my-btn-primary h-12 text-base font-bold" type="button" title="练习其他章节">
                  练习其他章节
                </button>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default ResultScreen
