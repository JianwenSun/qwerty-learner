import os
import subprocess
import json
from pathlib import Path

def get_package_size(pkg_name: str, location: str) -> float:
    """计算单个包的大小（MB）"""
    pkg_path = Path(location) / pkg_name.replace("-", "_")
    if not pkg_path.exists():
        pkg_path = Path(location)
    total_size = 0
    if pkg_path.is_dir():
        for file in pkg_path.rglob("*"):
            if file.is_file():
                total_size += file.stat().st_size
    return round(total_size / 1024 / 1024, 2)

# 使用pip list --format=json获取包信息
result = subprocess.run(
    ["pip", "list", "--format=json"],
    capture_output=True,
    text=True
)

package_sizes = []
if result.returncode == 0:
    packages = json.loads(result.stdout)
    for pkg in packages:
        # 获取包的安装位置
        location_result = subprocess.run(
            ["pip", "show", pkg["name"]],
            capture_output=True,
            text=True
        )
        location = ""
        for line in location_result.stdout.splitlines():
            if line.startswith("Location:"):
                location = line.split(":", 1)[1].strip()
                break
        if location:
            size_mb = get_package_size(pkg["name"], location)
            package_sizes.append((pkg["name"], size_mb))

# 按大小降序排序
package_sizes.sort(key=lambda x: x[1], reverse=True)

print(f"{'Package':<20} {'Size (MB)':>10}")
print("-" * 32)
for name, size in package_sizes[:10]:  # 只显示前10个最大的
    print(f"{name:<20} {size:>10.2f}")