import os
from PIL import Image

def find_circles_by_scanning(image_path):
    img = Image.open(image_path).convert("RGB")
    w, h = img.size
    
    # We will print the color of pixels along some horizontal lines to see the circle boundaries
    # Let's find where the circles start and end on the screen.
    # The center of the image is at X = 512.
    # Let's scan along Y = 542 (which is the center of Component 1)
    # and print non-white segments.
    print(f"Scanning horizontal line Y = 542 in {os.path.basename(image_path)}:")
    bg = (255, 255, 255)
    in_segment = False
    seg_start = 0
    for x in range(w):
        px = img.getpixel((x, 542))
        dist = sum((px[i] - bg[i])**2 for i in range(3))**0.5
        if dist > 15: # Foreground
            if not in_segment:
                seg_start = x
                in_segment = True
        else: # Background
            if in_segment:
                print(f"  Foreground segment: X={seg_start} to X={x} (Width={x - seg_start}px)")
                in_segment = False
    if in_segment:
        print(f"  Foreground segment: X={seg_start} to X={w} (Width={w - seg_start}px)")

    # Let's scan along Y = 300 to find the top bubbles (Aava and Contraband)
    print(f"\nScanning horizontal line Y = 300:")
    in_segment = False
    seg_start = 0
    for x in range(w):
        px = img.getpixel((x, 300))
        dist = sum((px[i] - bg[i])**2 for i in range(3))**0.5
        if dist > 15:
            if not in_segment:
                seg_start = x
                in_segment = True
        else:
            if in_segment:
                print(f"  Foreground segment: X={seg_start} to X={x} (Width={x - seg_start}px)")
                in_segment = False
    if in_segment:
         print(f"  Foreground segment: X={seg_start} to X={w} (Width={w - seg_start}px)")

if __name__ == '__main__':
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    find_circles_by_scanning(os.path.join(brain_dir, "media__1779597068785.png"))
