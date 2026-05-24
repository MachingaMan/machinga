import os
from PIL import Image

def inspect_latest():
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    img1 = os.path.join(brain_dir, "media__1779597068785.png")
    img2 = os.path.join(brain_dir, "media__1779597210960.png")
    
    for path in [img1, img2]:
        if os.path.exists(path):
            img = Image.open(path)
            # Sample some pixels to find bg color
            corner_px = img.convert("RGB").getpixel((10, 10))
            print(f"File: {os.path.basename(path)}, Size: {img.size}, BG: {corner_px}")

if __name__ == '__main__':
    inspect_latest()
