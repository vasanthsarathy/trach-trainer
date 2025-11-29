# TrachTrainer

A web-based interactive trainer for learning and mastering the **Trachtenberg Speed System of Multiplication**. Think of it as "csTimer for Trachtenberg" - a minimal, fast, focused practice tool.

## What is the Trachtenberg System?

The Trachtenberg System is a mental math technique that allows you to multiply large numbers quickly using specific patterns and rules. Instead of traditional multiplication, each multiplier (2, 3, 4, 5, 6, 7, 8, 9, 11, 12) has its own unique rule that makes calculations faster and easier.

## Features

- **Multiple Practice Modes**
  - **Easy**: Per-digit input fields with carry slots and rule hints
  - **Standard**: Per-digit fields without carry UI, optional hints
  - **Hard**: Single answer input field
  - **Extreme**: Problem shown briefly then hidden, answer from memory

- **Customizable Sessions**
  - Select which multipliers to practice (×2, ×3, ×4, ×5, ×6, ×7, ×8, ×9, ×11, ×12)
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

1. **Start with Easy Mode** - Get comfortable with the rules using hints and carry slots
2. **Master one multiplier at a time** - Focus on ×2 or ×11 first (easiest), then ×12, ×3, ×5, etc.
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
