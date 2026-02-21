import { EXPLICIT_SPACE } from '@/constants'
import { fontSizeConfigAtom } from '@/store'
import { useAtomValue } from 'jotai'
import React from 'react'

export type LetterState = 'normal' | 'correct' | 'wrong'

const stateClassNameMap: Record<LetterState, string> = {
  normal: 'text-gray-600 dark:text-gray-50',
  correct: 'text-green-600 dark:text-green-400',
  wrong: 'text-red-600 dark:text-red-400',
}

export type Props = {
  letter: string
  state?: LetterState
  visible?: boolean
}

const Letter: React.FC<Props> = ({ letter, state = 'normal', visible = true }) => {
  const fontSizeConfig = useAtomValue(fontSizeConfigAtom)
  return (
    <span
      className={`m-0 p-0 font-mono font-normal ${stateClassNameMap[state]} pr-0.8 duration-0 dark:text-opacity-80`}
      style={{ fontSize: fontSizeConfig.foreignFont.toString() + 'px' }}
    >
      {visible ? letter : '_'}
    </span>
  )
}

export default React.memo(Letter)
