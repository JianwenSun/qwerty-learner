import { SentenceDictionary } from "@/typings";
import { Lesson } from "../wxs/wxs";
import { getLessons } from "../wxs/wxsApi";

const CATEGORY_MAP: Record<string, string> = {
    '29': '零基础',
    '30': '日常实用',
    '31': '综合提升',
    '32': '职场商务',
    '33': '认证备考',
    '34': '文化兴趣',
    '172': '其他',
}

export function sentenceDictionaryConverter(lesson: Lesson): SentenceDictionary {
    return {
        id: lesson.id.toString(),
        name: lesson.name,
        description: lesson.describe,
        category: '课程广场',
        tags: [CATEGORY_MAP[lesson.lesson_category_id.toString()] ?? '其他'],
        icon_url: lesson.image,
        length: lesson.course_num,
    }
}

