import math
import itertools

bubbles = {
    "Logo": {"x": 0.0, "y": 0.0, "r": 70.0},
    "Appreciate": {"x": 83.0, "y": 202.0, "r": 120.0},
    "Aava": {"x": -127.0, "y": 249.0, "r": 70.0},
    "Hamleys": {"x": -97.0, "y": 114.0, "r": 55.0},
    "Contraband": {"x": -41.0, "y": 357.0, "r": 55.0},
    "Tiny": {"x": 51.0, "y": 355.0, "r": 19.0}
}

# Float vectors for outward expansion
floats = {
    "Logo": {"dx": 0.0, "dy": 0.0},
    "Appreciate": {"dx": 8.0, "dy": 8.0},
    "Aava": {"dx": -8.0, "dy": 10.0},
    "Hamleys": {"dx": -10.0, "dy": 0.0},
    "Contraband": {"dx": -8.0, "dy": 12.0},
    "Tiny": {"dx": 8.0, "dy": 8.0}
}

keys = [k for k in bubbles.keys() if k != "Logo"]
min_overlaps = {}

for scale_combo in itertools.product([0.0, 1.0], repeat=len(keys)):
    pos = {"Logo": {"x": 0.0, "y": 0.0, "r": 70.0}}
    for idx, key in enumerate(keys):
        scale = scale_combo[idx]
        pos[key] = {
            "x": bubbles[key]["x"] + floats[key]["dx"] * scale,
            "y": bubbles[key]["y"] + floats[key]["dy"] * scale,
            "r": bubbles[key]["r"]
        }
    pos_keys = list(pos.keys())
    for i in range(len(pos_keys)):
        for j in range(i+1, len(pos_keys)):
            b1 = pos[pos_keys[i]]
            b2 = pos[pos_keys[j]]
            dist = math.sqrt((b1["x"] - b2["x"])**2 + (b1["y"] - b2["y"])**2)
            sum_r = b1["r"] + b2["r"]
            overlap = sum_r - dist
            pair = (pos_keys[i], pos_keys[j])
            if pair not in min_overlaps or overlap > min_overlaps[pair]:
                min_overlaps[pair] = overlap

print("Resulting overlaps with expanded coordinates (scaled by 1.08):")
for pair, overlap in min_overlaps.items():
    print(f"  {pair[0]} vs {pair[1]}: Max Overlap={overlap:.1f} ({'OVERLAP' if overlap > 0.0 else 'OK'})")
