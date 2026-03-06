import { PassageAnalyzer } from './analyzer/PassageAnalyzer';
import { SentenceService } from './service/SentenceService';

// 主函数
async function main() {
  console.log('Backend service starting...');

  let content = `One evening, Lily was walking home through the woods. The sun had set, and everything was dark. She felt a little afraid.
Suddenly, she saw a small light moving in the dark. “What’s that?” she asked softly.
It was a little firefly. His light was not bright, but he kept trying his best to shine.
“Why do you glow even though you’re so small?” Lily asked.
The firefly said, “Even a small light can help someone not feel scared. I don’t need to be big. I just need to keep shining.”
Lily smiled. She followed the little firefly. Its light guided her step by step. Soon, she reached her home safely.
From that day on, Lily learned a valuable lesson: everyone can make a difference, no matter how small they are. Even the gentlest kindness or the weakest effort can brighten someone’s dark moment.
That night, Lily closed her eyes with warmth in her heart. She knew she would never forget her little shining friend—the firefly.`;

  content = 'The firefly said, “Even a small light can help someone not feel scared. I don’t need to be big. I just need to keep shining.”';

  const testInput = {
    title: 'The Firefly’s Light',
    content: content
  };

  try {
    // 测试PassageAnalyzer
    console.log('Testing PassageAnalyzer...');
    const passageAnalyzer = new PassageAnalyzer();
    const analysisResult = await passageAnalyzer.analysis(testInput);
    console.log('Analysis result:', JSON.stringify(analysisResult, null, 2));

    // 测试SentenceService，存储分析结果
    console.log('\nTesting SentenceService...');
    const sentenceService = new SentenceService();
    const storedPassage = await sentenceService.analyzeAndStorePassage(testInput);
    console.log('Passage stored successfully:', JSON.stringify(storedPassage, null, 2));

    console.log('\nBackend service started successfully!');
  } catch (error) {
    console.error('Error during analysis:', error);
  }
}

// 执行主函数
main().catch(console.error);