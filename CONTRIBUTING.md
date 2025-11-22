# Contributing to TrachTrainer

Thank you for your interest in contributing to TrachTrainer! This document outlines the coding standards and best practices for this project.

## Design Philosophy

TrachTrainer follows these core principles:

1. **Simplicity First** - Every change should impact as little code as possible
2. **No Dependencies** - Pure vanilla JavaScript, no build tools, no npm packages
3. **Minimal and Fast** - Keep the app lightweight and performant
4. **Math-Friendly** - Clean, distraction-free interface focused on numbers

## Coding Standards

### JavaScript

#### General Guidelines

- Use **ES6+ features** (const/let, arrow functions, template literals, etc.)
- Use **camelCase** for variables and functions
- Use **PascalCase** for object/module names (e.g., `TrachtenbergRules`, `ProblemGenerator`)
- Keep functions small and focused on a single task
- Prefer pure functions when possible (no side effects)

#### Code Organization

```javascript
// Good: Clear, single-purpose function
function formatDuration(ms) {
  return (ms / 1000).toFixed(1) + 's';
}

// Bad: Function doing too much
function processAndDisplayResult(problem, userAnswer, startTime) {
  // Too many responsibilities in one function
}
```

#### Variable Naming

```javascript
// Good: Descriptive names
const currentProblemIndex = 0;
const sessionStartTime = Date.now();
const isCorrectAnswer = userAnswer === correctAnswer;

// Bad: Unclear abbreviations
const idx = 0;
const st = Date.now();
const flag = userAnswer === correctAnswer;
```

#### Object and Module Pattern

Follow the existing patterns in the codebase:

```javascript
// Helper modules (utils.js pattern)
const ModuleName = {
  method1() {
    // Implementation
  },
  
  method2() {
    // Implementation
  }
};

// Application state (app.js pattern)
const App = {
  // State properties
  currentSession: null,
  
  // Methods
  init() {
    // Initialization
  },
  
  methodName() {
    // Implementation
  }
};
```

#### Comments

- Use comments to explain **why**, not **what**
- Document complex algorithms (especially Trachtenberg rule implementations)
- Keep comments concise and up-to-date

```javascript
// Good: Explains why
// Prepend 0 to handle leftmost position uniformly
const digits = [0, ...numberToDigits(num)];

// Bad: States the obvious
// Set x to 5
const x = 5;
```

### HTML

- Use **semantic HTML5** elements
- Keep structure clean and minimal
- Use **kebab-case** for IDs and classes
- Include descriptive comments for major sections

```html
<!-- Good -->
<section id="practice-screen" class="screen">
  <div class="practice-container">
    <!-- Practice UI -->
  </div>
</section>

<!-- Bad -->
<div id="screen2" class="scr">
  <div class="cont">
    <!-- ... -->
  </div>
</div>
```

### CSS

#### Design System

TrachTrainer uses a **CSS custom properties** (variables) design system. Always use variables instead of hardcoded values:

```css
/* Good: Using design system variables */
.button {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  color: var(--text-primary);
  background-color: var(--color-blue);
  border-radius: var(--radius-md);
}

/* Bad: Hardcoded values */
.button {
  padding: 12px 24px;
  font-size: 16px;
  color: #000000;
  background-color: #3B82F6;
  border-radius: 8px;
}
```

#### Class Naming

- Use **kebab-case** for all class names
- Follow BEM-like naming for components (but keep it simple)
- Use descriptive, semantic names

```css
/* Good */
.problem-display { }
.digit-input { }
.feedback-message { }
.btn-primary { }

/* Bad */
.pd { }
.input1 { }
.msg { }
.b1 { }
```

#### Organization

- Group related styles together
- Use comments to separate major sections
- Keep specificity low (avoid deep nesting)

```css
/* ===== COMPONENT NAME ===== */

.component {
  /* Layout */
  display: flex;
  padding: var(--space-4);
  
  /* Typography */
  font-size: var(--text-base);
  color: var(--text-primary);
  
  /* Visual */
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}
```

## File Structure

Maintain the simple, flat file structure:

```
trach-trainer/
├── index.html          # Main HTML structure
├── styles.css          # All styling and design system
├── app.js              # Main application logic
├── rules.js            # Trachtenberg rules and calculations
├── utils.js            # Helper functions and utilities
├── CLAUDE.md           # AI assistant instructions
├── CONTRIBUTING.md     # This file
└── README.md           # User documentation
```

**Do not** create subdirectories unless absolutely necessary. Keep it simple.

## Git Workflow

### Commit Messages

Use clear, descriptive commit messages in imperative mood:

```bash
# Good
git commit -m "Add rules panel toggle functionality"
git commit -m "Fix carry calculation in ×7 rule"
git commit -m "Update README with keyboard shortcuts"

# Bad
git commit -m "changes"
git commit -m "fixed stuff"
git commit -m "updated files"
```

### Commit Structure

- Keep commits focused on a single change
- Test your changes before committing
- Update documentation if adding features

## Testing

Before submitting changes:

1. **Manual Testing**
   - Test in Chrome/Firefox/Safari
   - Test on mobile (responsive design)
   - Test all four difficulty modes
   - Verify all multipliers work correctly

2. **Verification Checklist**
   - [ ] No console errors
   - [ ] All features work as expected
   - [ ] Dark/light themes both look good
   - [ ] Rules panel opens/closes smoothly
   - [ ] Step-by-step calculations are correct
   - [ ] LocalStorage saves/loads properly

## Adding New Features

### Adding a New Multiplier

1. Add rule definition to `rules.js`:
   ```javascript
   8: {
     name: '×8',
     hint: 'Your rule description',
     calculate(num) {
       return num * 8;
     },
     showSteps(num) {
       // Implementation
     }
   }
   ```

2. Add checkbox to setup screen in `index.html`
3. Rule will automatically appear in Rules panel

### Adding a New Mode

1. Add radio button to setup screen in `index.html`
2. Handle mode in `App.createAnswerInput()`
3. Update documentation in README

## Code Review Guidelines

When reviewing code, check for:

- Adherence to coding standards above
- Simplicity (is this the simplest solution?)
- Consistency with existing code
- No unnecessary dependencies or complexity
- Proper use of the design system
- Correct Trachtenberg rule implementation

## Questions?

If you're unsure about anything, check:
1. Existing code patterns in the codebase
2. The CLAUDE.md file for project context
3. Open an issue for discussion

## License

By contributing, you agree that your contributions will be licensed under the same terms as the project.
