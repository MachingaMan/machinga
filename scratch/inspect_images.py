import sys
import os
from PIL import Image

def analyze_layout():
    # We want to measure relative bubble positions and sizes from the user's reference image
    # Let's see the files we have
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    # Find the most recently created or modified media__*.png images in the brain_dir to examine them.
    # The user request has two screenshots:
    # 1. First one (which shows current bad layout with overlaps and Machinga logo bubble at bottom)
    # 2. Second one (which is the target screenshot from WhatsApp showing the + button at bottom, largest bubble to right-middle, etc.)
    # Let's inspect the files in brain_dir.
    files = [f for f in os.listdir(brain_dir) if f.startswith("media__") and f.endswith(".png")]
    files.sort(key=lambda x: os.path.getmtime(os.path.join(brain_dir, x)))
    print("Png files in brain dir:")
    for f in files:
        path = os.path.join(brain_dir, f)
        img = Image.open(path)
        print(f"File: {f}, Size: {img.size}, Mod Time: {os.path.getmtime(path)}")

if __name__ == '__main__':
    analyze_layout()
