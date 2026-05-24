import math
import itertools

bubbles = {
    "Logo": {"x": 0.0, "y": 0.0, "r": 70.0},
    "Appreciate": {"x": 77.0, "y": 187.0, "r": 120.0},
    "Aava": {"x": -118.0, "y": 231.0, "r": 70.0},
    "Hamleys": {"x": -90.0, "y": 106.0, "r": 55.0},
    "Contraband": {"x": -38.0, "y": 331.0, "r": 55.0},
    "Tiny": {"x": 47.0, "y": 329.0, "r": 19.0}
}

# We want to find float vectors (dx, dy) for Appreciate, Aava, Hamleys, Contraband, Tiny
# such that:
# 1. They move generally outward from (0,0) (i.e. dx has same sign as x, dy has same sign as y)
# 2. Or they move in a way that minimizes pairwise overlaps.
# Let's define candidate directions based on offset from (0,0):
# Logo is static (0,0).
# Appreciate: x > 0, y > 0 -> dx > 0, dy > 0
# Aava: x < 0, y > 0 -> dx < 0, dy > 0
# Hamleys: x < 0, y > 0 -> dx < 0, dy > 0 (Wait, it's lower, so let's make dx < 0, dy < 0 or dy > 0)
# Contraband: x < 0, y > 0 -> dx < 0, dy > 0
# Tiny: x > 0, y > 0 -> dx > 0, dy > 0 (Wait, relative to Appreciate, x is smaller, so let's check both dx > 0 and dx < 0)

# Let's run a search over candidate vectors:
# We want float vectors of magnitude approx 8px to 15px.
keys = [k for k in bubbles.keys() if k != "Logo"]

# Let's test different float combinations:
# We'll optimize:
# float_appreciate: (dx, dy)
# float_aava: (dx, dy)
# float_hamleys: (dx, dy)
# float_contraband: (dx, dy)
# float_tiny: (dx, dy)

# We want these vectors to be non-zero (at least 6px magnitude) and not exceed 15px.
# Let's write an optimizer that checks:
# max_overlap across all combinations of float scaling [0, 0.5, 1] for each bubble.
# We want the max_overlap to be <= 0 for all pairs.

best_score = float('inf')
best_floats = None

# Let's define search spaces for each:
search_space = {
    "Appreciate": [(8, 8), (10, 6), (6, 10), (8, 4), (10, 0), (8, -4)],
    "Aava": [(-10, 8), (-12, 6), (-8, 10), (-12, 0), (-10, -4)],
    "Hamleys": [(-8, -8), (-10, -6), (-6, -10), (-10, 0), (-12, 4)],
    "Contraband": [(-6, 12), (-8, 10), (-4, 12), (-8, 12), (0, 12)],
    "Tiny": [(6, 10), (8, 8), (4, 12), (-4, 12), (-6, 10), (0, 12)]
}

# Let's find a combination with max overlap <= 0
combinations = list(itertools.product(
    search_space["Appreciate"],
    search_space["Aava"],
    search_space["Hamleys"],
    search_space["Contraband"],
    search_space["Tiny"]
))

print(f"Searching through {len(combinations)} float combinations...")

for combo in combinations:
    floats = {
        "Logo": {"dx": 0.0, "dy": 0.0},
        "Appreciate": {"dx": combo[0][0], "dy": combo[0][1]},
        "Aava": {"dx": combo[1][0], "dy": combo[1][1]},
        "Hamleys": {"dx": combo[2][0], "dy": combo[2][1]},
        "Contraband": {"dx": combo[3][0], "dy": combo[3][1]},
        "Tiny": {"dx": combo[4][0], "dy": combo[4][1]}
    }
    
    # Check max overlap
    max_overlap = -999.0
    for scale_combo in itertools.product([0.0, 1.0], repeat=len(keys)):
        # Create positions
        pos = {
            "Logo": {"x": 0.0, "y": 0.0, "r": 70.0}
        }
        for idx, key in enumerate(keys):
            scale = scale_combo[idx]
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
                if overlap > max_overlap:
                    max_overlap = overlap
                    
    if max_overlap < 0.0:
        # We found a valid float combination!
        # Let's measure how good the expansion is (we want it to expand outward, meaning distance from (0,0) increases)
        expansion_score = 0
        for k in keys:
            dx, dy = floats[k]["dx"], floats[k]["dy"]
            # Dot product with original position vector
            dot = dx * bubbles[k]["x"] + dy * bubbles[k]["y"]
            expansion_score += dot
            
        # We want maximum expansion and minimum max_overlap
        score = max_overlap - 0.01 * expansion_score
        if score < best_score:
            best_score = score
            best_floats = floats

if best_floats:
    print("\nFound optimal float vectors:")
    for k in keys:
        print(f"  {k}: dx={best_floats[k]['dx']:.1f}, dy={best_floats[k]['dy']:.1f}")
    
    # Print the resulting overlaps
    print("\nVerify resulting overlaps with these vectors:")
    min_overlaps = {}
    for scale_combo in itertools.product([0.0, 1.0], repeat=len(keys)):
        pos = {"Logo": {"x": 0.0, "y": 0.0, "r": 70.0}}
        for idx, key in enumerate(keys):
            scale = scale_combo[idx]
            pos[key] = {
                "x": bubbles[key]["x"] + best_floats[key]["dx"] * scale,
                "y": bubbles[key]["y"] + best_floats[key]["dy"] * scale,
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
    for pair, overlap in min_overlaps.items():
         print(f"  {pair[0]} vs {pair[1]}: Max Overlap={overlap:.1f} ({'OVERLAP' if overlap > 0.0 else 'OK'})")
else:
    print("No valid float combination found that avoids all overlaps.")
