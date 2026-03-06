const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function initDatabase() {
  try {
    console.log('Initializing database...');
    
    // 检查并创建默认的分类
    const existingCategory = await prisma.category.findFirst({
      where: { name: '默认分类' }
    });
    
    let categoryId;
    if (existingCategory) {
      categoryId = existingCategory.id;
      console.log('Using existing category:', existingCategory.name);
    } else {
      const newCategory = await prisma.category.create({
        data: {
          name: '默认分类',
          describe: '默认分类'
        }
      });
      categoryId = newCategory.id;
      console.log('Created new category:', newCategory.name);
    }
    
    // 检查并创建默认的字典
    const existingDictionary = await prisma.dictionary.findFirst({
      where: { name: '默认字典' }
    });
    
    let dictionaryId;
    if (existingDictionary) {
      dictionaryId = existingDictionary.id;
      console.log('Using existing dictionary:', existingDictionary.name);
    } else {
      const newDictionary = await prisma.dictionary.create({
        data: {
          name: '默认字典',
          describe: '默认字典',
          imageUrl: '',
          categoryId: categoryId,
          chapterNum: 3,
          createdAt: Math.floor(Date.now() / 1000)
        }
      });
      dictionaryId = newDictionary.id;
      console.log('Created new dictionary:', newDictionary.name);
    }
    
    // 检查并创建默认的章节
    const chapterTypes = ['Word', 'Sentence', 'Passage'];
    for (const type of chapterTypes) {
      const existingChapter = await prisma.chapter.findFirst({
        where: {
          name: `${type} 章节`,
          dictionaryId: dictionaryId
        }
      });
      
      if (existingChapter) {
        console.log('Using existing chapter:', existingChapter.name);
      } else {
        const newChapter = await prisma.chapter.create({
          data: {
            name: `${type} 章节`,
            describe: `${type} 章节`,
            type: type,
            dictionaryId: dictionaryId
          }
        });
        console.log('Created new chapter:', newChapter.name);
      }
    }
    
    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initDatabase();
