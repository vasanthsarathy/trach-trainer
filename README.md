# TrachTrainer

A web-based interactive trainer for learning and mastering the **Trachtenberg Speed System of Multiplication**. Think of it as "csTimer for Trachtenberg" - a minimal, fast, focused practice tool.

## What is the Trachtenberg System?

The Trachtenberg System is a mental math technique that allows you to multiply large numbers quickly using specific patterns and rules. Instead of traditional multiplication, each multiplier (2, 3, 4, 5, 6, 7, 8, 9, 11, 12) has its own unique rule that makes calculations faster and easier.

## Features

- **🎓 Tutorial Mode (NEW!)**
  - **Complete learning journey** from beginner to advanced
  - **10 sequential lessons** covering all multipliers (×11 → ×12 → ×6 → ×7 → ×5 → ×8 → ×9 → ×4 → ×2 → ×3)
  - **4-phase structure** per lesson:
    - Introduction (understand the "why")
    - Theory (learn the rule with examples)
    - Guided Practice (step-by-step prompts)
    - Independent Practice (demonstrate mastery)
  - **Automatic unlocking** - complete one lesson to unlock the next
  - **Progress tracking** - picks up where you left off

- **Multiple Practice Modes**
  - **Easy**: Per-digit input fields with carry slots and rule hints
  - **Standard**: Per-digit fields without carry UI, optional hints
  - **Hard**: Single answer input field
  - **Extreme**: Problem shown briefly then hidden, answer from memory

- **Difficulty Tiers**
  - **10 tiers** of difficulty based on problem complexity
  - **Smart problem generation** - practice specific difficulty levels
  - **Live preview** - see example problems before starting a session

- **Customizable Sessions**
  - Select which multipliers to practice (×2, ×3, ×4, ×5, ×6, ×7, ×8, ×9, ×11, ×12)
  - Choose target tier (automatically sets appropriate digit counts)
  - Set number of problems per session

- **Interactive Learning**
  - Step-by-step feedback showing Trachtenberg rule application
  - Built-in rules reference panel
  - Detailed session history with problem-by-problem review
  - Progress tracking across all lessons

- **Clean, Minimal Interface**
  - Dark/light theme toggle
  - Keyboard-friendly navigation
  - Mobile-responsive design
  - Optional on-screen numpad

## Getting Started

### For Complete Beginners

**Start with Tutorial Mode!**

1. Open `index.html` in your web browser
2. Click the **Tutorial** button in the header
3. Start with **×11: Add the Neighbor** (the easiest lesson)
4. Progress through all 4 phases of the lesson
5. Complete the lesson to unlock **×12**, then continue through the curriculum

The tutorial will guide you step-by-step from zero knowledge to mastering all 10 Trachtenberg multipliers.

### For Practice Sessions

1. Open `index.html` in your web browser
2. Configure your practice session:
   - Select multipliers to practice
   - Choose target tier (1-10)
   - Select difficulty mode (Easy/Standard/Hard/Extreme)
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
├── index.html              # Main HTML structure
├── styles.css              # All styling and design system
├── app.js                  # Main application logic
├── rules.js                # Trachtenberg rules and problem generation
├── utils.js                # Helper functions and utilities
├── tutorial-content.js     # Tutorial lesson content (all 10 multipliers)
├── tutorial-manager.js     # Tutorial state management and progression
├── tutorial-ui.js          # Tutorial rendering and UI logic
├── CLAUDE.md               # Project instructions for AI assistants
└── README.md               # This file
```

### No Build Process Required

This is a pure vanilla JavaScript application. No npm packages, no build tools, no dependencies. Just open `index.html` in a browser and start practicing!

### Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Custom Properties
- LocalStorage API
- Flexbox and CSS Grid

## Deployment

The live site is hosted on **Cloudflare Pages** at: **https://trach-trainer.pages.dev**

### Deploying Updates

There are two ways to deploy updates to the live site:

#### Method 1: Automatic Deployment via GitHub (Recommended)

Set up automatic deployments so every push to `main` triggers a new deployment:

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
2. Select the **trach-trainer** project
3. Go to **Settings** → **Builds & deployments**
4. Under **Build configurations**, connect to your GitHub repository
5. Set **Production branch** to `main`

Once configured, simply:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Cloudflare will automatically build and deploy within 1-2 minutes.

#### Method 2: Manual Deployment via Wrangler CLI

For immediate deployment or when you want more control:

**First-time setup:**
```bash
# Authenticate with Cloudflare (only needed once)
npx wrangler login
```

**Deploy updates:**
```bash
# From the project root directory
npx wrangler pages deploy . --project-name=trach-trainer --commit-dirty=true
```

This uploads your files directly and deploys in seconds.

**Common deployment commands:**
```bash
# Deploy current directory
npx wrangler pages deploy .

# Deploy with a commit message
npx wrangler pages deploy . --commit-message="Add new feature"

# Deploy a specific branch
npx wrangler pages deploy . --branch=development
```

### Viewing Deployments

- **Production URL**: https://trach-trainer.pages.dev
- **Dashboard**: https://dash.cloudflare.com → Pages → trach-trainer
- **Deployment history**: View all past deployments and roll back if needed

### Custom Domain (Optional)

To use a custom domain like `trach.vsarathy.com`:

1. Go to Cloudflare Pages Dashboard → **trach-trainer**
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your subdomain (e.g., `trach.vsarathy.com`)
5. Follow the DNS configuration instructions

### Future: Adding Backend Features

When you're ready to add user authentication and cloud storage:

1. **Cloudflare Workers** - Add API endpoints for backend logic
2. **Cloudflare D1** - SQLite database for user data and sessions
3. **Cloudflare KV** - Key-value storage for sessions/cache

All can be configured in the same project with `wrangler.toml`.

## The Trachtenberg Rules

Quick reference (see Rules panel in app for details):

- **×2**: Double each digit
- **×3**: Subtract from 10 (rightmost) or 9 (middle), double, add 5 if odd, add ⌊neighbor/2⌋
- **×4**: Like ×9 but with ⌊neighbor/2⌋ instead of full neighbor
- **×5**: 5 if digit odd + ⌊right neighbor/2⌋
- **×6**: Add 5 if digit odd + ⌊right neighbor/2⌋
- **×7**: 2×digit + 5 if digit odd + ⌊right neighbor/2⌋
- **×8**: Subtract from 10 (rightmost) or 9 (middle), double, add neighbor
- **×9**: Subtract from 10 (rightmost), subtract from 9 and add neighbor (middle), reduce leftmost by 1
- **×11**: Add the neighbor (right digit)
- **×12**: 2×digit + neighbor

## Tips for Learning

1. **Start with Tutorial Mode** - The best way to learn! Complete all 10 lessons in order for a structured learning experience
2. **Follow the curriculum** - Tutorial lessons are ordered by difficulty: ×11 → ×12 → ×6 → ×7 → ×5 → ×8 → ×9 → ×4 → ×2 → ×3
3. **Complete each phase** - Don't skip ahead; each phase (Intro → Theory → Guided → Independent) builds on the previous
4. **Use Practice Mode after learning** - Once you've completed tutorial lessons, use Practice Mode to build speed and accuracy
5. **Start with Easy Mode** - When practicing, get comfortable with the rules using hints and carry slots
6. **Reference the Rules panel** - Keep it open while learning or practicing
7. **Progress gradually** - Move to Standard mode once comfortable, then Hard, then Extreme
8. **Track your progress** - Review session history to see improvement over time

## Contributing

See `CONTRIBUTING.md` for coding standards and best practices.

## License

This project is open source and available for educational purposes.

## Acknowledgments

Based on the Trachtenberg Speed System of Basic Mathematics, developed by Jakow Trachtenberg.
