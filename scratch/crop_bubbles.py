import os
from PIL import Image

def crop_bubbles():
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    path = os.path.join(brain_dir, "media__1779597068785.png")
    if not os.path.exists(path):
        print("Image not found")
        return
        
    img = Image.open(path)
    # Let's save a crop of:
    # 1. Aava bubble region (approx X: 250 to 500, Y: 180 to 480)
    # 2. Appreciate bubble region (approx X: 450 to 800, Y: 300 to 700)
    # 3. Logo button region (approx X: 450 to 600, Y: 700 to 900)
    
    crops = {
        "aava_crop.png": (250, 180, 500, 480),
        "appreciate_crop.png": (450, 300, 800, 700),
        "logo_crop.png": (450, 700, 600, 900)
    }
    
    for name, bbox in crops.items():
        crop_img = img.crop(bbox)
        crop_img.save(os.path.join(brain_dir, name))
        print(f"Saved {name} with bbox {bbox}")

if __name__ == '__main__':
    crop_bubbles()
