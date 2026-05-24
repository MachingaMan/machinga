import math

# Coordinates from the scaled mockup
bubbles = {
    "Logo": {"x": 0.0, "y": 0.0, "r": 70.0},
    "Appreciate": {"x": 77.0, "y": 187.0, "r": 120.0},
    "Aava": {"x": -118.0, "y": 231.0, "r": 70.0},
    "Hamleys": {"x": -90.0, "y": 106.0, "r": 55.0},
    "Contraband": {"x": -38.0, "y": 331.0, "r": 55.0},
    "Tiny": {"x": 47.0, "y": 329.0, "r": 19.0}
}

print("Distance matrix and overlaps:")
keys = list(bubbles.keys())
for i in range(len(keys)):
    for j in range(i+1, len(keys)):
        b1 = bubbles[keys[i]]
        b2 = bubbles[keys[j]]
        dist = math.sqrt((b1["x"] - b2["x"])**2 + (b1["y"] - b2["y"])**2)
        sum_r = b1["r"] + b2["r"]
        overlap = sum_r - dist
        print(f"{keys[i]} vs {keys[j]}: Dist={dist:.1f}, SumR={sum_r:.1f}, Overlap={overlap:.1f} ({'OVERLAP' if overlap > 0.0 else 'OK'})")
