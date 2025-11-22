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

(This section will be expanded as the codebase develops)

The codebase does not yet exist. When implementing:
- Focus on responsive webapp (desktop/tablet first)
- Prioritize local session storage initially (cloud sync is future work)
- Keep rule definitions modular and extensible
- Structure to support future adaptive drill modes and difficulty scoring
