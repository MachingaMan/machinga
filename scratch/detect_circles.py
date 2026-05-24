import cv2
import numpy as np
import os

def detect_circles_cv2():
    # Let's see if cv2 can find the circles in the target image.
    # The target image is media__1779595556254.png or media__1779595556570.png.
    # Wait, let's check which one is the reference image.
    # The reference image is the one with the plus button in the center bottom.
    # Let's inspect both images.
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    img_paths = [
        os.path.join(brain_dir, "media__1779595556254.png"),
        os.path.join(brain_dir, "media__1779595481177.png")
    ]
    
    for path in img_paths:
        if not os.path.exists(path):
            print(f"Path does not exist: {path}")
            continue
        print(f"\nAnalyzing: {os.path.basename(path)}")
        img = cv2.imread(path)
        if img is None:
            print("Failed to load image with cv2")
            continue
            
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # We can find connected components or contours to see where the circles are.
        # Let's threshold the image to find non-white objects.
        # Background is white (near 255).
        _, thresh = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY_INV)
        
        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        print(f"Found {len(contours)} external contours")
        
        # Sort contours by area
        contours = sorted(contours, key=cv2.contourArea, reverse=True)
        
        for i, c in enumerate(contours[:10]):
            area = cv2.contourArea(c)
            if area < 500:
                continue
            x, y, w, h = cv2.boundingRect(c)
            # Find center and radius of minimum enclosing circle
            (cx, cy), r = cv2.minEnclosingCircle(c)
            print(f"  Contour {i}: Center=({cx:.1f}, {cy:.1f}), Radius={r:.1f}, BBox=({x}, {y}, {w}, {h}), Area={area:.1f}")

if __name__ == '__main__':
    try:
        import cv2
        detect_circles_cv2()
    except ImportError:
        print("cv2 not installed, let's install it or use PIL")
