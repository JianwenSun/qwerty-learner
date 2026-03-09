import sys
import os
import tempfile
from gtts import gTTS

def generate_tts(text, lang="en-US", voice_type="Female", slow=False):
    """
    生成TTS音频数据
    
    Args:
        text (str): 要转换为语音的文本
        lang (str): 语言代码，默认为"en-US"
        voice_type (str): 声音类型，"Male"或"Female"
        slow (bool): 是否使用慢速语音，默认为False
    
    Returns:
        bytes: MP3音频数据
    """
    try:
        # 输出日志
        print(f"生成TTS，文本：{text[:50]}..., 语言：{lang}，声音类型：{voice_type}", file=sys.stderr)
        
        # 确保 artifact/debug 目录存在
        import os
        debug_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'artifact', 'debug')
        
        # 根据声音类型创建子目录
        voice_dir = os.path.join(debug_dir, voice_type.lower())
        if not os.path.exists(voice_dir):
            os.makedirs(voice_dir, exist_ok=True)
        
        # 生成安全的文件名（替换特殊字符）
        import re
        safe_text = re.sub(r'[<>:"/\|?*]', '_', text)[:80]
        temp_file_path = os.path.join(voice_dir, f"{safe_text}.mp3")
        # en-GB + co.uk: 英国英语（男声）
        # en-US + com: 美国英语（女声）
        if voice_type == "Male":
            lang = "en-GB"
            tld = "co.uk"  # 英国服务器，触发男声
            print(f"切换到男声：语言代码={lang}，服务器地区={tld}", file=sys.stderr)
        elif voice_type == "Female":
            lang = "en-US"
            tld = "com"    # 美国服务器，触发女声
            print(f"切换到女声：语言代码={lang}，服务器地区={tld}", file=sys.stderr)

        # 生成TTS：新增 tld 参数（关键！）
        print(f"开始生成TTS，语言：{lang}，服务器地区：{tld}", file=sys.stderr)
        tts = gTTS(text=text, lang=lang, slow=slow, tld=tld)  # 加入 tld 参数
        print(f"TTS生成成功，开始保存文件", file=sys.stderr)
        tts.save(temp_file_path)
        print(f"文件保存成功：{temp_file_path}", file=sys.stderr)
        
        # 读取音频数据
        with open(temp_file_path, "rb") as f:
            audio_data = f.read()
        
        # 保留临时文件在 artifact/debug 目录中，不删除
        print(f"临时文件已保留：{temp_file_path}", file=sys.stderr)
        
        return audio_data
    except Exception as e:
        print(f"Error generating TTS: {e}", file=sys.stderr)
        raise

# 测试代码（可选，运行时可注释）
if __name__ == "__main__":
    # 测试男声生成
    male_audio = generate_tts("I take bus to school every morning.", voice_type="Male")
    # 测试女声生成
    female_audio = generate_tts("I take bus to school every morning.", voice_type="Female")
    print("男女声TTS均生成完成，可在 artifact/debug 目录查看MP3文件")