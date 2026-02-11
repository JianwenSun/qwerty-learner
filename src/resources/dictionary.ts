import type { Dictionary, DictionaryResource } from '@/typings/index'
import { calcChapterCount } from '@/utils'


const childrenEnglish: DictionaryResource[] = [
  {
    id: "buonbp",
    name: "人教精通版一年级上(新版)",
    description: "根据24新版教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版一年级上_新版_.json",
    length: 35,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "yamqx",
    name: "人教精通版一年级下(新版)",
    description: "根据24新版教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版一年级下_新版_.json",
    length: 30,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qyhrp",
    name: "人教精通版二年级上(新版)",
    description: "根据24新版教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版二年级上_新版_.json",
    length: 28,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkkzvl",
    name: "人教精通版二年级下(新版)",
    description: "根据24新版教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版二年级下_新版_.json",
    length: 29,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqsius",
    name: "人教精通版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版三年级上_新版_.json",
    length: 133,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "breuwz",
    name: "人教精通版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版三年级下_新版_.json",
    length: 112,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kybtq",
    name: "人教精通版四年级上(新版)",
    description: "根据新版教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版四年级上_新版_.json",
    length: 115,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btvttz",
    name: "人教精通版四年级下(新版)",
    description: "根据新版教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版四年级下_新版_.json",
    length: 105,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hrqps",
    name: "人教精通版三年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版三年级词汇_上_.json",
    length: 68,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbzlfg",
    name: "人教精通版三年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版三年级词汇_下_.json",
    length: 66,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "sdfkl",
    name: "人教精通版四年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版四年级词汇_上_.json",
    length: 87,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "oimie",
    name: "人教精通版四年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版四年级词汇_下_.json",
    length: 120,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "buvdrp",
    name: "人教精通版五年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版五年级词汇_上_.json",
    length: 123,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qnstp",
    name: "人教精通版五年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版五年级词汇_下_.json",
    length: 141,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "efmlc",
    name: "人教精通版六年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版六年级词汇_上_.json",
    length: 130,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mxeei",
    name: "人教精通版六年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教精通"
    ],
    url: "/dicts/sunshuo/人教精通版六年级词汇_下_.json",
    length: 81,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "aphen",
    name: "人教版一年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版一年级词汇_上_.json",
    length: 51,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zisju",
    name: "人教版一年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版一年级词汇_下_.json",
    length: 41,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kdpkg",
    name: "人教版二年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版二年级词汇_上_.json",
    length: 54,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hlckg",
    name: "人教版二年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版二年级词汇_下_.json",
    length: 51,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqqfpx",
    name: "人教版三年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版三年级词汇_上_.json",
    length: 95,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "tsuqs",
    name: "人教版三年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版三年级词汇_下_.json",
    length: 64,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "gkwqc",
    name: "人教版四年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版四年级词汇_上_.json",
    length: 101,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hooui",
    name: "人教版四年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版四年级词汇_下_.json",
    length: 68,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "pcgyp",
    name: "人教版五年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版五年级词汇_上_.json",
    length: 56,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "buzrgc",
    name: "人教版五年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版五年级词汇_下_.json",
    length: 48,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iqcmz",
    name: "人教版六年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版六年级词汇_上_.json",
    length: 89,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qgpic",
    name: "人教版六年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版"
    ],
    url: "/dicts/sunshuo/人教版六年级词汇_下_.json",
    length: 36,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqnzfg",
    name: "人教版PEP一年级上(新版)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP一年级上_新版_.json",
    length: 21,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "tprkl",
    name: "人教版PEP一年级下(新版)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP一年级下_新版_.json",
    length: 25,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "pzdie",
    name: "人教版PEP二年级上(新版)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP二年级上_新版_.json",
    length: 31,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "nmqei",
    name: "人教版PEP二年级下(新版)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP二年级下_新版_.json",
    length: 20,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "buihtz",
    name: "人教版PEP三年级上(新版)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP三年级上_新版_.json",
    length: 109,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "pwxai",
    name: "人教版PEP三年级下(新版)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP三年级下_新版_.json",
    length: 113,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qtrtl",
    name: "人教版PEP四年级上(新版)",
    description: "根据24新版教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP四年级上_新版_.json",
    length: 117,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mtarl",
    name: "人教版PEP四年级下(新版)",
    description: "根据24新版教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP四年级下_新版_.json",
    length: 111,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ynsju",
    name: "人教版PEP三年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP三年级词汇_上_.json",
    length: 64,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkfnsa",
    name: "人教版PEP三年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP三年级词汇_下_.json",
    length: 71,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "tljmp",
    name: "人教版PEP四年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP四年级词汇_上_.json",
    length: 84,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "afyrg",
    name: "人教版PEP四年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP四年级词汇_下_.json",
    length: 104,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lavdu",
    name: "人教版PEP五年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP五年级词汇_上_.json",
    length: 132,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "heuxc",
    name: "人教版PEP五年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP五年级词汇_下_.json",
    length: 152,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqkpia",
    name: "人教版PEP六年级词汇(上)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP六年级词汇_上_.json",
    length: 146,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "dsicx",
    name: "人教版PEP六年级词汇(下)",
    description: "根据教材编写",
    category: "人教版",
    tags: [
      "人教版PEP"
    ],
    url: "/dicts/sunshuo/人教版PEP六年级词汇_下_.json",
    length: 85,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bukjmu",
    name: "小学标准词汇(新课标)",
    description: "根据《义务教育课程标准(二级词汇)》大纲编写，为小学阶段应掌握的单词",
    category: "词汇合集",
    tags: [
      "小升初"
    ],
    url: "/dicts/sunshuo/小学标准词汇_新课标_.json",
    length: 505,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ehyza",
    name: "小学汇总词汇",
    description: "小学汇总词汇",
    category: "词汇合集",
    tags: [
      "小升初"
    ],
    url: "/dicts/sunshuo/小学汇总词汇.json",
    length: 646,
    language: "en",
    languageCategory: "en"
  },

  {
    id: "qplou",
    name: "剑桥通用英语考试KET核心词汇",
    description: "剑桥五级考试的第一级Key English Test，约A2/小学初中水平",
    category: "国际版",
    tags: [
      "剑桥KET_PET_FCE"
    ],
    url: "/dicts/sunshuo/剑桥通用英语考试KET核心词汇.json",
    length: 1689,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wgojq",
    name: "剑桥通用英语考试PET核心词汇",
    description: "剑桥五级考试的第二级Preliminary English Test，约B1/初高中水平",
    category: "国际版",
    tags: [
      "剑桥KET_PET_FCE"
    ],
    url: "/dicts/sunshuo/剑桥通用英语考试PET核心词汇.json",
    length: 2889,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zohvu",
    name: "剑桥通用英语考试FCE核心词汇",
    description: "剑桥五级考试的第三级First Certificate in English必须掌握的词汇（含常见词组），约B2水平",
    category: "国际版",
    tags: [
      "剑桥KET_PET_FCE"
    ],
    url: "/dicts/sunshuo/剑桥通用英语考试FCE核心词汇.json",
    length: 1291,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ecdhp",
    name: "POWER UP 预备级",
    description: "根据剑桥等级考试官方教材编写，适合6-12岁的学生，可用于备考YLE、KET、PET",
    category: "国际版",
    tags: [
      "POWER_UP"
    ],
    url: "/dicts/sunshuo/POWER_UP_预备级.json",
    length: 121,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rieca",
    name: "POWER UP 第一册",
    description: "根据剑桥等级考试官方教材编写，适合6-12岁的学生，可用于备考YLE、KET、PET",
    category: "国际版",
    tags: [
      "POWER_UP"
    ],
    url: "/dicts/sunshuo/POWER_UP_第一册.json",
    length: 245,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iwzxx",
    name: "POWER UP 第二册",
    description: "根据剑桥等级考试官方教材编写，适合6-12岁的学生，可用于备考YLE、KET、PET",
    category: "国际版",
    tags: [
      "POWER_UP"
    ],
    url: "/dicts/sunshuo/POWER_UP_第二册.json",
    length: 284,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "fyvua",
    name: "POWER UP 第三册",
    description: "根据剑桥等级考试官方教材编写，适合6-12岁的学生，可用于备考YLE、KET、PET",
    category: "国际版",
    tags: [
      "POWER_UP"
    ],
    url: "/dicts/sunshuo/POWER_UP_第三册.json",
    length: 288,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zteou",
    name: "POWER UP 第四册",
    description: "根据剑桥等级考试官方教材编写，适合6-12岁的学生，可用于备考YLE、KET、PET",
    category: "国际版",
    tags: [
      "POWER_UP"
    ],
    url: "/dicts/sunshuo/POWER_UP_第四册.json",
    length: 310,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kudce",
    name: "POWER UP 第五册",
    description: "根据剑桥等级考试官方教材编写，适合6-12岁的学生，可用于备考YLE、KET、PET",
    category: "国际版",
    tags: [
      "POWER_UP"
    ],
    url: "/dicts/sunshuo/POWER_UP_第五册.json",
    length: 212,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wmqbu",
    name: "POWER UP 第六册",
    description: "根据剑桥等级考试官方教材编写，适合6-12岁的学生，可用于备考YLE、KET、PET",
    category: "国际版",
    tags: [
      "POWER_UP"
    ],
    url: "/dicts/sunshuo/POWER_UP_第六册.json",
    length: 253,
    language: "en",
    languageCategory: "en"
  },

  {
    id: "bvtmpx",
    name: "培生PEIC Firstwords一级",
    description: "根据《培生PEIC》 Firstwords一级词表编写，适合培生英语国际证书A1级别",
    category: "其他版本",
    tags: [
      "培生PEIC"
    ],
    url: "/dicts/sunshuo/培生PEIC_Firstwords一级.json",
    length: 517,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qubbz",
    name: "培生PEIC Springboard二级",
    description: "根据《培生PEIC》Springboard二级词表编写",
    category: "其他版本",
    tags: [
      "培生PEIC"
    ],
    url: "/dicts/sunshuo/培生PEIC_Springboard二级.json",
    length: 935,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mlyyq",
    name: "培生PEIC Quickmarch三级",
    description: "根据《培生PEIC》Quickmarch三级词表编写",
    category: "其他版本",
    tags: [
      "培生PEIC"
    ],
    url: "/dicts/sunshuo/培生PEIC_Quickmarch三级.json",
    length: 1183,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wjjie",
    name: "培生PEIC Breakthrough四级",
    description: "根据《培生PEIC》 Breakthrough四级词表编写",
    category: "其他版本",
    tags: [
      "培生PEIC"
    ],
    url: "/dicts/sunshuo/培生PEIC_Breakthrough四级.json",
    length: 1520,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qrtyl",
    name: "苏教版译林三年级上(新版)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林三年级上_新版_.json",
    length: 127,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "sgbyq",
    name: "苏教版译林三年级下(新版)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林三年级下_新版_.json",
    length: 134,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wsofl",
    name: "苏教版译林四年级上(新版)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林四年级上_新版_.json",
    length: 153,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ojxcc",
    name: "苏教版译林四年级下(新版)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林四年级下_新版_.json",
    length: 131,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "buskg",
    name: "苏教版译林一年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林一年级_上_.json",
    length: 68,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcqzex",
    name: "苏教版译林一年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林一年级_下_.json",
    length: 68,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wdmwg",
    name: "苏教版译林二年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林二年级_上_.json",
    length: 75,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "svrgx",
    name: "苏教版译林二年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林二年级_下_.json",
    length: 68,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsreic",
    name: "苏教版译林三年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林三年级_上_.json",
    length: 72,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vttmg",
    name: "苏教版译林三年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林三年级_下_.json",
    length: 102,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "whspn",
    name: "苏教版译林四年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林四年级_上_.json",
    length: 121,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zxaps",
    name: "苏教版译林四年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林四年级_下_.json",
    length: 118,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btiewl",
    name: "苏教版译林五年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林五年级_上_.json",
    length: 146,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kmkie",
    name: "苏教版译林五年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林五年级_下_.json",
    length: 153,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "audkl",
    name: "苏教版译林六年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林六年级_上_.json",
    length: 164,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbeyrp",
    name: "苏教版译林六年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "苏教版译林"
    ],
    url: "/dicts/sunshuo/苏教版译林六年级_下_.json",
    length: 117,
    language: "en",
    languageCategory: "en"
  },

  {
    id: "sjpvl",
    name: "新交际一年级词汇(上)",
    description: "根据24新版教材编写",
    category: "外研",
    tags: [
      "外研社·新交际"
    ],
    url: "/dicts/sunshuo/外研社_新交际一年级词汇_上_.json",
    length: 77,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsbqwl",
    name: "新交际一年级词汇(下)",
    description: "根据24新版教材编写",
    category: "外研",
    tags: [
      "外研社·新交际"
    ],
    url: "/dicts/sunshuo/外研社_新交际一年级词汇_下_.json",
    length: 98,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hcfns",
    name: "新交际二年级词汇(上)",
    description: "根据24新版教材编写",
    category: "外研",
    tags: [
      "外研社·新交际"
    ],
    url: "/dicts/sunshuo/外研社_新交际二年级词汇_上_.json",
    length: 60,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vqoqi",
    name: "新交际二年级词汇(下)",
    description: "根据24新版教材编写",
    category: "外研",
    tags: [
      "外研社·新交际"
    ],
    url: "/dicts/sunshuo/外研社_新交际二年级词汇_下_.json",
    length: 60,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kpgwq",
    name: "新启航一年级词汇(上)",
    description: "根据24新版教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_新启航一年级词汇_上_.json",
    length: 72,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jmevz",
    name: "新启航一年级词汇(下)",
    description: "根据24新版教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_新启航一年级词汇_下_.json",
    length: 84,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ilktl",
    name: "三年级起点·外研社三年级上(新版)",
    description: "根据24新版教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/三年级起点_外研社三年级上_新版_.json",
    length: 208,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "faxca",
    name: "三年级起点·外研社三年级下(新版)",
    description: "根据24新版教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/三年级起点_外研社三年级下_新版_.json",
    length: 198,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "arbnn",
    name: "三年级起点·外研社四年级上(新版)",
    description: "根据新版教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/三年级起点_外研社四年级上_新版_.json",
    length: 161,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qbbzx",
    name: "三年级起点·外研社四年级下(新版)",
    description: "根据新版教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/三年级起点_外研社四年级下_新版_.json",
    length: 139,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qszcc",
    name: "一年级起点一年级词汇(上)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点一年级词汇_上_.json",
    length: 128,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "eojoq",
    name: "一年级起点一年级词汇(下)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点一年级词汇_下_.json",
    length: 110,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mkchz",
    name: "一年级起点二年级词汇(上)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点二年级词汇_上_.json",
    length: 112,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brzxqn",
    name: "一年级起点二年级词汇(下)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点二年级词汇_下_.json",
    length: 107,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ueaxa",
    name: "一年级起点三年级词汇(上)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点三年级词汇_上_.json",
    length: 78,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jrvee",
    name: "一年级起点三年级词汇(下)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点三年级词汇_下_.json",
    length: 97,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wiytl",
    name: "一年级起点四年级词汇(上)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点四年级词汇_上_.json",
    length: 105,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcvils",
    name: "一年级起点四年级词汇(下)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点四年级词汇_下_.json",
    length: 78,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hgzdl",
    name: "一年级起点五年级词汇(上)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点五年级词汇_上_.json",
    length: 79,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "gfxxi",
    name: "一年级起点五年级词汇(下)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点五年级词汇_下_.json",
    length: 69,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "oyabp",
    name: "一年级起点六年级词汇(上)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点六年级词汇_上_.json",
    length: 58,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "buavuc",
    name: "一年级起点六年级词汇(下)",
    description: "根据教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研社_一年级起点六年级词汇_下_.json",
    length: 88,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kmnun",
    name: "外研版·三年级起点三年级词汇(上)",
    description: "根据外研社教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研版_三年级起点三年级词汇_上_.json",
    length: 132,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lqmbl",
    name: "外研版·三年级起点三年级词汇(下)",
    description: "根据外研社教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研版_三年级起点三年级词汇_下_.json",
    length: 154,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rtmwg",
    name: "外研版·三年级起点四年级词汇(上)",
    description: "根据外研社教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研版_三年级起点四年级词汇_上_.json",
    length: 144,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "elhtz",
    name: "外研版·三年级起点四年级词汇(下)",
    description: "根据外研社教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研版_三年级起点四年级词汇_下_.json",
    length: 131,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcsgqe",
    name: "外研版·三年级起点五年级词汇(上)",
    description: "根据外研社教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研版_三年级起点五年级词汇_上_.json",
    length: 148,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "oohes",
    name: "外研版·三年级起点五年级词汇(下)",
    description: "根据外研社教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研版_三年级起点五年级词汇_下_.json",
    length: 144,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbvgyu",
    name: "外研版·三年级起点六年级词汇(上)",
    description: "根据外研社教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研版_三年级起点六年级词汇_上_.json",
    length: 102,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbdboq",
    name: "外研版·三年级起点六年级词汇(下)",
    description: "根据外研社教材编写",
    category: "外研",
    tags: [
      "外研社版"
    ],
    url: "/dicts/sunshuo/外研版_三年级起点六年级词汇_下_.json",
    length: 104,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xlznx",
    name: "一年级起点·沪教版一年级上(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/一年级起点_沪教版一年级上_新版_.json",
    length: 59,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "fovan",
    name: "一年级起点·沪教版一年级下(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/一年级起点_沪教版一年级下_新版_.json",
    length: 63,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "deqpn",
    name: "一年级起点·沪教版二年级上(新版)",
    description: "根据新版教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/一年级起点_沪教版二年级上_新版_.json",
    length: 43,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcsven",
    name: "一年级起点·沪教版二年级下(新版)",
    description: "根据新版教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/一年级起点_沪教版二年级下_新版_.json",
    length: 42,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "babhes",
    name: "沪教版·三年级起点 三年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/沪教版_三年级起点_三年级_上_.json",
    length: 106,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsyubg",
    name: "沪教版·三年级起点 三年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/沪教版_三年级起点_三年级_下_.json",
    length: 113,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "nvihq",
    name: "沪教版·三年级起点 四年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/沪教版_三年级起点_四年级_上_.json",
    length: 139,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xhvse",
    name: "沪教版·三年级起点 四年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/沪教版_三年级起点_四年级_下_.json",
    length: 151,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "fnwnn",
    name: "沪教版·三年级起点 五年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/沪教版_三年级起点_五年级_上_.json",
    length: 163,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rrcvz",
    name: "沪教版·三年级起点 五年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/沪教版_三年级起点_五年级_下_.json",
    length: 160,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkupkp",
    name: "沪教版·三年级起点 六年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/沪教版_三年级起点_六年级_上_.json",
    length: 134,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xrifg",
    name: "沪教版·三年级起点 六年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "沪教版"
    ],
    url: "/dicts/sunshuo/沪教版_三年级起点_六年级_下_.json",
    length: 137,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wogyg",
    name: "沪教牛津三年级上(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/沪教牛津三年级上_新版_.json",
    length: 154,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ufyru",
    name: "沪教牛津三年级下(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/沪教牛津三年级下_新版_.json",
    length: 215,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lwmjq",
    name: "沪教牛津四年级上(新版)",
    description: "根据新版教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/沪教牛津四年级上_新版_.json",
    length: 146,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mtsyp",
    name: "沪教牛津四年级下(新版)",
    description: "根据新版教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/沪教牛津四年级下_新版_.json",
    length: 158,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xghkl",
    name: "上海版牛津(试用本)一年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_一年级词汇_上_.json",
    length: 50,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkusps",
    name: "上海版牛津(试用本)一年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_一年级词汇_下_.json",
    length: 47,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bjqhl",
    name: "上海版牛津(试用本)二年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_二年级词汇_上_.json",
    length: 43,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "upmtq",
    name: "上海版牛津(试用本)二年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_二年级词汇_下_.json",
    length: 54,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "eclqs",
    name: "上海版牛津(试用本)三年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_三年级词汇_上_.json",
    length: 81,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ihzkg",
    name: "上海版牛津(试用本)三年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_三年级词汇_下_.json",
    length: 62,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wdben",
    name: "上海版牛津(试用本)四年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_四年级词汇_上_.json",
    length: 109,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcqcju",
    name: "上海版牛津(试用本)四年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_四年级词汇_下_.json",
    length: 85,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mrdne",
    name: "上海版牛津(试用本)五年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_五年级词汇_上_.json",
    length: 87,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "broayp",
    name: "上海版牛津(试用本)五年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津_试用本_五年级词汇_下_.json",
    length: 106,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wuanc",
    name: "上海版牛津一年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津一年级词汇_上_.json",
    length: 49,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bvwvyq",
    name: "上海版牛津一年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津一年级词汇_下_.json",
    length: 48,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rdzdq",
    name: "上海版牛津二年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津二年级词汇_上_.json",
    length: 45,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "gqjhg",
    name: "上海版牛津二年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津二年级词汇_下_.json",
    length: 51,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "nikcn",
    name: "上海版牛津三年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津三年级词汇_上_.json",
    length: 136,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btvxou",
    name: "上海版牛津三年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津三年级词汇_下_.json",
    length: 88,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bazctp",
    name: "上海版牛津四年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津四年级词汇_上_.json",
    length: 117,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bszzze",
    name: "上海版牛津四年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津四年级词汇_下_.json",
    length: 117,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "veruc",
    name: "上海版牛津五年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津五年级词汇_上_.json",
    length: 156,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "yoyxs",
    name: "上海版牛津五年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津五年级词汇_下_.json",
    length: 83,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bnsnc",
    name: "上海版牛津六年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津六年级词汇_上_.json",
    length: 200,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "grqei",
    name: "上海版牛津六年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津六年级词汇_下_.json",
    length: 262,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kpedq",
    name: "上海版牛津英语1-3年级词汇",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津英语1_3年级词汇.json",
    length: 373,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "gssku",
    name: "上海版牛津英语4-5年级词汇",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "上海版牛津"
    ],
    url: "/dicts/sunshuo/上海版牛津英语4_5年级词汇.json",
    length: 392,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rdlge",
    name: "Join In 剑桥英语三年级上(新版)",
    description: "根据外研社24新版Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语三年级上_新版_.json",
    length: 269,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vjnzs",
    name: "Join In 剑桥英语三年级下(新版)",
    description: "根据外研社24新版Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语三年级下_新版_.json",
    length: 226,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "owyoq",
    name: "Join In 剑桥英语四年级上(新版)",
    description: "根据新版教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语四年级上_新版_.json",
    length: 228,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsrkxe",
    name: "Join In 剑桥英语四年级下(新版)",
    description: "根据新版教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语四年级下_新版_.json",
    length: 112,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "uxvyl",
    name: "Join In 剑桥英语三年级词汇(上)",
    description: "根据外研社Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语三年级词汇_上_.json",
    length: 195,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ijpgs",
    name: "Join In 剑桥英语三年级词汇(下)",
    description: "根据外研社Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语三年级词汇_下_.json",
    length: 139,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "weiue",
    name: "Join In 剑桥英语四年级词汇(上)",
    description: "根据外研社Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语四年级词汇_上_.json",
    length: 229,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcstmp",
    name: "Join In 剑桥英语四年级词汇(下)",
    description: "根据外研社Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语四年级词汇_下_.json",
    length: 133,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brphrg",
    name: "Join In 剑桥英语五年级词汇(上)",
    description: "根据外研社Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语五年级词汇_上_.json",
    length: 175,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "scxop",
    name: "Join In 剑桥英语五年级词汇(下)",
    description: "根据外研社Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语五年级词汇_下_.json",
    length: 163,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "gyhzc",
    name: "Join In 剑桥英语六年级词汇(上)",
    description: "根据外研社Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语六年级词汇_上_.json",
    length: 176,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "oovqi",
    name: "Join In 剑桥英语六年级词汇(下)",
    description: "根据外研社Join In教材编写",
    category: "国际版",
    tags: [
      "Join_In版"
    ],
    url: "/dicts/sunshuo/Join_In_剑桥英语六年级词汇_下_.json",
    length: 122,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "dlmtz",
    name: "北京版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京版三年级上_新版_.json",
    length: 165,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zldpi",
    name: "北京版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京版三年级下_新版_.json",
    length: 146,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zioux",
    name: "北京版四年级上(新版)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京版四年级上_新版_.json",
    length: 135,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "aswlx",
    name: "北京版四年级下(新版)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京版四年级下_新版_.json",
    length: 128,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bnbwu",
    name: "北京课改版一年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版一年级词汇_上_.json",
    length: 47,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "dfcea",
    name: "北京课改版一年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版一年级词汇_下_.json",
    length: 52,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lxzsx",
    name: "北京课改版二年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版二年级词汇_上_.json",
    length: 78,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqjjkl",
    name: "北京课改版二年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版二年级词汇_下_.json",
    length: 79,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ubkgi",
    name: "北京课改版三年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版三年级词汇_上_.json",
    length: 98,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqfzxx",
    name: "北京课改版三年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版三年级词汇_下_.json",
    length: 66,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqbjru",
    name: "北京课改版四年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版四年级词汇_上_.json",
    length: 66,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mxvae",
    name: "北京课改版四年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版四年级词汇_下_.json",
    length: 61,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "pcaus",
    name: "北京课改版五年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版五年级词汇_上_.json",
    length: 69,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "sdvwu",
    name: "北京课改版五年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版五年级词汇_下_.json",
    length: 64,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "fsjyz",
    name: "北京课改版六年级词汇(上)",
    description: "北京课改版六年级词汇（上）",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版六年级词汇_上_.json",
    length: 68,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zqbxn",
    name: "北京课改版六年级词汇(下)",
    description: "北京课改版六年级词汇（下）",
    category: "小学英语",
    tags: [
      "北京版"
    ],
    url: "/dicts/sunshuo/北京课改版六年级词汇_下_.json",
    length: 71,
    language: "en",
    languageCategory: "en"
  },

  {
    id: "djbzx",
    name: "粤人版三年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "粤人版"
    ],
    url: "/dicts/sunshuo/粤人版三年级词汇_上_.json",
    length: 112,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lemru",
    name: "粤人版三年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "粤人版"
    ],
    url: "/dicts/sunshuo/粤人版三年级词汇_下_.json",
    length: 81,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brrzca",
    name: "粤人版四年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "粤人版"
    ],
    url: "/dicts/sunshuo/粤人版四年级词汇_上_.json",
    length: 92,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "utqfp",
    name: "粤人版四年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "粤人版"
    ],
    url: "/dicts/sunshuo/粤人版四年级词汇_下_.json",
    length: 70,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iplac",
    name: "粤人版五年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "粤人版"
    ],
    url: "/dicts/sunshuo/粤人版五年级词汇_上_.json",
    length: 78,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wkdli",
    name: "粤人版五年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "粤人版"
    ],
    url: "/dicts/sunshuo/粤人版五年级词汇_下_.json",
    length: 68,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bvdawz",
    name: "粤人版六年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "粤人版"
    ],
    url: "/dicts/sunshuo/粤人版六年级词汇_上_.json",
    length: 88,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rhmyz",
    name: "粤人版六年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "粤人版"
    ],
    url: "/dicts/sunshuo/粤人版六年级词汇_下_.json",
    length: 103,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vshwp",
    name: "三年级起点·冀教版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/三年级起点_冀教版三年级上_新版_.json",
    length: 92,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ewxac",
    name: "三年级起点·冀教版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/三年级起点_冀教版三年级下_新版_.json",
    length: 92,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqwtlx",
    name: "冀教版·三年级起点四年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点四年级上_新版_.json",
    length: 91,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcwmgx",
    name: "冀教版·三年级起点四年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点四年级下_新版_.json",
    length: 92,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsabjz",
    name: "冀教版·三年级起点三年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点三年级_上_.json",
    length: 74,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vbnou",
    name: "冀教版·三年级起点三年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点三年级_下_.json",
    length: 76,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jldza",
    name: "冀教版·三年级起点四年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点四年级_上_.json",
    length: 77,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kbydg",
    name: "冀教版·三年级起点四年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点四年级_下_.json",
    length: 81,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbliix",
    name: "冀教版·三年级起点五年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点五年级_上_.json",
    length: 79,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xurqx",
    name: "冀教版·三年级起点五年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点五年级_下_.json",
    length: 89,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcwlvl",
    name: "冀教版·三年级起点六年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点六年级_上_.json",
    length: 66,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bccxx",
    name: "冀教版·三年级起点六年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_三年级起点六年级_下_.json",
    length: 51,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zdyrg",
    name: "冀教版·一年级起点一年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点一年级_上_.json",
    length: 148,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "swhes",
    name: "冀教版·一年级起点一年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点一年级_下_.json",
    length: 99,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "gjsii",
    name: "冀教版·一年级起点二年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点二年级_上_.json",
    length: 47,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "oepkp",
    name: "冀教版·一年级起点二年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点二年级_下_.json",
    length: 46,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "burfpc",
    name: "冀教版·一年级起点三年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点三年级_上_.json",
    length: 106,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jugqe",
    name: "冀教版·一年级起点三年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点三年级_下_.json",
    length: 124,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "awoui",
    name: "冀教版·一年级起点四年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点四年级_上_.json",
    length: 146,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hpqdl",
    name: "冀教版·一年级起点四年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点四年级_下_.json",
    length: 146,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "pknsa",
    name: "冀教版·一年级起点五年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点五年级_上_.json",
    length: 125,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsmqsi",
    name: "冀教版·一年级起点五年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点五年级_下_.json",
    length: 116,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "cazcc",
    name: "冀教版·一年级起点六年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点六年级_上_.json",
    length: 124,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ytchz",
    name: "冀教版·一年级起点六年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "冀教版"
    ],
    url: "/dicts/sunshuo/冀教版_一年级起点六年级_下_.json",
    length: 114,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bvdvhu",
    name: "接力版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版三年级上_新版_.json",
    length: 111,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iiddu",
    name: "接力版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版三年级下_新版_.json",
    length: 125,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bokie",
    name: "接力版四年级上(新版)",
    description: "根据新版教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版四年级上_新版_.json",
    length: 103,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "dywfl",
    name: "接力版词汇三年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版词汇三年级_上_.json",
    length: 60,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lnjua",
    name: "接力版词汇三年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版词汇三年级_下_.json",
    length: 92,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zucku",
    name: "接力版词汇四年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版词汇四年级_上_.json",
    length: 134,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqgule",
    name: "接力版词汇四年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版词汇四年级_下_.json",
    length: 102,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "blwwpa",
    name: "接力版词汇五年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版词汇五年级_上_.json",
    length: 105,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "aqxwl",
    name: "接力版词汇五年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版词汇五年级_下_.json",
    length: 73,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "thxic",
    name: "接力版词汇六年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版词汇六年级_上_.json",
    length: 59,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iuirq",
    name: "接力版词汇六年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "接力版"
    ],
    url: "/dicts/sunshuo/接力版词汇六年级_下_.json",
    length: 44,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ettbl",
    name: "三年级起点·科普版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/三年级起点_科普版三年级上_新版_.json",
    length: 153,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkolnc",
    name: "三年级起点·科普版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/三年级起点_科普版三年级下_新版_.json",
    length: 134,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zuduc",
    name: "三年级起点·科普版四年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/三年级起点_科普版四年级上_新版_.json",
    length: 134,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jlfvu",
    name: "三年级起点·科普版四年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/三年级起点_科普版四年级下_新版_.json",
    length: 146,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wqvoz",
    name: "科普版·三年级起点三年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/科普版_三年级起点三年级_上_.json",
    length: 82,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bvmpzn",
    name: "科普版·三年级起点三年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/科普版_三年级起点三年级_下_.json",
    length: 88,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rwjen",
    name: "科普版·三年级起点四年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/科普版_三年级起点四年级_上_.json",
    length: 80,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "fjuju",
    name: "科普版·三年级起点四年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/科普版_三年级起点四年级_下_.json",
    length: 111,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "nexkg",
    name: "科普版·三年级起点五年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/科普版_三年级起点五年级_上_.json",
    length: 117,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btrhpx",
    name: "科普版·三年级起点五年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/科普版_三年级起点五年级_下_.json",
    length: 116,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zmhes",
    name: "科普版·三年级起点六年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/科普版_三年级起点六年级_上_.json",
    length: 94,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kvvse",
    name: "科普版·三年级起点六年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "科普版"
    ],
    url: "/dicts/sunshuo/科普版_三年级起点六年级_下_.json",
    length: 80,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ctcqs",
    name: "天津新蕾版一年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "新蕾版"
    ],
    url: "/dicts/sunshuo/天津新蕾版一年级_上_.json",
    length: 43,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bapwui",
    name: "天津新蕾版一年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "新蕾版"
    ],
    url: "/dicts/sunshuo/天津新蕾版一年级_下_.json",
    length: 37,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ykiyp",
    name: "天津新蕾版二年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "新蕾版"
    ],
    url: "/dicts/sunshuo/天津新蕾版二年级_上_.json",
    length: 34,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkdtgc",
    name: "天津新蕾版二年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "新蕾版"
    ],
    url: "/dicts/sunshuo/天津新蕾版二年级_下_.json",
    length: 30,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "esrtz",
    name: "湘鲁版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版三年级上_新版_.json",
    length: 122,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btlnbg",
    name: "湘鲁版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版三年级下_新版_.json",
    length: 123,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brbvzi",
    name: "湘鲁版四年级上(新版)",
    description: "根据新版教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版四年级上_新版_.json",
    length: 147,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ipvfq",
    name: "湘鲁版四年级下(新版)",
    description: "根据新版教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版四年级下_新版_.json",
    length: 165,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbxpkp",
    name: "湘鲁版三年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版三年级词汇_上_.json",
    length: 95,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "adlgs",
    name: "湘鲁版三年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版三年级词汇_下_.json",
    length: 61,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "syihq",
    name: "湘鲁版四年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版四年级词汇_上_.json",
    length: 86,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hbubg",
    name: "湘鲁版四年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版四年级词汇_下_.json",
    length: 106,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "dqzai",
    name: "湘鲁版五年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版五年级词汇_上_.json",
    length: 157,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ogwnn",
    name: "湘鲁版五年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版五年级词汇_下_.json",
    length: 131,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "butgyu",
    name: "湘鲁版六年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版六年级词汇_上_.json",
    length: 122,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qlvdu",
    name: "湘鲁版六年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘鲁版"
    ],
    url: "/dicts/sunshuo/湘鲁版六年级词汇_下_.json",
    length: 134,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wpeia",
    name: "五四学制·鲁科版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/五四学制_鲁科版三年级上_新版_.json",
    length: 185,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jsica",
    name: "五四学制·鲁科版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/五四学制_鲁科版三年级下_新版_.json",
    length: 135,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "haytl",
    name: "五四学制·鲁科版四年级上(新版)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/五四学制_鲁科版四年级上_新版_.json",
    length: 134,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "sctua",
    name: "五四学制·鲁科版四年级下(新版)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/五四学制_鲁科版四年级下_新版_.json",
    length: 112,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hzacx",
    name: "鲁科版五四学制三年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/鲁科版五四学制三年级_上_.json",
    length: 108,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bugxia",
    name: "鲁科版五四学制三年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/鲁科版五四学制三年级_下_.json",
    length: 104,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rbqaa",
    name: "鲁科版五四学制四年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/鲁科版五四学制四年级_上_.json",
    length: 101,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "flkse",
    name: "鲁科版五四学制四年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/鲁科版五四学制四年级_下_.json",
    length: 92,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "edpia",
    name: "鲁科版五四学制五年级(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/鲁科版五四学制五年级_上_.json",
    length: 140,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mpicx",
    name: "鲁科版五四学制五年级(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "鲁科版"
    ],
    url: "/dicts/sunshuo/鲁科版五四学制五年级_下_.json",
    length: 136,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "pnuyp",
    name: "川教版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版三年级上_新版_.json",
    length: 166,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kdola",
    name: "川教版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版三年级下_新版_.json",
    length: 173,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iwjui",
    name: "川教版四年级上(新版)",
    description: "根据新版教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版四年级上_新版_.json",
    length: 165,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bspjes",
    name: "川教版三年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版三年级词汇_上_.json",
    length: 115,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vxlvz",
    name: "川教版三年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版三年级词汇_下_.json",
    length: 131,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jjynn",
    name: "川教版四年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版四年级词汇_上_.json",
    length: 92,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xfahq",
    name: "川教版四年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版四年级词汇_下_.json",
    length: 81,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkscbg",
    name: "川教版五年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版五年级词汇_上_.json",
    length: 86,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "britol",
    name: "川教版五年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版五年级词汇_下_.json",
    length: 77,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bhumq",
    name: "川教版六年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版六年级词汇_上_.json",
    length: 82,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "euowg",
    name: "川教版六年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "川教版"
    ],
    url: "/dicts/sunshuo/川教版六年级词汇_下_.json",
    length: 113,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kptss",
    name: "陕旅版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版三年级上_新版_.json",
    length: 140,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ncxmq",
    name: "陕旅版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版三年级下_新版_.json",
    length: 99,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brtvpx",
    name: "陕旅版四年级上(新版)",
    description: "根据新版教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版四年级上_新版_.json",
    length: 139,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brzohu",
    name: "陕旅版四年级下(新版)",
    description: "根据新版教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版四年级下_新版_.json",
    length: 129,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mbhan",
    name: "陕旅版三年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版三年级词汇_上_.json",
    length: 109,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brmstu",
    name: "陕旅版三年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版三年级词汇_下_.json",
    length: 95,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "unpze",
    name: "陕旅版四年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版四年级词汇_上_.json",
    length: 93,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iffhp",
    name: "陕旅版四年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版四年级词汇_下_.json",
    length: 109,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wytcs",
    name: "陕旅版五年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版五年级词汇_上_.json",
    length: 91,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcanni",
    name: "陕旅版五年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版五年级词汇_下_.json",
    length: 128,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "sshpi",
    name: "陕旅版六年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版六年级词汇_上_.json",
    length: 98,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ujxai",
    name: "陕旅版六年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "陕旅版"
    ],
    url: "/dicts/sunshuo/陕旅版六年级词汇_下_.json",
    length: 93,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "promg",
    name: "闽教版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版三年级上_新版_.json",
    length: 179,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ozxpe",
    name: "闽教版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版三年级下_新版_.json",
    length: 135,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsggpn",
    name: "闽教版四年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版四年级上_新版_.json",
    length: 110,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "chooz",
    name: "闽教版四年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版四年级下_新版_.json",
    length: 99,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "gpsdz",
    name: "闽教版三年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版三年级词汇_上_.json",
    length: 123,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jchtz",
    name: "闽教版三年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版三年级词汇_下_.json",
    length: 82,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "okpsc",
    name: "闽教版四年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版四年级词汇_上_.json",
    length: 94,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btzfkq",
    name: "闽教版四年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版四年级词汇_下_.json",
    length: 88,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "cetgx",
    name: "闽教版五年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版五年级词汇_上_.json",
    length: 93,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbrobl",
    name: "闽教版五年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版五年级词汇_下_.json",
    length: 98,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xsuxc",
    name: "闽教版六年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版六年级词汇_上_.json",
    length: 101,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "yigna",
    name: "闽教版六年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "闽教版"
    ],
    url: "/dicts/sunshuo/闽教版六年级词汇_下_.json",
    length: 72,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "gcbli",
    name: "辽师大版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版三年级上_新版_.json",
    length: 112,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "egnaa",
    name: "辽师大版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版三年级下_新版_.json",
    length: 104,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "uuzqs",
    name: "辽师大版四年级上(新版)",
    description: "根据新版教材编写",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版四年级上_新版_.json",
    length: 131,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "snvui",
    name: "辽师大版四年级下(新版)",
    description: "根据新版教材编写",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版四年级下_新版_.json",
    length: 110,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbjgdq",
    name: "辽师大版三年级词汇(上)",
    description: "根据教材编写，单词乱序排列",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版三年级词汇_上_.json",
    length: 55,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "tbvux",
    name: "辽师大版三年级词汇(下)",
    description: "根据教材编写，单词乱序排列",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版三年级词汇_下_.json",
    length: 64,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcoofq",
    name: "辽师大版四年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版四年级词汇_上_.json",
    length: 70,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kxwpc",
    name: "辽师大版四年级词汇(下)",
    description: "根据教材编写，单词乱序排列",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版四年级词汇_下_.json",
    length: 101,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hlpml",
    name: "辽师大版五年级词汇(上)",
    description: "根据教材编写，单词乱序排列",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版五年级词汇_上_.json",
    length: 109,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "pthga",
    name: "辽师大版五年级词汇(下)",
    description: "根据教材编写，单词乱序排列",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版五年级词汇_下_.json",
    length: 96,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "buwtae",
    name: "辽师大版六年级词汇(上)",
    description: "根据教材编写，单词乱序排列",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版六年级词汇_上_.json",
    length: 95,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qdxqe",
    name: "辽师大版六年级词汇(下)",
    description: "根据教材编写，单词乱序排列",
    category: "小学英语",
    tags: [
      "辽师大版"
    ],
    url: "/dicts/sunshuo/辽师大版六年级词汇_下_.json",
    length: 51,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "orlfp",
    name: "湘少版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版三年级上_新版_.json",
    length: 117,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "pjuqn",
    name: "湘少版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版三年级下_新版_.json",
    length: 106,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbrizs",
    name: "湘少版四年级上(新版)",
    description: "根据新版教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版四年级上_新版_.json",
    length: 111,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "fqhvp",
    name: "湘少版三年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版三年级词汇_上_.json",
    length: 101,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "miuzs",
    name: "湘少版三年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版三年级词汇_下_.json",
    length: 91,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsvogi",
    name: "湘少版四年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版四年级词汇_上_.json",
    length: 87,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vciln",
    name: "湘少版四年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版四年级词汇_下_.json",
    length: 82,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jztwu",
    name: "湘少版五年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版五年级词汇_上_.json",
    length: 95,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xopjg",
    name: "湘少版五年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版五年级词汇_下_.json",
    length: 103,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcggsx",
    name: "湘少版六年级词汇(上)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版六年级词汇_上_.json",
    length: 79,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bweog",
    name: "湘少版六年级词汇(下)",
    description: "根据教材编写",
    category: "不常见版本",
    tags: [
      "湘少版"
    ],
    url: "/dicts/sunshuo/湘少版六年级词汇_下_.json",
    length: 36,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mdbqx",
    name: "剑桥少儿英语预备级A词汇",
    description: "根据教材编写",
    category: "国际版",
    tags: [
      "剑桥少儿英语"
    ],
    url: "/dicts/sunshuo/剑桥少儿英语预备级A词汇.json",
    length: 505,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsqcvl",
    name: "剑桥少儿英语预备级B词汇",
    description: "根据教材编写",
    category: "国际版",
    tags: [
      "剑桥少儿英语"
    ],
    url: "/dicts/sunshuo/剑桥少儿英语预备级B词汇.json",
    length: 231,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vrzei",
    name: "剑桥少儿英语一级词汇",
    description: "根据教材编写",
    category: "国际版",
    tags: [
      "剑桥少儿英语"
    ],
    url: "/dicts/sunshuo/剑桥少儿英语一级词汇.json",
    length: 327,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jnjjz",
    name: "剑桥少儿英语二级词汇",
    description: "根据教材编写",
    category: "国际版",
    tags: [
      "剑桥少儿英语"
    ],
    url: "/dicts/sunshuo/剑桥少儿英语二级词汇.json",
    length: 444,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xcklc",
    name: "剑桥少儿英语三级词汇",
    description: "根据教材编写",
    category: "国际版",
    tags: [
      "剑桥少儿英语"
    ],
    url: "/dicts/sunshuo/剑桥少儿英语三级词汇.json",
    length: 341,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "guzgn",
    name: "教科版EEC三年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "教科版EEC"
    ],
    url: "/dicts/sunshuo/教科版EEC三年级_上_.json",
    length: 169,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "oqqvq",
    name: "教科版EEC三年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "教科版EEC"
    ],
    url: "/dicts/sunshuo/教科版EEC三年级_下_.json",
    length: 124,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btmkmg",
    name: "教科版EEC四年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "教科版EEC"
    ],
    url: "/dicts/sunshuo/教科版EEC四年级_上_.json",
    length: 94,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "cndjl",
    name: "教科版EEC四年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "教科版EEC"
    ],
    url: "/dicts/sunshuo/教科版EEC四年级_下_.json",
    length: 120,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bagbss",
    name: "教科版EEC五年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "教科版EEC"
    ],
    url: "/dicts/sunshuo/教科版EEC五年级_上_.json",
    length: 107,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "yylpe",
    name: "教科版EEC五年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "教科版EEC"
    ],
    url: "/dicts/sunshuo/教科版EEC五年级_下_.json",
    length: 153,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bunsc",
    name: "教科版EEC六年级(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "教科版EEC"
    ],
    url: "/dicts/sunshuo/教科版EEC六年级_上_.json",
    length: 126,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "blaydp",
    name: "教科版EEC六年级(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "教科版EEC"
    ],
    url: "/dicts/sunshuo/教科版EEC六年级_下_.json",
    length: 116,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bufogc",
    name: "清华版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版三年级上_新版_.json",
    length: 176,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bafres",
    name: "清华版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版三年级下_新版_.json",
    length: 164,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ltoce",
    name: "清华版一年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版一年级词汇_上_.json",
    length: 103,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqpeop",
    name: "清华版一年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版一年级词汇_下_.json",
    length: 98,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "txtbq",
    name: "清华版二年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版二年级词汇_上_.json",
    length: 81,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "hjntg",
    name: "清华版二年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版二年级词汇_下_.json",
    length: 78,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "pefxn",
    name: "清华版三年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版三年级词汇_上_.json",
    length: 95,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bvsqfu",
    name: "清华版三年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版三年级词汇_下_.json",
    length: 93,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rcohu",
    name: "清华版四年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版四年级词汇_上_.json",
    length: 90,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "fyfqa",
    name: "清华版四年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版四年级词汇_下_.json",
    length: 94,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vhgsi",
    name: "清华版五年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版五年级词汇_上_.json",
    length: 106,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsgmyl",
    name: "清华版五年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版五年级词汇_下_.json",
    length: 105,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkmdjq",
    name: "清华版六年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版六年级词汇_上_.json",
    length: 114,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "yqnec",
    name: "清华版六年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "清华版"
    ],
    url: "/dicts/sunshuo/清华版六年级词汇_下_.json",
    length: 113,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bvhrgx",
    name: "北师大版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版三年级上_新版_.json",
    length: 101,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "krcvq",
    name: "北师大版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版三年级下_新版_.json",
    length: 103,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "smahz",
    name: "北师大版四年级上(新版)",
    description: "根据新版教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版四年级上_新版_.json",
    length: 131,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbyjpc",
    name: "北师大版四年级下(新版)",
    description: "根据新版教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版四年级下_新版_.json",
    length: 98,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xkgbu",
    name: "北师大版一年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版一年级词汇_上_.json",
    length: 67,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcdrua",
    name: "北师大版一年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版一年级词汇_下_.json",
    length: 64,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "stnac",
    name: "北师大版二年级词汇",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版二年级词汇.json",
    length: 143,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btdken",
    name: "北师大版三年级词汇",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版三年级词汇.json",
    length: 149,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "yjlhl",
    name: "北师大版四年级词汇",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版四年级词汇.json",
    length: 198,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wlvgc",
    name: "北师大版五年级词汇",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版五年级词汇.json",
    length: 188,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bshaqe",
    name: "北师大版六年级词汇",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版六年级词汇.json",
    length: 174,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btgpvz",
    name: "北师大版·三年级起点三年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版_三年级起点三年级词汇_上_.json",
    length: 67,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "chifu",
    name: "北师大版·三年级起点三年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版_三年级起点三年级词汇_下_.json",
    length: 77,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbvuaa",
    name: "北师大版·三年级起点四年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版_三年级起点四年级词汇_上_.json",
    length: 96,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zoeun",
    name: "北师大版·三年级起点四年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版_三年级起点四年级词汇_下_.json",
    length: 98,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zqwlx",
    name: "北师大版·三年级起点五年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版_三年级起点五年级词汇_上_.json",
    length: 90,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "kkryq",
    name: "北师大版·三年级起点五年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版_三年级起点五年级词汇_下_.json",
    length: 79,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "blmgwl",
    name: "北师大版·三年级起点六年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版_三年级起点六年级词汇_上_.json",
    length: 105,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "asobz",
    name: "北师大版·三年级起点六年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "北师大版"
    ],
    url: "/dicts/sunshuo/北师大版_三年级起点六年级词汇_下_.json",
    length: 45,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "yyygc",
    name: "重大版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版三年级上_新版_.json",
    length: 143,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbnwmg",
    name: "重大版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版三年级下_新版_.json",
    length: 111,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "okjfq",
    name: "重大版四年级上(新版)",
    description: "根据新版教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版四年级上_新版_.json",
    length: 118,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qnprl",
    name: "重大版四年级下(新版)",
    description: "根据新版教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版四年级下_新版_.json",
    length: 90,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsjnml",
    name: "重大版三年级词汇(上)",
    description: "重大版三年级词汇（上）",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版三年级词汇_上_.json",
    length: 91,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qwhss",
    name: "重大版三年级词汇(下)",
    description: "根据重大版教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版三年级词汇_下_.json",
    length: 93,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ytopc",
    name: "重大版四年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版四年级词汇_上_.json",
    length: 103,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ejsci",
    name: "重大版四年级词汇(下)",
    description: "根据重大版教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版四年级词汇_下_.json",
    length: 80,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ziuhz",
    name: "重大版五年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版五年级词汇_上_.json",
    length: 86,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "duljp",
    name: "重大版五年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版五年级词汇_下_.json",
    length: 70,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "meodp",
    name: "重大版六年级词汇(上)",
    description: "根据重大版教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版六年级词汇_上_.json",
    length: 68,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lbels",
    name: "重大版六年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "重大版"
    ],
    url: "/dicts/sunshuo/重大版六年级词汇_下_.json",
    length: 105,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkzepe",
    name: "广州教科版三年级上(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版三年级上_新版_.json",
    length: 147,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "azjpx",
    name: "广州教科版三年级下(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版三年级下_新版_.json",
    length: 140,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "khxsa",
    name: "广州教科版四年级上(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版四年级上_新版_.json",
    length: 136,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqffru",
    name: "广州教科版四年级下(新版)",
    description: "根据24新版教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版四年级下_新版_.json",
    length: 134,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "oshae",
    name: "广州教科版三年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版三年级词汇_上_.json",
    length: 199,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bspjbz",
    name: "广州教科版三年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版三年级词汇_下_.json",
    length: 132,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rseix",
    name: "广州教科版四年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版四年级词汇_上_.json",
    length: 169,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "fpqrl",
    name: "广州教科版四年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版四年级词汇_下_.json",
    length: 136,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ahree",
    name: "广州教科版五年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版五年级词汇_上_.json",
    length: 109,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "nkmpa",
    name: "广州教科版五年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版五年级词汇_下_.json",
    length: 135,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "cyouc",
    name: "广州教科版六年级词汇(上)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版六年级词汇_上_.json",
    length: 129,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bltman",
    name: "广州教科版六年级词汇(下)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "广州教科版"
    ],
    url: "/dicts/sunshuo/广州教科版六年级词汇_下_.json",
    length: 144,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ilnmq",
    name: "新世纪版一年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版一年级词汇_上_.json",
    length: 71,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rdpqn",
    name: "新世纪版一年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版一年级词汇_下_.json",
    length: 78,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lbwdp",
    name: "新世纪版二年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版二年级词汇_上_.json",
    length: 82,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bktbyl",
    name: "新世纪版二年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版二年级词汇_下_.json",
    length: 86,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "evvtl",
    name: "新世纪版三年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版三年级词汇_上_.json",
    length: 117,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brmhee",
    name: "新世纪版三年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版三年级词汇_下_.json",
    length: 115,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btdpix",
    name: "新世纪版四年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版四年级词汇_上_.json",
    length: 146,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "cejns",
    name: "新世纪版四年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版四年级词汇_下_.json",
    length: 103,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "blchuc",
    name: "新世纪版五年级词汇(上)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版五年级词汇_上_.json",
    length: 116,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zfjdu",
    name: "新世纪版五年级词汇(下)",
    description: "根据教材编写",
    category: "小学英语",
    tags: [
      "新世纪版"
    ],
    url: "/dicts/sunshuo/新世纪版五年级词汇_下_.json",
    length: 87,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcfrtl",
    name: "粤教沪外版三年级上(新版)",
    description: "根据教材编写(",
    category: "其他版本",
    tags: [
      "粤教沪外版"
    ],
    url: "/dicts/sunshuo/粤教沪外版三年级上_新版_.json",
    length: 153,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbwlsc",
    name: "粤教沪外版三年级下(新版)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "粤教沪外版"
    ],
    url: "/dicts/sunshuo/粤教沪外版三年级下_新版_.json",
    length: 145,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bsfrqi",
    name: "粤教沪外版四年级上(新版)",
    description: "根据教材编写",
    category: "其他版本",
    tags: [
      "粤教沪外版"
    ],
    url: "/dicts/sunshuo/粤教沪外版四年级上_新版_.json",
    length: 138,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ngngs",
    name: "新概念英语词汇1(初阶)",
    description: "词表依照教材顺序。适合零基础用户，配套教材可掌握入门（小学）程度的词汇。",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语词汇1_初阶_.json",
    length: 867,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btteai",
    name: "新概念英语词汇2(实践与进步)",
    description: "根据教材顺序排序",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语词汇2_实践与进步_.json",
    length: 833,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "cvspn",
    name: "新概念英语词汇3(培养技能)",
    description: "根据教材顺序排序",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语词汇3_培养技能_.json",
    length: 1046,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "baxmdu",
    name: "新概念英语词汇4(流利英语)",
    description: "根据教材顺序排序",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语词汇4_流利英语_.json",
    length: 781,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brenpe",
    name: "新概念英语青少版词汇 入门A",
    description: "根据教材词表编写",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇_入门A.json",
    length: 95,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ufhqc",
    name: "新概念英语青少版词汇 入门B",
    description: "根据教材词表编写",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇_入门B.json",
    length: 134,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brtpec",
    name: "新概念英语青少版词汇1A",
    description: "新概念英语青少版1A",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇1A.json",
    length: 377,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ixunx",
    name: "新概念英语青少版词汇2A",
    description: "新概念英语青少版词汇2A",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇2A.json",
    length: 294,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "wmwhu",
    name: "新概念英语青少版词汇2B",
    description: "新概念英语青少版词汇2B",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇2B.json",
    length: 266,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bvehqa",
    name: "新概念英语青少版词汇3A",
    description: "新概念英语青少版词汇3A",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇3A.json",
    length: 308,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rjcsa",
    name: "新概念英语青少版词汇3B",
    description: "新概念英语青少版词汇3B",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇3B.json",
    length: 192,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "krpus",
    name: "新概念英语青少版词汇4A",
    description: "新概念英语青少版4A",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇4A.json",
    length: 517,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbnfli",
    name: "新概念英语青少版词汇4B",
    description: "新概念英语青少版4B",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇4B.json",
    length: 455,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zcsfp",
    name: "新概念英语青少版词汇5A",
    description: "新概念英语青少版词汇5A",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇5A.json",
    length: 361,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "blynac",
    name: "新概念英语青少版词汇5B",
    description: "新概念英语青少版词汇5B",
    category: "小学英语",
    tags: [
      "新概念"
    ],
    url: "/dicts/sunshuo/新概念英语青少版词汇5B.json",
    length: 333,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ixxca",
    name: "基础1000词",
    description: "根据《1000 Basic English Words》编写，适合零基础、备考KET/PET的同学",
    category: "词汇合集",
    tags: [
      "1000词_2000词_4000词"
    ],
    url: "/dicts/sunshuo/基础1000词.json",
    length: 961,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbpgci",
    name: "核心2000词",
    description: "根据《2000 Core English Words》编写，适合初、高中生，以及备考PET/FCE的同学",
    category: "词汇合集",
    tags: [
      "1000词_2000词_4000词"
    ],
    url: "/dicts/sunshuo/核心2000词.json",
    length: 1659,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "gjpbu",
    name: "实用4000词",
    description: "根据《4000 Essential English Words》编写，适合高中水平以上的同学",
    category: "词汇合集",
    tags: [
      "1000词_2000词_4000词"
    ],
    url: "/dicts/sunshuo/实用4000词.json",
    length: 3590,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcyxwq",
    name: "Oxford Discover 第一册",
    description: "根据《Oxford Discover》教师用书编写，适合6-12岁，备考KET/PET等剑桥考试的同学",
    category: "国际版",
    tags: [
      "Oxford_Discover"
    ],
    url: "/dicts/sunshuo/Oxford_Discover_第一册.json",
    length: 336,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "blpic",
    name: "Oxford Discover 第二册",
    description: "根据《Oxford Discover》教师用书编写，适合6-12岁，备考KET/PET等剑桥考试的同学",
    category: "国际版",
    tags: [
      "Oxford_Discover"
    ],
    url: "/dicts/sunshuo/Oxford_Discover_第二册.json",
    length: 353,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lwtoz",
    name: "Oxford Discover 第三册",
    description: "根据《Oxford Discover》教师用书编写，适合6-12岁，备考KET/PET等剑桥考试的同学",
    category: "国际版",
    tags: [
      "Oxford_Discover"
    ],
    url: "/dicts/sunshuo/Oxford_Discover_第三册.json",
    length: 251,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqinzn",
    name: "Oxford Discover 第四册",
    description: "根据《Oxford Discover》教师用书编写，适合6-12岁，备考KET/PET等剑桥考试的同学",
    category: "国际版",
    tags: [
      "Oxford_Discover"
    ],
    url: "/dicts/sunshuo/Oxford_Discover_第四册.json",
    length: 270,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "tjhua",
    name: "Oxford Discover 第五册",
    description: "根据《Oxford Discover》教师用书编写，适合6-12岁，备考KET/PET等剑桥考试的同学",
    category: "国际版",
    tags: [
      "Oxford_Discover"
    ],
    url: "/dicts/sunshuo/Oxford_Discover_第五册.json",
    length: 322,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iksle",
    name: "Oxford Discover 第六册",
    description: "根据《Oxford Discover》教师用书编写，适合6-12岁，备考KET/PET等剑桥考试的同学",
    category: "国际版",
    tags: [
      "Oxford_Discover"
    ],
    url: "/dicts/sunshuo/Oxford_Discover_第六册.json",
    length: 342,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "irkxs",
    name: "THiNK 预备",
    description: "根据剑桥大学《THiNK》教材编写，适合10岁以上、备考剑桥英语考试的同学",
    category: "国际版",
    tags: [
      "THiNK"
    ],
    url: "/dicts/sunshuo/THiNK_预备.json",
    length: 317,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rnmvp",
    name: "THiNK L1",
    description: "根据剑桥大学《THiNK》教材编写，适合10岁以上、备考剑桥英语考试的同学",
    category: "国际版",
    tags: [
      "THiNK"
    ],
    url: "/dicts/sunshuo/THiNK_L1.json",
    length: 291,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "nybgi",
    name: "THiNK L2",
    description: "根据剑桥大学《THiNK》教材编写，适合10岁以上、备考剑桥英语考试的同学",
    category: "国际版",
    tags: [
      "THiNK"
    ],
    url: "/dicts/sunshuo/THiNK_L2.json",
    length: 280,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "btakbz",
    name: "THiNK L3",
    description: "根据剑桥大学《THiNK》教材编写，适合10岁以上、备考剑桥英语考试的同学",
    category: "国际版",
    tags: [
      "THiNK"
    ],
    url: "/dicts/sunshuo/THiNK_L3.json",
    length: 258,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bamaea",
    name: "THiNK L4",
    description: "根据剑桥大学《THiNK》教材编写，适合10岁以上、备考剑桥英语考试的同学",
    category: "国际版",
    tags: [
      "THiNK"
    ],
    url: "/dicts/sunshuo/THiNK_L4.json",
    length: 318,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bqrerl",
    name: "THiNK L5",
    description: "根据剑桥大学《THiNK》教材编写，适合10岁以上、备考剑桥英语考试的同学",
    category: "国际版",
    tags: [
      "THiNK"
    ],
    url: "/dicts/sunshuo/THiNK_L5.json",
    length: 283,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "nurqx",
    name: "UNLOCK BS",
    description: "根据《UNLOCK》BS词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_BS.json",
    length: 259,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bhxic",
    name: "UNLOCK L1听说",
    description: "根据《UNLOCK》L1听说词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L1听说.json",
    length: 178,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "baabjz",
    name: "UNLOCK L1读写",
    description: "根据《UNLOCK》L1读写词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L1读写.json",
    length: 182,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mqvoz",
    name: "UNLOCK L2听说",
    description: "根据《UNLOCK》L2听说词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L2听说.json",
    length: 176,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "euirq",
    name: "UNLOCK L2读写",
    description: "根据《UNLOCK》L2读写词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L2读写.json",
    length: 155,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "okiyp",
    name: "UNLOCK L3听说",
    description: "根据《UNLOCK》L3听说词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L3听说.json",
    length: 178,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brmpzn",
    name: "UNLOCK L3读写",
    description: "根据《UNLOCK》L3读写词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L3读写.json",
    length: 171,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "tivoq",
    name: "UNLOCK L4听说",
    description: "根据《UNLOCK》L4听说词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L4听说.json",
    length: 144,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iiqhq",
    name: "UNLOCK L4读写",
    description: "根据《UNLOCK》L4读写词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L4读写.json",
    length: 205,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ankns",
    name: "UNLOCK L5听说",
    description: "根据《UNLOCK》L5听说词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L5听说.json",
    length: 247,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "blcpsa",
    name: "UNLOCK L5读写",
    description: "根据《UNLOCK》L5读写词表编写",
    category: "国际版",
    tags: [
      "UNLOCK"
    ],
    url: "/dicts/sunshuo/UNLOCK_L5读写.json",
    length: 270,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "cgngs",
    name: "新思维小学英语 1A",
    description: "根据《新思维小学英语》1A词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_1A.json",
    length: 88,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbteai",
    name: "新思维小学英语 1B",
    description: "根据《新思维小学英语》1B词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_1B.json",
    length: 98,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zbrmp",
    name: "新思维小学英语 2A",
    description: "根据《新思维小学英语》2A词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_2A.json",
    length: 73,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "qfhqc",
    name: "新思维小学英语 2B",
    description: "根据《新思维小学英语》2B词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_2B.json",
    length: 127,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ftsvq",
    name: "新思维小学英语 3A",
    description: "根据《新思维小学英语》3A词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_3A.json",
    length: 197,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "naoyz",
    name: "新思维小学英语 3B",
    description: "根据《新思维小学英语》3B词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_3B.json",
    length: 178,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jenpe",
    name: "新思维小学英语 4A",
    description: "根据《新思维小学英语》4A词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_4A.json",
    length: 218,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcjrss",
    name: "新思维小学英语 4B",
    description: "根据《新思维小学英语》4B词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_4B.json",
    length: 212,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bzbol",
    name: "新思维小学英语 5A",
    description: "根据《新思维小学英语》5A词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_5A.json",
    length: 283,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ebczs",
    name: "新思维小学英语 5B",
    description: "根据《新思维小学英语》5B词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_5B.json",
    length: 266,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "uvkfq",
    name: "新思维小学英语 6A",
    description: "根据《新思维小学英语》6A词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_6A.json",
    length: 288,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ixxjg",
    name: "新思维小学英语 6B",
    description: "根据《新思维小学英语》6B词表编写",
    category: "小学英语",
    tags: [
      "新思维"
    ],
    url: "/dicts/sunshuo/新思维小学英语_6B.json",
    length: 220,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "lgkes",
    name: "RAZ词表--AA",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__AA.json",
    length: 427,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "uvbnn",
    name: "RAZ词表--A",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__A.json",
    length: 495,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rjlcx",
    name: "RAZ词表--B",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__B.json",
    length: 630,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ydktz",
    name: "RAZ词表--C",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__C.json",
    length: 766,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vjefg",
    name: "RAZ词表--D",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__D.json",
    length: 688,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "quxju",
    name: "RAZ词表--E",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__E.json",
    length: 1120,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mmvpx",
    name: "RAZ词表--F",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__F.json",
    length: 1034,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "jtumz",
    name: "RAZ词表--G",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__G.json",
    length: 1342,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zmbzx",
    name: "RAZ词表--H",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__H.json",
    length: 899,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbwzca",
    name: "RAZ词表--I",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__I.json",
    length: 1791,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ukgsi",
    name: "RAZ词表--J",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__J.json",
    length: 1002,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ygris",
    name: "RAZ词表--K",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__K.json",
    length: 509,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "akumq",
    name: "RAZ词表--L",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__L.json",
    length: 995,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zzowg",
    name: "RAZ词表--M",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__M.json",
    length: 555,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bssfkq",
    name: "RAZ词表--N",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__N.json",
    length: 1525,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vutgx",
    name: "RAZ词表--O",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__O.json",
    length: 630,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcerxe",
    name: "RAZ词表--P",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__P.json",
    length: 867,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "boqaa",
    name: "RAZ词表--Q",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__Q.json",
    length: 896,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "clbmp",
    name: "RAZ词表--R",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__R.json",
    length: 1270,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ypzai",
    name: "RAZ词表--S",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__S.json",
    length: 685,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkhjtz",
    name: "RAZ词表--T",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__T.json",
    length: 652,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "fwqps",
    name: "RAZ词表--U",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__U.json",
    length: 677,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "vfryq",
    name: "RAZ词表--V",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__V.json",
    length: 1080,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "xjeun",
    name: "RAZ词表--W",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__W.json",
    length: 722,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brwhpx",
    name: "RAZ词表--X",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__X.json",
    length: 1018,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bcttgc",
    name: "RAZ词表--Y",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__Y.json",
    length: 1146,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "zpeyu",
    name: "RAZ词表--Z",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__Z.json",
    length: 830,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bbdmux",
    name: "RAZ词表--Z1",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__Z1.json",
    length: 1103,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "ojnkp",
    name: "RAZ词表--Z2",
    description: "精选RAZ系列重点词汇",
    category: "词汇合集",
    tags: [
      "RAZ"
    ],
    url: "/dicts/sunshuo/RAZ词表__Z2.json",
    length: 1386,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bblwmg",
    name: "基础阅读核心200词",
    description: "实体书Basic Reading 200 Key Words词汇",
    category: "词汇合集",
    tags: [
      "200_400_800_1200词"
    ],
    url: "/dicts/sunshuo/基础阅读核心200词.json",
    length: 191,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "blwubu",
    name: "基础阅读核心400词",
    description: "实体书Basic Reading 400 Key Words词汇",
    category: "词汇合集",
    tags: [
      "200_400_800_1200词"
    ],
    url: "/dicts/sunshuo/基础阅读核心400词.json",
    length: 239,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "clpac",
    name: "基础阅读核心800词",
    description: "实体书Basic Reading 800 Key Words词汇",
    category: "词汇合集",
    tags: [
      "200_400_800_1200词"
    ],
    url: "/dicts/sunshuo/基础阅读核心800词.json",
    length: 239,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "bkimen",
    name: "基础阅读核心1200词",
    description: "实体书Basic Reading 1200 Key Words词汇",
    category: "词汇合集",
    tags: [
      "200_400_800_1200词"
    ],
    url: "/dicts/sunshuo/基础阅读核心1200词.json",
    length: 284,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "rbxdl",
    name: "Foundations",
    description: "Reading Explorer系列词书",
    category: "Reading_Explorer系列",
    tags: [
      "Reading_Explorer系列"
    ],
    url: "/dicts/sunshuo/Foundations.json",
    length: 192,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "nuvce",
    name: "RE Level 1",
    description: "Reading Explorer系列词书",
    category: "Reading_Explorer系列",
    tags: [
      "Reading_Explorer系列"
    ],
    url: "/dicts/sunshuo/RE_Level_1.json",
    length: 240,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "mqmdg",
    name: "RE Level 2",
    description: "Reading Explorer系列词书",
    category: "Reading_Explorer系列",
    tags: [
      "Reading_Explorer系列"
    ],
    url: "/dicts/sunshuo/RE_Level_2.json",
    length: 239,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "brmzix",
    name: "RE Level 3",
    description: "Reading Explorer系列词书",
    category: "Reading_Explorer系列",
    tags: [
      "Reading_Explorer系列"
    ],
    url: "/dicts/sunshuo/RE_Level_3.json",
    length: 239,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "uorns",
    name: "RE Level 4",
    description: "Reading Explorer系列词书",
    category: "Reading_Explorer系列",
    tags: [
      "Reading_Explorer系列"
    ],
    url: "/dicts/sunshuo/RE_Level_4.json",
    length: 240,
    language: "en",
    languageCategory: "en"
  },
  {
    id: "iglxi",
    name: "RE Level 5",
    description: "Reading Explorer系列词书",
    category: "Reading_Explorer系列",
    tags: [
      "Reading_Explorer系列"
    ],
    url: "/dicts/sunshuo/RE_Level_5.json",
    length: 241,
    language: "en",
    languageCategory: "en"
  }
]

// 中国考试
const chinaExam: DictionaryResource[] = [
  {
    id: 'san1',
    name: '三年级上',
    description: '人教版三年级上册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPXiaoXue3_1_T.json',
    length: 64,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'san2',
    name: '三年级下',
    description: '人教版三年级下册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPXiaoXue3_2_T.json',
    length: 72,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'si1',
    name: '四年级上',
    description: '人教版四年级上册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPXiaoXue4_1_T.json',
    length: 84,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'si2',
    name: '四年级下',
    description: '人教版四年级下册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPXiaoXue4_2_T.json',
    length: 104,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'wu1',
    name: '五年级上',
    description: '人教版五年级上册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPXiaoXue5_1_T.json',
    length: 131,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'wu2',
    name: '五年级下',
    description: '人教版五年级下册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPXiaoXue5_2_T.json',
    length: 156,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'liu1',
    name: '六年级上',
    description: '人教版六年级上册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPXiaoXue6_1_T.json',
    length: 130,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'liu2',
    name: '六年级下',
    description: '人教版六年级下册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPXiaoXue6_2_T.json',
    length: 108,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'qi1',
    name: '七年级上',
    description: '人教版七年级上册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPChuZhong7_1_T.json',
    length: 392,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'qi2',
    name: '七年级下',
    description: '人教版七年级下册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPChuZhong7_2_T.json',
    length: 492,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'ba1',
    name: '八年级上',
    description: '人教版八年级上册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPChuZhong8_1_T.json',
    length: 419,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'ba2',
    name: '八年级下',
    description: '人教版八年级下册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPChuZhong8_2_T.json',
    length: 466,
    language: 'en',
    languageCategory: 'en',
  },
  {
    id: 'jiu',
    name: '九年级',
    description: '人教版九年级全册',
    category: '中国考试',
    tags: ['人教精通版'],
    url: '/dicts/PEPChuZhong9_1_T.json',
    length: 551,
    language: 'en',
    languageCategory: 'en',
  },








  {
    id: 'cet4',
    name: 'CET-4',
    description: '大学英语四级词库',
    category: '中国考试',
    tags: ['大学英语'],
    url: '/dicts/CET4_T.json',
    length: 2607,
    language: 'en',
    languageCategory: 'en',
  }
]



/**
 * Built-in dictionaries in an array.
 * Why arrays? Because it keeps the order across browsers.
 */
export const dictionaryResources: DictionaryResource[] = [
  ...childrenEnglish,
  //...internationalExam,
  //...childrenEnglish,
  //...programming,
  //...japaneseExam,
  //...germanExam,
  //...kazakhHapinDicts,
  //...indonesianDicts,

  // {
  //   id: 'zhtest',
  //   name: '中文测试',
  //   description: '中文测试词库',
  //   category: '测试',
  //   url: '/dicts/chinese_test.json',
  //   length: 27,
  //   language: 'zh',
  // },
  // {
  //   id: 'jptest',
  //   name: '日文测试',
  //   description: '日文测试词库',
  //   category: '测试',
  //   url: '/dicts/japanese_test.json',
  //   length: 20,
  //   language: 'ja',
  // },
]

export const dictionaries: Dictionary[] = dictionaryResources.map((resource) => ({
  ...resource,
  chapterCount: calcChapterCount(resource.length),
}))

/**
 * An object-map from dictionary IDs to dictionary themselves.
 */
export const idDictionaryMap: Record<string, Dictionary> = Object.fromEntries(dictionaries.map((dict) => [dict.id, dict]))
