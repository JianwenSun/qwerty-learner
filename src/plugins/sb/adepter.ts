import { SentenceDictionary } from "@/typings";
import { Lesson } from "../wxs/wxs";
import { getLessons } from "../wxs/wxsApi";


function sentenceDictionaryConverter(lesson: Lesson): SentenceDictionary {
    return {
        id: lesson.id.toString(),
        name: lesson.name,
        description: lesson.describe,
        category: lesson.lesson_category_id.toString(),
        tags: [],
        icon_url: undefined,
    }
}

export async function sentenceDictionaryResourcesPromise(): Promise<SentenceDictionary[]> {
    return getLessons().then((lessons) => lessons.map(sentenceDictionaryConverter));
}
