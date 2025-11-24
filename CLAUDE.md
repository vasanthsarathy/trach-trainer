# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TrachTrainer** is a web-based interactive trainer for learning and mastering the Trachtenberg Speed System of Multiplication. The app aims to be the "csTimer for Trachtenberg" - a minimal, fast, focused practice tool.

## Core Domain Concepts

### Problem
A single multiplication question with:
- Operand 1 (the multi-digit number)
- Operand 2 (the multiplier: 3, 4, 5, 6, 7, 9, 11, 12, etc.)
- Trachtenberg method/rule to apply
- Optional metadata (digit count, difficulty score)

### Session
A collection of problems generated from user configuration:
- Selected multipliers (e.g., {11, 12, 5})
- Number of digits (min/max range)
- Mode (Easy/Standard/Hard/Extreme)
- Problem count or time limit
- Hints/tutorial toggles

Sessions are saved and replayable with the same problem sequence.

### Modes
1. **Easy**: Per-digit input fields + optional carry slots + hints + rule reminders
2. **Standard**: Per-digit fields but no carry UI + optional rule hint
3. **Hard**: Single full-answer input field + optional timer
4. **Extreme/Blitz**: Problem shown briefly then hidden, answer from memory, no hints

## Key Feature Areas

1. **Session Setup**: Configure multipliers, digit ranges, mode, problem count/duration
2. **Practice Interface**: Clean per-digit grid (Easy/Standard) or single input (Hard/Extreme), step-by-step feedback showing Trachtenberg rule application
3. **Tutorial Mode**: Interactive guided walkthroughs for each multiplier rule with visual overlays
4. **Hints & Rules**: Pop-up summaries, neighbor digit highlighting, odd/even condition explanations
5. **Session History**: Replay past sessions, view stats (accuracy, avg time, error patterns by multiplier)

## Design Principles

- **Minimalist, math-friendly**: Black on white, flat design, generous whitespace
- **Keyboard-friendly**: Tab navigation between digit inputs
- **Low friction**: Quick restart, "same settings" button
- **Non-distracting**: No animations or clutter, numbers are the main visual focus
- **Simplicity**: Every change should impact as little code as possible

## Architecture Notes

The codebase follows a simple, modular JavaScript architecture:
- **index.html**: Main structure with all screens (setup, practice, complete, history)
- **app.js**: Application logic and state management
- **rules.js**: Trachtenberg rule definitions and problem generation
- **utils.js**: Helper functions, storage, theming, and UI utilities
- **styles.css**: Minimal, clean styling with CSS variables

Key points:
- Focus on responsive webapp (desktop/tablet first)
- Prioritize local session storage initially (cloud sync is future work)
- Keep rule definitions modular and extensible
- Structure to support future adaptive drill modes and difficulty scoring

## Git Workflow and Issue Management

### Committing Changes

When committing changes to this repository:

1. **Review changes first**: Always run `git status` and `git diff` to verify what's being committed
2. **Check commit style**: Run `git log --oneline -5` to see recent commit message format
3. **Write clear commit messages**: Follow the existing style - descriptive, present tense
4. **Include co-authorship**: Add Claude Code attribution at the end:
   ```
   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

### Closing GitHub Issues

**IMPORTANT**: To automatically close GitHub issues, each issue MUST have its own commit with a proper keyword reference.

**Correct approach** - Create separate commits for each issue:
```bash
git commit -m "Fix extreme mode problem hiding

Fixes #1

Add timeout to hide problem after 3 seconds in extreme mode.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Incorrect approach** - Don't reference multiple issues in one commit:
```bash
# This does NOT work reliably:
git commit -m "Fixes #1, #2, and #3"
```

**GitHub auto-close keywords** (use in commit message body):
- `Fixes #123`
- `Closes #123`
- `Resolves #123`

**Workflow for fixing multiple issues:**
1. Make all code changes needed
2. Create one comprehensive commit with all changes
3. Create additional empty commits (using `--allow-empty`) for each issue:
   ```bash
   git commit --allow-empty -m "Fix [specific issue]

   Fixes #2

   [Brief description of what was fixed]"
   ```
4. Push all commits together: `git push`

This ensures each issue gets properly linked and closed on GitHub.
