import type { FormEvent } from 'react'

export type SentenceUpdateAction = SentenceAddAction | SentenceDeleteAction | SentenceCompositionAction

export type SentenceAddAction = {
  type: 'add'
  value: string
  event: FormEvent<HTMLTextAreaElement> | KeyboardEvent
}

export type SentenceDeleteAction = {
  type: 'delete'
  length: number
}

// composition api is not ready yet
export type SentenceCompositionAction = {
  type: 'composition'
  value: string
}
