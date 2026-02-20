import type { WordUpdateAction } from '../InputHandler'
import KeyEventHandler from '../KeyEventHandler'
import Letter from './Letter'
import { TipAlert } from './TipAlert'
import style from './index.module.css'
import { initialWordState } from './type'
import type { WordState } from './type'
import Tooltip from '@/components/Tooltip'
import { UrlPronunciationIcon } from '@/components/UrlPronunciationIcon'
import { WordPronunciationIcon, WordPronunciationIconRef } from '@/components/WordPronunciationIcon'
import { EXPLICIT_SPACE } from '@/constants'
import useKeySounds from '@/hooks/useKeySounds'
import { WordTypingContext, WordTypingStateActionType } from '@/pages/Typing/WordTyping/store'
import {
  currentWordChapterAtom,
  isIgnoreCaseAtom,
  isShowAnswerOnHoverAtom,
  isTextSelectableAtom,
  phoneticConfigAtom,
  pronunciationIsOpenAtom,
  wordDictationConfigAtom,
} from '@/store'
import type { Word } from '@/typings'
import { CTRL, getUtcStringForMixpanel } from '@/utils'
import { useSaveWordRecord } from '@/utils/db'
import { useAtomValue } from 'jotai'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useImmer } from 'use-immer'

const vowelLetters = ['A', 'E', 'I', 'O', 'U']

export default function WordComponent({ word, onFinish }: { word: Word; onFinish: () => void }) {
  // 打印组件初始化日志，包含时间戳和单词名称
  console.log(`[${new Date().toISOString()}] WordComponent 初始化: 单词 "${word.name}"`)

  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(WordTypingContext)!
  const [wordState, setWordState] = useImmer<WordState>(structuredClone(initialWordState))

  const wordDictationConfig = useAtomValue(wordDictationConfigAtom)
  const isTextSelectable = useAtomValue(isTextSelectableAtom)
  const isIgnoreCase = useAtomValue(isIgnoreCaseAtom)
  const isShowAnswerOnHover = useAtomValue(isShowAnswerOnHoverAtom)
  const saveWordRecord = useSaveWordRecord()
  const [playKeySound, playBeepSound, playHintSound] = useKeySounds()
  const pronunciationIsOpen = useAtomValue(pronunciationIsOpenAtom)
  const [isHoveringWord, setIsHoveringWord] = useState(false)
  const currentWordChapter = useAtomValue(currentWordChapterAtom)
  const phoneticConfig = useAtomValue(phoneticConfigAtom)
  // 添加状态，用于跟踪是否已经自动播放过单词发音
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
  const [showTipAlert, setShowTipAlert] = useState(false)
  const wordPronunciationIconRef = useRef<WordPronunciationIconRef>(null)

  useHotkeys(
    'tab',
    () => {
      handleHoverWord(true)
    },
    { enableOnFormTags: true, preventDefault: true },
    [],
  )

  useHotkeys(
    'tab',
    () => {
      handleHoverWord(false)
    },
    { enableOnFormTags: true, keyup: true, preventDefault: true },
    [],
  )
  useHotkeys(
    'ctrl+j',
    () => {
      // 打印按下 Ctrl+J 快捷键的日志
      console.log(`[${new Date().toISOString()}] [Word/index.tsx] 按下 Ctrl+J 快捷键，播放单词发音`)
      if (state.isTyping) {
        console.log(`[${new Date().toISOString()}] [Word/index.tsx] 调用 wordPronunciationIconRef.current?.play()`)
        wordPronunciationIconRef.current?.play()
      }
    },
    [state.isTyping],
    { enableOnFormTags: true, preventDefault: true },
  )

  // 当单词变化时，重置自动播放标志
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] [Word/index.tsx] 单词变化，重置自动播放标志: ${word.name}`)
    setHasAutoPlayed(false)
  }, [word.name])

  useEffect(() => {
    if (wordState.wrongCount >= 4) {
      dispatch({ type: WordTypingStateActionType.SET_IS_SKIP, payload: true })
    }
  }, [wordState.wrongCount, dispatch])

  useEffect(() => {
    // run only when word changes
    let headword = ''
    try {
      headword = word.name.replace(new RegExp(' ', 'g'), EXPLICIT_SPACE)
      headword = headword.replace(new RegExp('…', 'g'), '..')
    } catch (e) {
      console.error('word.name is not a string', word)
      headword = ''
    }

    const newWordState = structuredClone(initialWordState)
    newWordState.displayWord = headword
    newWordState.letterStates = new Array(headword.length).fill('normal')
    newWordState.startTime = getUtcStringForMixpanel()
    newWordState.randomLetterVisible = headword.split('').map(() => Math.random() > 0.4)
    setWordState(newWordState)
  }, [word])

  const updateInput = useCallback(
    (updateAction: WordUpdateAction) => {
      switch (updateAction.type) {
        case 'add':
          if (updateAction.value === ' ') {
            updateAction.event.preventDefault()
            setWordState((state) => {
              state.inputWord = state.inputWord + EXPLICIT_SPACE
            })
          } else {
            setWordState((state) => {
              state.inputWord = state.inputWord + updateAction.value
            })
          }
          break

        default:
          console.warn('unknown update type', updateAction)
      }
    },
    [setWordState],
  )

  const handleHoverWord = useCallback((checked: boolean) => {
    setIsHoveringWord(checked)
  }, [])

  useEffect(() => {
    // 打印自动播放单词发音的日志
    console.log(
      `[${new Date().toISOString()}] [Word/index.tsx] 自动播放单词发音检查: inputWord.length=${wordState.inputWord.length}, isTyping=${
        state.isTyping
      }, hasAutoPlayed=${hasAutoPlayed}`,
    )
    if (wordState.inputWord.length === 0 && state.isTyping && !hasAutoPlayed) {
      console.log(`[${new Date().toISOString()}] [Word/index.tsx] 自动播放单词发音`)
      const playAudio = async () => {
        await wordPronunciationIconRef.current?.play()
        // 设置标志，防止再次自动播放
        setHasAutoPlayed(true)
      }
      playAudio()
    }
  }, [state.isTyping, hasAutoPlayed])

  const getLetterVisible = useCallback(
    (index: number) => {
      if (wordState.letterStates[index] === 'correct' || (isShowAnswerOnHover && isHoveringWord)) return true
      const letter = wordState.displayWord[index]

      if (wordDictationConfig.isOpen) {
        if (letter === EXPLICIT_SPACE) {
          return true
        }

        if (wordDictationConfig.type === 'hideAll') return false

        if (wordDictationConfig.type === 'hideVowel') {
          return vowelLetters.includes(letter.toUpperCase()) ? false : true
        }
        if (wordDictationConfig.type === 'hideConsonant') {
          return vowelLetters.includes(letter.toUpperCase()) ? true : false
        }
        if (wordDictationConfig.type === 'randomHide') {
          return wordState.randomLetterVisible[index]
        }
      }
      return true
    },
    [
      isHoveringWord,
      isShowAnswerOnHover,
      wordDictationConfig.isOpen,
      wordDictationConfig.type,
      wordState.displayWord,
      wordState.letterStates,
      wordState.randomLetterVisible,
    ],
  )

  useEffect(() => {
    const inputLength = wordState.inputWord.length
    /**
     * TODO: 当用户输入错误时，会报错
     * Cannot update a component (`App`) while rendering a different component (`WordComponent`). To locate the bad setState() call inside `WordComponent`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
     * 目前不影响生产环境，猜测是因为开发环境下 react 会两次调用 useEffect 从而展示了这个 warning
     * 但这终究是一个 bug，需要修复
     */
    if (inputLength === 0 || wordState.displayWord.length === 0) {
      return
    }

    // 找到当前第一个未正确输入的位置
    const firstUncorrectIndex = wordState.letterStates.findIndex((state) => state !== 'correct')
    // 如果所有字母都已正确输入，检查是否完成
    if (firstUncorrectIndex === -1) {
      if (inputLength >= wordState.displayWord.length) {
        // 完成输入时
        setWordState((state) => {
          state.isFinished = true
          state.endTime = getUtcStringForMixpanel()
        })
        playHintSound()
        dispatch({ type: WordTypingStateActionType.REPORT_CORRECT_WORD })
      }
      return
    }

    // 只处理第一个未正确输入位置的输入
    const targetIndex = firstUncorrectIndex

    // 确保目标索引不超过单词长度
    if (targetIndex >= wordState.displayWord.length) {
      return
    }

    // 获取最新的输入字符（即最后输入的字符）
    const inputChar = wordState.inputWord[inputLength - 1]
    const correctChar = wordState.displayWord[targetIndex]
    let isEqual = false
    if (inputChar != undefined && correctChar != undefined) {
      isEqual = isIgnoreCase ? inputChar.toLowerCase() === correctChar.toLowerCase() : inputChar === correctChar
    }

    if (isEqual) {
      // 输入正确时
      setWordState((state) => {
        state.letterTimeArray.push(Date.now())
        state.correctCount += 1
        state.letterStates[targetIndex] = 'correct'
      })

      // 检查是否完成输入
      if (targetIndex >= wordState.displayWord.length - 1) {
        // 完成输入时
        setWordState((state) => {
          state.isFinished = true
          state.endTime = getUtcStringForMixpanel()
        })
        playHintSound()
      } else {
        playKeySound()
      }

      dispatch({ type: WordTypingStateActionType.REPORT_CORRECT_WORD })
    } else {
      // 出错时
      playBeepSound()
      const updatedMistake = JSON.parse(JSON.stringify(wordState.letterMistake))
      if (updatedMistake[targetIndex]) {
        updatedMistake[targetIndex].push(inputChar)
      } else {
        updatedMistake[targetIndex] = [inputChar]
      }

      setWordState((state) => {
        state.letterStates[targetIndex] = 'wrong'
        state.wrongCount += 1
        state.letterTimeArray = []
        state.letterMistake = updatedMistake
      })

      dispatch({ type: WordTypingStateActionType.REPORT_WRONG_WORD, payload: { letterMistake: updatedMistake } })

      if (currentWordChapter === 0 && state.chapterData.index === 0 && wordState.wrongCount + 1 >= 3) {
        console.log('show tip alert')
        setShowTipAlert(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordState.inputWord])

  useEffect(() => {
    if (wordState.isFinished) {
      dispatch({ type: WordTypingStateActionType.SET_IS_SAVING_RECORD, payload: true })
      saveWordRecord({
        word: word,
        wrongCount: wordState.wrongCount,
        letterTimeArray: wordState.letterTimeArray,
        letterMistake: wordState.letterMistake,
      })
      onFinish()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordState.isFinished])

  return (
    <>
      <KeyEventHandler updateInput={updateInput} />
      <div lang={'en'} className="flex flex-col items-center justify-center pb-1 pt-4">
        <div
          className={`tooltip-info relative w-fit bg-transparent p-0 leading-normal shadow-none dark:bg-transparent ${
            wordDictationConfig.isOpen ? 'tooltip' : ''
          }`}
          data-tip="按 Tab 快捷键显示完整单词"
        >
          <div
            onMouseEnter={() => handleHoverWord(true)}
            onMouseLeave={() => handleHoverWord(false)}
            className={`flex items-center ${isTextSelectable && 'select-all'} justify-center ${wordState.hasWrong ? style.wrong : ''}`}
          >
            {wordState.displayWord.split('').map((t, index) => {
              return <Letter key={`${index}-${t}`} letter={t} visible={getLetterVisible(index)} state={wordState.letterStates[index]} />
            })}
          </div>
          {pronunciationIsOpen && (
            <div className="absolute -right-12 top-1/2 h-9 w-9 -translate-y-1/2 transform ">
              <Tooltip content={`快捷键${CTRL} + J`}>
                <UrlPronunciationIcon
                  url={phoneticConfig.type === 'us' ? word.sound.us_url : word.sound.uk_url}
                  ref={wordPronunciationIconRef}
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
}
