import type { SentenceUpdateAction } from '../InputHandler'
import { SentenceTypingContext } from '@/pages/Typing/SentenceTyping/store'
import { isChineseSymbol, isLegal } from '@/utils'
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
      console.log('[KeyEventHandler/index.tsx] keydown event:', e)
      const char = e.key

      if (isChineseSymbol(char)) {
        alert('您正在使用输入法，请关闭输入法。')
        return
      }

      if (state.isTyping && isLegal(char) && !e.altKey && !e.ctrlKey && !e.metaKey) {
        updateInputRef.current({ type: 'add', value: char, event: e })
      }
    },
    [state.isTyping],
  )

  useEffect(() => {
    // 打印添加键盘事件监听器的日志
    console.log(`[${new Date().toISOString()}] 添加键盘事件监听器`)
    window.addEventListener('keydown', onKeydown)
    return () => {
      // 打印移除键盘事件监听器的日志
      console.log(`[${new Date().toISOString()}] 移除键盘事件监听器`)
      window.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])

  return <></>
}
