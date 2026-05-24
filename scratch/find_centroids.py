import os
from PIL import Image

def find_centroids():
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    path = os.path.join(brain_dir, "media__1779597068785.png")
    if not os.path.exists(path):
        print("Image not found")
        return
        
    img = Image.open(path).convert("RGB")
    w, h = img.size
    
    # We want to find the centers of the bubbles by finding specific unique pixel colors:
    # 1. The Aava bubble has a pinkish-gray bottle.
    #    Let's find the text "Aava" or "Alkalinity" which is white/gray.
    #    Wait! The text "pH 8 Alkalinity" is in white. Let's find white pixels near the left-middle.
    # 2. The Appreciate bubble has the bull. The bull head is dark brown/black with some light tan shirt.
    #    Let's find the centroid of the tan shirt (which has a very specific color, e.g. R=140-180, G=120-150, B=60-90).
    # 3. The Logo button has the green Machinga logo in the center (R=15, G=200, B=35).
    
    logo_pixels = []
    bull_shirt_pixels = []
    aava_text_pixels = []
    
    for y in range(h):
        for x in range(w):
            r, g, b = img.getpixel((x, y))
            
            # Green Machinga logo
            if g > 160 and r < 80 and b < 60:
                logo_pixels.append((x, y))
                
            # Bull shirt (tan/brownish shirt)
            # Tan shirt color in the image: let's look at the bull's shirt. It is a tan/olive color.
            # R is around 130-170, G is around 120-150, B is around 60-100.
            if 120 <= r <= 180 and 110 <= g <= 160 and 50 <= b <= 110:
                # Exclude logo region
                if y < 700:
                    bull_shirt_pixels.append((x, y))
                    
            # Aava text "Alkalinity"
            # It is white text on a grey/pinkish background.
            # White text: r, g, b all high (e.g. > 230)
            if r > 240 and g > 240 and b > 240:
                # Limit to left side of the screen where Aava is
                if 200 <= x <= 450 and 250 <= y <= 450:
                    aava_text_pixels.append((x, y))
                    
    # Centroids
    if logo_pixels:
        xs = [p[0] for p in logo_pixels]
        ys = [p[1] for p in logo_pixels]
        print(f"Green Logo Centroid: X={sum(xs)/len(xs):.1f}, Y={sum(ys)/len(ys):.1f}, Pixels count={len(logo_pixels)}")
        
    if bull_shirt_pixels:
        xs = [p[0] for p in bull_shirt_pixels]
        ys = [p[1] for p in bull_shirt_pixels]
        print(f"Bull Shirt Centroid: X={sum(xs)/len(xs):.1f}, Y={sum(ys)/len(ys):.1f}, Pixels count={len(bull_shirt_pixels)}")
        
    if aava_text_pixels:
        xs = [p[0] for p in aava_text_pixels]
        ys = [p[1] for p in aava_text_pixels]
        print(f"Aava Text Centroid: X={sum(xs)/len(xs):.1f}, Y={sum(ys)/len(ys):.1f}, Pixels count={len(aava_text_pixels)}")

if __name__ == '__main__':
    find_centroids()
