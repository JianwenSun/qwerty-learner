import { Sentence } from '@/plugins/wxs/wxs'
import { fontSizeConfigAtom } from '@/store'
import { useAtomValue } from 'jotai'

export type Props = {
  letter: string
  sentence?: Sentence
}

export default function Detail({ letter, sentence }: Props) {
  const fontSizeConfig = useAtomValue(fontSizeConfigAtom)
  return ''
}
