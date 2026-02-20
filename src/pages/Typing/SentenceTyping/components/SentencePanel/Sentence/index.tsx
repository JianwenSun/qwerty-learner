import { SentenceUpdateAction } from '../components/InputHandler'
import KeyEventHandler from '../components/KeyEventHandler'
import Letter from './Letter'
import { TipAlert } from './TipAlert'
import style from './index.module.css'
import { initialSentenceState } from './type'
import type { SentenceState } from './type'
import Tooltip from '@/components/Tooltip'
import { UrlPronunciationIcon, UrlPronunciationIconRef } from '@/components/UrlPronunciationIcon'
import { EXPLICIT_SPACE } from '@/constants'
import useKeySounds from '@/hooks/useKeySounds'
import { SentenceTypingContext, SentenceTypingStateActionType } from '@/pages/Typing/SentenceTyping/store'
import { SentenceAndSound } from '@/plugins/wxs/wxs'
import { getSentenceSound } from '@/plugins/wxs/wxsApi'
import {
  currentSentenceChapterAtom,
  isIgnoreCaseAtom,
  isShowAnswerOnHoverAtom,
  isTextSelectableAtom,
  pronunciationConfigAtom,
  pronunciationIsOpenAtom,
  sentenceDictationConfigAtom,
} from '@/store'
import { CTRL, getUtcStringForMixpanel } from '@/utils'
import { useAtomValue } from 'jotai'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useImmer } from 'use-immer'

const vowelLetters = ['A', 'E', 'I', 'O', 'U']

const SentenceComponent = React.memo(function SentenceComponent({ sentenceAndSound }: { sentenceAndSound: SentenceAndSound }) {
  // 打印组件初始化日志，包含时间戳和单词名称
  console.log(
    `[${new Date().toISOString()}] SentenceComponent 初始化: 句子 "${sentenceAndSound.content}", 句子ID: ${sentenceAndSound.sentenceId}`,
  )

  // 监听组件挂载和卸载
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] SentenceComponent 挂载: 句子 "${sentenceAndSound.content}"`)
    return () => {
      console.log(`[${new Date().toISOString()}] SentenceComponent 卸载: 句子 "${sentenceAndSound.content}"`)
    }
  }, [sentenceAndSound.sentenceId])

  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(SentenceTypingContext)!
  const [sentenceState, setSentenceState] = useImmer<SentenceState>(structuredClone(initialSentenceState))

  const sentenceDictationConfig = useAtomValue(sentenceDictationConfigAtom)
  const isTextSelectable = useAtomValue(isTextSelectableAtom)
  const isIgnoreCase = useAtomValue(isIgnoreCaseAtom)
  const isShowAnswerOnHover = useAtomValue(isShowAnswerOnHoverAtom)
  const [playKeySound, playBeepSound, playHintSound] = useKeySounds()
  const pronunciationIsOpen = useAtomValue(pronunciationIsOpenAtom)
  const [isHoveringSentence, setIsHoveringSentence] = useState(false)
  const currentSentenceChapter = useAtomValue(currentSentenceChapterAtom)

  // 添加状态，用于跟踪是否已经自动播放过单词发音
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  const [showTipAlert, setShowTipAlert] = useState(false)

  // 用于跟踪依赖项变化的 ref
  const prevIsTypingRef = useRef(state.isTyping)
  const prevInputWordLengthRef = useRef(sentenceState.inputWord.length)
  const prevHasAutoPlayedRef = useRef(hasAutoPlayed)
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
      console.log(`[${new Date().toISOString()}] [Sentence/index.tsx] 按下 Ctrl+J 快捷键，播放句子发音`)
      if (state.isTyping) {
        console.log(`[${new Date().toISOString()}] [Sentence/index.tsx] 调用 sentencePronunciationIconRef.current?.play()`)
        sentencePronunciationIconRef.current?.play()
      }
    },
    [state.isTyping],
    { enableOnFormTags: true, preventDefault: true },
  )

  //当句子变化时，重置自动播放标志
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] [Sentence/index.tsx] 句子变化，重置自动播放标志: ${sentenceAndSound.content}`)
    setHasAutoPlayed(false)
  }, [sentenceAndSound])

  useEffect(() => {
    if (sentenceState.wrongCount >= 4) {
      dispatch({ type: SentenceTypingStateActionType.SET_IS_SKIP, payload: true })
    }
  }, [sentenceState.wrongCount, dispatch])

  useEffect(() => {
    // run only when sentence changes
    let headword = ''
    try {
      headword = sentenceAndSound.content.replace(new RegExp(' ', 'g'), EXPLICIT_SPACE)
      headword = headword.replace(new RegExp('…', 'g'), '..')
    } catch (e) {
      console.error('sentence.content is not a string', sentenceAndSound)
      headword = ''
    }

    const newSentenceState = structuredClone(initialSentenceState)
    newSentenceState.displayContent = headword
    newSentenceState.letterStates = new Array(headword.length).fill('normal')
    newSentenceState.startTime = getUtcStringForMixpanel()
    newSentenceState.randomLetterVisible = headword.split('').map(() => Math.random() > 0.4)
    setSentenceState(newSentenceState)
  }, [sentenceAndSound])

  const updateInput = useCallback(
    (updateAction: SentenceUpdateAction) => {
      switch (updateAction.type) {
        case 'add':
          if (updateAction.value === ' ') {
            updateAction.event.preventDefault()
            setSentenceState((state) => {
              state.inputWord = state.inputWord + EXPLICIT_SPACE
            })
          } else {
            setSentenceState((state) => {
              state.inputWord = state.inputWord + updateAction.value
            })
          }
          break

        default:
          console.warn('unknown update type', updateAction)
      }
    },
    [setSentenceState],
  )

  const handleHoverSentence = useCallback((checked: boolean) => {
    setIsHoveringSentence(checked)
  }, [])

  useEffect(() => {
    // 检查依赖项变化
    const changedDeps = []
    if (prevIsTypingRef.current !== state.isTyping) {
      changedDeps.push(`isTyping: ${prevIsTypingRef.current} → ${state.isTyping}`)
      prevIsTypingRef.current = state.isTyping
    }
    if (prevInputWordLengthRef.current !== sentenceState.inputWord.length) {
      changedDeps.push(`inputWord.length: ${prevInputWordLengthRef.current} → ${sentenceState.inputWord.length}`)
      prevInputWordLengthRef.current = sentenceState.inputWord.length
    }
    if (prevHasAutoPlayedRef.current !== hasAutoPlayed) {
      changedDeps.push(`hasAutoPlayed: ${prevHasAutoPlayedRef.current} → ${hasAutoPlayed}`)
      prevHasAutoPlayedRef.current = hasAutoPlayed
    }

    if (changedDeps.length > 0) {
      console.log(`[${new Date().toISOString()}] [Sentence/index.tsx] 依赖项变化: ${changedDeps.join(', ')}`)
    }

    // 页面渲染后自动播放，确保 soundUrl 存在且 ref 已挂载
    if (sentenceState.inputWord.length === 0 && !hasAutoPlayed && sentenceAndSound?.soundUrl && state.isTyping) {
      console.log(`[${new Date().toISOString()}] [Sentence/index.tsx] 自动播放句子发音，soundUrl: ${sentenceAndSound.soundUrl}`)
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

  const getLetterVisible = useCallback(
    (index: number) => {
      if (sentenceState.letterStates[index] === 'correct' || (isShowAnswerOnHover && isHoveringSentence)) return true
      const letter = sentenceState.displayContent[index]

      if (sentenceDictationConfig.isOpen) {
        if (letter === EXPLICIT_SPACE) {
          return true
        }

        if (sentenceDictationConfig.type === 'hideAll') return false

        if (sentenceDictationConfig.type === 'hideVowel') {
          return vowelLetters.includes(letter.toUpperCase()) ? false : true
        }
        if (sentenceDictationConfig.type === 'hideConsonant') {
          return vowelLetters.includes(letter.toUpperCase()) ? true : false
        }
        if (sentenceDictationConfig.type === 'randomHide') {
          return sentenceState.randomLetterVisible[index]
        }
      }
      return true
    },
    [
      isHoveringSentence,
      isShowAnswerOnHover,
      sentenceDictationConfig.isOpen,
      sentenceDictationConfig.type,
      sentenceState.displayContent,
      sentenceState.letterStates,
      sentenceState.randomLetterVisible,
    ],
  )

  useEffect(() => {
    const inputLength = sentenceState.inputWord.length
    /**
     * TODO: 当用户输入错误时，会报错
     * Cannot update a component (`App`) while rendering a different component (`WordComponent`). To locate the bad setState() call inside `WordComponent`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
     * 目前不影响生产环境，猜测是因为开发环境下 react 会两次调用 useEffect 从而展示了这个 warning
     * 但这终究是一个 bug，需要修复
     */
    if (inputLength === 0 || sentenceState.displayContent.length === 0) {
      return
    }

    // 找到当前第一个未正确输入的位置
    const firstUncorrectIndex = sentenceState.letterStates.findIndex((state) => state !== 'correct')
    // 如果所有字母都已正确输入，检查是否完成
    if (firstUncorrectIndex === -1) {
      if (inputLength >= sentenceState.displayContent.length) {
        // 完成输入时
        setSentenceState((state) => {
          state.isFinished = true
          state.endTime = getUtcStringForMixpanel()
        })
        playHintSound()
        dispatch({ type: SentenceTypingStateActionType.REPORT_CORRECT_SENTENCE })
      }
      return
    }

    // 只处理第一个未正确输入位置的输入
    const targetIndex = firstUncorrectIndex

    // 确保目标索引不超过句子长度
    if (targetIndex >= sentenceState.displayContent.length) {
      return
    }

    // 获取最新的输入字符（即最后输入的字符）
    const inputChar = sentenceState.inputWord[inputLength - 1]
    const correctChar = sentenceState.displayContent[targetIndex]
    let isEqual = false
    if (inputChar != undefined && correctChar != undefined) {
      isEqual = isIgnoreCase ? inputChar.toLowerCase() === correctChar.toLowerCase() : inputChar === correctChar
    }

    if (isEqual) {
      // 输入正确时
      setSentenceState((state) => {
        state.letterTimeArray.push(Date.now())
        state.correctCount += 1
        state.letterStates[targetIndex] = 'correct'
      })

      // 检查是否完成输入
      if (targetIndex >= sentenceState.displayContent.length - 1) {
        // 完成输入时
        setSentenceState((state) => {
          state.isFinished = true
          state.endTime = getUtcStringForMixpanel()
        })
        playHintSound()
      } else {
        playKeySound()
      }

      dispatch({ type: SentenceTypingStateActionType.REPORT_CORRECT_SENTENCE })
    } else {
      // 出错时
      playBeepSound()
      const updatedMistake = JSON.parse(JSON.stringify(sentenceState.letterMistake))
      if (updatedMistake[targetIndex]) {
        updatedMistake[targetIndex].push(inputChar)
      } else {
        updatedMistake[targetIndex] = [inputChar]
      }

      setSentenceState((state) => {
        state.letterStates[targetIndex] = 'wrong'
        state.wrongCount += 1
        state.letterTimeArray = []
        state.letterMistake = updatedMistake
      })

      dispatch({ type: SentenceTypingStateActionType.REPORT_WRONG_SENTENCE, payload: { letterMistake: updatedMistake } })

      if (currentSentenceChapter === 0 && state.chapterData.index === 0 && sentenceState.wrongCount + 1 >= 3) {
        console.log('show tip alert')
        setShowTipAlert(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentenceState.inputWord])

  useEffect(() => {
    if (sentenceState.isFinished) {
      dispatch({ type: SentenceTypingStateActionType.SET_IS_SAVING_RECORD, payload: true })
      // onFinish()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentenceState.isFinished])

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
            className={`flex items-center ${isTextSelectable && 'select-all'} justify-center ${sentenceState.hasWrong ? style.wrong : ''}`}
          >
            {sentenceState.displayContent.split('').map((t, index) => {
              return <Letter key={`${index}-${t}`} letter={t} visible={getLetterVisible(index)} state={sentenceState.letterStates[index]} />
            })}
          </div>
          {pronunciationIsOpen && (
            <div className="absolute -right-12 top-1/2 h-9 w-9 -translate-y-1/2 transform ">
              <Tooltip content={`快捷键${CTRL} + J`}>
                <UrlPronunciationIcon
                  url={sentenceAndSound.soundUrl}
                  // url={getSentenceSoundUrl(sentenceSoundId, pronunciationConfig.type)}
                  ref={sentencePronunciationIconRef}
                  className="h-full w-full"
                />
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
