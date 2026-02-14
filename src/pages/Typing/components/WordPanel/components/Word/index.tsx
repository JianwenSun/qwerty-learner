import type { WordUpdateAction } from '../InputHandler'
import InputHandler from '../InputHandler'
import Letter from './Letter'
import Notation from './Notation'
import { TipAlert } from './TipAlert'
import style from './index.module.css'
import { initialWordState } from './type'
import type { WordState } from './type'
import Tooltip from '@/components/Tooltip'
import type { WordPronunciationIconRef } from '@/components/WordPronunciationIcon'
import { WordPronunciationIcon } from '@/components/WordPronunciationIcon'
import { EXPLICIT_SPACE } from '@/constants'
import useKeySounds from '@/hooks/useKeySounds'
import { TypingContext, TypingStateActionType } from '@/pages/Typing/store'
import {
  currentChapterAtom,
  currentDictInfoAtom,
  isIgnoreCaseAtom,
  isShowAnswerOnHoverAtom,
  isTextSelectableAtom,
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
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(TypingContext)!
  const [wordState, setWordState] = useImmer<WordState>(structuredClone(initialWordState))

  const wordDictationConfig = useAtomValue(wordDictationConfigAtom)
  const isTextSelectable = useAtomValue(isTextSelectableAtom)
  const isIgnoreCase = useAtomValue(isIgnoreCaseAtom)
  const isShowAnswerOnHover = useAtomValue(isShowAnswerOnHoverAtom)
  const saveWordRecord = useSaveWordRecord()
  // const wordLogUploader = useMixPanelWordLogUploader(state)
  const [playKeySound, playBeepSound, playHintSound] = useKeySounds()
  const pronunciationIsOpen = useAtomValue(pronunciationIsOpenAtom)
  const [isHoveringWord, setIsHoveringWord] = useState(false)
  const currentLanguage = useAtomValue(currentDictInfoAtom).language
  const currentLanguageCategory = useAtomValue(currentDictInfoAtom).languageCategory
  const currentChapter = useAtomValue(currentChapterAtom)

  const [showTipAlert, setShowTipAlert] = useState(false)
  const wordPronunciationIconRef = useRef<WordPronunciationIconRef>(null)

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
  }, [word, setWordState])

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
      if (state.isTyping) {
        wordPronunciationIconRef.current?.play()
      }
    },
    [state.isTyping],
    { enableOnFormTags: true, preventDefault: true },
  )

  useEffect(() => {
    if (wordState.inputWord.length === 0 && state.isTyping) {
      wordPronunciationIconRef.current?.play && wordPronunciationIconRef.current?.play()
    }
  }, [state.isTyping, wordState.inputWord.length, wordPronunciationIconRef.current?.play])

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
        dispatch({ type: TypingStateActionType.REPORT_CORRECT_WORD })
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

      dispatch({ type: TypingStateActionType.REPORT_CORRECT_WORD })
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
        state.hasMadeInputWrong = true
        state.wrongCount += 1
        state.letterTimeArray = []
        state.letterMistake = updatedMistake
      })

      dispatch({ type: TypingStateActionType.REPORT_WRONG_WORD, payload: { letterMistake: updatedMistake } })

      if (currentChapter === 0 && state.chapterData.index === 0 && wordState.wrongCount + 1 >= 3) {
        setShowTipAlert(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordState.inputWord])

  useEffect(() => {
    if (wordState.isFinished) {
      dispatch({ type: TypingStateActionType.SET_IS_SAVING_RECORD, payload: true })

      // wordLogUploader({
      //   headword: word.name,
      //   timeStart: wordState.startTime,
      //   timeEnd: wordState.endTime,
      //   countInput: wordState.correctCount + wordState.wrongCount,
      //   countCorrect: wordState.correctCount,
      //   countTypo: wordState.wrongCount,
      // })
      saveWordRecord({
        word: word.name,
        wrongCount: wordState.wrongCount,
        letterTimeArray: wordState.letterTimeArray,
        letterMistake: wordState.letterMistake,
      })

      onFinish()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordState.isFinished])

  useEffect(() => {
    if (wordState.wrongCount >= 4) {
      dispatch({ type: TypingStateActionType.SET_IS_SKIP, payload: true })
    }
  }, [wordState.wrongCount, dispatch])

  return (
    <>
      <InputHandler updateInput={updateInput} />
      <div
        lang={currentLanguageCategory !== 'code' ? currentLanguageCategory : 'en'}
        className="flex flex-col items-center justify-center pb-1 pt-4"
      >
        {['romaji', 'hapin'].includes(currentLanguage) && word.notation && <Notation notation={word.notation} />}
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
                <WordPronunciationIcon word={word} ref={wordPronunciationIconRef} className="h-full w-full" />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <TipAlert className="fixed bottom-10 right-3" show={showTipAlert} setShow={setShowTipAlert} />
    </>
  )
}
