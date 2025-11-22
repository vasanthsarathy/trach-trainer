# TrachTrainer

A web-based interactive trainer for learning and mastering the **Trachtenberg Speed System of Multiplication**. Think of it as "csTimer for Trachtenberg" - a minimal, fast, focused practice tool.

## What is the Trachtenberg System?

The Trachtenberg System is a mental math technique that allows you to multiply large numbers quickly using specific patterns and rules. Instead of traditional multiplication, each multiplier (5, 6, 7, 9, 11, 12) has its own unique rule that makes calculations faster and easier.

## Features

- **Multiple Practice Modes**
  - **Easy**: Per-digit input fields with carry slots and rule hints
  - **Standard**: Per-digit fields without carry UI, optional hints
  - **Hard**: Single answer input field
  - **Extreme**: Problem shown briefly then hidden, answer from memory

- **Customizable Sessions**
  - Select which multipliers to practice (×5, ×6, ×7, ×9, ×11, ×12)
  - Choose digit range (2-6 digits)
  - Set number of problems per session

- **Interactive Learning**
  - Step-by-step feedback showing Trachtenberg rule application
  - Built-in rules reference panel
  - Session history with accuracy tracking

- **Clean, Minimal Interface**
  - Dark/light theme toggle
  - Keyboard-friendly navigation
  - Mobile-responsive design

## Getting Started

### Quick Start

1. Open `index.html` in your web browser
2. Configure your practice session:
   - Select multipliers to practice
   - Set digit range (min and max)
   - Choose difficulty mode
   - Set number of problems
3. Click "Start Practice"
4. Enter your answers digit-by-digit (Easy/Standard) or as a full number (Hard/Extreme)
5. Review step-by-step explanations after each problem

### Using the Rules Panel

- Click the **Rules** button in the header to open the rules reference panel
- View all Trachtenberg multiplication rules at any time
- Close the panel when done or keep it open while practicing

### Keyboard Shortcuts

- **Tab**: Navigate between digit input fields
- **Enter**: Submit answer or proceed to next problem
- **Backspace**: Navigate to previous input field (when current is empty)

## Practice Modes Explained

### Easy Mode
Perfect for beginners. Shows:
- Individual input fields for each digit
- Carry value slots above each digit
- Rule hint displayed under the problem
- Step-by-step explanation after submission

### Standard Mode
For intermediate learners:
- Individual digit input fields
- No carry UI (calculate mentally)
- No hints (use Rules panel if needed)
- Step-by-step explanation after submission

### Hard Mode
For advanced users:
- Single input field for the entire answer
- No hints or guidance
- Step-by-step verification after submission

### Extreme Mode
For speed training:
- Problem briefly displayed then hidden
- Answer from memory
- Single input field
- No hints or assistance

## Session History

Your practice sessions are automatically saved in browser localStorage. View your history by clicking the **History** button to see:
- Accuracy percentage
- Number of correct answers
- Average time per problem
- Session configuration details

## Development

### File Structure

```
trach-trainer/
├── index.html          # Main HTML structure
├── styles.css          # All styling and design system
├── app.js              # Main application logic
├── rules.js            # Trachtenberg rules and problem generation
├── utils.js            # Helper functions and utilities
├── CLAUDE.md           # Project instructions for AI assistants
└── README.md           # This file
```

### No Build Process Required

This is a pure vanilla JavaScript application. No npm packages, no build tools, no dependencies. Just open `index.html` in a browser and start practicing!

### Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Custom Properties
- LocalStorage API
- Flexbox and CSS Grid

## The Trachtenberg Rules

Quick reference (see Rules panel in app for details):

- **×5**: 5 if digit odd + ⌊right neighbor/2⌋
- **×6**: Add 5 if digit odd + ⌊right neighbor/2⌋
- **×7**: 2×digit + 5 if digit odd + ⌊right neighbor/2⌋
- **×9**: Subtract from 10 (rightmost), subtract from 9 and add neighbor (middle), reduce leftmost by 1
- **×11**: Add the neighbor (right digit)
- **×12**: 2×digit + neighbor

## Tips for Learning

1. **Start with Easy Mode** - Get comfortable with the rules using hints and carry slots
2. **Master one multiplier at a time** - Focus on ×11 first (easiest), then ×12, ×5, etc.
3. **Use 3-digit numbers initially** - Build confidence before moving to larger numbers
4. **Reference the Rules panel** - Keep it open while learning
5. **Progress gradually** - Move to Standard mode once you're comfortable, then Hard
6. **Track your progress** - Review your session history to see improvement

## Contributing

See `CONTRIBUTING.md` for coding standards and best practices.

## License

This project is open source and available for educational purposes.

## Acknowledgments

Based on the Trachtenberg Speed System of Basic Mathematics, developed by Jakow Trachtenberg.
