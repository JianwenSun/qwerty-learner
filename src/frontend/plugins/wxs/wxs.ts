
export interface Founder {
    name: string;
    head_img: string;
}

export interface Lesson {
    id: number;
    name: string;
    describe: string;
    image: string;
    lesson_category_id: number;
    status: number;
    heat: number;
    created_at: number;
    course_num: number;
    course_published_count: number;
    human_num: number;
    is_have: number;
    is_collect: number;
    user_lesson_id: number;
    founder: Founder;
}

export interface LessonCourse {
    id: number;
    name: string;
    describe: string;
}

export interface LessonDetail {
    id: number;
    lesson_category_id: number;
    name: string;
    describe: string;
    image: string;
    status: number;
    heat: number;
    course_num: number;
    human_num: number;
    created_at: number;
    course_published_count: number;
    is_have: number;
    is_collect: number;
    user_lesson_id: number;
    founder: Founder;
    lesson_courses: LessonCourse[];
}


export interface Token {
    id: number;
    text: string;
    pos: string;
    dep: string;
    head: number;
}

export interface Word {
    surface: string;
    display: string;
    tokenIds: number[];
    pos: string;
    posZh: string;
    chinese: string;
    phonetic_uk: string;
    phonetic_us: string;
}

export interface Chunk {
    chunkIndex: number;
    chunkKey: string;
    content: string;
    chinese: string;
    clauseIndex: number;
    sentenceFunction: string;
    wordIndexes: number[];
    grammarType?: string;
    explanation?: string;
}

export interface Clause {
    clauseIndex: number;
    type: string;
    explanation: string;
    chunkIndexes: number[];
}

export interface Practice {
    id: number;
    kind: string;
    sort: number;
    content: string;
    chinese: string;
    alignTokenIds: number[];
    phonetic_uk: string;
    phonetic_us: string;
    part_of_speech: string;
}

export interface Sentence {
    sentenceId: number;
    lessonId: number;
    lessonCourseId: number;
    content: string;
    chinese: string;
    explanation: string;
    tokens: Token[];
    words: Word[] | null;
    chunks: Chunk[];
    clauses: Clause[];
    practices: Practice[];
}

export interface SentenceAndSound extends Sentence {
    soundUrl: string;
}

export function getSentenceSoundUrl(sentenceSoundId: string, pronunciationConfig: any) {
    if (!sentenceSoundId) {
        return ''
    }
    return `https://res.waxueshe.com/data/audio/new/${pronunciationConfig.type}_${pronunciationConfig.human}/${sentenceSoundId}.mp3`
}