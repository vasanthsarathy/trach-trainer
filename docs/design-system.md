# TrachTrainer Design System

## Overview

A minimal, professional design system with clean aesthetics focused on mathematical content. The system supports both light and dark modes with a blue and purple primary color scheme.

## Color Palette

### Light Mode

**Background & Surface**
- `--bg-primary`: `#FFFFFF` (Main background)
- `--bg-secondary`: `#F8F9FA` (Elevated surfaces)
- `--bg-tertiary`: `#F1F3F5` (Subtle backgrounds)

**Text**
- `--text-primary`: `#000000` (Main text)
- `--text-secondary`: `#495057` (Secondary text)
- `--text-tertiary`: `#868E96` (Muted text)

**Primary Colors**
- `--color-blue`: `#3B82F6` (Primary blue)
- `--color-blue-light`: `#60A5FA` (Hover state)
- `--color-blue-dark`: `#2563EB` (Active state)
- `--color-purple`: `#8B5CF6` (Primary purple)
- `--color-purple-light`: `#A78BFA` (Hover state)
- `--color-purple-dark`: `#7C3AED` (Active state)

**Semantic Colors**
- `--color-success`: `#10B981` (Correct answers)
- `--color-error`: `#EF4444` (Incorrect answers)
- `--color-warning`: `#F59E0B` (Warnings)
- `--color-info`: `#3B82F6` (Information)

**Borders & Dividers**
- `--border-light`: `#E9ECEF`
- `--border-medium`: `#DEE2E6`
- `--border-dark`: `#CED4DA`

### Dark Mode

**Background & Surface**
- `--bg-primary`: `#0F0F0F` (Main background)
- `--bg-secondary`: `#1A1A1A` (Elevated surfaces)
- `--bg-tertiary`: `#262626` (Subtle backgrounds)

**Text**
- `--text-primary`: `#FAFAFA` (Main text)
- `--text-secondary`: `#D4D4D4` (Secondary text)
- `--text-tertiary`: `#A3A3A3` (Muted text)

**Primary Colors**
- `--color-blue`: `#60A5FA` (Primary blue)
- `--color-blue-light`: `#93C5FD` (Hover state)
- `--color-blue-dark`: `#3B82F6` (Active state)
- `--color-purple`: `#A78BFA` (Primary purple)
- `--color-purple-light`: `#C4B5FD` (Hover state)
- `--color-purple-dark`: `#8B5CF6` (Active state)

**Semantic Colors**
- `--color-success`: `#34D399` (Correct answers)
- `--color-error`: `#F87171` (Incorrect answers)
- `--color-warning`: `#FBBF24` (Warnings)
- `--color-info`: `#60A5FA` (Information)

**Borders & Dividers**
- `--border-light`: `#262626`
- `--border-medium`: `#404040`
- `--border-dark`: `#525252`

## Typography

### Font Families

**Primary**: `Inter, system-ui, -apple-system, sans-serif`
- Used for UI elements, body text, and most content

**Monospace**: `'JetBrains Mono', 'Fira Code', 'Consolas', monospace`
- Used for numbers in problems and answers

### Font Weights

- `--font-thin`: 200
- `--font-light`: 300
- `--font-normal`: 400
- `--font-medium`: 500
- `--font-semibold`: 600

**Default weight**: 300 (light) for most text to achieve the thin, clean look

### Font Sizes

- `--text-xs`: 0.75rem (12px)
- `--text-sm`: 0.875rem (14px)
- `--text-base`: 1rem (16px)
- `--text-lg`: 1.125rem (18px)
- `--text-xl`: 1.25rem (20px)
- `--text-2xl`: 1.5rem (24px)
- `--text-3xl`: 1.875rem (30px)
- `--text-4xl`: 2.25rem (36px)
- `--text-5xl`: 3rem (48px)

### Line Heights

- `--leading-tight`: 1.25
- `--leading-snug`: 1.375
- `--leading-normal`: 1.5
- `--leading-relaxed`: 1.625

## Spacing

Based on 4px base unit:

- `--space-1`: 0.25rem (4px)
- `--space-2`: 0.5rem (8px)
- `--space-3`: 0.75rem (12px)
- `--space-4`: 1rem (16px)
- `--space-5`: 1.25rem (20px)
- `--space-6`: 1.5rem (24px)
- `--space-8`: 2rem (32px)
- `--space-10`: 2.5rem (40px)
- `--space-12`: 3rem (48px)
- `--space-16`: 4rem (64px)
- `--space-20`: 5rem (80px)

## Border Radius

- `--radius-sm`: 0.25rem (4px)
- `--radius-md`: 0.5rem (8px)
- `--radius-lg`: 0.75rem (12px)
- `--radius-xl`: 1rem (16px)
- `--radius-full`: 9999px (Circular)

## Shadows

**Light Mode**
- `--shadow-sm`: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- `--shadow-md`: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- `--shadow-lg`: 0 10px 15px -3px rgba(0, 0, 0, 0.1)

**Dark Mode**
- `--shadow-sm`: 0 1px 2px 0 rgba(0, 0, 0, 0.3)
- `--shadow-md`: 0 4px 6px -1px rgba(0, 0, 0, 0.4)
- `--shadow-lg`: 0 10px 15px -3px rgba(0, 0, 0, 0.5)

## Component Guidelines

### Buttons

**Primary** (Blue)
- Background: `--color-blue`
- Text: `#FFFFFF`
- Hover: `--color-blue-light`
- Active: `--color-blue-dark`

**Secondary** (Purple)
- Background: `--color-purple`
- Text: `#FFFFFF`
- Hover: `--color-purple-light`
- Active: `--color-purple-dark`

**Tertiary** (Outline)
- Background: transparent
- Border: `--border-medium`
- Text: `--text-primary`

### Input Fields

- Background: `--bg-secondary`
- Border: `--border-medium`
- Focus border: `--color-blue`
- Text: `--text-primary`
- Font weight: `--font-light`

### Cards

- Background: `--bg-secondary`
- Border: `--border-light`
- Border radius: `--radius-lg`
- Shadow: `--shadow-sm`
- Padding: `--space-6`

### Problem Grid

- Digit boxes: Monospace font, `--text-4xl` or larger
- Background: `--bg-tertiary`
- Border: `--border-medium`
- Spacing: `--space-4` between digits
- Generous whitespace around central problem

## Design Principles

1. **Minimalist**: No unnecessary visual elements, no gradients, flat design
2. **Math-focused**: Numbers are the hero, everything else supports them
3. **Professional**: Clean, modern, business-appropriate
4. **Readable**: Thin fonts with high contrast, generous whitespace
5. **Accessible**: Clear color contrast ratios (WCAG AA compliant minimum)
