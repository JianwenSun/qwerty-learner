import { practiceConfigAtom } from '@/store'
import { Listbox, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import { Fragment, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import IconCheck from '~icons/tabler/check'
import IconChevronDown from '~icons/tabler/chevron-down'

const PracticeSwitcher = () => {
  const [practiceConfig, setPracticeConfig] = useAtom(practiceConfigAtom)

  const location = useLocation()
  const navigate = useNavigate()

  const isWordTyping = location.pathname.startsWith('/word-typing')
  const isSentenceTyping = location.pathname.startsWith('/sentence-typing')

  const onChangePracticeModel = useCallback(
    (value: string) => {
      setPracticeConfig((old) => ({
        ...old,
        model: value,
      }))
      if (value === 'word') {
        if (!isWordTyping) navigate('/word-typing')
      } else if (value === 'sentence') {
        if (!isSentenceTyping) navigate('/sentence-typing')
      }
    },
    [setPracticeConfig, isWordTyping, isSentenceTyping, navigate],
  )

  // 在组件初始化时，根据 practiceConfig.model 的值自动跳转页面
  useEffect(() => {
    if (practiceConfig.model === 'word') {
      if (!isWordTyping) navigate('/word-typing')
    } else if (practiceConfig.model === 'sentence') {
      if (!isSentenceTyping) navigate('/sentence-typing')
    }
  }, [practiceConfig.model, isWordTyping, isSentenceTyping, navigate])

  // 模式选项
  const modeOptions = [
    { value: 'word', label: '单词' },
    { value: 'sentence', label: '句子' },
  ]

  // 确保 practiceConfig.model 始终有一个定义的值
  const modelValue = practiceConfig.model || 'word'

  return (
    <div className="relative">
      <Listbox value={modelValue} onChange={onChangePracticeModel}>
        <div className="relative">
          <Listbox.Button className="listbox-button w-[100px]">
            <span>{modeOptions.find((option) => option.value === modelValue)?.label || '单词'}</span>
            <span>
              <IconChevronDown className="focus:outline-none" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="listbox-options z-50">
              {modeOptions.map((option) => (
                <Listbox.Option key={option.value} value={option.value}>
                  {({ selected }) => (
                    <>
                      <span>{option.label}</span>
                      {selected ? (
                        <span className="listbox-options-icon">
                          <IconCheck className="focus:outline-none" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default PracticeSwitcher
