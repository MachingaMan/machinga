import os
import glob
from PIL import Image

def find_latest_media():
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    # Let's see all files in brain dir
    all_files = glob.glob(os.path.join(brain_dir, "*"))
    all_files.sort(key=os.path.getmtime)
    print("Recent files:")
    for f in all_files[-10:]:
        print(f"{os.path.basename(f)}: size {os.path.getsize(f)}, mtime {os.path.getmtime(f)}")

if __name__ == '__main__':
    find_latest_media()
