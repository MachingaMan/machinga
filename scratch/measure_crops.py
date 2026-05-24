import os
from PIL import Image

def measure(name, bg_color=(255, 255, 255)):
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    path = os.path.join(brain_dir, name)
    if not os.path.exists(path):
        print(f"{name} not found")
        return
    img = Image.open(path).convert("RGB")
    w, h = img.size
    
    # Find bounding box of pixels that are different from bg_color
    min_x, max_x = w, 0
    min_y, max_y = h, 0
    for y in range(h):
        for x in range(w):
            px = img.getpixel((x, y))
            dist = sum((px[i] - bg_color[i])**2 for i in range(3))**0.5
            if dist > 15:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    if min_x <= max_x and min_y <= max_y:
        print(f"Crop {name}: visible box is X=({min_x} to {max_x}, Width={max_x - min_x}px), Y=({min_y} to {max_y}, Height={max_y - min_y}px)")
    else:
        print(f"Crop {name}: no foreground found")

if __name__ == '__main__':
    measure("aava_crop.png")
    measure("appreciate_crop.png")
    measure("logo_crop.png")
