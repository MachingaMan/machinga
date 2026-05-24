import os
from PIL import Image

def find_circles_pure_pil(image_path, bg_color):
    img = Image.open(image_path).convert("RGB")
    width, height = img.size
    
    scale = 4
    sw = width // scale
    sh = height // scale
    
    foreground = [[False for _ in range(sw)] for _ in range(sh)]
    for y in range(sh):
        for x in range(sw):
            px = img.getpixel((x * scale, y * scale))
            dist = sum((px[i] - bg_color[i]) ** 2 for i in range(3)) ** 0.5
            if dist > 10:
                foreground[y][x] = True
                
    visited = [[False for _ in range(sw)] for _ in range(sh)]
    components = []
    
    for y in range(sh):
        for x in range(sw):
            if foreground[y][x] and not visited[y][x]:
                comp_pixels = []
                queue = [(y, x)]
                visited[y][x] = True
                
                while queue:
                    cy, cx = queue.pop(0)
                    comp_pixels.append((cy * scale, cx * scale))
                    
                    for ny, nx in [(cy-1, cx), (cy+1, cx), (cy, cx-1), (cy, cx+1)]:
                        if 0 <= ny < sh and 0 <= nx < sw:
                            if foreground[ny][nx] and not visited[ny][nx]:
                                visited[ny][nx] = True
                                queue.append((ny, nx))
                                
                if len(comp_pixels) > 15:
                    ys = [p[0] for p in comp_pixels]
                    xs = [p[1] for p in comp_pixels]
                    min_y, max_y = min(ys), max(ys)
                    min_x, max_x = min(xs), max(xs)
                    w_box = max_x - min_x
                    h_box = max_y - min_y
                    center_x = (min_x + max_x) / 2
                    center_y = (min_y + max_y) / 2
                    radius = (w_box + h_box) / 4
                    components.append({
                        'center_x': center_x,
                        'center_y': center_y,
                        'width': w_box,
                        'height': h_box,
                        'radius': radius,
                        'pixels_count': len(comp_pixels)
                    })
                    
    print(f"\nResults for {os.path.basename(image_path)} (Size {width}x{height}):")
    components.sort(key=lambda c: c['pixels_count'], reverse=True)
    for idx, c in enumerate(components):
        print(f"Component {idx+1}: Center=({c['center_x']:.1f}, {c['center_y']:.1f}), Width={c['width']}, Height={c['height']}, Est. Radius={c['radius']:.1f}, PixelsCount={c['pixels_count']}")

if __name__ == '__main__':
    brain_dir = "/Users/anandnair/.gemini/antigravity/brain/575e82a7-7726-49b6-b85c-e1b1468e61bd"
    find_circles_pure_pil(os.path.join(brain_dir, "media__1779597068785.png"), (255, 255, 255))
