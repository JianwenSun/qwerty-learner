import { decode } from "@/encode/decode";
import { Examples, Exts, Senses } from "@/models/shanbei";
import { UpyunClient } from "./upyun";

const ShanbeiNamespace = "shanbei"
//echo @ShaNBeI@ | base64
const SecretKey = "QFNoYU5CZUlACg=="

function getVocabKey(vocabId: string) {
    return `${ShanbeiNamespace}/${vocabId}`
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

