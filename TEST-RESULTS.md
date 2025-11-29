# Difficulty Scoring System - Test Results & Analysis

**Test Date**: 2025-11-28
**Total Problems Analyzed**: 3,000 (100 samples × 6 multipliers × 5 digit counts)

---

## Executive Summary

### 🔴 Critical Issues Found

1. **Tier 10 is unreachable** (0% of problems)
   - Highest scores achieved: ~380-390
   - Tier 10 threshold: 411+
   - **Impact**: Master tier feels impossible, demotivating for advanced users

2. **Limited multiplier progression**
   - Each multiplier only spans 3 tiers
   - Creates strict "lanes" rather than continuous progression
   - **Impact**: Reduces variety and progression feel

### 🟡 Minor Issues

1. **Advanced path (×9) has compressed tier range**
   - 2-digit to 6-digit ×9 only spans Tier 7-9
   - **Impact**: May feel like small improvement for significant difficulty increase

2. **Beginner path (×11) also compressed**
   - 2-digit to 6-digit ×11 only spans Tier 1-3
   - **Impact**: Beginners may plateau quickly

### ✅ What's Working Well

1. **Balanced overall distribution** - No tier exceeds 25% or falls below 5% (except Tier 10)
2. **Good difficulty band spread** - 27% Beginner, 60% Intermediate, 13% Advanced
3. **All multipliers provide progression** - Each covers 3+ tiers
4. **Gentle beginner slope** - Tier 1-3 accessible and not overwhelming

---

## Detailed Findings

### Tier Distribution

| Tier | Label | % of Problems | Count | Status |
|------|-------|---------------|-------|--------|
| 1 | Beginner | 6.7% | 200 | ✅ Good |
| 2 | Easy | 10.0% | 300 | ✅ Good |
| 3 | Basic | 10.0% | 300 | ✅ Good |
| 4 | Developing | 16.7% | 500 | ✅ Good |
| 5 | Intermediate | 16.7% | 500 | ✅ Good |
| 6 | Moderate | 16.7% | 500 | ✅ Good |
| 7 | Challenging | 10.0% | 300 | ✅ Good |
| 8 | Advanced | 6.7% | 200 | ✅ Good |
| 9 | Expert | 6.7% | 200 | ✅ Good |
| 10 | Master | **0.0%** | **0** | 🔴 **UNREACHABLE** |

### Multiplier Coverage

| Multiplier | Tier Range | Tiers Covered | Notes |
|------------|------------|---------------|-------|
| ×11 | 1-3 | 3 tiers | Easiest, good beginner entry |
| ×12 | 2-4 | 3 tiers | Slight overlap with ×11 |
| ×5 | 4-6 | 3 tiers | Mid-tier sweet spot |
| ×6 | 4-6 | 3 tiers | Same as ×5 (redundant?) |
| ×7 | 5-7 | 3 tiers | Upper-mid tier |
| ×9 | 7-9 | 3 tiers | Hardest, but can't reach Tier 10 |

**Observation**: Multipliers create strict "lanes" - ×11 users stay in Tier 1-3, ×9 users in Tier 7-9.

### Score Distribution Examples

**Tier 1 (Beginner)**: 55-80 points
- `12 × 11 = 55` (M:25, D:30, C:0)
- `123 × 11 = 70-80` (M:25, D:45, C:0-10)

**Tier 5 (Intermediate)**: 181-220 points
- `1234 × 5 = 180-200` (M:100, D:60, C:20-40)
- `123 × 6 = 180-200` (M:125, D:45, C:10-30)

**Tier 9 (Expert)**: 361-410 points
- `12345 × 9 = 365-385` (M:250, D:75, C:40-60)
- `123456 × 9 = 380-400` (M:250, D:90, C:40-60)

**Tier 10 (Master)**: 411+ points
- **NO PROBLEMS REACH THIS TIER**
- Theoretical maximum: ~440 (999999 × 9 with max carries)
- Realistic maximum: ~390 (6-digit × 9 with typical carries)

---

## Progression Path Analysis

### Beginner Path (×11 only, 2-6 digits)

| Digits | Tier | Score | Assessment |
|--------|------|-------|------------|
| 2 | 1 | ~55 | Good starting point |
| 3 | 1 | ~70 | Still Tier 1 (may feel slow) |
| 4 | 2 | ~95 | Progress to Tier 2 |
| 5 | 3 | ~110 | Progress to Tier 3 |
| 6 | 3 | ~125 | Plateau at Tier 3 |

**Tier Range**: 2 tiers (1 → 3)
**Assessment**: ✅ Gentle progression, but **limited ceiling**

### Advanced Path (×9 only, 2-6 digits)

| Digits | Tier | Score | Assessment |
|--------|------|-------|------------|
| 2 | 7 | ~290 | High entry barrier |
| 3 | 8 | ~315 | Quick jump to Tier 8 |
| 4 | 8 | ~340 | Plateau at Tier 8 |
| 5 | 9 | ~365 | Progress to Tier 9 |
| 6 | 9 | ~380 | Plateau at Tier 9 (can't reach Tier 10!) |

**Tier Range**: 2 tiers (7 → 9)
**Assessment**: ⚠️ **Too compressed**, Tier 10 unreachable

### Mixed Strategy (Recommended path)

1. Master ×11 (Tier 1-3)
2. Learn ×12 (Tier 2-4)
3. Learn ×5, ×6 (Tier 4-6)
4. Tackle ×7 (Tier 5-7)
5. Challenge ×9 (Tier 7-9)

**Tier Range**: 8 tiers (1 → 9)
**Assessment**: ✅ Best progression path, but still **can't reach Tier 10**

---

## Motivational Assessment

### Early Success (Tier 1-3) - ✅ GOOD

- **Entry point**: Very accessible (×11 with 2-3 digits)
- **Quick wins**: Can reach Tier 2-3 in first practice session
- **Variety**: 800 problems across Tier 1-3 (26.7%)
- **Verdict**: Beginners will feel immediate progress

### Mid-Game Engagement (Tier 4-7) - ✅ GOOD

- **Population**: 1,800 problems (60% of total)
- **Progression**: Clear path through multipliers (×5 → ×6 → ×7)
- **Challenge**: Each tier feels meaningfully harder
- **Verdict**: Strong mid-game with plenty of practice material

### End-Game Mastery (Tier 8-10) - 🔴 PROBLEMATIC

- **Tier 8-9**: Achievable but compressed (only 400 problems, 13.3%)
- **Tier 10**: **Completely unreachable** (0 problems)
- **×9 ceiling**: Even 6-digit ×9 problems can't break into Tier 10
- **Verdict**: **No true "master" achievement**, demotivating for advanced users

### Personal Best System - ✅ STRONG

- **Per-tier PBs**: Well-distributed across tiers means many PB categories
- **Record potential**: Users can set records in multiple tiers
- **Engagement loop**: "Beat your Tier 5 time" is clear and motivating
- **Verdict**: PB system should work well given tier distribution

---

## Root Cause Analysis

### Why is Tier 10 unreachable?

**Current Tier 10 boundary**: 411 points

**Maximum achievable score calculation**:
- Hardest multiplier: ×9 (complexity = 10) → 250 points
- Maximum digits: 6 → 90 points
- Maximum carries: ~10 (capped) → 100 points
- **Total**: 250 + 90 + 100 = **440 points** (theoretical max)

**Realistic maximum**:
- 6-digit ×9 problems typically have 4-6 carries
- Realistic score: 250 + 90 + 40-60 = **380-400 points**
- This lands in **Tier 9 (361-410)**

**The gap**:
- Tier 10 requires 411+ points
- Realistic problems cap at ~390 points
- **Gap: ~20-30 points that can't be achieved in normal practice**

### Why are multiplier ranges so narrow?

**Multiplier score contribution dominates**:
- ×11 → 25 points (Tier 1-3 baseline)
- ×9 → 250 points (Tier 7-9 baseline)
- **225-point spread between multipliers**

**Digit score contribution is smaller**:
- 2 digits → 30 points
- 6 digits → 90 points
- **60-point spread across all digit counts**

**Result**: Multiplier choice determines tier more than digit count. Within a single multiplier, you can only climb 1-3 tiers by increasing digits.

---

## Recommendations

### 🔥 CRITICAL: Fix Tier 10

**Option A: Lower Tier 10 boundary** (RECOMMENDED)
- Change from 411 → **360**
- New Tier 9: 310-359
- New Tier 10: 360+
- **Effect**: Tier 10 becomes achievable with 5-6 digit ×9 problems

**Option B: Increase carry weight**
- Change carry formula from `carries × 10` → `carries × 15`
- Max carry contribution: 150 points instead of 100
- **Effect**: High-carry problems can reach 440+ points
- **Risk**: May overvalue carries relative to multiplier complexity

**Option C: Adjust Tier 9-10 boundaries**
- Tier 9: 330-380
- Tier 10: 381+
- **Effect**: Creates smaller top-tier band, makes Tier 10 more exclusive

**RECOMMENDATION**: **Option A** - Lower Tier 10 to 360. This makes it achievable but still requires mastery of ×9 with 5-6 digits.

### 🟡 OPTIONAL: Expand Multiplier Ranges

**Current Issue**: Each multiplier only spans 3 tiers due to fixed complexity values.

**Possible Solution**: Add digit-based multiplier scaling
- Base multiplier score + (digits × multiplier_factor)
- Example: ×9 with 2 digits = 200 points, ×9 with 6 digits = 280 points
- **Effect**: Single multiplier could span 4-5 tiers

**Risk**: Adds complexity to formula, may confuse users

**RECOMMENDATION**: **Keep current formula**, but adjust tier boundaries to better accommodate multiplier lanes.

### 🟢 NICE-TO-HAVE: Tier Boundary Refinement

**Proposed New Boundaries**:

| Tier | Old Range | New Range | Change |
|------|-----------|-----------|--------|
| 1 | 0-80 | 0-80 | No change |
| 2 | 81-110 | 81-110 | No change |
| 3 | 111-140 | 111-140 | No change |
| 4 | 141-180 | 141-175 | Slightly narrower |
| 5 | 181-220 | 176-215 | Adjusted |
| 6 | 221-260 | 216-255 | Adjusted |
| 7 | 261-310 | 256-300 | Adjusted |
| 8 | 311-360 | 301-340 | Adjusted |
| 9 | 361-410 | 341-380 | Narrower |
| 10 | 411+ | **381+** | **MUCH LOWER** |

**Effect**: Better tier distribution, Tier 10 becomes achievable

---

## Validation Against Success Criteria

### Original Success Criteria

| Criterion | Status | Notes |
|-----------|--------|-------|
| All tiers reachable | 🔴 FAIL | Tier 10 unreachable |
| Balanced distribution | ✅ PASS | No tier > 25% (except Tier 10 at 0%) |
| Clear beginner progression | ✅ PASS | ×11 path is gentle and accessible |
| Tier 9-10 challenging | 🟡 PARTIAL | Tier 9 exists, Tier 10 doesn't |
| PB system motivating | ✅ PASS | Well-distributed tiers support PBs |
| Intuitive results | ✅ PASS | Harder problems = higher tiers |
| No dead zones | 🔴 FAIL | Tier 10 is a dead zone |

**Overall**: 🟡 **CONDITIONAL PASS** - System works well for Tier 1-9, but **Tier 10 must be fixed**.

---

## Action Items

### Immediate (Must Fix)

1. ✅ **Lower Tier 10 boundary to 360** (or 380)
   - Update `TIER_BOUNDARIES` in `utils.js`
   - Re-run distribution analysis
   - Validate Tier 10 becomes populated

2. ✅ **Test adjusted boundaries**
   - Ensure no new dead zones created
   - Verify Tier 9-10 balance

### Short-term (Should Do)

3. 🟡 **Conduct manual testing**
   - Play through progression paths
   - Validate "feel" of tier progression
   - Test PB system with real practice

4. 🟡 **Refine tier labels if needed**
   - Consider if "Master" at 360+ feels right
   - Maybe add sub-labels (Expert I, Expert II, Master)

### Long-term (Consider)

5. 🟢 **Add visual progress indicators**
   - Show tier progression chart
   - Highlight "next milestone" tier
   - Display distance to next tier

6. 🟢 **Formula sensitivity analysis**
   - Test alternative weight combinations
   - Consider non-linear scaling
   - Explore exponential difficulty curves

---

## Conclusion

The difficulty scoring system is **fundamentally sound** but needs **one critical fix**: making Tier 10 achievable.

**Strengths**:
- Excellent Tier 1-9 distribution
- Clear progression paths
- Well-balanced difficulty bands
- Strong foundation for PB system

**Weaknesses**:
- Tier 10 unreachable (demotivates advanced users)
- Multiplier "lanes" limit cross-tier progression
- Advanced path (×9) feels compressed

**Bottom Line**: With Tier 10 boundary adjustment to **360-380**, this system will:
- ✅ Provide clear progression from beginner to master
- ✅ Support motivating personal best tracking
- ✅ Create achievable but challenging goals at all levels
- ✅ Reward practice and skill development

**RECOMMENDATION**: **Adjust Tier 10 boundary to 360, then proceed with manual testing to validate the "feel".**
