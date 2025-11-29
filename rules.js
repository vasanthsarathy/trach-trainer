/**
 * Trachtenberg System Rules and Problem Generation
 */

const TrachtenbergRules = {
  /**
   * Multiply by 11
   * Rule: Add the neighbor (digit to the right)
   */
  11: {
    name: '×11',
    hint: 'Add the neighbor (right digit)',
    calculate(num) {
      return num * 11;
    },
    showSteps(num) {
      const digits = [0, ...numberToDigits(num)]; // Prepend 0
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Process RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const rightNeighbor = i < digits.length - 1 ? digits[i + 1] : 0;
        const sum = current + rightNeighbor + carry;
        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        steps.push({
          position: digits.length - i - 1,
          calculation: `${current} + ${rightNeighbor}${carry > 0 ? ' + ' + carry : ''} = ${sum}`,
          digit,
          newCarry
        });

        resultDigits.unshift(digit);
        carry = newCarry;
      }

      // Handle final carry - always prepend if exists
      if (carry > 0) {
        resultDigits.unshift(carry);
      }

      // Remove leading zeros only if the result would still be valid
      while (resultDigits.length > 1 && resultDigits[0] === 0) {
        resultDigits.shift();
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  },

  /**
   * Multiply by 12
   * Rule: Double the number and add the neighbor
   */
  12: {
    name: '×12',
    hint: '2×digit + neighbor',
    calculate(num) {
      return num * 12;
    },
    showSteps(num) {
      const digits = [0, ...numberToDigits(num)]; // Prepend 0
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Process RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const rightNeighbor = i < digits.length - 1 ? digits[i + 1] : 0;
        const sum = (2 * current) + rightNeighbor + carry;
        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        steps.push({
          position: digits.length - i - 1,
          calculation: `2×${current} + ${rightNeighbor}${carry > 0 ? ' + ' + carry : ''} = ${sum}`,
          digit,
          newCarry
        });

        resultDigits.unshift(digit);
        carry = newCarry;
      }

      // Handle final carry - always prepend if exists
      if (carry > 0) {
        resultDigits.unshift(carry);
      }

      // Remove leading zeros only if the result would still be valid
      while (resultDigits.length > 1 && resultDigits[0] === 0) {
        resultDigits.shift();
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  },

  /**
   * Multiply by 5
   * Rule: Take 5 if number is odd + half the neighbor
   * (Same as ×6 but WITHOUT the number itself)
   */
  5: {
    name: '×5',
    hint: '5 if digit odd + ⌊right neighbor/2⌋',
    calculate(num) {
      return num * 5;
    },
    showSteps(num) {
      const digits = [0, ...numberToDigits(num)]; // Prepend 0
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Process RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const rightNeighbor = i < digits.length - 1 ? digits[i + 1] : 0;
        const halfNeighbor = Math.floor(rightNeighbor / 2);
        const addFive = current % 2 === 1 ? 5 : 0;
        const sum = addFive + halfNeighbor + carry;
        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        steps.push({
          position: digits.length - i - 1,
          calculation: `${addFive > 0 ? '5' : '0'} + ⌊${rightNeighbor}/2⌋${carry > 0 ? ' + ' + carry : ''} = ${sum}`,
          digit,
          newCarry
        });

        resultDigits.unshift(digit);
        carry = newCarry;
      }

      // Handle final carry - always prepend if exists
      if (carry > 0) {
        resultDigits.unshift(carry);
      }

      // Remove leading zeros only if the result would still be valid
      while (resultDigits.length > 1 && resultDigits[0] === 0) {
        resultDigits.shift();
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  },

  /**
   * Multiply by 6
   * Rule: Add 5 if number is odd + half the neighbor
   */
  6: {
    name: '×6',
    hint: 'Add 5 if digit odd + ⌊right neighbor/2⌋',
    calculate(num) {
      return num * 6;
    },
    showSteps(num) {
      const digits = [0, ...numberToDigits(num)]; // Prepend 0
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Process RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const rightNeighbor = i < digits.length - 1 ? digits[i + 1] : 0;
        const halfNeighbor = Math.floor(rightNeighbor / 2);
        const addFive = current % 2 === 1 ? 5 : 0;
        const sum = current + addFive + halfNeighbor + carry;
        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        steps.push({
          position: digits.length - i - 1,
          calculation: `${current} + ${addFive > 0 ? '5' : '0'} + ⌊${rightNeighbor}/2⌋${carry > 0 ? ' + ' + carry : ''} = ${sum}`,
          digit,
          newCarry
        });

        resultDigits.unshift(digit);
        carry = newCarry;
      }

      // Handle final carry - always prepend if exists
      if (carry > 0) {
        resultDigits.unshift(carry);
      }

      // Remove leading zeros only if the result would still be valid
      while (resultDigits.length > 1 && resultDigits[0] === 0) {
        resultDigits.shift();
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  },

  /**
   * Multiply by 7
   * Rule: 2×number + 5 if NUMBER is odd + half neighbor
   */
  7: {
    name: '×7',
    hint: '2×digit + 5 if digit odd + ⌊right neighbor/2⌋',
    calculate(num) {
      return num * 7;
    },
    showSteps(num) {
      const digits = [0, ...numberToDigits(num)]; // Prepend 0
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Process RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const rightNeighbor = i < digits.length - 1 ? digits[i + 1] : 0;
        const halfNeighbor = Math.floor(rightNeighbor / 2);
        const addFive = current % 2 === 1 ? 5 : 0; // Add 5 if CURRENT is odd
        const sum = (2 * current) + addFive + halfNeighbor + carry;
        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        steps.push({
          position: digits.length - i - 1,
          calculation: `2×${current} + ${addFive > 0 ? '5' : '0'} + ⌊${rightNeighbor}/2⌋${carry > 0 ? ' + ' + carry : ''} = ${sum}`,
          digit,
          newCarry
        });

        resultDigits.unshift(digit);
        carry = newCarry;
      }

      // Handle final carry - always prepend if exists
      if (carry > 0) {
        resultDigits.unshift(carry);
      }

      // Remove leading zeros only if the result would still be valid
      while (resultDigits.length > 1 && resultDigits[0] === 0) {
        resultDigits.shift();
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  },

  /**
   * Multiply by 9
   * Rule: Rightmost: subtract from 10. Middle: subtract from 9 and add neighbor. Leftmost: reduce by 1
   */
  9: {
    name: '×9',
    hint: 'Subtract from 10 (rightmost), subtract from 9 and add neighbor (middle), reduce leftmost by 1',
    calculate(num) {
      return num * 9;
    },
    showSteps(num) {
      const digits = numberToDigits(num);
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Work RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const neighbor = i < digits.length - 1 ? digits[i + 1] : 0;

        let sum;
        if (i === digits.length - 1) {
          // Rightmost position: 10 - digit
          sum = 10 - current + carry;
          steps.push({
            position: 0,
            calculation: `10 - ${current}${carry !== 0 ? ` + ${carry}` : ''} = ${sum}`,
            digit: sum % 10,
            newCarry: Math.floor(sum / 10)
          });
        } else {
          // Middle positions: 9 - digit + neighbor
          sum = 9 - current + neighbor + carry;
          steps.push({
            position: digits.length - i - 1,
            calculation: `9 - ${current} + ${neighbor}${carry !== 0 ? ` + ${carry}` : ''} = ${sum}`,
            digit: sum % 10,
            newCarry: Math.floor(sum / 10)
          });
        }

        resultDigits.unshift(sum % 10);
        carry = Math.floor(sum / 10);
      }

      // Leftmost position: first digit - 1 + carry
      const leftmostValue = digits[0] - 1 + carry;
      steps.push({
        position: digits.length,
        calculation: `${digits[0]} - 1${carry !== 0 ? ` + ${carry}` : ''} = ${leftmostValue}`,
        digit: leftmostValue,
        newCarry: 0
      });

      if (leftmostValue > 0) {
        resultDigits.unshift(leftmostValue);
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  },

  /**
   * Multiply by 2
   * Rule: Double each digit (no neighbor)
   */
  2: {
    name: '×2',
    hint: 'Double each digit',
    calculate(num) {
      return num * 2;
    },
    showSteps(num) {
      const digits = [0, ...numberToDigits(num)];
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Process RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const sum = (2 * current) + carry;
        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        steps.push({
          position: digits.length - i - 1,
          calculation: `2×${current}${carry > 0 ? ' + ' + carry : ''} = ${sum}`,
          digit,
          newCarry
        });

        resultDigits.unshift(digit);
        carry = newCarry;
      }

      // Handle final carry
      if (carry > 0) {
        resultDigits.unshift(carry);
      }

      // Remove leading zeros
      while (resultDigits.length > 1 && resultDigits[0] === 0) {
        resultDigits.shift();
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  },

  /**
   * Multiply by 3
   * Rule: Rightmost: subtract from 10, double, add 5 if odd
   *       Middle: subtract from 9, double, add 5 if odd, add half of neighbor
   *       Leftmost: half of digit minus 2
   */
  3: {
    name: '×3',
    hint: 'Subtract from 10 (rightmost) or 9 (middle), double, add 5 if odd, add half neighbor',
    calculate(num) {
      return num * 3;
    },
    showSteps(num) {
      const digits = numberToDigits(num);
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Process RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const neighbor = i < digits.length - 1 ? digits[i + 1] : 0;
        const halfNeighbor = Math.floor(neighbor / 2);
        const addFive = current % 2 === 1 ? 5 : 0;

        let sum;
        if (i === digits.length - 1) {
          // Rightmost: (10 - digit) × 2 + 5 if odd
          sum = (10 - current) * 2 + addFive + carry;
        } else {
          // Middle: (9 - digit) × 2 + 5 if odd + half neighbor
          sum = (9 - current) * 2 + addFive + halfNeighbor + carry;
        }

        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        steps.push({
          position: digits.length - i - 1,
          calculation: i === digits.length - 1
            ? `(10 - ${current})×2 + ${addFive}${carry > 0 ? ' + ' + carry : ''} = ${sum}`
            : `(9 - ${current})×2 + ${addFive} + ⌊${neighbor}/2⌋${carry > 0 ? ' + ' + carry : ''} = ${sum}`,
          digit,
          newCarry
        });

        resultDigits.unshift(digit);
        carry = newCarry;
      }

      // Leftmost: half of first digit - 2
      const leftmostValue = Math.floor(digits[0] / 2) - 2 + carry;
      steps.push({
        position: digits.length,
        calculation: `⌊${digits[0]}/2⌋ - 2${carry > 0 ? ' + ' + carry : ''} = ${leftmostValue}`,
        digit: leftmostValue,
        newCarry: 0
      });

      if (leftmostValue > 0) {
        resultDigits.unshift(leftmostValue);
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  },

  /**
   * Multiply by 4
   * Rule: Like ×9, but use half the neighbor instead of full neighbor
   *       Rightmost: subtract from 10, add 5 if odd
   *       Middle: subtract from 9, add half neighbor, add 5 if odd
   *       Leftmost: half of digit minus 1
   */
  4: {
    name: '×4',
    hint: 'Subtract from 10 (rightmost) or 9 (middle), add ⌊neighbor/2⌋, add 5 if odd',
    calculate(num) {
      return num * 4;
    },
    showSteps(num) {
      const digits = numberToDigits(num);
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Process RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const neighbor = i < digits.length - 1 ? digits[i + 1] : 0;
        const halfNeighbor = Math.floor(neighbor / 2);
        const addFive = current % 2 === 1 ? 5 : 0;

        let sum;
        if (i === digits.length - 1) {
          // Rightmost: (10 - digit) + 5 if odd
          sum = (10 - current) + addFive + carry;
        } else {
          // Middle: (9 - digit) + half neighbor + 5 if odd
          sum = (9 - current) + halfNeighbor + addFive + carry;
        }

        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        steps.push({
          position: digits.length - i - 1,
          calculation: i === digits.length - 1
            ? `(10 - ${current}) + ${addFive}${carry > 0 ? ' + ' + carry : ''} = ${sum}`
            : `(9 - ${current}) + ⌊${neighbor}/2⌋ + ${addFive}${carry > 0 ? ' + ' + carry : ''} = ${sum}`,
          digit,
          newCarry
        });

        resultDigits.unshift(digit);
        carry = newCarry;
      }

      // Leftmost: half of first digit - 1
      const leftmostValue = Math.floor(digits[0] / 2) - 1 + carry;
      steps.push({
        position: digits.length,
        calculation: `⌊${digits[0]}/2⌋ - 1${carry > 0 ? ' + ' + carry : ''} = ${leftmostValue}`,
        digit: leftmostValue,
        newCarry: 0
      });

      if (leftmostValue > 0) {
        resultDigits.unshift(leftmostValue);
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  },

  /**
   * Multiply by 8
   * Rule: Rightmost: subtract from 10, double
   *       Middle: subtract from 9, double, add neighbor
   *       Leftmost: digit minus 2
   */
  8: {
    name: '×8',
    hint: 'Subtract from 10 (rightmost) or 9 (middle), double, add neighbor',
    calculate(num) {
      return num * 8;
    },
    showSteps(num) {
      const digits = numberToDigits(num);
      const steps = [];
      const resultDigits = [];
      let carry = 0;

      // Process RIGHT to LEFT
      for (let i = digits.length - 1; i >= 0; i--) {
        const current = digits[i];
        const neighbor = i < digits.length - 1 ? digits[i + 1] : 0;

        let sum;
        if (i === digits.length - 1) {
          // Rightmost: (10 - digit) × 2
          sum = (10 - current) * 2 + carry;
        } else {
          // Middle: (9 - digit) × 2 + neighbor
          sum = (9 - current) * 2 + neighbor + carry;
        }

        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        steps.push({
          position: digits.length - i - 1,
          calculation: i === digits.length - 1
            ? `(10 - ${current})×2${carry > 0 ? ' + ' + carry : ''} = ${sum}`
            : `(9 - ${current})×2 + ${neighbor}${carry > 0 ? ' + ' + carry : ''} = ${sum}`,
          digit,
          newCarry
        });

        resultDigits.unshift(digit);
        carry = newCarry;
      }

      // Leftmost: digit - 2
      const leftmostValue = digits[0] - 2 + carry;
      steps.push({
        position: digits.length,
        calculation: `${digits[0]} - 2${carry > 0 ? ' + ' + carry : ''} = ${leftmostValue}`,
        digit: leftmostValue,
        newCarry: 0
      });

      if (leftmostValue > 0) {
        resultDigits.unshift(leftmostValue);
      }

      return { steps, result: digitsToNumber(resultDigits) };
    }
  }
};

/**
 * Problem Generator
 */
const ProblemGenerator = {
  /**
   * Generate a single problem
   */
  generate(multiplier, minDigits, maxDigits) {
    const digitCount = randomInt(minDigits, maxDigits);
    const operand1 = generateNumber(digitCount);
    const operand2 = multiplier;

    const rule = TrachtenbergRules[multiplier];
    if (!rule) {
      throw new Error(`Unknown multiplier: ${multiplier}`);
    }

    const correctAnswer = rule.calculate(operand1);

    return {
      id: generateId(),
      operand1,
      operand2,
      correctAnswer,
      rule: rule.name,
      hint: rule.hint,
      userAnswer: null,
      isCorrect: null,
      timeTaken: null,
      difficulty: DifficultyCalculator.calculatePartial(operand1, operand2)
    };
  },

  /**
   * Generate a single problem for a specific tier
   */
  generateForTier(multiplier, targetTier, maxAttempts = 50) {
    let attempts = 0;

    while (attempts < maxAttempts) {
      // Try digit counts from 2-6
      const digitCount = randomInt(2, 6);
      const operand1 = generateNumber(digitCount);

      // Calculate partial difficulty
      const partialDifficulty = DifficultyCalculator.calculatePartial(operand1, multiplier);

      // Get the actual steps to determine carries
      const rule = TrachtenbergRules[multiplier];
      const { steps } = rule.showSteps(operand1);

      // Finalize difficulty with carry info
      DifficultyCalculator.addCarryInfo(partialDifficulty, steps);

      // Check if this problem is in the target tier
      if (partialDifficulty.tier === targetTier) {
        const correctAnswer = rule.calculate(operand1);

        return {
          id: generateId(),
          operand1,
          operand2: multiplier,
          correctAnswer,
          rule: rule.name,
          hint: rule.hint,
          userAnswer: null,
          isCorrect: null,
          timeTaken: null,
          difficulty: partialDifficulty
        };
      }

      attempts++;
    }

    // If we couldn't find a problem in the exact tier after maxAttempts,
    // generate one anyway and accept it (fallback)
    const digitCount = randomInt(2, 6);
    const operand1 = generateNumber(digitCount);
    const rule = TrachtenbergRules[multiplier];
    const { steps } = rule.showSteps(operand1);
    const difficulty = DifficultyCalculator.calculatePartial(operand1, multiplier);
    DifficultyCalculator.addCarryInfo(difficulty, steps);
    const correctAnswer = rule.calculate(operand1);

    return {
      id: generateId(),
      operand1,
      operand2: multiplier,
      correctAnswer,
      rule: rule.name,
      hint: rule.hint,
      userAnswer: null,
      isCorrect: null,
      timeTaken: null,
      difficulty
    };
  },

  /**
   * Generate a set of problems for a session
   */
  generateSet(config) {
    const { multipliers, targetTier, problemCount } = config;
    const problems = [];

    for (let i = 0; i < problemCount; i++) {
      // Pick random multiplier from selected ones
      const multiplier = multipliers[randomInt(0, multipliers.length - 1)];
      const problem = this.generateForTier(multiplier, targetTier);
      problems.push(problem);
    }

    return problems;
  }
};
