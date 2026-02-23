import { SentenceTypingContext, SentenceTypingStateActionType } from '../../store'
import type { SentenceTypingState } from '../../store/type'
import PrevAndNextWord from '../PrevAndNextWord'
import SentenceComponent from './Sentence'
import ChuckDetail from './components/ChuckDetail'
import CustomDetail from './components/CustomDetail'
import Translation from './components/Translation'
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
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function SentencePanel() {
  const { state, dispatch } = useContext(SentenceTypingContext)!
  const isShowPrevAndNextWord = useAtomValue(isShowPrevAndNextWordAtom)
  const [currentSentenceExerciseCount, setCurrentSentenceExerciseCount] = useState(0)
  const { times: loopSentenceTimes } = useAtomValue(loopSentenceConfigAtom)

  const [currentSentence, setCurrentSentence] = useState<SentenceAndSound>()
  const pronunciationConfig = useAtomValue(pronunciationConfigAtom)

  useEffect(() => {
    const loadCurrentSentence = async () => {
      if (!state.chapterData.sentences || state.chapterData.sentences.length === 0) {
        return
      }

      const sentence = state.chapterData.sentences[state.chapterData.index]

      try {
        const sentenceSoundId = await getSentenceSound(sentence.sentenceId)
        const sentenceSoundUrl = getSentenceSoundUrl(sentenceSoundId, pronunciationConfig)
        setCurrentSentence({ ...sentence, soundUrl: sentenceSoundUrl } as SentenceAndSound)
      } catch (error) {
        console.error('Error loading sentence:', error)
      }
    }

    loadCurrentSentence()
  }, [state.chapterData.index, state.chapterData.sentences, pronunciationConfig])

  const [, setSentenceComponentKey] = useState(0)
  const [showResultView, setShowResultView] = useState(false)

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
    'Shift+ArrowLeft',
    (e) => {
      e.preventDefault()
      onSkipSentence('prev')
    },
    { preventDefault: true },
  )

  useHotkeys(
    'Shift+ArrowRight',
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

  // 添加上下箭头热键控制 Translation 显示/隐藏
  useHotkeys(
    'ArrowDown',
    (e) => {
      e.preventDefault()
      setIsShowTranslation(true)
    },
    { preventDefault: true },
  )

  useHotkeys(
    'ArrowUp',
    (e) => {
      e.preventDefault()
      setIsShowTranslation(false)
    },
    { preventDefault: true },
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

  const onShowResultView = useCallback(
    (shouldShow: boolean) => {
      setShowResultView(shouldShow)
    },
    [setShowResultView],
  )

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

  const [isShowTranslation, setIsShowTranslation] = useState(false)
  const translationRef = React.useRef<HTMLDivElement>(null)

  const handleShowTranslation = useCallback((checked: boolean) => {
    setIsShowTranslation(checked)
  }, [])

  useEffect(() => {
    // 启动计时器
    let intervalId: number
    if (state.isTyping) {
      intervalId = window.setInterval(() => {
        dispatch({ type: SentenceTypingStateActionType.TICK_TIMER })
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [state.isTyping, dispatch])

  // 添加点击事件监听，点击视图外区域时收起 Translation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 确保 translationRef 存在且事件目标是有效的 Node
      if (translationRef.current && event.target) {
        const target = event.target as Node
        // 检查目标是否在 translationRef 内部
        let isInside = false
        let currentTarget: Node | null = target

        // 遍历 DOM 树，检查目标是否在 translationRef 内部
        while (currentTarget) {
          if (currentTarget === translationRef.current) {
            isInside = true
            break
          }
          currentTarget = currentTarget.parentNode
        }

        // 如果不在内部，收起 Translation
        if (!isInside) {
          setIsShowTranslation(false)
        }
      }
    }

    if (isShowTranslation) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isShowTranslation])

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
      {/* Translation 组件 - 带动画效果 */}
      {currentSentence && (
        <div
          ref={translationRef}
          className={`fixed left-0 right-0 top-0 z-40 flex justify-center transition-transform duration-500 ease-in-out ${
            isShowTranslation ? 'translate-y-40' : '-translate-y-full'
          }`}
        >
          <div className="rounded-lg bg-white shadow-lg">
            <Translation sentence={currentSentence} />
          </div>
        </div>
      )}

      <div className="container flex h-full w-full flex-col items-center justify-center">
        {currentSentence && (
          <div className="relative flex w-full justify-center">
            {!state.isTyping && (
              <div className="justify absolute flex h-full w-full">
                <div className="z-10 flex w-full items-center backdrop-blur-sm">
                  <p className="w-full select-none text-center text-xl text-gray-600 dark:text-gray-50">
                    按任意键{state.timerData.time ? '继续' : '开始'}
                  </p>
                </div>
              </div>
            )}
            <div className="relative">
              <SentenceComponent
                sentenceAndSound={currentSentence}
                isShowResultView={showResultView}
                onShowNextSentence={onShowNextSentence}
                onShowResultView={onShowResultView}
              />
              {showResultView &&
                (currentSentence?.words ? <ChuckDetail sentence={currentSentence} /> : <CustomDetail sentence={currentSentence} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
