Here’s a clean project description you can drop into a doc / README and refine as we go.

---

# Project Description: Trachtenberg Practice Web App

## 1. Working Title

**Working title:** *TrachTrainer* (placeholder – can be renamed later)

A web-based, interactive trainer for learning, practicing, and mastering the **Trachtenberg Speed System of Multiplication** through structured sessions, adaptive difficulty, and guided tutorials.

---

## 2. Purpose & Vision

The Trachtenberg system replaces standard multiplication tables with simple, local digit rules (doubling, halving, adding neighbors, small carries). It’s powerful, but most learners struggle to:

* Remember the rules for different multipliers (×11, ×12, ×5, ×6, ×7, ×9, etc.)
* Apply those rules consistently under time pressure
* Build intuition and automaticity through targeted practice

**This app’s goal** is to be the *csTimer for Trachtenberg*:

* A **minimal, fast, mathy** tool that:

  * Generates random practice problems
  * Lets you configure exactly what you want to train
  * Guides you step-by-step when needed
  * Challenges you with harder modes when you’re ready
  * Tracks and replays sessions for deliberate practice

---

## 3. Target Users & Use Cases

### 3.1 Users

* **Beginners**: People just learning the Trachtenberg rules for specific multipliers (e.g., ×11 and ×12).
* **Intermediate learners**: Users who know the rules but want speed, accuracy, and confidence.
* **Power users / math nerds**: People who want high-speed mental drills and difficulty metrics.

### 3.2 Core Use Cases

1. **Focused practice session**

   * “I want to practice ×11 on 3–5 digit numbers for 10 minutes in easy mode.”
2. **Mixed drill session**

   * “Give me a mixed set of ×5, ×6, ×7, ×11, ×12 with 2–4 digit numbers.”
3. **Tutorial learning**

   * “Teach me how the ×12 rule works and walk me through a few examples step-by-step.”
4. **Challenge mode**

   * “Fast questions, minimal support, timed pressure, and stats.”
5. **Replay & review**

   * “Replay the exact problems from my last session and see where I hesitated or made mistakes.”

---

## 4. Core Concepts

### 4.1 Problem

A **problem** is a single multiplication question, e.g.:

* Operand 1: `348`
* Operand 2: `11`
* Method: `Trachtenberg ×11 rule`
* Metadata: number of digits, estimated difficulty (optional, see §9)

### 4.2 Session

A **session** is a collection of problems generated under a specific configuration:

* Selected multipliers (e.g., {11, 12, 5, 6, 7})
* Number of digits (min/max)
* Mode (Easy / Standard / Hard / Extreme)
* Number of problems / time limit
* Whether hints/tutorials are enabled

Sessions are:

* **Saved** so a user can revisit results later
* **Replayable** with the same sequence of problems

### 4.3 Modes

Modes define how much scaffolding is present:

1. **Easy Mode**

   * Per-digit input fields for the answer
   * Optional per-digit carry slots (tiny boxes above digits)
   * Problem stays visible until user submits
   * Hints available (rule reminder, neighbor diagram)

2. **Standard Mode**

   * Per-digit input fields, but **no explicit carry slots**
   * Optional rule hint (e.g., “digit + neighbor” for ×11)
   * Problem visible until submit

3. **Hard Mode**

   * Single input field for the full answer (no per-digit grid)
   * No carry annotation UI
   * Optional timer per problem

4. **Extreme / Blitz Mode**

   * Problem is shown for a short time (e.g., 3–5 seconds) then hidden
   * User must type the answer from memory
   * No hints, no per-digit fields
   * Optional streak and accuracy stats shown inline

---

## 5. Feature Overview

### 5.1 Session Setup

Users can configure:

* **Multipliers to practice**

  * E.g., checkboxes for ×5, ×6, ×7, ×9, ×11, ×12, ×3, ×4, etc.
* **Number of digits**

  * `min_digits` and `max_digits` for the base number (e.g., 2–5)
* **Session size / duration**

  * Number of problems (e.g., 20, 50, 100) or time limit (e.g., 10 minutes)
* **Mode**

  * Easy / Standard / Hard / Extreme
* Optional:

  * Turn hints on/off
  * Show rules inline vs. in a side panel

### 5.2 Practice Interface

For each problem, the UI shows:

* The operands (e.g., `743 × 11`)
* A **clean per-digit grid** (in Easy/Standard Mode):

  * Top row: digits of the problem
  * Middle row: optional carry slots
  * Bottom row: answer digit boxes
* For Extreme Mode:

  * Only the question line, then a single input field once the question disappears

Feedback after submission:

* Correct answer vs. user answer
* Optionally show a **step-by-step Trachtenberg breakdown**:

  * Which digit + neighbor or digit + half(neighbor) was applied
  * Where carries happened

### 5.3 Tutorial Mode

A dedicated **Tutorial Mode** that:

* Introduces one multiplier at a time (e.g., “Learn ×11”)
* Explains the Trachtenberg rule with examples:

  * Visual overlay: highlights each digit and its neighbor
* Walks the user through:

  * From left to right, one digit at a time
  * User enters each digit and any carry
  * System shows the “rule text” under each step (“digit + neighbor”)
* Ends with a short quiz using Easy Mode problems

Tutorials should feel like an **interactive guided derivation**, not just static text.

### 5.4 Hints & Rule Support

Hints may include:

* Small pop-up summaries:

  * **×11 rule**: “Each middle digit is digit + neighbor”
  * **×12 rule**: “Digit + double(neighbor)”
  * **×5 rule**: “Half neighbor + 5 if digit is odd”
* Optional visual aids:

  * Highlighted neighbor digits when the user focuses an answer box
  * Explanation of “odd/even” condition when applicable

### 5.5 Session History & Replay

* Each session is saved with:

  * Timestamp
  * Configuration (rules, digit ranges, mode)
  * Problem set (operands, correct answers)
  * User performance (time per problem, correctness, error patterns)

Users can:

* **Replay a past session**:

  * Same problems in same order
  * Optionally in a different mode
* View **summary stats**:

  * Accuracy (% correct)
  * Average time per problem
  * Which multipliers caused most errors
  * Optionally per-digit error patterns (e.g., frequent mistakes in the middle of the number)

---

## 6. Difficulty & “Scramble Rating” (Optional)

Inspired by csTimer’s scramble difficulty, we can define a **“problem difficulty score”** based on structural features of the multiplication:

Possible contributing factors:

1. **Length of the number**

   * More digits → more steps

2. **Rule complexity of chosen multiplier**

   * For example:

     * ×11, ×12: low complexity
     * ×5, ×9: medium complexity
     * ×6, ×7, ×8: higher complexity
   * Each multiplier can have a base difficulty weight.

3. **Number of carry operations expected**

   * More carries → more cognitively demanding

4. **Digit patterns**

   * Many similar digits (e.g., repeated 9s) can be harder because of carry chains.
   * Alternating digits might require more careful attention.

A simple prototype difficulty function could be:

> **Difficulty = (digit_length × length_weight)
>
> * (multiplier_complexity_weight)
> * (expected_carry_count × carry_weight)**

This is a **nice-to-have**, not core to MVP, but can be surfaced as:

* A small “difficulty bar” or numerical rating next to each problem
* An average difficulty summary per session

---

## 7. UI / UX Principles

* **Minimalist, math-friendly design**

  * Black text on white background
  * Occasional color:

    * Green for correct
    * Red for incorrect / errors
  * Flat, clean visual language, no skeuomorphic elements

* **Focus on numbers and structure**

  * Generous whitespace around the central problem
  * Per-digit boxes aligned like paper layout
  * Clear typeface (monospace or clean sans-serif)

* **Low friction**

  * Keyboard-friendly inputs (Tab to move between digits)
  * Quick restart / “Next session with same settings” button

* **Non-distracting**

  * Avoid animations or clutter
  * Let the numbers and patterns be the main visual objects

---

## 8. Non-Goals (for Now)

To keep the initial scope tight, the following are **explicit non-goals** for v1:

* No full “social” features (leaderboards, accounts with friends, etc.) beyond basic saving of local sessions (though future cloud sync is possible).
* No full generic arithmetic trainer (focus strictly on Trachtenberg multiplication, not all mental math techniques).
* No mobile app initially; focus on a responsive webapp that works well on desktop and tablet (mobile-friendly later if desired).

---

## 9. Future Extensions

Potential future directions:

* **Adaptive drill mode**: system biases future problems toward rules and positions you frequently miss.
* **Mixed-rule challenges**: e.g., random choice among ×5, ×6, ×7, ×9, ×11, ×12, with no hint as to which rule applies (user must recognize by multiplier).
* **User-defined rule notes**: users can add their own mnemonics to each rule.
* **Export/import sessions**: share problem sets with others.
* **Teacher / coach mode**: assign specific problem sets or tutorials to students.

---
