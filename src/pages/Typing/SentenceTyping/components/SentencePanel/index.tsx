import { SentenceTypingContext, SentenceTypingStateActionType } from '../../store'
import type { SentenceTypingState } from '../../store/type'
import PrevAndNextWord from '../PrevAndNextWord'
import SentenceComponent from './Sentence'
import { getSentenceSoundUrl, SentenceAndSound } from '@/plugins/wxs/wxs'
import { getSentenceSound } from '@/plugins/wxs/wxsApi'
import {
  isReviewModeAtom,
  isShowPrevAndNextWordAtom,
  loopSentenceConfigAtom,
  pronunciationConfigAtom,
  sentenceReviewModeInfoAtom,
} from '@/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function SentencePanel() {
  const { state, dispatch } = useContext(SentenceTypingContext)!
  const isShowPrevAndNextWord = useAtomValue(isShowPrevAndNextWordAtom)
  const [currentSentenceExerciseCount, setCurrentSentenceExerciseCount] = useState(0)
  const { times: loopSentenceTimes } = useAtomValue(loopSentenceConfigAtom)
  const pronunciationConfig = useAtomValue(pronunciationConfigAtom)

  const [currentSentence, setCurrentSentence] = useState<SentenceAndSound>()

  useEffect(() => {
    const loadCurrentSentence = async () => {
      console.log(`[${new Date().toISOString()}] [SentencePanel/index.tsx] 计算 currentSentence，index: ${state.chapterData.index}`)
      const sentence = state.chapterData.sentences[state.chapterData.index]
      const sentenceSoundId = await getSentenceSound(sentence.sentenceId)
      const sentenceSoundUrl = getSentenceSoundUrl(sentenceSoundId, pronunciationConfig.type)
      setCurrentSentence({ ...sentence, soundUrl: sentenceSoundUrl } as SentenceAndSound)
    }
    loadCurrentSentence()
  }, [state.chapterData.index, state.chapterData.sentences, pronunciationConfig.type])

  const [sentenceComponentKey, setSentenceComponentKey] = useState(0)
  const [showFinishView, setShowFinishView] = useState(false)

  const setSentenceReviewModeInfo = useSetAtom(sentenceReviewModeInfoAtom)
  const isReviewMode = useAtomValue(isReviewModeAtom)

  const prevIndex = useMemo(() => {
    const newIndex = state.chapterData.index - 1
    return newIndex < 0 ? 0 : newIndex
  }, [state.chapterData.index])
  const nextIndex = useMemo(() => {
    const newIndex = state.chapterData.index + 1
    return newIndex > state.chapterData.sentences.length - 1 ? state.chapterData.sentences.length - 1 : newIndex
  }, [state.chapterData.index, state.chapterData.sentences.length])

  useHotkeys(
    'Ctrl + Shift + ArrowLeft',
    (e) => {
      e.preventDefault()
      onSkipSentence('prev')
    },
    { preventDefault: true },
  )

  useHotkeys(
    'Ctrl + Shift + ArrowRight',
    (e) => {
      e.preventDefault()
      onSkipSentence('next')
    },
    { preventDefault: true },
  )

  useHotkeys(
    'tab',
    () => {
      handleShowTranslation(true)
    },
    { enableOnFormTags: true, preventDefault: true },
    [],
  )

  useHotkeys(
    'tab',
    () => {
      handleShowTranslation(false)
    },
    { enableOnFormTags: true, keyup: true, preventDefault: true },
    [],
  )

  const reloadCurrentSentenceComponent = useCallback(() => {
    console.log('Reload current sentence component')
    setSentenceComponentKey((old) => old + 1)
  }, [])

  const updateReviewRecord = useCallback(
    (state: SentenceTypingState) => {
      setSentenceReviewModeInfo((old) => ({
        ...old,
        reviewRecord: old.reviewRecord ? { ...old.reviewRecord, index: state.chapterData.index } : undefined,
      }))
    },
    [setSentenceReviewModeInfo],
  )

  const onFinish = useCallback(() => {
    setShowFinishView(true)
  }, [showFinishView])

  const onShowNextSentence = useCallback(() => {
    if (state.chapterData.index < state.chapterData.sentences.length - 1 || currentSentenceExerciseCount < loopSentenceTimes - 1) {
      // 用户完成当前单词
      if (currentSentenceExerciseCount < loopSentenceTimes - 1) {
        setCurrentSentenceExerciseCount((old) => old + 1)
        dispatch({ type: SentenceTypingStateActionType.LOOP_CURRENT_SENTENCE })
        reloadCurrentSentenceComponent()
      } else {
        setCurrentSentenceExerciseCount(0)
        if (isReviewMode) {
          dispatch({
            type: SentenceTypingStateActionType.NEXT_SENTENCE,
            payload: {
              updateReviewRecord,
            },
          })
        } else {
          dispatch({ type: SentenceTypingStateActionType.NEXT_SENTENCE })
        }
      }
    } else {
      // 用户完成当前章节
      dispatch({ type: SentenceTypingStateActionType.FINISH_CHAPTER })
      if (isReviewMode) {
        setSentenceReviewModeInfo((old) => ({
          ...old,
          reviewRecord: old.reviewRecord ? { ...old.reviewRecord, isFinished: true } : undefined,
        }))
      }
    }
  }, [
    state.chapterData.index,
    state.chapterData.sentences.length,
    currentSentenceExerciseCount,
    loopSentenceTimes,
    dispatch,
    reloadCurrentSentenceComponent,
    isReviewMode,
    updateReviewRecord,
    setSentenceReviewModeInfo,
  ])

  const onSkipSentence = useCallback(
    (type: 'prev' | 'next') => {
      if (type === 'prev') {
        dispatch({ type: SentenceTypingStateActionType.SKIP_SENTENCE_INDEX, newIndex: prevIndex })
      }

      if (type === 'next') {
        dispatch({ type: SentenceTypingStateActionType.SKIP_SENTENCE_INDEX, newIndex: nextIndex })
      }
    },
    [dispatch, prevIndex, nextIndex],
  )

  const [isShowTranslation, setIsHoveringTranslation] = useState(false)

  const handleShowTranslation = useCallback((checked: boolean) => {
    setIsHoveringTranslation(checked)
  }, [])

  const shouldShowTranslation = useMemo(() => {
    return isShowTranslation || state.isTransVisible
  }, [isShowTranslation, state.isTransVisible])

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      <div className="container flex h-24 w-full shrink-0 grow-0 justify-between px-12 pt-10">
        {isShowPrevAndNextWord && state.isTyping && (
          <>
            <PrevAndNextWord type="prev" />
            <PrevAndNextWord type="next" />
          </>
        )}
      </div>
      <div className="container flex flex-grow flex-col items-center justify-center">
        {currentSentence && (
          <div className="relative flex w-full justify-center" style={{ margin: '0 0 60px 0' }}>
            {!state.isTyping && (
              <div className="justify absolute flex h-full w-full">
                <div className="z-10 flex w-full items-center backdrop-blur-sm">
                  <p className="w-full select-none text-center text-xl text-gray-600 dark:text-gray-50">
                    按任意键{state.timerData.time ? '继续' : '开始'}
                  </p>
                </div>
              </div>
            )}
            <div className="relative" style={{ margin: '0 0 60px 0' }}>
              <SentenceComponent sentenceAndSound={currentSentence} onShowNextSentence={onShowNextSentence} onFinish={onFinish} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
