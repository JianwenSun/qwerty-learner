import type { FormEvent } from 'react'

export type SentenceUpdateAction = SentenceAddAction | SentenceDeleteAction | SentenceSpaceAction

export enum SentenceUpdateActionType {
  Add = 'add',
  Delete = 'delete',
  Space = 'space',
}

export type SentenceAddAction = {
  type: SentenceUpdateActionType.Add
  value: string
}

export type SentenceDeleteAction = {
  type: SentenceUpdateActionType.Delete
}

export type SentenceSpaceAction = {
  type: SentenceUpdateActionType.Space
  event: FormEvent<HTMLTextAreaElement> | KeyboardEvent
}
