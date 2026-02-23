import {
  SentenceAddAction,
  SentenceArrowLeftAction,
  SentenceArrowRightAction,
  SentenceDeleteAction,
  SentenceSpaceAction,
  SentenceUpdateAction,
  SentenceUpdateActionType,
} from '../InputHandler'
import { SentenceTypingContext } from '@/pages/Typing/SentenceTyping/store'
import { isChineseSymbol, isSentenceLegalKey } from '@/utils'
import { useCallback, useContext, useEffect, useRef } from 'react'

export default function KeyEventHandler({ updateInput }: { updateInput: (updateObj: SentenceUpdateAction) => void }) {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state } = useContext(SentenceTypingContext)!

  // 使用 useRef 来存储 updateInput 函数，避免因为 updateInput 变化而导致事件监听器被移除并重新添加
  const updateInputRef = useRef(updateInput)

  // 当 updateInput 变化时，更新 ref
  useEffect(() => {
    updateInputRef.current = updateInput
  }, [updateInput])

  const onKeydown = useCallback(
    (e: KeyboardEvent) => {
      const char = e.key

      if (isChineseSymbol(char)) {
        alert('您正在使用输入法，请关闭输入法。')
        return
      }

      if (state.isTyping && isSentenceLegalKey(char) && !e.altKey && !e.ctrlKey && !e.metaKey) {
        if (e.key === 'Backspace') {
          updateInputRef.current({ type: SentenceUpdateActionType.Delete } as SentenceDeleteAction)
        } else if (e.key === ' ') {
          updateInputRef.current({ type: SentenceUpdateActionType.Space, event: e } as SentenceSpaceAction)
        } else if (e.key === 'ArrowLeft') {
          updateInputRef.current({ type: SentenceUpdateActionType.ArrowLeft, event: e } as SentenceArrowLeftAction)
        } else if (e.key === 'ArrowRight') {
          updateInputRef.current({ type: SentenceUpdateActionType.ArrowRight, event: e } as SentenceArrowRightAction)
        } else {
          updateInputRef.current({ type: SentenceUpdateActionType.Add, value: char } as SentenceAddAction)
        }
      }
    },
    [state.isTyping],
  )

  useEffect(() => {
    // 打印添加键盘事件监听器的日志
    window.addEventListener('keydown', onKeydown)
    return () => {
      // 打印移除键盘事件监听器的日志
      window.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])

  return <></>
}
