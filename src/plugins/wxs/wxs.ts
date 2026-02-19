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