import type { FormEvent } from 'react'

export type SentenceUpdateAction =
  | SentenceAddAction
  | SentenceDeleteAction
  | SentenceSpaceAction
  | SentenceArrowLeftAction
  | SentenceArrowRightAction

export enum SentenceUpdateActionType {
  Add = 'add',
  Delete = 'delete',
  Space = 'space',
  ArrowLeft = 'arrowLeft',
  ArrowRight = 'arrowRight',
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

export type SentenceArrowLeftAction = {
  type: SentenceUpdateActionType.ArrowLeft
  event: KeyboardEvent
}

export type SentenceArrowRightAction = {
  type: SentenceUpdateActionType.ArrowRight
  event: KeyboardEvent
}
