import { RadioGroup } from '@headlessui/react'

export function SentenceDictionaryTypeTabSwitcher() {
  return (
    <RadioGroup value="句子">
      <div className="flex items-start space-x-4">
        <RadioGroup.Option key="sentence" value="sentence" className="cursor-pointer">
          {({ checked }) => (
            <div className={`flex items-center border-b-2 px-2 pb-1 ${checked ? 'border-indigo-500' : 'border-transparent'}`}>
              <p className={`text-lg font-medium text-gray-700 dark:text-gray-200`}>句子</p>
            </div>
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  )
}
