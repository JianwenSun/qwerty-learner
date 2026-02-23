import Layout from '../../../components/Layout'
import PracticeModeSwitcher from '../components/PracticeModeSwitcher'
import PronunciationSwitcher from '../components/PronunciationSwitcher'
import Progress from './components/Progress'
import ResultScreen from './components/ResultScreen'
import Speed from './components/Speed'
import StartButton from './components/StartButton'
import Switcher from './components/Switcher'
import { WordDictionaryChapterButton } from './components/WordDictionaryChapterButton'
import WordList from './components/WordList'
import WordPanel from './components/WordPanel'
import { useConfetti } from './hooks/useConfetti'
import { useWordList } from './hooks/useWordList'
import { WordTypingContext, WordTypingStateActionType, initialWordTypingState, wordTypingReducer } from './store'
import { DonateCard } from '@/components/DonateCard'
import Header from '@/components/Header'
import Tooltip from '@/components/Tooltip'
import { wordDictionaryMap } from '@/resources/dictionary'
import { currentWordChapterAtom, currentWordDictionaryIdAtom, isReviewModeAtom, randomConfigAtom, wordReviewModeInfoAtom } from '@/store'
import { isLegal } from '@/utils'
import { useSaveWordChapterRecord } from '@/utils/db'
import { useMixPanelChapterLogUploader } from '@/utils/mixpanel'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useImmerReducer } from 'use-immer'

const App: React.FC = () => {
  const [state, dispatch] = useImmerReducer(wordTypingReducer, structuredClone(initialWordTypingState))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { words } = useWordList()

  const [currentWordDictionaryId, setCurrentWordDictionaryId] = useAtom(currentWordDictionaryIdAtom)
  const setCurrentWordChapter = useSetAtom(currentWordChapterAtom)
  const randomConfig = useAtomValue(randomConfigAtom)
  const chapterLogUploader = useMixPanelChapterLogUploader(state)
  const saveWordChapterRecord = useSaveWordChapterRecord()

  const reviewModeInfo = useAtomValue(wordReviewModeInfoAtom)
  const isReviewMode = useAtomValue(isReviewModeAtom)

  // 在组件挂载和currentWordDictionaryId改变时，检查当前字典是否存在，如果不存在，则将其重置为默认值
  useEffect(() => {
    const id = currentWordDictionaryId
    if (!(id!! in wordDictionaryMap)) {
      return
    }
  }, [currentWordDictionaryId, setCurrentWordChapter, setCurrentWordDictionaryId])

  const skipWord = useCallback(() => {
    dispatch({ type: WordTypingStateActionType.SKIP_WORD })
  }, [dispatch])

  useEffect(() => {
    const onBlur = () => {
      dispatch({ type: WordTypingStateActionType.SET_IS_TYPING, payload: false })
    }
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('blur', onBlur)
    }
  }, [dispatch])

  useEffect(() => {
    state.chapterData.words?.length > 0 ? setIsLoading(false) : setIsLoading(true)
  }, [state.chapterData.words])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && (isLegal(e.key) || e.key === ' ') && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        dispatch({ type: WordTypingStateActionType.SET_IS_TYPING, payload: true })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [dispatch])

  useEffect(() => {
    if (words !== undefined) {
      const initialIndex = isReviewMode && reviewModeInfo.reviewRecord?.index ? reviewModeInfo.reviewRecord.index : 0

      dispatch({
        type: WordTypingStateActionType.SETUP_CHAPTER,
        payload: { words, shouldShuffle: randomConfig.isOpen, initialIndex },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words])

  useEffect(() => {
    // 当用户完成章节后且完成 word Record 数据保存，记录 chapter Record 数据,
    if (state.isFinished && !state.isSavingRecord) {
      chapterLogUploader()
      saveWordChapterRecord(state)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isFinished, state.isSavingRecord])

  useEffect(() => {
    // 启动计时器
    let intervalId: number
    if (state.isTyping) {
      intervalId = window.setInterval(() => {
        dispatch({ type: WordTypingStateActionType.TICK_TIMER })
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [state.isTyping, dispatch])

  useConfetti(state.isFinished)

  return (
    <WordTypingContext.Provider value={{ state: state, dispatch }}>
      {state.isFinished && <ResultScreen />}
      <Layout>
        {/* 第一行：Header */}
        <div className="row-span-1">
          <Header>
            <PracticeModeSwitcher />
            <WordDictionaryChapterButton />
            <PronunciationSwitcher />
            <Switcher />
            <StartButton isLoading={isLoading} />
            <Tooltip content="跳过该词">
              <button
                className={`${
                  state.isShowSkip ? 'bg-orange-400' : 'invisible w-0 bg-gray-300 px-0 opacity-0'
                } my-btn-primary transition-all duration-300 `}
                onClick={skipWord}
              >
                Skip
              </button>
            </Tooltip>
          </Header>
        </div>

        {/* 第二行：主要内容 */}
        <div className="row-span-1 h-full w-full">
          <div className="h-full w-full">
            <div className="container relative mx-auto flex h-full w-full flex-col items-center">
              <div className="container flex flex-grow items-center justify-center">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center ">
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid  border-indigo-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                  </div>
                ) : (
                  <WordPanel />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 第三行：空行 */}
        <div className="row-span-1 flex h-full w-full flex-col items-center justify-center">
          <Progress />
          <Speed />
        </div>
      </Layout>
      <WordList />
    </WordTypingContext.Provider>
  )
}

export default App
