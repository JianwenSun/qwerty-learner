import Layout from '../../../components/Layout'
import PronunciationSwitcher from '../components/PronunciationSwitcher'
import { SentenceDictionaryChapterButton } from './components/SentenceDictionaryChapterButton'
import SentencePanel from './components/SentencePanel'
import StartButton from './components/StartButton'
import Switcher from './components/Switcher'
import { useSentenceList } from './hooks/useSentenceList'
import { initialSentenceTypingState, SentenceTypingContext, sentenceTypingReducer, SentenceTypingStateActionType } from './store'
import Header from '@/components/Header'
import { randomConfigAtom, sentenceReviewModeInfoAtom } from '@/store'
import { isLegal } from '@/utils'
import { useAtomValue } from 'jotai'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { useImmerReducer } from 'use-immer'

const App: React.FC = () => {
  const [state, dispatch] = useImmerReducer(sentenceTypingReducer, structuredClone(initialSentenceTypingState))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { sentences } = useSentenceList()

  const randomConfig = useAtomValue(randomConfigAtom)
  const reviewModeInfo = useAtomValue(sentenceReviewModeInfoAtom)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && (isLegal(e.key) || e.key === ' ') && !e.altKey && !e.ctrlKey && !e.metaKey) {
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
        payload: { sentences, shouldShuffle: randomConfig.isOpen, initialIndex },
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
      <Layout>
        <Header>
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
        <div className="container mx-auto flex h-full flex-1 flex-col items-center justify-center">
          <div className="container relative mx-auto flex h-full flex-col items-center">
            <div className="container flex flex-grow items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center ">
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid  border-indigo-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                </div>
              ) : (
                !state.isFinished && <SentencePanel />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </SentenceTypingContext.Provider>
  )
}

export default App
