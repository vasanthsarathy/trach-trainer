# Trachtenberg Multiplication Rules (CORRECTED)

## Key Concepts

- **"The number"**: The digit currently being processed
- **"The neighbor"**: The digit to the RIGHT of "the number"
- **Direction**: Always work RIGHT to LEFT (units digit first)
- **Implicit zero**: Treat the leftmost position as having a 0 to its left (prepend 0 to operand)
- **"Half" the neighbor**: Floor division (drop fractions): ⌊neighbor/2⌋

## Verified Rules (from hand-authored-rules.md)

### ×11: Add the neighbor

**Rule**: number + neighbor

**Example: 847 × 11**
```
0 8 4 7  (prepend 0)
---------
7 + 0 = 7
4 + 7 = 11 → write 1, carry 1
8 + 4 + 1 = 13 → write 3, carry 1
0 + 8 + 1 = 9

Answer: 9317
```

---

### ×6: Add 5 if number is odd + half the neighbor

**Rule**:
- If number is odd: number + 5 + ⌊neighbor/2⌋
- If number is even: number + 0 + ⌊neighbor/2⌋

**Example: 847 × 6**
```
0 8 4 7  (prepend 0)
---------
7 + 5 (7 is odd) + ⌊0/2⌋ = 12 → write 2, carry 1
4 + 0 (4 is even) + ⌊7/2⌋ + 1 = 4 + 3 + 1 = 8
8 + 0 (8 is even) + ⌊4/2⌋ = 8 + 2 = 10 → write 0, carry 1
0 + 0 (0 is even) + ⌊8/2⌋ + 1 = 4 + 1 = 5

Answer: 5082
```

---

### ×12: Double the number and add the neighbor

**Rule**: 2×number + neighbor

**Example: 847 × 12**
```
0 8 4 7  (prepend 0)
---------
2×7 + 0 = 14 → write 4, carry 1
2×4 + 7 + 1 = 8 + 7 + 1 = 16 → write 6, carry 1
2×8 + 4 + 1 = 16 + 4 + 1 = 21 → write 1, carry 2
2×0 + 8 + 2 = 0 + 8 + 2 = 10 → write 10

Answer: 10164
```

---

## Rules from Image (to be interpreted)

### ×5: Take half the neighbor, add 5 if number is odd

**Rule**:
- If number is odd: 5 + ⌊neighbor/2⌋
- If number is even: 0 + ⌊neighbor/2⌋

(Same as ×6 but WITHOUT the number itself)

---

### ×7: Double the number, add half neighbor, add 5 if neighbor is odd

**Rule**: 2×number + ⌊neighbor/2⌋ + (5 if neighbor is odd)

---

### ×9:
- First step (rightmost): subtract from 10
- Middle steps: subtract from 9 and add the neighbor
- Last step: reduce left-hand digit by 1

**Example needed**

---

### ×10:
- First step: subtract from 10
- Middle steps: subtract from 9 and add the neighbor
- Last step: reduce left-hand digit by 1

(Same as ×9?)

---

### ×8:
- First step: subtract from 10 and double
- Middle steps: subtract from 9 and double, add the neighbor
- Last step: reduce left-hand digit by 2

---

### ×4:
- First step: subtract from 10, add 5 if number is odd
- Middle steps: subtract from 9, add 5 if number is odd, plus 1 if neighbor is odd
- Last step: subtract from 5, take half left-hand digit, reduce by 1

---

### ×3:
- First step: subtract from 10 and double, add 5 if number is odd
- Middle steps: subtract from 9 and double, add 5 if number is odd, add half neighbor
- Last step: take half left-hand digit and reduce by 2

---

### ×2: Double each digit without carrying the neighbor at all

**Rule**: Just 2×number (no neighbor involvement)

---

### ×1: Copy down the multiplicand unchanged

---

### ×0: Zero times any number is zero

---

## Notes

The image appears to have the multipliers in REVERSE order (12 at top, 0 at bottom), which caused initial confusion. The correct interpretation requires:

1. Understanding "the number" = current digit being processed
2. Understanding "the neighbor" = digit to the RIGHT
3. Working RIGHT to LEFT
4. Prepending 0 to handle leftmost digit correctly
