# Trachtenberg Multiplication Rules

This document contains the official Trachtenberg System rules for multiplication.

## Key Concepts

- **Work from RIGHT to LEFT** (units digit first)
- **Neighbor**: The digit immediately to the right
- **"Half" the neighbor**: Divide neighbor by 2, dropping fractions
- **Add 5**: When a condition specifies "add 5 if..."

## Rule Summary Table

| Multiplier | Description |
|------------|-------------|
| 0 | Zero times any number is all is zero |
| 1 | Copy down the multiplicand unchanged |
| 2 | Double each digit of the multiplicand without carrying the neighbor at all |
| 3 | First step: subtract from 10 and double, and add 5 if the number is odd. Middle steps: subtract from 9 and double, and add 5 if the number is odd, add "half" the neighbor. Last step: take "half" the left-hand of the multiplicand and reduce by 1 |
| 4 | First step: subtract from 10, and add 5 if the number is odd. Middle steps: subtract from 9, and add 5 if the number is odd, plus 1 if the number is odd. Last step: subtract from 5 and take "half" the left-hand of the multiplicand and reduce by 1 |
| 5 | First step: take 5 if the number is odd. Middle steps: take "half" the neighbor and add 5 if the number is odd. Last step: take "half" the left-hand digit of the multiplicand |
| 6 | Double the number and add 5 if the neighbor is odd, and add "half" the neighbor |
| 7 | First step: subtract from 10 and double. Middle steps: subtract from 9 and double and add the neighbor. Last step: reduce left-hand digit of multiplicand by 1 |
| 8 | First step: subtract from 10 and double. Middle steps: subtract from 9 and double, and add the neighbor. Last step: reduce left-hand digit of multiplicand by 2 |
| 9 | First step: subtract from 10. Middle steps: subtract from 9 and add the neighbor. Last step: reduce left-hand digit of multiplicand by 1 |
| 11 | Add the neighbor |
| 12 | Double the neighbor and add the neighbor. (In other words: if it is even, add "half" the neighbor; dropping fractions; if it is odd, add "half" the neighbor and 5.) |

## Detailed Rules

### Multiply by 0
Zero times any number is zero.

**Result**: All zeros

---

### Multiply by 1
Copy down the multiplicand unchanged.

**Result**: Same as input

---

### Multiply by 2
Double each digit of the multiplicand without carrying the neighbor at all.

**Steps**:
1. For each digit (right to left): Double it
2. Handle carries as normal

---

### Multiply by 3
**First step (rightmost digit)**: Subtract from 10 and double, and add 5 if the number is odd
**Middle steps**: Subtract from 9 and double, and add 5 if the number is odd, add "half" the neighbor
**Last step (leftmost)**: Take "half" the left-hand of the multiplicand and reduce by 1

---

### Multiply by 4
**First step (rightmost digit)**: Subtract from 10, and add 5 if the number is odd
**Middle steps**: Subtract from 9, and add 5 if the number is odd, plus 1 if the neighbor is odd
**Last step (leftmost)**: Subtract from 5 and take "half" the left-hand of the multiplicand and reduce by 1

---

### Multiply by 5
**First step (rightmost digit)**: Take 5 if the number is odd
**Middle steps**: Take "half" the neighbor and add 5 if the number is odd
**Last step (leftmost)**: Take "half" the left-hand digit of the multiplicand

**Working right to left**:
- If current digit is odd, add 5
- Add half of neighbor (drop fractions)
- Handle carries

---

### Multiply by 6
Double the number and add 5 if the neighbor is odd, and add "half" the neighbor.

**Working right to left**:
- Double the current digit
- Add half the neighbor (drop fractions)
- Add 5 if the neighbor is odd
- Handle carries

---

### Multiply by 7
**First step (rightmost digit)**: Subtract from 10 and double
**Middle steps**: Subtract from 9 and double and add the neighbor
**Last step (leftmost)**: Reduce left-hand digit of multiplicand by 1

---

### Multiply by 8
**First step (rightmost digit)**: Subtract from 10 and double
**Middle steps**: Subtract from 9 and double, and add the neighbor
**Last step (leftmost)**: Reduce left-hand digit of multiplicand by 2

---

### Multiply by 9
**First step (rightmost digit)**: Subtract from 10
**Middle steps**: Subtract from 9 and add the neighbor
**Last step (leftmost)**: Reduce left-hand digit of multiplicand by 1

---

### Multiply by 11
Add the neighbor.

**Working right to left**:
- Add current digit to its neighbor (the digit to the right)
- Rightmost digit: just the digit itself
- Leftmost: the leftmost digit of original number
- Handle carries

**Example: 348 × 11**
- Rightmost (8): 8 + 0 = 8
- Middle (4): 4 + 8 = 12 → write 2, carry 1
- Next (3): 3 + 4 + 1 = 8
- Leftmost: 3 + 0 = 3
- Result: 3828

---

### Multiply by 12
Double the neighbor and add the digit.

**Working right to left**:
- Add current digit to double the neighbor
- If neighbor is even: add digit + (neighbor/2)
- If neighbor is odd: add digit + (neighbor/2) + 5
- Handle carries

**Alternative description**: Add the digit, then add "half" the neighbor (dropping fractions), and if the neighbor is odd, add 5.

---

## Notes

- **Direction**: Always work from RIGHT to LEFT (units digit first)
- **Neighbor**: The digit immediately to the RIGHT of current position
- **Half**: Always drop fractions (floor division)
- **Carries**: Handle carries normally after computing each digit
