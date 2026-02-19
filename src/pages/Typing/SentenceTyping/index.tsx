import Layout from '../../../components/Layout'
import PronunciationSwitcher from '../components/PronunciationSwitcher'
import { SentenceDictionaryChapterButton } from './components/SentenceDictionaryChapterButton'
import SentencePanel from './components/SentencePanel'
import StartButton from './components/StartButton'
import Switcher from './components/Switcher'
import { useSentenceList } from './hooks/useSentenceList'
import { initialSentenceTypingState, SentenceTypingContext, sentenceTypingReducer, SentenceTypingStateActionType } from './store'
import Header from '@/components/Header'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { useImmerReducer } from 'use-immer'

const App: React.FC = () => {
  console.log(`[${new Date().toISOString()}] App 初始化`)

  const [state, dispatch] = useImmerReducer(sentenceTypingReducer, structuredClone(initialSentenceTypingState))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { sentences } = useSentenceList()

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
