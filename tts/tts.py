import torch
import time
import soundfile as sf
from qwen_tts import Qwen3TTSModel

# 加载模型
model = Qwen3TTSModel.from_pretrained(
    "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",
    device_map="mps",
    dtype=torch.bfloat16,
)

print("开始批量推理...")
start_time = time.time()

wavs, sr = model.generate_custom_voice(
    text=["Use this skill when the user asks to build web components, pages, or applications."],
    language=["English"],
    speaker=["Vivian"],
    instruct=[""]
)

end_time = time.time()
sf.write("output_custom_voice_1.wav", wavs[0], sr)
print(f"批量推理耗时: {end_time - start_time:.2f} 秒")