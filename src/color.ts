
// 词性类型颜色映射表
export const POS_TYPE_COLOR_MAP: Record<string, string> = {
    'v.': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', // 动词
    'vt.': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', // 及物动词
    'vi.': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', // 不及物动词
    'n.': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', // 名词
    'noun.': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', // 名词
    'adj.': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', // 形容词
    'adv.': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', // 副词
    'prep.': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200', // 介词
    'conj.': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200', // 连词
    'pron.': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200', // 代词
    'phrase.': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200', // 短语
    'num.': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200', // 数词
    'int.': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200', // 感叹词
    'aux.': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200', // 助动词
}

export const getPosTypeColor = (pos: string): string => {
    // 遍历 POS_TYPE_COLOR_MAP，检查 key 是否包含 pos
    for (const [key, color] of Object.entries(POS_TYPE_COLOR_MAP)) {
        if (key.includes(pos.toLowerCase())) {
            return color
        }
    }
    // 如果没有找到匹配的，返回默认颜色
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

// 根据句子成分获取颜色
export const SENTENCE_FUNCTION_COLOR_MAP: Record<string, string> = {
    不定式标记: 'bg-blue-900',
    不定式补语: 'bg-blue-800',
    主句: 'bg-red-900',
    主语: 'bg-red-800',
    从句: 'bg-orange-900',
    伴随状语: 'bg-orange-800',
    原因状语从句: 'bg-yellow-900',
    地点状语: 'bg-yellow-800',
    宾语: 'bg-green-900',
    宾语从句: 'bg-green-800',
    宾语补足语: 'bg-teal-900',
    形式主语: 'bg-teal-800',
    方式状语: 'bg-cyan-900',
    时间状语从句: 'bg-cyan-800',
    状语: 'bg-blue-900',
    状语从句: 'bg-blue-800',
    目的状语: 'bg-indigo-900',
    简单句: 'bg-indigo-800',
    系动词: 'bg-purple-900',
    补语: 'bg-purple-800',
    表语: 'bg-pink-900',
    谓语: 'bg-pink-800',
    '谓语动词（非限定形式）': 'bg-rose-900',
    连接词: 'bg-rose-800',
    限制性定语从句: 'bg-gray-900',
    非限制性定语从句: 'bg-gray-800',
}
