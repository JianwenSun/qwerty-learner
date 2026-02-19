import { decode } from "@/encode/decode";
import { UpyunClient } from "../../storage/upyun";
import { Lesson } from "./wxs";

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
