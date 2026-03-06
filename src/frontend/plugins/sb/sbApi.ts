import { decode } from "@/encode/decode";
import { Examples, Exts, Senses, Vocabulary, WordDetail } from "@/plugins/sb/sb";
import { UpyunClient } from "../../storage/upyun";

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjY5NjExOTE5LCJleHAiOjE3Nzg0NjIyNTIsImV4cF92MiI6MTc3ODQ2MjI1MiwiZGV2aWNlIjoiIiwidXNlcm5hbWUiOiJXZWNoYXRfYTc4Y2Q0YTJmNTgyMDBjMSIsImlzX3N0YWZmIjowLCJzZXNzaW9uX2lkIjoiOGQ4MGM5MzIwMTdmMTFmMWI5OWI3MmI3MTRiMTBhNDAifQ.VpqAyE6QDGCxu6wI0J2yL-PJ4mSIuzJjE8jQAxwKGaQ";

const ShanbeiNamespace = "sb"
//echo @ShaNBeI@ | base64
const SecretKey = "QFNoYU5CZUlACg=="

function getVocabKey(vocabId: string) {
    return `${ShanbeiNamespace}/vocabulary/id/${vocabId}`
}

function getVocabWorkKey(word: string) {
    return `${ShanbeiNamespace}/vocabulary/word/${word}`
}

export async function getVocabWordIgnoreUpper(word: string): Promise<Vocabulary> {
    // 检查单词的首字母是否为大写
    const firstChar = word.charAt(0);
    const isFirstCharUpper = firstChar === firstChar.toUpperCase();

    // 先尝试使用原始单词查询
    var vocabWordKey = getVocabWorkKey(word) + '.json';
    try {
        //const vocab = await UpyunS3Client.getText(vocabWordKey) as string;
        const vocab = await UpyunClient.getFileInfo(vocabWordKey);
        const decoded = await decode(SecretKey, vocab);
        return JSON.parse(decoded) as Vocabulary
    } catch (error) {
        // 如果首字母为大写且查询失败，尝试将首字母转换为小写后重新查询
        if (isFirstCharUpper) {
            const lowercaseWord = word.charAt(0).toLowerCase() + word.slice(1);
            var lowercaseVocabWordKey = getVocabWorkKey(lowercaseWord) + '.json';
            //const lowercaseVocab = await UpyunS3Client.getText(lowercaseVocabWordKey) as string;
            const lowercaseVocab = await UpyunClient.getFileInfo(lowercaseVocabWordKey);
            const decoded = await decode(SecretKey, lowercaseVocab);
            return JSON.parse(decoded) as Vocabulary
        }
        // 如果首字母不是大写或重新查询也失败，抛出错误
        throw error;
    }
}

export async function getVocabWork(word: string): Promise<Vocabulary> {
    var vocabWordKey = getVocabWorkKey(word) + '.json';
    //const vocab = await UpyunS3Client.getText(vocabWordKey) as string;
    const vocab = await UpyunClient.getFileInfo(vocabWordKey);
    const decoded = await decode(SecretKey, vocab);
    return JSON.parse(decoded) as Vocabulary
}

export async function getExtExamples(vocabId: string): Promise<Exts[]> {
    var vocabKey = getVocabKey(vocabId) + '/ext_examples.json';
    //const extExamples = await UpyunS3Client.getText(vocabKey) as string;
    const extExamples = await UpyunClient.getFileInfo(vocabKey);
    const decoded = await decode(SecretKey, extExamples);
    return JSON.parse(decoded) as Exts[]
}

export async function getVocabExamples(vocabId: string): Promise<Examples[]> {
    var vocabKey = getVocabKey(vocabId) + '/vocab_examples.json';
    const vocabExamples = await UpyunClient.getFileInfo(vocabKey);
    //const vocabExamples = await UpyunClient.getFileInfo(vocabKey).then((res) => res.Body?.transformToString() || "");
    const decoded = await decode(SecretKey, vocabExamples);
    return JSON.parse(decoded) as Examples[]
}

export async function getVocabSenses(vocabId: string): Promise<Senses[]> {
    var vocabKey = getVocabKey(vocabId) + '/vocab_senses.json';
    //const vocab = await UpyunS3Client.getText(vocabKey) as string;
    const vocab = await UpyunClient.getFileInfo(vocabKey);
    const decoded = await decode(SecretKey, vocab);
    return JSON.parse(decoded) as Senses[]
}

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