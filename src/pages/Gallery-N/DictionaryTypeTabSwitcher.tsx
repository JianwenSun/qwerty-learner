import { GalleryContext } from '.'
import type { DictionaryType } from '@/typings'
import { RadioGroup } from '@headlessui/react'
import { useCallback, useContext } from 'react'

export type DictionaryTabOption = {
  id: DictionaryType
  name: string
}

const options: DictionaryTabOption[] = [{ id: 'word', name: '单词' }]

export function DictionaryTypeTabSwitcher() {
  const { state, setState } = useContext(GalleryContext)!

  const onChangeTab = useCallback(
    (tab: string) => {
      setState((draft) => {
        draft.currentTypeTab = tab as DictionaryType
      })
    },
    [setState],
  )

  return (
    <RadioGroup value={state.currentTypeTab} onChange={onChangeTab}>
      <div className="flex items-start space-x-4">
        {options.map((option) => (
          <RadioGroup.Option key={option.id} value={option.id} className="cursor-pointer">
            {({ checked }) => (
              <div className={`flex items-center border-b-2 px-2 pb-1 ${checked ? 'border-indigo-500' : 'border-transparent'}`}>
                <p className={`text-lg font-medium text-gray-700 dark:text-gray-200`}>{option.name}</p>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
