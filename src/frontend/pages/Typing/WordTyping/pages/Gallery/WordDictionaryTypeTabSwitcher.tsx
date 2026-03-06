import { RadioGroup } from '@headlessui/react'

export function WordDictionaryTypeTabSwitcher() {
  return (
    <RadioGroup value="单词">
      <div className="flex items-start space-x-4">
        <RadioGroup.Option key="word" value="word" className="cursor-pointer">
          {({ checked }) => (
            <div className={`flex items-center border-b-2 px-2 pb-1 ${checked ? 'border-indigo-500' : 'border-transparent'}`}>
              <p className={`text-lg font-medium text-gray-700 dark:text-gray-200`}>单词</p>
            </div>
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  )
}
