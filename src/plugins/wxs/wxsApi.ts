import { decode } from "@/encode/decode";
import { currentSentenceChapterIdAtom, currentSentenceDictionaryIdAtom } from "@/store";
import { SentenceDictionary } from "@/typings";
import { useAtom } from "jotai";
import { UpyunClient } from "../../storage/upyun";
import { sentenceDictionaryConverter } from "../sb/adepter";
import { Lesson, LessonCourse, LessonDetail, Sentence } from "./wxs";

const ShanbeiNamespaceNew = "wxz"
//echo @ShaNBeI@ | base64
const SecretKey = "QFNoYU5CZUlACg=="

export function getLessonsKey() {
    return `${ShanbeiNamespaceNew}/lesson/mall.json`
}

export function getLessonDetailKey(detailId: number) {
    return `${ShanbeiNamespaceNew}/lesson/${detailId}/detail.json`
}

export function getLessonCourseKey(lessonId: number, courseId: number) {
    return `${ShanbeiNamespaceNew}/lesson/${lessonId}/course/${courseId}/detail.json`
}

export function getLessonCoursesKey(lessonId: number) {
    return `${ShanbeiNamespaceNew}/lesson/${lessonId}/courses.json`
}

export function getCourseSentencesKey(lessonId: number, courseId: number) {
    return `${ShanbeiNamespaceNew}/lesson/${lessonId}/course/${courseId}/sentences.json`
}

export function getSentenceSoundOldKey(lessonId: number, courseId: number, sentenceId: number) {
    return `${ShanbeiNamespaceNew}/lesson/${lessonId}/course/${courseId}/sentence/${sentenceId}/phonetic.json`
}

export function getSentenceSoundNewKey(sentenceId: number) {
    return `${ShanbeiNamespaceNew}/sentence/${sentenceId}/phonetic.json`
}

export function getSentenceKey(sentenceId: number) {
    return `${ShanbeiNamespaceNew}/sentence/${sentenceId}/sentence.json`
}

export async function getLessons(): Promise<Lesson[]> {
    var lessonsKey = getLessonsKey();
    const value = await UpyunClient.getFileInfo(lessonsKey);
    const decoded = await decode(SecretKey, value);
    return JSON.parse(decoded) as Lesson[]
}

export async function getLessonDetail(lessonId: number): Promise<LessonDetail> {
    var lessonDetailKey = getLessonDetailKey(lessonId);
    const value = await UpyunClient.getFileInfo(lessonDetailKey);
    const decoded = await decode(SecretKey, value);
    return JSON.parse(decoded) as LessonDetail
}

export async function getSentenceList(lessonId: number, courseId: number): Promise<Sentence[]> {
    var key = getCourseSentencesKey(lessonId, courseId);
    const value = await UpyunClient.getFileInfo(key);
    const decoded = await decode(SecretKey, value);
    return JSON.parse(decoded) as Sentence[]
}

export async function getSentenceSound(sentenceId: number): Promise<string> {
    var key = getSentenceSoundNewKey(sentenceId);
    const value = await UpyunClient.getFileInfo(key);
    const decoded = await decode(SecretKey, value);
    return JSON.parse(decoded) as string
}

export async function getSentenceDictionaryInfo(dictionaryId: string): Promise<SentenceDictionary | undefined> {
    const dicts = getLessons().then((lessons) => lessons.map(sentenceDictionaryConverter))
    return dicts.then(d => d.find((dict) => dict.id === dictionaryId) || undefined)
}

export async function getSentenceChapterInfo(dictionaryId: string, chapterId: string): Promise<LessonCourse | undefined> {
    return getLessonDetail(Number(dictionaryId)).then((detail) => detail.lesson_courses.find((chapter) => chapter.id === Number(chapterId)) || undefined)
}
