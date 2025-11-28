# TrachTrainer - GitHub Issues Plan of Attack

## Priority 1: Bug Fixes ✓ COMPLETED

### Issue #12: Prevent typing letters in input fields ✓
- [x] Update input validation to only allow numbers in answer boxes
- [x] Update input validation for carry slots in Easy mode
- [x] Test on all modes (Easy/Standard/Hard/Extreme)

**Changes Made:**
- Added input validation to carry inputs (app.js:333-336)
- Added input validation to digit inputs (app.js:366-367)
- Added input validation to single answer input (app.js:403-406)
- All inputs now filter out non-numeric characters using regex replace
- Single input allows commas for number formatting

### Issue #14: Numpad not scaling on mobile ✓
- [x] Investigate current mobile responsiveness issues
- [x] Consider using native mobile keyboard instead of custom numpad on mobile
- [x] Test responsive behavior on various mobile screen sizes
- [x] Adjust numpad CSS for better mobile scaling

**Changes Made:**
- Hide numpad panel completely on mobile (styles.css:512-514)
- Hide numpad toggle button on mobile (styles.css:516-518)
- Mobile users now use native device keyboard instead
- Breakpoint: max-width 768px

### Issue #13: Figure out scoring and difficulty
- [ ] Research difficulty scoring algorithms
- [ ] Define difficulty factors (digit count, multiplier type, etc.)
- [ ] Implement normalized time tracking per difficulty level
- [ ] Update session history to show difficulty-adjusted metrics

## Priority 2: Quick Enhancement Wins

### Issue #11: Select all/clear multipliers
- [ ] Add "Select All" button to multiplier checkboxes
- [ ] Add "Clear" button to deselect all multipliers
- [ ] Position buttons logically near checkboxes

### Issue #10: More compact, mathy UI design
- [ ] Reduce padding/spacing throughout
- [ ] Adjust typography for more "mathy" feel (monospace fonts, tighter spacing)
- [ ] Review and simplify visual design
- [ ] Maintain readability while increasing information density

## Priority 3: Feature Enhancements

### Issue #5: Tutorial mode
- [ ] Design step-by-step tutorial flow
- [ ] Create tutorial UI components
- [ ] Implement guided walkthrough for each multiplier rule
- [ ] Add progress indicators and hints
- [ ] Add visual overlays to highlight neighbor digits

### Issue #7: Updated session history with problem details
- [ ] Extend session storage to include individual problem details
- [ ] Create detailed problem replay view
- [ ] Show solution steps for each problem
- [ ] Add navigation between problems in a session

### Issue #6: About page
- [ ] Research Jakow Trachtenberg history
- [ ] Write concise description of the system
- [ ] Add biography and harrowing story
- [ ] Include link to buy the book
- [ ] Create simple about page UI

### Issue #8: Background music
- [ ] Research royalty-free classical music sources (Indian & Western)
- [ ] Implement audio player controls
- [ ] Add music selection interface
- [ ] Ensure non-intrusive UX with volume controls

### Issue #9: Visual effects and gamification
- [ ] Brainstorm simple gamification ideas (money collection, etc.)
- [ ] Design reward/collection system
- [ ] Implement visual feedback for achievements
- [ ] Keep it minimal and non-distracting

---

## Suggested Order of Attack

**Phase 1 - Critical Bugs (Do First)**
1. Issue #12 - Prevent typing letters (quick fix, improves UX immediately)
2. Issue #14 - Mobile numpad scaling (important for mobile users)

**Phase 2 - Quick Wins (Easy Enhancements)**
3. Issue #11 - Select all/clear buttons (very quick to implement)
4. Issue #10 - Compact UI design (visual polish)

**Phase 3 - Medium Complexity Features**
5. Issue #13 - Scoring and difficulty (requires design decisions)
6. Issue #6 - About page (straightforward content page)

**Phase 4 - Complex Features (Save for Later)**
7. Issue #5 - Tutorial mode (significant new feature)
8. Issue #7 - Enhanced session history (data structure changes)
9. Issue #8 - Background music (external resource integration)
10. Issue #9 - Gamification (requires design brainstorming)

---

## Review

### Phase 1 Completion Summary

**Completed:** Issues #12 and #14 (Critical Bugs)

**Issue #12: Prevent typing letters in input fields**
- Simple, surgical fix using regex input validation
- Added to all three input types: carry inputs, digit inputs, and single answer input
- Users can no longer type letters - only numbers (and commas in single input mode)
- Zero breaking changes to existing functionality

**Issue #14: Mobile numpad scaling**
- Elegant solution: Hide custom numpad on mobile, use native keyboard instead
- Better UX - native keyboards are optimized per device
- Saves screen real estate on mobile
- Clean CSS-only solution with @media query

**Files Modified:**
- `app.js` - Added input validation (3 locations)
- `styles.css` - Updated mobile media query for numpad

**Next Steps:**
- Ready to move to Phase 2 (Quick Enhancement Wins)
- Issues #11 and #10 are next in priority


---

# PREVIOUS COMPLETED WORK

## Bugs Fixed (Completed)

### Bug #1: Extreme mode doesn't work ✓
- **File**: `app.js:11, 229-240`
- **Change**: Added timeout to hide problem display after 3 seconds in extreme mode
- **Impact**: Extreme mode now properly hides the problem

### Bug #2: Can't handle commas ✓
- **File**: `app.js:356`
- **Change**: Added `.replace(/,/g, '')` to strip commas before parsing
- **Impact**: Users can now enter answers with commas (e.g., "1,234")

### Bug #3: Empty slots not being ignored ✓
- **File**: `app.js:352`
- **Change**: Removed `|| '0'` fallback when collecting digit inputs
- **Impact**: Empty input slots no longer contribute zeros

## Features Added (Completed)

### Issue #4: Numpad with Directional Input ✓
- Added collapsible numpad interface
- Implemented directional input (R→L and L→R)
- Works in all modes (Easy/Standard/Hard/Extreme)
- Touch-friendly design
