import math

# Stable coordinates
bubbles = {
    "Logo": {"x": 0.0, "y": 0.0, "r": 70.0},
    "Appreciate": {"x": 77.0, "y": 187.0, "r": 120.0},
    "Aava": {"x": -118.0, "y": 231.0, "r": 70.0},
    "Hamleys": {"x": -90.0, "y": 106.0, "r": 55.0},
    "Contraband": {"x": -38.0, "y": 331.0, "r": 55.0},
    "Tiny": {"x": 47.0, "y": 329.0, "r": 19.0}
}

# Proposed max float translations (moving outward)
# Appreciate (dx > 0, dy > 0): float ranges from (0, 0) to (+10, +10)
# Aava (dx < 0, dy > 0): float ranges from (0, 0) to (-12, +10)
# Hamleys (dx < 0, dy > 0... wait, dy is 106 > 70, so it is above Logo center but below Aava. Let's make it move left and down: (0, 0) to (-10, -8))
# Contraband (dx < 0, dy > 0): float ranges from (0, 0) to (-8, +12)
# Tiny (dx > 0, dy > 0): float ranges from (0, 0) to (+8, +12)

floats = {
    "Logo": {"dx": 0.0, "dy": 0.0},
    "Appreciate": {"dx": 10.0, "dy": 10.0},
    "Aava": {"dx": -12.0, "dy": 10.0},
    "Hamleys": {"dx": -10.0, "dy": -8.0},
    "Contraband": {"dx": -8.0, "dy": 12.0},
    "Tiny": {"dx": 8.0, "dy": 12.0}
}

print("Checking minimum distances under arbitrary independent float scaling in [0, 1]:")
# We will test all combinations of float scaling from 0.0 to 1.0 (the worst cases)
import itertools

steps = [0.0, 0.5, 1.0]
keys = [k for k in bubbles.keys() if k != "Logo"]

min_overlaps = {}

for combo in itertools.product(steps, repeat=len(keys)):
    # Create current positions
    pos = {
        "Logo": {"x": 0.0, "y": 0.0, "r": 70.0}
    }
    for idx, key in enumerate(keys):
        scale = combo[idx]
        pos[key] = {
            "x": bubbles[key]["x"] + floats[key]["dx"] * scale,
            "y": bubbles[key]["y"] + floats[key]["dy"] * scale,
            "r": bubbles[key]["r"]
        }
    
    # Calculate overlaps
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

print("\nWorst-case overlaps (maximum positive overlap):")
for pair, overlap in min_overlaps.items():
    print(f"{pair[0]} vs {pair[1]}: Max Overlap={overlap:.1f} ({'OVERLAP' if overlap > 0.0 else 'OK'})")
