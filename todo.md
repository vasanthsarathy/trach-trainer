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

## Priority 2: Quick Enhancement Wins ✓ COMPLETED

### Issue #11: Select all/clear multipliers ✓
- [x] Add "Select All" button to multiplier checkboxes
- [x] Add "Clear" button to deselect all multipliers
- [x] Position buttons logically near checkboxes

**Changes Made:**
- Added HTML structure for Select All/Clear buttons (index.html:82-89)
- Added CSS styling for btn-link and multiplier actions (styles.css:605-637)
- Added event listeners in setupEventListeners (app.js:82-93)
- Buttons styled as minimal links with bullet separator

### Issue #10: More compact, mathy UI design ✓
- [x] Reduce padding/spacing throughout
- [x] Adjust typography for more "mathy" feel (monospace fonts, tighter spacing)
- [x] Review and simplify visual design
- [x] Maintain readability while increasing information density

**Changes Made:**
- Reduced card padding: 16px → 12px (styles.css:277)
- Tightened form spacing: 12px → 8px margins (styles.css:594)
- Made section titles smaller and more compact (styles.css:575-579)
- Reduced digit boxes: 3rem width, 3.5rem height (styles.css:282-295)
- Reduced input fields: 3rem width, 3.5rem height (styles.css:801-813)
- Tightened checkbox grid gaps: 12px → 8px (styles.css:649)
- Added monospace font to problem displays with letter-spacing (styles.css:754-760)
- Changed font weights from light to medium for better readability
- Reduced border radius throughout for tighter, technical look
- Tightened digit-grid gaps: 16px → 8px (styles.css:785)

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

### Phase 2 Completion Summary

**Completed:** Issues #11 and #10 (Quick Enhancement Wins)

**Issue #11: Select all/clear multipliers**
- Added link-style buttons next to "Select Multipliers" label
- Simple, clean design with bullet separator
- Click handlers in setupEventListeners
- Improves UX for quickly configuring practice sessions

**Issue #10: Compact, mathy UI design**
- Systematically reduced padding and spacing throughout
- Changed typography to use monospace fonts for numbers
- Tightened all grid gaps and margins
- Used medium font weights instead of light for better readability at smaller sizes
- Reduced border radius for more technical appearance
- Significant information density improvement while maintaining readability

**Files Modified:**
- `index.html` - Added select all/clear buttons
- `app.js` - Added event listeners
- `styles.css` - Extensive spacing and typography updates (20+ locations)

**Next Steps:**
- Phase 1 & 2 complete!
- Ready for Phase 3 (Medium Complexity Features)
- Consider: Issue #13 (Scoring), Issue #6 (About page)


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
