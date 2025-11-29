/**
 * Difficulty System Test Runner (Node.js)
 * Run with: node test-difficulty.js
 */

// Simplified versions of required utilities for Node.js environment
const DifficultyCalculator = {
  MULTIPLIER_COMPLEXITY: {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 7,
    8: 6,
    9: 10,
    11: 1,
    12: 2
  },

  TIER_BOUNDARIES: [0, 80, 110, 140, 180, 220, 260, 281, 311, 361, 999],
  TIER_LABELS: ['', 'Beginner', 'Easy', 'Basic', 'Developing', 'Intermediate',
                'Moderate', 'Challenging', 'Advanced', 'Expert', 'Master'],

  calculatePartial(operand1, operand2) {
    const digitCount = operand1.toString().length;
    const multiplierComplexity = this.MULTIPLIER_COMPLEXITY[operand2];

    const multiplierScore = multiplierComplexity * 25;
    const digitScore = digitCount * 15;

    return {
      score: multiplierScore + digitScore,
      tier: this.getTierFromScore(multiplierScore + digitScore),
      tierLabel: '',
      breakdown: {
        multiplierScore,
        digitScore,
        carryScore: 0,
        carryCount: 0
      }
    };
  },

  addCarryInfo(difficulty, carryCount) {
    const carryScore = Math.min(10, carryCount) * 10;

    difficulty.score += carryScore;
    difficulty.tier = this.getTierFromScore(difficulty.score);
    difficulty.tierLabel = this.TIER_LABELS[difficulty.tier];
    difficulty.breakdown.carryScore = carryScore;
    difficulty.breakdown.carryCount = carryCount;

    return difficulty;
  },

  getTierFromScore(score) {
    for (let i = 1; i < this.TIER_BOUNDARIES.length; i++) {
      if (score < this.TIER_BOUNDARIES[i]) return i;
    }
    return 10;
  },

  getTierLabel(tier) {
    return this.TIER_LABELS[tier] || '';
  }
};

// Simplified carry calculation (estimate based on statistics)
function estimateCarries(operand1, multiplier, digits) {
  // More complex multipliers and more digits tend to generate more carries
  // This is a rough estimate for analysis purposes
  const baseCarries = {
    2: 0.3,   // ×2 rarely carries
    3: 0.5,
    4: 0.5,
    5: 0.5,
    6: 0.6,
    7: 0.7,
    8: 0.7,
    9: 0.8,   // ×9 carries frequently
    11: 0.3,  // ×11 rarely carries
    12: 0.4   // ×12 carries a bit more
  };

  const avgCarryRate = baseCarries[multiplier] || 0.5;
  const estimatedCarries = Math.floor(digits * avgCarryRate);

  return Math.min(estimatedCarries, 10);
}

console.log('════════════════════════════════════════════════════════════════');
console.log('   DIFFICULTY SYSTEM ANALYSIS - TIER DISTRIBUTION');
console.log('════════════════════════════════════════════════════════════════\n');

const multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 11, 12];
const digitCounts = [2, 3, 4, 5, 6];
const samplesPerConfig = 100;

const tierCounts = {};
const tierExamples = {};
const multiplierTierMap = {}; // Track which tiers each multiplier reaches

for (let i = 1; i <= 10; i++) {
  tierCounts[i] = 0;
  tierExamples[i] = [];
}

multipliers.forEach(mult => {
  multiplierTierMap[mult] = new Set();
});

let totalProblems = 0;

console.log('Generating comprehensive problem set...\n');

multipliers.forEach(mult => {
  digitCounts.forEach(digits => {
    for (let sample = 0; sample < samplesPerConfig; sample++) {
      const min = Math.pow(10, digits - 1);
      const max = Math.pow(10, digits) - 1;
      const operand1 = Math.floor(Math.random() * (max - min + 1)) + min;

      const difficulty = DifficultyCalculator.calculatePartial(operand1, mult);
      const estimatedCarries = estimateCarries(operand1, mult, digits);
      DifficultyCalculator.addCarryInfo(difficulty, estimatedCarries);

      const tier = difficulty.tier;
      tierCounts[tier]++;
      multiplierTierMap[mult].add(tier);

      if (tierExamples[tier].length < 2) {
        tierExamples[tier].push({
          problem: `${operand1} × ${mult}`,
          score: difficulty.score,
          breakdown: difficulty.breakdown
        });
      }

      totalProblems++;
    }
  });
});

console.log(`Total problems analyzed: ${totalProblems}\n`);
console.log('═══════════════════════════════════════════════════════════════════════════');
console.log('TIER DISTRIBUTION');
console.log('═══════════════════════════════════════════════════════════════════════════\n');

let allTiersPopulated = true;
let balancedDistribution = true;

for (let tier = 1; tier <= 10; tier++) {
  const count = tierCounts[tier];
  const percentage = ((count / totalProblems) * 100).toFixed(1);
  const barLength = Math.round(parseFloat(percentage));
  const bar = '█'.repeat(Math.min(barLength, 50));
  const tierLabel = DifficultyCalculator.TIER_LABELS[tier];

  let status = '✓';
  if (percentage < 5) {
    status = '⚠ LOW';
    allTiersPopulated = false;
  } else if (percentage > 25) {
    status = '⚠ HIGH';
    balancedDistribution = false;
  }

  console.log(`Tier ${tier.toString().padStart(2)} [${tierLabel.padEnd(12)}]: ${bar}`);
  console.log(`         ${percentage.toString().padStart(5)}% (${count.toString().padStart(4)} problems) ${status}`);

  if (tierExamples[tier].length > 0) {
    tierExamples[tier].forEach(ex => {
      const b = ex.breakdown;
      console.log(`         Example: ${ex.problem.padEnd(18)} Score=${ex.score.toString().padStart(3)} (M:${b.multiplierScore.toString().padStart(3)}, D:${b.digitScore.toString().padStart(2)}, C:${b.carryScore.toString().padStart(2)})`);
    });
  }
  console.log('');
}

console.log('═══════════════════════════════════════════════════════════════════════════');
console.log('MULTIPLIER COVERAGE');
console.log('═══════════════════════════════════════════════════════════════════════════\n');

multipliers.forEach(mult => {
  const tiers = Array.from(multiplierTierMap[mult]).sort((a, b) => a - b);
  const minTier = Math.min(...tiers);
  const maxTier = Math.max(...tiers);
  const coverage = tiers.length;

  console.log(`×${mult.toString().padStart(2)}: Tier ${minTier}-${maxTier} (${coverage} tiers covered) - ${tiers.join(', ')}`);
});

console.log('\n═══════════════════════════════════════════════════════════════════════════');
console.log('VALIDATION RESULTS');
console.log('═══════════════════════════════════════════════════════════════════════════\n');

const results = [];

if (allTiersPopulated) {
  results.push('✓ All tiers are populated (no dead zones)');
} else {
  results.push('✗ Some tiers are underpopulated (< 5%)');
}

if (balancedDistribution) {
  results.push('✓ Distribution is balanced (no tier > 25%)');
} else {
  results.push('✗ Some tiers are overpopulated (> 25%)');
}

// Check if there's a clear progression
const tier1to3 = (tierCounts[1] + tierCounts[2] + tierCounts[3]) / totalProblems * 100;
const tier4to7 = (tierCounts[4] + tierCounts[5] + tierCounts[6] + tierCounts[7]) / totalProblems * 100;
const tier8to10 = (tierCounts[8] + tierCounts[9] + tierCounts[10]) / totalProblems * 100;

results.push(`\nDifficulty Bands:`);
results.push(`  Beginner (Tier 1-3):     ${tier1to3.toFixed(1)}%`);
results.push(`  Intermediate (Tier 4-7): ${tier4to7.toFixed(1)}%`);
results.push(`  Advanced (Tier 8-10):    ${tier8to10.toFixed(1)}%`);

if (tier1to3 > 20 && tier4to7 > 30 && tier8to10 > 10) {
  results.push(`✓ Good spread across difficulty bands`);
} else {
  results.push(`⚠ Difficulty bands may need adjustment`);
}

// Check multiplier coverage
const allMultipliersCoverRange = multipliers.every(mult => {
  const tiers = multiplierTierMap[mult];
  return tiers.size >= 3; // Each multiplier should span at least 3 tiers
});

if (allMultipliersCoverRange) {
  results.push(`✓ All multipliers provide tier progression`);
} else {
  results.push(`⚠ Some multipliers have limited tier coverage`);
}

results.forEach(r => console.log(r));

console.log('\n═══════════════════════════════════════════════════════════════════════════');
console.log('MOTIVATIONAL ANALYSIS');
console.log('═══════════════════════════════════════════════════════════════════════════\n');

console.log('Progression Path Assessment:\n');

console.log('Beginner Path (×11):');
const beginnerPath = [2, 3, 4, 5, 6].map(d => {
  const diff = DifficultyCalculator.calculatePartial(Math.pow(10, d - 1), 11);
  DifficultyCalculator.addCarryInfo(diff, estimateCarries(Math.pow(10, d - 1), 11, d));
  return { digits: d, tier: diff.tier, score: diff.score };
});
beginnerPath.forEach(p => {
  console.log(`  ${p.digits} digits: Tier ${p.tier} (Score ~${p.score})`);
});

const tierRange = Math.max(...beginnerPath.map(p => p.tier)) - Math.min(...beginnerPath.map(p => p.tier));
console.log(`  → Tier range: ${tierRange} (${tierRange <= 4 ? '✓ Gentle progression' : '⚠ Steep progression'})\n`);

console.log('Advanced Path (×9):');
const advancedPath = [2, 3, 4, 5, 6].map(d => {
  const diff = DifficultyCalculator.calculatePartial(Math.pow(10, d - 1), 9);
  DifficultyCalculator.addCarryInfo(diff, estimateCarries(Math.pow(10, d - 1), 9, d));
  return { digits: d, tier: diff.tier, score: diff.score };
});
advancedPath.forEach(p => {
  console.log(`  ${p.digits} digits: Tier ${p.tier} (Score ~${p.score})`);
});

const advTierRange = Math.max(...advancedPath.map(p => p.tier)) - Math.min(...advancedPath.map(p => p.tier));
console.log(`  → Tier range: ${advTierRange} (${advTierRange >= 4 ? '✓ Meaningful progression' : '⚠ Limited progression'})\n`);

console.log('═══════════════════════════════════════════════════════════════════════════');
console.log('RECOMMENDATIONS');
console.log('═══════════════════════════════════════════════════════════════════════════\n');

const recommendations = [];

if (!allTiersPopulated) {
  recommendations.push('• Consider adjusting tier boundaries to ensure all tiers are reachable');
}

if (!balancedDistribution) {
  recommendations.push('• Rebalance tier boundaries to prevent overcrowding in certain tiers');
}

if (tier1to3 < 20) {
  recommendations.push('• Beginner tier range may be too narrow - consider widening Tier 1-3 boundaries');
}

if (tier8to10 < 10) {
  recommendations.push('• Advanced tiers may be too hard to reach - consider lowering Tier 8-10 thresholds');
}

if (recommendations.length === 0) {
  console.log('✓ No major issues detected. System appears well-balanced!\n');
  console.log('The difficulty scoring system shows:');
  console.log('  • All tiers are reachable through normal practice');
  console.log('  • Balanced distribution across difficulty levels');
  console.log('  • Clear progression paths for different skill levels');
  console.log('  • Appropriate challenge scaling from beginner to master');
} else {
  console.log('Suggested improvements:\n');
  recommendations.forEach(r => console.log(r));
}

console.log('\n═══════════════════════════════════════════════════════════════════════════');
console.log('END OF ANALYSIS');
console.log('═══════════════════════════════════════════════════════════════════════════\n');
