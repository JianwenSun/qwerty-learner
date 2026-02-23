import Layout from '../../../components/Layout'
import PracticeModeSwitcher from '../components/PracticeModeSwitcher'
import PronunciationSwitcher from '../components/PronunciationSwitcher'
import ResultScreen from './components/ResultScreen'
import { SentenceDictionaryChapterButton } from './components/SentenceDictionaryChapterButton'
import SentencePanel from './components/SentencePanel'
import Progress from './components/SentencePanel/components/Progress'
import Speed from './components/SentencePanel/components/Speed'
import StartButton from './components/StartButton'
import Switcher from './components/Switcher'
import { useSentenceList } from './hooks/useSentenceHooks'
import { initialSentenceTypingState, SentenceTypingContext, sentenceTypingReducer, SentenceTypingStateActionType } from './store'
import Header from '@/components/Header'
import { randomConfigAtom, sentenceReviewModeInfoAtom } from '@/store'
import { useAtomValue } from 'jotai'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { useImmerReducer } from 'use-immer'

const App: React.FC = () => {
  const [state, dispatch] = useImmerReducer(sentenceTypingReducer, structuredClone(initialSentenceTypingState))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { data: sentences } = useSentenceList()

  const randomConfig = useAtomValue(randomConfigAtom)
  const reviewModeInfo = useAtomValue(sentenceReviewModeInfoAtom)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key == 'Enter' || e.key === ' ') {
        e.preventDefault()
        dispatch({ type: SentenceTypingStateActionType.SET_IS_TYPING, payload: true })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [dispatch])

  useEffect(() => {
    if (sentences !== undefined) {
      const initialIndex = reviewModeInfo.isReviewMode && reviewModeInfo.reviewRecord?.index ? reviewModeInfo.reviewRecord.index : 0
      dispatch({
        type: SentenceTypingStateActionType.SETUP_CHAPTER,
        payload: { sentences: sentences, shouldShuffle: randomConfig.isOpen, initialIndex },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentences])

  const skipSentence = useCallback(() => {
    dispatch({ type: SentenceTypingStateActionType.SKIP_SENTENCE })
  }, [dispatch])

  useEffect(() => {
    state.chapterData.sentences?.length > 0 ? setIsLoading(false) : setIsLoading(true)
  }, [state.chapterData.sentences])

  return (
    <SentenceTypingContext.Provider value={{ state, dispatch }}>
      {state.isFinished && <ResultScreen />}
      <Layout>
        {/* 第一行：Header */}
        <div className="row-span-1 w-full">
          <Header>
            <PracticeModeSwitcher />
            <SentenceDictionaryChapterButton />
            <PronunciationSwitcher />
            <Switcher />
            <StartButton isLoading={isLoading} />
            <Tooltip content="跳过该句">
              <button
                className={`${
                  state.isShowSkip ? 'bg-orange-400' : 'invisible w-0 bg-gray-300 px-0 opacity-0'
                } my-btn-primary transition-all duration-300 `}
                onClick={skipSentence}
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
                  <SentencePanel />
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
    </SentenceTypingContext.Provider>
  )
}

export default App
