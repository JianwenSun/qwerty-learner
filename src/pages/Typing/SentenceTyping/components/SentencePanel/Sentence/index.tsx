import { SentenceUpdateAction, SentenceUpdateActionType } from '../components/InputHandler'
import KeyEventHandler from '../components/KeyEventHandler'
import { TipAlert } from './TipAlert'
import Word from './Word'
import { generateSentenceDisplayContent, initialSentenceState, JustifyType } from './type'
import { SentenceState } from './type'
import Tooltip from '@/components/Tooltip'
import { UrlPronunciationIcon, UrlPronunciationIconRef } from '@/components/UrlPronunciationIcon'
import useSentenceKeySounds from '@/hooks/useSentenceKeySounds'
import { SentenceTypingContext, SentenceTypingStateActionType } from '@/pages/Typing/SentenceTyping/store'
import { SentenceAndSound } from '@/plugins/wxs/wxs'
import {
  isIgnoreCaseAtom,
  isShowAnswerOnHoverAtom,
  isTextSelectableAtom,
  pronunciationIsOpenAtom,
  sentenceDictationConfigAtom,
} from '@/store'
import { CTRL, getUtcStringForMixpanel } from '@/utils'
import { useAtomValue } from 'jotai'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useImmer } from 'use-immer'

const SentenceComponent = React.memo(function SentenceComponent({
  sentenceAndSound,
  onShowNextSentence,
  onShowFinishView,
}: {
  sentenceAndSound: SentenceAndSound
  onShowNextSentence: () => void
  onShowFinishView: () => void
}) {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(SentenceTypingContext)!
  const [sentenceState, setSentenceState] = useImmer<SentenceState>(structuredClone(initialSentenceState))

  const sentenceDictationConfig = useAtomValue(sentenceDictationConfigAtom)
  const isTextSelectable = useAtomValue(isTextSelectableAtom)
  const isIgnoreCase = useAtomValue(isIgnoreCaseAtom)
  const isShowAnswerOnHover = useAtomValue(isShowAnswerOnHoverAtom)
  const [playKeySound, playBeepSound, playHintSound] = useSentenceKeySounds()
  const pronunciationIsOpen = useAtomValue(pronunciationIsOpenAtom)
  const [isHoveringSentence, setIsHoveringSentence] = useState(false)

  const [showFinishView, setShowFinishView] = useState(false)
  const [showNextSentence, setShowNextSentence] = useState(false)

  // 添加状态，用于跟踪是否已经自动播放过单词发音
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  const [showTipAlert, setShowTipAlert] = useState(false)

  // 用于跟踪依赖项变化的 ref
  const sentencePronunciationIconRef = useRef<UrlPronunciationIconRef>(null)

  useHotkeys(
    'tab',
    () => {
      handleHoverSentence(true)
    },
    { enableOnFormTags: true, preventDefault: true },
    [],
  )

  useHotkeys(
    'tab',
    () => {
      handleHoverSentence(false)
    },
    { enableOnFormTags: true, keyup: true, preventDefault: true },
    [],
  )
  useHotkeys(
    'ctrl+j',
    () => {
      // 打印按下 Ctrl+J 快捷键的日志
      if (state.isTyping) {
        sentencePronunciationIconRef.current?.play()
      }
    },
    [state.isTyping],
    { enableOnFormTags: true, preventDefault: true },
  )

  //当句子变化时，重置自动播放标志
  useEffect(() => {
    setHasAutoPlayed(false)
  }, [sentenceAndSound])

  useEffect(() => {
    if (sentenceState.wrongCount >= 4) {
      dispatch({ type: SentenceTypingStateActionType.SET_IS_SKIP, payload: true })
    }
  }, [sentenceState.wrongCount, dispatch])

  useEffect(() => {
    const newSentenceState = structuredClone(initialSentenceState)
    newSentenceState.displayContent = generateSentenceDisplayContent(sentenceAndSound)
    newSentenceState.startTime = getUtcStringForMixpanel()
    setSentenceState(newSentenceState)
  }, [sentenceAndSound])

  const updateInput = useCallback(
    (updateAction: SentenceUpdateAction) => {
      switch (updateAction.type) {
        case SentenceUpdateActionType.Add: {
          // 使用 Immer 的正确方式：直接传递新对象
          const newState = SentenceState.inputCurrentWord(sentenceState, updateAction.value)
          setSentenceState(newState)
          break
        }
        case SentenceUpdateActionType.Space: {
          updateAction.event.preventDefault()

          if (showFinishView && sentenceState.isFinished) {
            setShowNextSentence(true)
            break
          }

          const [justifyType, newState] = SentenceState.justifyOrMoveToNext(sentenceState)
          if (justifyType === JustifyType.JUSTIFY) {
            if (newState.hasWrong) {
              playBeepSound()
            } else {
              setShowFinishView(true)
              playHintSound()
            }
          }
          setSentenceState(newState)
          break
        }
        case SentenceUpdateActionType.Delete: {
          const newState = SentenceState.deleteCurrentWord(sentenceState)
          setSentenceState(newState)
          break
        }
        default:
          console.warn('unknown update type', updateAction)
      }
      playKeySound()
    },
    [sentenceState, setSentenceState],
  )

  const handleHoverSentence = useCallback((checked: boolean) => {
    setIsHoveringSentence(checked)
  }, [])

  useEffect(() => {
    // 页面渲染后自动播放，确保 soundUrl 存在且 ref 已挂载
    if (!sentenceState.hasChanged && !hasAutoPlayed && sentenceAndSound?.soundUrl && state.isTyping) {
      const playAudio = async () => {
        try {
          await sentencePronunciationIconRef.current?.play()
          setHasAutoPlayed(true)
        } catch (error) {
          console.error('Error playing audio:', error)
        }
      }
      playAudio()
    }
  }, [state.isTyping, hasAutoPlayed])

  useEffect(() => {
    if (showFinishView) {
      // dispatch({ type: SentenceTypingStateActionType.SET_IS_SAVING_RECORD, payload: true })
      onShowFinishView()
      setShowFinishView(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFinishView])

  useEffect(() => {
    if (showNextSentence) {
      onShowNextSentence()
      setShowNextSentence(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNextSentence])

  return (
    <>
      <KeyEventHandler updateInput={updateInput} />
      <div lang={'en'} className="flex flex-col items-center justify-center pb-1 pt-4">
        <div
          className={`tooltip-info relative w-fit bg-transparent p-0 leading-normal shadow-none dark:bg-transparent ${
            sentenceDictationConfig.isOpen ? 'tooltip' : ''
          }`}
          data-tip="按 Tab 快捷键显示完整句子"
        >
          <div
            onMouseEnter={() => handleHoverSentence(true)}
            onMouseLeave={() => handleHoverSentence(false)}
            className={`flex items-center ${isTextSelectable && 'select-all'} justify-center`}
          >
            {sentenceState.displayContent.words.map((t, index) => {
              return <Word key={`word-${index}`} word={t} visible={isHoveringSentence} />
            })}
          </div>
          {pronunciationIsOpen && (
            <div className="absolute -right-12 top-1/2 h-9 w-9 -translate-y-1/2 transform ">
              <Tooltip content={`快捷键${CTRL} + J`}>
                <UrlPronunciationIcon url={sentenceAndSound.soundUrl} ref={sentencePronunciationIconRef} className="h-full w-full" />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <TipAlert className="fixed bottom-10 right-3" show={showTipAlert} setShow={setShowTipAlert} />
    </>
  )
})

export default SentenceComponent
