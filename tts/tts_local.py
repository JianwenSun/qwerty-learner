import pyttsx3

# 初始化TTS引擎
engine = pyttsx3.init()

# 设置语音属性
engine.setProperty('rate', 150)  # 语速
engine.setProperty('volume', 1.0)  # 音量

# 获取可用的语音
voices = engine.getProperty('voices')
# 选择一个语音（0为男声，1为女声）
engine.setProperty('voice', voices[1].id)

# 要转换的文本
text = "Hello, this is a test of the text to speech system."

# 生成语音并保存到文件
engine.save_to_file(text, 'output_local.wav')

# 运行引擎
engine.runAndWait()

print("音频生成成功！已保存为 output_local.wav")