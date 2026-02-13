import { WordDetail } from "@/models/shanbei";

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjY5NjExOTE5LCJleHAiOjE3Nzg0NjIyNTIsImV4cF92MiI6MTc3ODQ2MjI1MiwiZGV2aWNlIjoiIiwidXNlcm5hbWUiOiJXZWNoYXRfYTc4Y2Q0YTJmNTgyMDBjMSIsImlzX3N0YWZmIjowLCJzZXNzaW9uX2lkIjoiOGQ4MGM5MzIwMTdmMTFmMWI5OWI3MmI3MTRiMTBhNDAifQ.VpqAyE6QDGCxu6wI0J2yL-PJ4mSIuzJjE8jQAxwKGaQ";


export async function request(url: string) {
    try {
        return await fetch(url, {
            method: 'GET',
            headers: {
                'system-auth-token': authToken,
                'cookie': `auth_token=${authToken}`,
            },
        });
    } catch (error) {
        console.error('请求错误 URL:', url);
        console.error('错误信息:', error);
        throw error;
    }
    finally {
    }
}

export async function getWordDetail(word: string): Promise<WordDetail> {
    const response = await request(
        `/shanbay/abc/words/search/senses?vocabulary_content=${encodeURIComponent(word)}`,
    )
    if (!response.ok) {
        throw new Error('查询单词详情失败')
    }
    const data = (await response.json()) as WordDetail
    return data
}