import os
from PIL import Image

def find_aava_center():
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    path = os.path.join(brain_dir, "media__1779597068785.png")
    if not os.path.exists(path):
        print("Image not found")
        return
        
    img = Image.open(path).convert("RGB")
    
    # Print color values in a grid inside the Aava bubble region
    print("Aava region grid colors:")
    for y in range(300, 500, 30):
        row = []
        for x in range(250, 450, 30):
            row.append(img.getpixel((x, y)))
        print(f"Y={y}: {row}")

if __name__ == '__main__':
    find_aava_center()
