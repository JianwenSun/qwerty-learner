import KeyEventHandler from '../KeyEventHandler'
import TextAreaHandler from '../TextAreaHandler'
import { currentDictInfoAtom } from '@/store'
import { useAtomValue } from 'jotai'
import type { FormEvent } from 'react'
import { useMemo } from 'react'

export default function InputHandler({ updateInput }: { updateInput: (updateObj: WordUpdateAction) => void }) {
  const dictInfo = useAtomValue(currentDictInfoAtom)

  // 只根据 dictInfo.language 来选择处理器，不依赖于 updateInput
  // 这样可以确保 KeyEventHandler 组件不会因为 updateInput 函数的变化而重新挂载
  const HandlerComponent = useMemo(() => {
    switch (dictInfo.language) {
      case 'en':
        return KeyEventHandler
      case 'de':
        return KeyEventHandler
      case 'romaji':
        return KeyEventHandler
      case 'code':
        return TextAreaHandler
      default:
        return TextAreaHandler
    }
  }, [dictInfo.language])

  return <HandlerComponent updateInput={updateInput} />
}
export type WordUpdateAction = WordAddAction | WordDeleteAction | WordCompositionAction

export type WordAddAction = {
  type: 'add'
  value: string
  event: FormEvent<HTMLTextAreaElement> | KeyboardEvent
}

export type WordDeleteAction = {
  type: 'delete'
  length: number
}

// composition api is not ready yet
export type WordCompositionAction = {
  type: 'composition'
  value: string
}
