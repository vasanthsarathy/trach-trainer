// Tutorial Content for Trachtenberg Method Learning Journey
// Sequential curriculum: ×11 → ×12 → ×6 → ×7 → ×5 → ×8 → ×9 → ×4 → ×2 → ×3

const TutorialContent = {
  11: {
    multiplier: 11,
    order: 1,
    name: "×11: Add the Neighbor",
    difficulty: "Easiest",
    estimatedTime: "10-15 min",

    introduction: {
      title: "Understanding ×11",
      paragraphs: [
        "When you multiply by 11, you're doing (10 + 1) × number",
        "Example: 23 × 11 = (23 × 10) + (23 × 1) = 230 + 23 = 253",
        "Notice how each digit in the answer comes from adding two neighbors!"
      ],
      keyInsight: "Each result digit = sum of two neighbor digits"
    },

    theory: {
      rule: "Add each digit to its right neighbor",
      steps: [
        "Work right to left",
        "Rightmost: Add digit + 0 (no neighbor)",
        "Middle: Add digit + right neighbor",
        "Leftmost: Just the digit (plus any carry)",
        "Handle carries when sum ≥ 10"
      ],
      examples: [
        {
          problem: "34 × 11",
          steps: [
            { calc: "4 + 0 = 4", position: "rightmost", result: 4 },
            { calc: "3 + 4 = 7", position: "middle", result: 7 },
            { calc: "3 (leftmost)", position: "left", result: 3 }
          ],
          answer: 374
        },
        {
          problem: "78 × 11",
          steps: [
            { calc: "8 + 0 = 8", position: "rightmost", result: 8 },
            { calc: "7 + 8 = 15", carry: 1, position: "middle", result: 5 },
            { calc: "7 + 1 (carry) = 8", position: "left", result: 8 }
          ],
          answer: 858
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 32,
          guidance: "full",
          prompts: [
            { step: 0, text: "What is 2's right neighbor?", answer: "0" },
            { step: 0, text: "So 2 + 0 = ?", answer: "2" },
            { step: 1, text: "What is 3 + 2?", answer: "5" },
            { step: 2, text: "Leftmost digit is just?", answer: "3" }
          ]
        },
        {
          operand: 47,
          guidance: "medium",
          prompts: [
            { step: 0, text: "Rightmost: 7 + 0 = ?", answer: "7" },
            { step: 1, text: "Middle: 4 + 7 = ?", answer: "11", carry: 1 },
            { step: 2, text: "Left: 4 + carry = ?", answer: "5" }
          ]
        },
        {
          operand: 123,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "First digit?", answer: "3" },
            { step: 1, text: "Next?", answer: "5" },
            { step: 2, text: "Next?", answer: "3" },
            { step: 3, text: "Last?", answer: "1" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  },

  12: {
    multiplier: 12,
    order: 2,
    name: "×12: Double + Neighbor",
    difficulty: "Easy",
    estimatedTime: "12-17 min",

    introduction: {
      title: "Understanding ×12",
      paragraphs: [
        "Multiplying by 12 is similar to 11, but with a twist: we double each digit before adding the neighbor.",
        "Think of 12 as (10 + 2), so we're doing ×10, then adding double the original number.",
        "Example: 23 × 12 = 230 + 46 = 276"
      ],
      keyInsight: "Double the digit, then add its right neighbor"
    },

    theory: {
      rule: "Double each digit and add its right neighbor",
      steps: [
        "Work right to left",
        "Rightmost: Double the digit (neighbor is 0)",
        "Middle digits: Double the digit, add right neighbor",
        "Leftmost: Double the digit (plus any carry)",
        "Handle carries when sum ≥ 10"
      ],
      examples: [
        {
          problem: "23 × 12",
          steps: [
            { calc: "2×3 + 0 = 6", position: "rightmost", result: 6 },
            { calc: "2×2 + 3 = 7", position: "middle", result: 7 },
            { calc: "2×0 + 2 = 2", position: "left", result: 2 }
          ],
          answer: 276
        },
        {
          problem: "47 × 12",
          steps: [
            { calc: "2×7 + 0 = 14", carry: 1, position: "rightmost", result: 4 },
            { calc: "2×4 + 7 + 1 = 16", carry: 1, position: "middle", result: 6 },
            { calc: "2×0 + 4 + 1 = 5", position: "left", result: 5 }
          ],
          answer: 564
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 21,
          guidance: "full",
          prompts: [
            { step: 0, text: "Double 1 = ?", answer: "2" },
            { step: 0, text: "1's neighbor is ?", answer: "0" },
            { step: 0, text: "So 2 + 0 = ?", answer: "2" },
            { step: 1, text: "Double 2 = ?", answer: "4" },
            { step: 1, text: "Add neighbor 1: 4 + 1 = ?", answer: "5" },
            { step: 2, text: "Leftmost (with carry if any)?", answer: "2" }
          ]
        },
        {
          operand: 36,
          guidance: "medium",
          prompts: [
            { step: 0, text: "2×6 + 0 = ?", answer: "12", carry: 1 },
            { step: 1, text: "2×3 + 6 + carry = ?", answer: "13", carry: 1 },
            { step: 2, text: "Leftmost with carry?", answer: "4" }
          ]
        },
        {
          operand: 142,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "Rightmost?", answer: "4" },
            { step: 1, text: "Next?", answer: "6" },
            { step: 2, text: "Next?", answer: "7" },
            { step: 3, text: "Last?", answer: "1" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  },

  6: {
    multiplier: 6,
    order: 3,
    name: "×6: Add Half + 5 if Odd",
    difficulty: "Medium",
    estimatedTime: "15-20 min",

    introduction: {
      title: "Understanding ×6",
      paragraphs: [
        "Multiplying by 6 uses a clever pattern: add half the neighbor, and add 5 if the current digit is odd.",
        "This works because 6 = 5 + 1, so odd numbers get an extra 5.",
        "Example: 34 × 6 = 204 (4 is even → write 4, then 3 is odd → 5 + 2 = 7, write 0 carry 1, then 2)"
      ],
      keyInsight: "Add half the right neighbor, plus 5 if digit is odd"
    },

    theory: {
      rule: "Add half of right neighbor, plus 5 if current digit is odd",
      steps: [
        "Work right to left",
        "For each digit: if odd, add 5; if even, add 0",
        "Add half the right neighbor (round down if odd)",
        "Rightmost: neighbor is 0",
        "Handle carries normally"
      ],
      examples: [
        {
          problem: "34 × 6",
          steps: [
            { calc: "4 is even → 0, half of 0 = 0, so 4 + 0 + 0 = 4", position: "rightmost", result: 4 },
            { calc: "3 is odd → 5, half of 4 = 2, so 3 + 5 + 2 = 10", position: "middle", result: 0, carry: 1 },
            { calc: "0, half of 3 = 1, plus carry 1 = 2", position: "left", result: 2 }
          ],
          answer: 204
        },
        {
          problem: "42 × 6",
          steps: [
            { calc: "2 is even → 0, half of 0 = 0, so 2 + 0 + 0 = 2", position: "rightmost", result: 2 },
            { calc: "4 is even → 0, half of 2 = 1, so 4 + 0 + 1 = 5", position: "middle", result: 5 },
            { calc: "0, half of 4 = 2, so 0 + 0 + 2 = 2", position: "left", result: 2 }
          ],
          answer: 252
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 22,
          guidance: "full",
          prompts: [
            { step: 0, text: "Is 2 odd or even?", answer: "even" },
            { step: 0, text: "So we add 0 (for even). Half of 0 = ?", answer: "0" },
            { step: 0, text: "2 + 0 + 0 = ?", answer: "2" },
            { step: 1, text: "Is 2 odd or even?", answer: "even" },
            { step: 1, text: "Half of 2 = ?", answer: "1" },
            { step: 1, text: "2 + 0 + 1 = ?", answer: "3" },
            { step: 2, text: "Leftmost: half of 2 = ?", answer: "1" }
          ]
        },
        {
          operand: 35,
          guidance: "medium",
          prompts: [
            { step: 0, text: "5 is odd. 5 + 5 + 0 = ?", answer: "10", carry: 1 },
            { step: 1, text: "3 is odd. 3 + 5 + (half of 5) + carry = ?", answer: "11", carry: 1 },
            { step: 2, text: "Leftmost with carry: ?", answer: "2" }
          ]
        },
        {
          operand: 24,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "Rightmost digit?", answer: "4" },
            { step: 1, text: "Next?", answer: "4" },
            { step: 2, text: "Last?", answer: "1" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  },

  7: {
    multiplier: 7,
    order: 4,
    name: "×7: Double + Half Neighbor + 5 if Odd",
    difficulty: "Medium",
    estimatedTime: "15-20 min",

    introduction: {
      title: "Understanding ×7",
      paragraphs: [
        "Multiplying by 7 combines elements from ×6 and ×12.",
        "We double the digit, add half the neighbor, and add 5 if odd.",
        "Example: 23 × 7 = 161 (double 3 is 6, plus 5 for odd = 11, write 1 carry 1)"
      ],
      keyInsight: "2 × digit + half neighbor + 5 (if odd)"
    },

    theory: {
      rule: "Double the digit, add half the right neighbor, plus 5 if odd",
      steps: [
        "Work right to left",
        "Double the current digit",
        "Add half the right neighbor (round down)",
        "Add 5 if current digit is odd",
        "Handle carries"
      ],
      examples: [
        {
          problem: "23 × 7",
          steps: [
            { calc: "2×3 = 6, 3 is odd → +5, half of 0 = 0, so 6 + 5 + 0 = 11", position: "rightmost", result: 1, carry: 1 },
            { calc: "2×2 = 4, 2 is even → +0, half of 3 = 1, plus carry 1, so 4 + 0 + 1 + 1 = 6", position: "middle", result: 6 },
            { calc: "0, half of 2 = 1, so 0 + 0 + 1 = 1", position: "left", result: 1 }
          ],
          answer: 161
        },
        {
          problem: "14 × 7",
          steps: [
            { calc: "2×4 = 8, 4 is even → +0, half of 0 = 0, so 8 + 0 + 0 = 8", position: "rightmost", result: 8 },
            { calc: "2×1 = 2, 1 is odd → +5, half of 4 = 2, so 2 + 5 + 2 = 9", position: "middle", result: 9 },
            { calc: "0, half of 1 = 0, so 0 + 0 + 0 = 0", position: "left", result: 0 }
          ],
          answer: 98
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 12,
          guidance: "full",
          prompts: [
            { step: 0, text: "Double 2 = ?", answer: "4" },
            { step: 0, text: "Is 2 odd or even?", answer: "even" },
            { step: 0, text: "4 + 0 + 0 = ?", answer: "4" },
            { step: 1, text: "Double 1 = ?", answer: "2" },
            { step: 1, text: "Is 1 odd?", answer: "yes" },
            { step: 1, text: "2 + 5 + (half of 2) = ?", answer: "8" },
            { step: 2, text: "Leftmost: half of 1 = ?", answer: "0" }
          ]
        },
        {
          operand: 23,
          guidance: "medium",
          prompts: [
            { step: 0, text: "2×3 + 5 (odd) + 0 = ?", answer: "11", carry: 1 },
            { step: 1, text: "2×2 + 0 + 1 (half of 3) + carry = ?", answer: "6" },
            { step: 2, text: "Leftmost: ?", answer: "1" }
          ]
        },
        {
          operand: 31,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "Rightmost?", answer: "7" },
            { step: 1, text: "Next?", answer: "1" },
            { step: 2, text: "Last?", answer: "2" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  },

  5: {
    multiplier: 5,
    order: 5,
    name: "×5: Half + 5 if Odd",
    difficulty: "Easy",
    estimatedTime: "10-15 min",

    introduction: {
      title: "Understanding ×5",
      paragraphs: [
        "Multiplying by 5 is one of the simplest Trachtenberg rules.",
        "The pattern: add 5 if the digit is odd, then add half the right neighbor.",
        "Example: 24 × 5 = 120 (4 is even → 0, 2 is even → 1, leftmost → 1)"
      ],
      keyInsight: "5 if digit is odd + half of right neighbor"
    },

    theory: {
      rule: "Add 5 if digit is odd, plus half the right neighbor",
      steps: [
        "Work right to left",
        "For each digit: if odd, add 5; if even, add 0",
        "Add half the right neighbor (round down)",
        "Rightmost: neighbor is 0",
        "Handle carries normally"
      ],
      examples: [
        {
          problem: "24 × 5",
          steps: [
            { calc: "4 is even → 0, half of 0 = 0, so 0 + 0 = 0", position: "rightmost", result: 0 },
            { calc: "2 is even → 0, half of 4 = 2, so 0 + 2 = 2", position: "middle", result: 2 },
            { calc: "0, half of 2 = 1, so 0 + 1 = 1", position: "left", result: 1 }
          ],
          answer: 120
        },
        {
          problem: "37 × 5",
          steps: [
            { calc: "7 is odd → 5, half of 0 = 0, so 5 + 0 = 5", position: "rightmost", result: 5 },
            { calc: "3 is odd → 5, half of 7 = 3, so 5 + 3 = 8", position: "middle", result: 8 },
            { calc: "0, half of 3 = 1, so 0 + 1 = 1", position: "left", result: 1 }
          ],
          answer: 185
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 22,
          guidance: "full",
          prompts: [
            { step: 0, text: "Is 2 odd or even?", answer: "even" },
            { step: 0, text: "So we add 0. Half of 0 = ?", answer: "0" },
            { step: 0, text: "0 + 0 = ?", answer: "0" },
            { step: 1, text: "Is 2 odd or even?", answer: "even" },
            { step: 1, text: "Half of 2 = ?", answer: "1" },
            { step: 1, text: "0 + 1 = ?", answer: "1" },
            { step: 2, text: "Leftmost: half of 2 = ?", answer: "1" }
          ]
        },
        {
          operand: 35,
          guidance: "medium",
          prompts: [
            { step: 0, text: "5 is odd. 5 + 0 = ?", answer: "5" },
            { step: 1, text: "3 is odd. 5 + (half of 5) = ?", answer: "7" },
            { step: 2, text: "Leftmost: half of 3 = ?", answer: "1" }
          ]
        },
        {
          operand: 48,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "Rightmost?", answer: "0" },
            { step: 1, text: "Next?", answer: "4" },
            { step: 2, text: "Last?", answer: "2" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  },

  8: {
    multiplier: 8,
    order: 6,
    name: "×8: Subtract + Double + Neighbor",
    difficulty: "Hard",
    estimatedTime: "18-22 min",

    introduction: {
      title: "Understanding ×8",
      paragraphs: [
        "Multiplying by 8 is the most complex Trachtenberg rule.",
        "Rightmost: subtract from 10, double. Middle: subtract from 9, double, add neighbor.",
        "Example: 23 × 8 = 184 (10-3=7, 7×2=14 write 4 carry 1, 9-2=7, 7×2+3+carry=18 write 8 carry 1)"
      ],
      keyInsight: "Subtract from 10 or 9, double it, add neighbor"
    },

    theory: {
      rule: "Subtract from 10 (rightmost) or 9 (middle), double, add neighbor",
      steps: [
        "Work right to left",
        "Rightmost: (10 - digit) × 2",
        "Middle: (9 - digit) × 2 + right neighbor",
        "Leftmost: (0 - digit) × 2 + neighbor + carry",
        "Handle carries"
      ],
      examples: [
        {
          problem: "23 × 8",
          steps: [
            { calc: "(10 - 3) × 2 = 7 × 2 = 14", position: "rightmost", result: 4, carry: 1 },
            { calc: "(9 - 2) × 2 + 3 + carry 1 = 7 × 2 + 3 + 1 = 18", position: "middle", result: 8, carry: 1 },
            { calc: "(0 - 0) × 2 + 2 + carry 1 = 0 + 2 + 1 = 3", position: "left", result: 1 }
          ],
          answer: 184
        },
        {
          problem: "41 × 8",
          steps: [
            { calc: "(10 - 1) × 2 = 9 × 2 = 18", position: "rightmost", result: 8, carry: 1 },
            { calc: "(9 - 4) × 2 + 1 + carry 1 = 5 × 2 + 1 + 1 = 12", position: "middle", result: 2, carry: 1 },
            { calc: "0 + 4 + carry 1 = 5", position: "left", result: 3 }
          ],
          answer: 328
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 11,
          guidance: "full",
          prompts: [
            { step: 0, text: "10 - 1 = ?", answer: "9" },
            { step: 0, text: "9 × 2 = ?", answer: "18", carry: 1 },
            { step: 1, text: "9 - 1 = ?", answer: "8" },
            { step: 1, text: "8 × 2 = ?", answer: "16" },
            { step: 1, text: "16 + 1 (neighbor) + 1 (carry) = ?", answer: "18", carry: 1 },
            { step: 2, text: "0 + 1 + carry = ?", answer: "2" }
          ]
        },
        {
          operand: 23,
          guidance: "medium",
          prompts: [
            { step: 0, text: "(10 - 3) × 2 = ?", answer: "14", carry: 1 },
            { step: 1, text: "(9 - 2) × 2 + 3 + carry = ?", answer: "18", carry: 1 },
            { step: 2, text: "2 + carry = ?", answer: "3" }
          ]
        },
        {
          operand: 31,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "Rightmost?", answer: "8", carry: 1 },
            { step: 1, text: "Next?", answer: "6", carry: 1 },
            { step: 2, text: "Last?", answer: "4" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  },

  9: {
    multiplier: 9,
    order: 7,
    name: "×9: Subtract from 10",
    difficulty: "Medium",
    estimatedTime: "12-17 min",

    introduction: {
      title: "Understanding ×9",
      paragraphs: [
        "Multiplying by 9 has an elegant pattern using subtraction.",
        "Rightmost: subtract from 10. Middle: subtract from 9, add neighbor. Leftmost: reduce by 1.",
        "Example: 23 × 9 = 207 (10-3=7, 9-2+3=10 write 0 carry 1, 2-1+carry=2)"
      ],
      keyInsight: "Subtract from 10 (rightmost) or 9 (middle), add neighbor"
    },

    theory: {
      rule: "Subtract from 10 (rightmost) or 9 (middle), add neighbor, reduce leftmost by 1",
      steps: [
        "Work right to left",
        "Rightmost digit: subtract from 10",
        "Middle digits: subtract from 9, add right neighbor",
        "Leftmost: subtract 1 (plus any carry)",
        "Handle carries normally"
      ],
      examples: [
        {
          problem: "23 × 9",
          steps: [
            { calc: "10 - 3 = 7", position: "rightmost", result: 7 },
            { calc: "9 - 2 + 3 = 10", position: "middle", result: 0, carry: 1 },
            { calc: "2 - 1 + carry 1 = 2", position: "left", result: 2 }
          ],
          answer: 207
        },
        {
          problem: "54 × 9",
          steps: [
            { calc: "10 - 4 = 6", position: "rightmost", result: 6 },
            { calc: "9 - 5 + 4 = 8", position: "middle", result: 8 },
            { calc: "5 - 1 = 4", position: "left", result: 4 }
          ],
          answer: 486
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 12,
          guidance: "full",
          prompts: [
            { step: 0, text: "Rightmost: 10 - 2 = ?", answer: "8" },
            { step: 1, text: "Middle: 9 - 1 = ?", answer: "8" },
            { step: 1, text: "Add neighbor: 8 + 2 = ?", answer: "10", carry: 1 },
            { step: 2, text: "Leftmost: 1 - 1 + carry = ?", answer: "1" }
          ]
        },
        {
          operand: 34,
          guidance: "medium",
          prompts: [
            { step: 0, text: "10 - 4 = ?", answer: "6" },
            { step: 1, text: "9 - 3 + 4 = ?", answer: "10", carry: 1 },
            { step: 2, text: "3 - 1 + carry = ?", answer: "3" }
          ]
        },
        {
          operand: 45,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "Rightmost?", answer: "5" },
            { step: 1, text: "Next?", answer: "0", carry: 1 },
            { step: 2, text: "Last?", answer: "4" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  },

  4: {
    multiplier: 4,
    order: 8,
    name: "×4: Subtract + Half Neighbor + 5 if Odd",
    difficulty: "Medium",
    estimatedTime: "15-18 min",

    introduction: {
      title: "Understanding ×4",
      paragraphs: [
        "Multiplying by 4 combines subtraction with addition.",
        "Rightmost: subtract from 10. Middle: subtract from 9, add half neighbor, add 5 if odd.",
        "Example: 23 × 4 = 92 (10-3+0+5=12 write 2 carry 1, 9-2+1+0+carry=8)"
      ],
      keyInsight: "Subtract from 10 or 9, add half neighbor, +5 if odd"
    },

    theory: {
      rule: "Subtract from 10 (rightmost) or 9 (middle), add half neighbor, plus 5 if odd",
      steps: [
        "Work right to left",
        "Rightmost: subtract from 10, add 5 if odd",
        "Middle: subtract from 9, add half neighbor, add 5 if odd",
        "Handle carries"
      ],
      examples: [
        {
          problem: "23 × 4",
          steps: [
            { calc: "10 - 3 + (3 is odd → 5) = 12", position: "rightmost", result: 2, carry: 1 },
            { calc: "9 - 2 + (2 is even → 0) + (half of 3 = 1) + carry 1 = 8", position: "middle", result: 8 }
          ],
          answer: 92
        },
        {
          problem: "42 × 4",
          steps: [
            { calc: "10 - 2 + (2 is even → 0) = 8", position: "rightmost", result: 8 },
            { calc: "9 - 4 + (4 is even → 0) + (half of 2 = 1) = 6", position: "middle", result: 6 },
            { calc: "(half of 4 = 2) = 2", position: "left", result: 2 }
          ],
          answer: 168
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 12,
          guidance: "full",
          prompts: [
            { step: 0, text: "10 - 2 = ?", answer: "8" },
            { step: 0, text: "2 is even, so add 0. Result?", answer: "8" },
            { step: 1, text: "9 - 1 = ?", answer: "8" },
            { step: 1, text: "1 is odd, add 5. Half of 2 = 1. Total?", answer: "14", carry: 1 },
            { step: 2, text: "Half of 1 = 0, plus carry?", answer: "1" }
          ]
        },
        {
          operand: 24,
          guidance: "medium",
          prompts: [
            { step: 0, text: "10 - 4 + 0 = ?", answer: "6" },
            { step: 1, text: "9 - 2 + 0 + (half of 4) = ?", answer: "9" }
          ]
        },
        {
          operand: 31,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "Rightmost?", answer: "4", carry: 1 },
            { step: 1, text: "Next?", answer: "2", carry: 1 },
            { step: 2, text: "Last?", answer: "1" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  },

  2: {
    multiplier: 2,
    order: 9,
    name: "×2: Simply Double",
    difficulty: "Easiest",
    estimatedTime: "8-12 min",

    introduction: {
      title: "Understanding ×2",
      paragraphs: [
        "Multiplying by 2 is the simplest: just double each digit.",
        "Work right to left, carrying as needed.",
        "Example: 47 × 2 = 94 (double 7 is 14, write 4 carry 1, double 4 plus carry is 9)"
      ],
      keyInsight: "Double each digit, handle carries"
    },

    theory: {
      rule: "Double each digit",
      steps: [
        "Work right to left",
        "Double the current digit",
        "Add any carry from the previous step",
        "If result ≥ 10, write the ones digit and carry 1"
      ],
      examples: [
        {
          problem: "34 × 2",
          steps: [
            { calc: "2 × 4 = 8", position: "rightmost", result: 8 },
            { calc: "2 × 3 = 6", position: "middle", result: 6 }
          ],
          answer: 68
        },
        {
          problem: "47 × 2",
          steps: [
            { calc: "2 × 7 = 14", position: "rightmost", result: 4, carry: 1 },
            { calc: "2 × 4 + carry 1 = 9", position: "middle", result: 9 }
          ],
          answer: 94
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 23,
          guidance: "full",
          prompts: [
            { step: 0, text: "Double 3 = ?", answer: "6" },
            { step: 1, text: "Double 2 = ?", answer: "4" }
          ]
        },
        {
          operand: 48,
          guidance: "medium",
          prompts: [
            { step: 0, text: "2 × 8 = ?", answer: "16", carry: 1 },
            { step: 1, text: "2 × 4 + carry = ?", answer: "9" }
          ]
        },
        {
          operand: 156,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "Rightmost?", answer: "12", carry: 1 },
            { step: 1, text: "Next?", answer: "11", carry: 1 },
            { step: 2, text: "Next?", answer: "3" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  },

  3: {
    multiplier: 3,
    order: 10,
    name: "×3: Triple the Digit",
    difficulty: "Easy",
    estimatedTime: "10-14 min",

    introduction: {
      title: "Understanding ×3",
      paragraphs: [
        "Multiplying by 3 is straightforward: triple each digit.",
        "Work right to left with carries.",
        "Example: 24 × 3 = 72 (triple 4 is 12, write 2 carry 1, triple 2 plus carry is 7)"
      ],
      keyInsight: "Triple each digit, handle carries"
    },

    theory: {
      rule: "Triple each digit",
      steps: [
        "Work right to left",
        "Triple the current digit (multiply by 3)",
        "Add any carry from the previous step",
        "If result ≥ 10, write the ones digit and carry the tens"
      ],
      examples: [
        {
          problem: "21 × 3",
          steps: [
            { calc: "3 × 1 = 3", position: "rightmost", result: 3 },
            { calc: "3 × 2 = 6", position: "middle", result: 6 }
          ],
          answer: 63
        },
        {
          problem: "34 × 3",
          steps: [
            { calc: "3 × 4 = 12", position: "rightmost", result: 2, carry: 1 },
            { calc: "3 × 3 + carry 1 = 10", position: "middle", result: 0, carry: 1 },
            { calc: "Carry 1", position: "left", result: 1 }
          ],
          answer: 102
        }
      ]
    },

    guidedPractice: {
      problems: [
        {
          operand: 12,
          guidance: "full",
          prompts: [
            { step: 0, text: "Triple 2 = ?", answer: "6" },
            { step: 1, text: "Triple 1 = ?", answer: "3" }
          ]
        },
        {
          operand: 24,
          guidance: "medium",
          prompts: [
            { step: 0, text: "3 × 4 = ?", answer: "12", carry: 1 },
            { step: 1, text: "3 × 2 + carry = ?", answer: "7" }
          ]
        },
        {
          operand: 143,
          guidance: "minimal",
          prompts: [
            { step: 0, text: "Rightmost?", answer: "9" },
            { step: 1, text: "Next?", answer: "2", carry: 1 },
            { step: 2, text: "Next?", answer: "3" },
            { step: 3, text: "Last?", answer: "4" }
          ]
        }
      ]
    },

    independentPractice: {
      problemCount: 5,
      digitRange: [2, 4],
      passingCriteria: {
        correctInRow: 3,
        minAccuracy: 80
      }
    }
  }
};
