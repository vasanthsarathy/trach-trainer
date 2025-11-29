/**
 * TrachTrainer - Main Application Logic
 */

// Application State
const App = {
  currentSession: null,
  currentProblemIndex: 0,
  problemStartTime: null,
  sessionConfig: null,
  extremeModeTimeout: null,

  init() {
    // Initialize theme
    Theme.init();

    // Populate rules panel
    RulesPanel.populate();

    // Initialize numpad
    Numpad.trackFocusedInput();
    Numpad.open(); // Open numpad by default

    // Set up event listeners
    this.setupEventListeners();

    // Show setup screen by default
    Screen.show('setup-screen');
  },

  setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
      Theme.toggle();
    });

    // Rules panel toggle
    document.getElementById('rules-toggle').addEventListener('click', () => {
      RulesPanel.toggle();
    });

    document.getElementById('close-rules').addEventListener('click', () => {
      RulesPanel.close();
    });

    // Numpad toggle (header button)
    document.getElementById('numpad-toggle-btn').addEventListener('click', () => {
      Numpad.toggle();
    });

    // Numpad toggle (panel button)
    document.getElementById('toggle-numpad').addEventListener('click', () => {
      Numpad.toggle();
    });

    // Numpad direction toggle
    document.getElementById('direction-toggle').addEventListener('click', () => {
      Numpad.toggleDirection();
    });

    // Numpad button handlers
    document.querySelectorAll('.numpad-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const value = e.target.dataset.value;
        const action = e.target.dataset.action;

        if (value) {
          Numpad.handleDigitInput(value);
        } else if (action === 'backspace') {
          Numpad.handleBackspace();
        } else if (action === 'clear') {
          Numpad.handleClear();
        }
      });
    });

    // Setup screen
    document.getElementById('start-session-btn').addEventListener('click', () => {
      this.startSession();
    });

    // Multiplier select all/clear buttons
    document.getElementById('select-all-multipliers').addEventListener('click', () => {
      document.querySelectorAll('input[name="multiplier"]').forEach(checkbox => {
        checkbox.checked = true;
      });
    });

    document.getElementById('clear-all-multipliers').addEventListener('click', () => {
      document.querySelectorAll('input[name="multiplier"]').forEach(checkbox => {
        checkbox.checked = false;
      });
    });

    // Tier selection handlers
    document.querySelectorAll('.btn-tier').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tier = parseInt(e.target.dataset.tier);

        // Visual feedback
        document.querySelectorAll('.btn-tier').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Update tier description and preview
        this.updateTierDescription(tier);
        this.updateTierPreview();
      });
    });

    // Update preview when multipliers change
    document.querySelectorAll('input[name="multiplier"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateTierPreview();
      });
    });

    // Set default tier to 5
    const defaultTierBtn = document.querySelector('.btn-tier[data-tier="5"]');
    if (defaultTierBtn) {
      defaultTierBtn.click();
    }

    // Practice screen
    document.getElementById('submit-answer-btn').addEventListener('click', () => {
      this.submitAnswer();
    });

    document.getElementById('next-problem-btn').addEventListener('click', () => {
      this.nextProblem();
    });

    document.getElementById('end-session-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to end this session?')) {
        this.endSession();
      }
    });

    // Complete screen
    document.getElementById('new-session-btn').addEventListener('click', () => {
      Screen.show('setup-screen');
    });

    document.getElementById('same-config-btn').addEventListener('click', () => {
      if (this.sessionConfig) {
        this.startSessionWithConfig(this.sessionConfig);
      }
    });

    document.getElementById('view-history-btn').addEventListener('click', () => {
      this.showHistory();
    });

    // History screen
    document.getElementById('history-btn').addEventListener('click', () => {
      this.showHistory();
    });

    document.getElementById('back-to-setup-btn').addEventListener('click', () => {
      Screen.show('setup-screen');
    });

    // About screen
    document.getElementById('about-btn').addEventListener('click', () => {
      Screen.show('about-screen');
    });

    document.getElementById('about-back-btn').addEventListener('click', () => {
      Screen.show('setup-screen');
    });

    // Progress screen
    document.getElementById('progress-btn').addEventListener('click', () => {
      this.showProgressScreen();
    });

    document.getElementById('progress-back-btn').addEventListener('click', () => {
      Screen.show('setup-screen');
    });

    // Enter key on answer inputs
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      const currentScreen = Screen.current();

      // Space bar to start session (only on setup screen)
      if (e.code === 'Space' && currentScreen === 'setup-screen') {
        e.preventDefault();

        const activeElement = document.activeElement;
        const isInputField = activeElement && (
          activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA'
        );

        if (!isInputField) {
          this.startSession();
        }
      }

      // Enter key on practice screen
      if (e.key === 'Enter' && currentScreen === 'practice-screen') {
        const feedbackVisible = document.getElementById('feedback-display').style.display !== 'none';
        if (feedbackVisible) {
          this.nextProblem();
        } else {
          this.submitAnswer();
        }
      }
    });
  },

  startSession() {
    // Get configuration from form
    const config = this.getSessionConfig();

    // Validate configuration
    if (config.multipliers.length === 0) {
      alert('Please select at least one multiplier');
      return;
    }

    if (!config.targetTier || config.targetTier < 1 || config.targetTier > 10) {
      alert('Please select a target tier (1-10)');
      return;
    }

    this.startSessionWithConfig(config);
  },

  startSessionWithConfig(config) {
    this.sessionConfig = config;

    // Generate problems
    const problems = ProblemGenerator.generateSet(config);

    // Create session object
    this.currentSession = {
      id: generateId(),
      config,
      problems,
      startTime: Date.now(),
      endTime: null
    };

    this.currentProblemIndex = 0;

    // Show practice screen with first problem
    Screen.show('practice-screen');
    this.showProblem();
  },

  getSessionConfig() {
    // Get selected multipliers
    const multiplierCheckboxes = document.querySelectorAll('input[name="multiplier"]:checked');
    const multipliers = Array.from(multiplierCheckboxes).map(cb => parseInt(cb.value));

    // Get selected tier
    const selectedTierBtn = document.querySelector('.btn-tier.active');
    const targetTier = selectedTierBtn ? parseInt(selectedTierBtn.dataset.tier) : 5;

    // Get mode
    const modeRadio = document.querySelector('input[name="mode"]:checked');
    const mode = modeRadio ? modeRadio.value : 'easy';

    // Get problem count
    const problemCount = parseInt(document.getElementById('problem-count').value);

    return {
      multipliers,
      targetTier,
      mode,
      problemCount
    };
  },

  updateTierDescription(tier) {
    const descriptions = {
      1: 'Tier 1 - Beginner: Easiest problems, perfect for learning the basics',
      2: 'Tier 2 - Easy: Simple problems with smaller numbers',
      3: 'Tier 3 - Basic: Building confidence with straightforward calculations',
      4: 'Tier 4 - Developing: Moderate difficulty, good for practice',
      5: 'Tier 5 - Intermediate: Balanced challenge for regular practice',
      6: 'Tier 6 - Moderate: Requires solid understanding of the rules',
      7: 'Tier 7 - Challenging: Complex problems for experienced users',
      8: 'Tier 8 - Advanced: High difficulty, tests your mastery',
      9: 'Tier 9 - Expert: Very challenging, near-master level',
      10: 'Tier 10 - Master: Ultimate challenge, hardest problems'
    };

    const descElement = document.getElementById('tier-description');
    if (descElement) {
      descElement.textContent = descriptions[tier] || 'Select a tier to practice';
    }
  },

  updateTierPreview() {
    const selectedTierBtn = document.querySelector('.btn-tier.active');
    const tier = selectedTierBtn ? parseInt(selectedTierBtn.dataset.tier) : null;

    const multiplierCheckboxes = document.querySelectorAll('input[name="multiplier"]:checked');
    const multipliers = Array.from(multiplierCheckboxes).map(cb => parseInt(cb.value));

    const examplesDiv = document.getElementById('tier-examples');

    if (!tier || multipliers.length === 0) {
      examplesDiv.innerHTML = '<p style="margin: 0;">Select a tier and at least one multiplier to see examples</p>';
      return;
    }

    // Generate 3-4 example problems for the selected tier and multipliers
    const examples = [];
    const maxExamples = Math.min(4, multipliers.length);

    for (let i = 0; i < maxExamples; i++) {
      const multiplier = multipliers[i % multipliers.length];
      try {
        const problem = ProblemGenerator.generateForTier(multiplier, tier, 20);
        examples.push({
          problem: `${problem.operand1} × ${problem.operand2}`,
          answer: problem.correctAnswer,
          digits: String(problem.operand1).length,
          multiplier: problem.operand2
        });
      } catch (e) {
        // If we can't generate a problem for this multiplier/tier combo, skip it
        continue;
      }
    }

    if (examples.length === 0) {
      examplesDiv.innerHTML = '<p style="margin: 0;">No problems available for this tier with selected multipliers. Try a different tier or select different multipliers.</p>';
      return;
    }

    examplesDiv.innerHTML = examples.map(ex => `
      <div class="tier-example">
        <span class="tier-example-problem">${ex.problem}</span>
        <span class="tier-example-answer">${ex.digits}-digit → ${ex.answer}</span>
      </div>
    `).join('');
  },

  showProblem() {
    const problem = this.currentSession.problems[this.currentProblemIndex];

    // Update progress
    document.getElementById('current-problem').textContent = this.currentProblemIndex + 1;
    document.getElementById('total-problems').textContent = this.currentSession.problems.length;

    // Finalize difficulty calculation with carry info (if not already done)
    if (!problem.difficulty.tierLabel) {
      const rule = TrachtenbergRules[problem.operand2];
      const { steps } = rule.showSteps(problem.operand1);
      DifficultyCalculator.addCarryInfo(problem.difficulty, steps);
    }

    // Display difficulty badge
    const difficultyBadge = document.getElementById('problem-difficulty');
    if (difficultyBadge) {
      difficultyBadge.textContent = `Tier ${problem.difficulty.tier} • ${problem.difficulty.tierLabel}`;
      difficultyBadge.className = `difficulty-badge tier-${problem.difficulty.tier}`;
    }

    // Show problem operands - display as individual digits for alignment
    const operandsDiv = document.getElementById('problem-operands');
    operandsDiv.innerHTML = '';
    operandsDiv.style.display = 'flex';
    operandsDiv.style.justifyContent = 'center';
    operandsDiv.style.alignItems = 'center';
    operandsDiv.style.gap = 'var(--space-4)';

    // Create a row for the operand with extra space on left
    const operandRow = document.createElement('div');
    operandRow.className = 'digit-grid-input';
    operandRow.style.marginBottom = '0';

    const operandDigits = String(problem.operand1).split('');
    const extraSlots = 2;

    // Add empty slots on the left
    for (let i = 0; i < extraSlots; i++) {
      const emptySlot = document.createElement('div');
      emptySlot.className = 'digit-display';
      emptySlot.textContent = '';
      operandRow.appendChild(emptySlot);
    }

    // Add operand digits
    operandDigits.forEach(digit => {
      const digitDiv = document.createElement('div');
      digitDiv.className = 'digit-display';
      digitDiv.textContent = digit;
      operandRow.appendChild(digitDiv);
    });

    operandsDiv.appendChild(operandRow);

    // Add the multiplication sign and multiplier on the same line
    const multiplierText = document.createElement('div');
    multiplierText.style.fontSize = 'var(--text-3xl)';
    multiplierText.style.fontFamily = 'var(--font-mono)';
    multiplierText.style.fontWeight = 'var(--font-light)';
    multiplierText.textContent = `× ${problem.operand2}`;
    operandsDiv.appendChild(multiplierText);

    // Show hint only in easy mode
    const mode = this.currentSession.config.mode;
    const hintElement = document.getElementById('problem-hint');
    if (mode === 'easy') {
      hintElement.textContent = problem.hint;
    } else {
      hintElement.textContent = '';
    }

    // Create answer input based on mode
    this.createAnswerInput(problem);

    // Hide feedback
    document.getElementById('feedback-display').style.display = 'none';
    document.getElementById('submit-answer-btn').style.display = 'block';

    // Extreme mode: hide problem after brief delay
    if (mode === 'extreme') {
      // Clear any existing timeout
      if (this.extremeModeTimeout) {
        clearTimeout(this.extremeModeTimeout);
      }

      // Hide problem after 3 seconds
      this.extremeModeTimeout = setTimeout(() => {
        operandsDiv.style.display = 'none';
      }, 3000);
    }

    // Initialize numpad focus for the new problem
    setTimeout(() => {
      Numpad.initializeFocus();
    }, 100);

    // Start timer
    this.problemStartTime = Date.now();
  },

  createAnswerInput(problem) {
    const inputArea = document.getElementById('answer-input-area');
    inputArea.innerHTML = '';

    const mode = this.currentSession.config.mode;

    // Calculate input slots: operand1 length + 2 extra slots on the left
    const operandLength = String(problem.operand1).length;
    const extraSlots = 2;
    const totalSlots = operandLength + extraSlots;

    if (mode === 'easy' || mode === 'standard') {
      // Per-digit input
      const containerDiv = document.createElement('div');
      containerDiv.style.display = 'flex';
      containerDiv.style.flexDirection = 'column';
      containerDiv.style.alignItems = 'center';
      containerDiv.style.gap = 'var(--space-2)';

      // Wrapper to align answer slots with operand
      const alignmentWrapper = document.createElement('div');
      alignmentWrapper.style.display = 'flex';
      alignmentWrapper.style.justifyContent = 'center';
      alignmentWrapper.style.gap = 'var(--space-4)';

      // Left spacer to align with operand (matches multiplier width)
      const leftSpacer = document.createElement('div');
      leftSpacer.style.visibility = 'hidden';
      leftSpacer.style.fontSize = 'var(--text-3xl)';
      leftSpacer.style.fontFamily = 'var(--font-mono)';
      leftSpacer.style.fontWeight = 'var(--font-light)';
      leftSpacer.textContent = `× ${problem.operand2}`;

      // Carry row (only for Easy mode)
      if (mode === 'easy') {
        const carryRow = document.createElement('div');
        carryRow.className = 'digit-grid-input';
        carryRow.style.marginBottom = 'var(--space-1)';

        for (let i = 0; i < totalSlots; i++) {
          const carryInput = document.createElement('input');
          carryInput.type = 'text';
          carryInput.className = 'carry-input';
          carryInput.maxLength = 1;
          carryInput.dataset.carryIndex = i;
          carryInput.placeholder = '0';

          // Only allow numeric input
          carryInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
          });

          carryRow.appendChild(carryInput);
        }

        const carryWrapper = document.createElement('div');
        carryWrapper.style.display = 'flex';
        carryWrapper.style.justifyContent = 'center';
        carryWrapper.style.gap = 'var(--space-4)';

        const carryLeftSpacer = leftSpacer.cloneNode(true);
        carryWrapper.appendChild(carryRow);
        carryWrapper.appendChild(carryLeftSpacer);

        containerDiv.appendChild(carryWrapper);
      }

      // Answer digit row
      const gridDiv = document.createElement('div');
      gridDiv.className = 'digit-grid-input';

      for (let i = 0; i < totalSlots; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'digit-input';
        input.maxLength = 1;
        input.dataset.digitIndex = i;

        // Auto-focus to left (Trachtenberg works right-to-left)
        input.addEventListener('input', (e) => {
          // Only allow numeric input
          e.target.value = e.target.value.replace(/[^0-9]/g, '');

          if (e.target.value && i > 0) {
            const prevInput = gridDiv.querySelector(`[data-digit-index="${i - 1}"]`);
            if (prevInput) prevInput.focus();
          }
        });

        // Backspace to right
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !e.target.value && i < totalSlots - 1) {
            const nextInput = gridDiv.querySelector(`[data-digit-index="${i + 1}"]`);
            if (nextInput) nextInput.focus();
          }
        });

        gridDiv.appendChild(input);
      }

      alignmentWrapper.appendChild(gridDiv);
      alignmentWrapper.appendChild(leftSpacer);
      containerDiv.appendChild(alignmentWrapper);
      inputArea.appendChild(containerDiv);

      // Auto-focus first extra slot (leftmost)
      const firstInput = gridDiv.querySelector('[data-digit-index="0"]');
      if (firstInput) firstInput.focus();

    } else {
      // Single input for hard/extreme modes
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'input single-answer-input';
      input.id = 'single-answer';
      input.placeholder = 'Enter answer';

      // Only allow numeric input (and commas for formatting)
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9,]/g, '');
      });

      inputArea.appendChild(input);
      input.focus();
    }
  },

  submitAnswer() {
    const problem = this.currentSession.problems[this.currentProblemIndex];
    const mode = this.currentSession.config.mode;

    // Get user answer
    let userAnswer;
    if (mode === 'easy' || mode === 'standard') {
      const inputs = document.querySelectorAll('.digit-input');
      const digits = Array.from(inputs).map(input => input.value);
      userAnswer = parseInt(digits.join(''));
    } else {
      const input = document.getElementById('single-answer');
      userAnswer = parseInt(input.value.replace(/,/g, '')) || 0;
    }

    // Calculate time taken
    const timeTaken = Date.now() - this.problemStartTime;

    // Update problem with user answer
    problem.userAnswer = userAnswer;
    problem.isCorrect = userAnswer === problem.correctAnswer;
    problem.timeTaken = timeTaken;

    // Check for records and update personal bests
    const records = PersonalBests.checkForRecords(problem);
    PersonalBests.updateWithProblem(problem);

    // Show feedback with records
    this.showFeedback(problem, records);
  },

  showFeedback(problem, records = []) {
    const feedbackDiv = document.getElementById('feedback-display');
    const messageDiv = document.getElementById('feedback-message');

    const isCorrect = problem.isCorrect;

    // Get step-by-step explanation
    const rule = TrachtenbergRules[problem.operand2];
    let stepsHtml = '';

    if (rule && rule.showSteps) {
      const { steps, result } = rule.showSteps(problem.operand1);

      // Verify that procedure matches calculator
      const calculatorResult = problem.correctAnswer;
      const procedureMatches = result === calculatorResult;

      stepsHtml = `
        <div style="margin-top: var(--space-6); padding: var(--space-4); background-color: var(--bg-tertiary); border-radius: var(--radius-md);">
          <h4 style="font-weight: var(--font-normal); margin-bottom: var(--space-3);">Trachtenberg Method (${problem.rule}):</h4>
          <div style="font-family: var(--font-mono); font-size: var(--text-sm); line-height: 1.8;">
            ${steps.map((step, i) => `
              <div>Position ${step.position}: ${step.calculation} → digit: ${step.digit}${step.newCarry ? ', carry: ' + step.newCarry : ''}</div>
            `).join('')}
          </div>
          <div style="margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--border-medium);">
            <strong>Procedure result:</strong> <span class="font-mono">${result}</span>
            ${!procedureMatches ? '<span class="text-error"> ⚠ Procedure mismatch!</span>' : ''}
          </div>
          <div style="margin-top: var(--space-2);">
            <strong>Calculator verification:</strong> <span class="font-mono">${calculatorResult}</span> ✓
          </div>
        </div>
      `;
    }

    // Build PB comparison message
    let pbHtml = '';
    if (isCorrect && problem.timeTaken) {
      const pb = PersonalBests.get();
      const tierBest = pb.bestTimeByTier[problem.difficulty.tier];
      const timeSeconds = (problem.timeTaken / 1000).toFixed(1);

      if (tierBest) {
        const bestSeconds = (tierBest.time / 1000).toFixed(1);
        if (records.length > 0) {
          pbHtml = `<p class="pb-comparison">Time: ${timeSeconds}s <span class="new-record">🎉 New Record!</span> (prev: ${bestSeconds}s)</p>`;
        } else {
          const diff = ((problem.timeTaken - tierBest.time) / 1000).toFixed(1);
          pbHtml = `<p class="pb-comparison">Time: ${timeSeconds}s (best: ${bestSeconds}s, ${diff > 0 ? '+' : ''}${diff}s)</p>`;
        }
      } else {
        pbHtml = `<p class="pb-comparison">Time: ${timeSeconds}s <span class="new-record">🎉 First solve in Tier ${problem.difficulty.tier}!</span></p>`;
      }
    }

    messageDiv.innerHTML = `
      <div class="feedback-result ${isCorrect ? 'text-success' : 'text-error'}">
        ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}
      </div>
      <div class="text-secondary">
        <p><strong>Your answer:</strong> <span class="font-mono">${problem.userAnswer}</span></p>
        <p><strong>Correct answer:</strong> <span class="font-mono">${problem.correctAnswer}</span></p>
        <p><strong>Time taken:</strong> ${formatDuration(problem.timeTaken)}</p>
        ${pbHtml}
      </div>
      ${stepsHtml}
    `;

    feedbackDiv.style.display = 'block';
    document.getElementById('submit-answer-btn').style.display = 'none';

    // Focus next button
    document.getElementById('next-problem-btn').focus();
  },

  nextProblem() {
    this.currentProblemIndex++;

    if (this.currentProblemIndex < this.currentSession.problems.length) {
      // Show next problem
      this.showProblem();
    } else {
      // Session complete
      this.completeSession();
    }
  },

  completeSession() {
    // Mark session as complete
    this.currentSession.endTime = Date.now();

    // Save session to localStorage
    Storage.addSession(this.currentSession);

    // Calculate stats
    const stats = this.calculateSessionStats();

    // Show complete screen
    this.showCompleteScreen(stats);
  },

  endSession() {
    this.currentSession.endTime = Date.now();
    Storage.addSession(this.currentSession);
    Screen.show('setup-screen');
  },

  calculateSessionStats() {
    const problems = this.currentSession.problems;
    const answered = problems.filter(p => p.userAnswer !== null);
    const correct = problems.filter(p => p.isCorrect === true);

    const totalTime = answered.reduce((sum, p) => sum + (p.timeTaken || 0), 0);
    const avgTime = answered.length > 0 ? totalTime / answered.length : 0;
    const accuracy = answered.length > 0 ? (correct.length / answered.length) * 100 : 0;

    // Calculate difficulty range
    const tiers = answered.map(p => p.difficulty.tier);
    const minTier = tiers.length > 0 ? Math.min(...tiers) : 0;
    const maxTier = tiers.length > 0 ? Math.max(...tiers) : 0;

    // Count records broken (check each problem)
    const recordsCount = answered.reduce((count, p) => {
      return count + PersonalBests.checkForRecords(p).length;
    }, 0);

    return {
      total: problems.length,
      answered: answered.length,
      correct: correct.length,
      accuracy: Math.round(accuracy),
      avgTime,
      minTier,
      maxTier,
      recordsCount
    };
  },

  showCompleteScreen(stats) {
    document.getElementById('stat-accuracy').textContent = stats.accuracy + '%';
    document.getElementById('stat-correct').textContent =
      `${stats.correct}/${stats.answered}`;
    document.getElementById('stat-avg-time').textContent = formatDuration(stats.avgTime);

    // Display difficulty stats
    const difficultyText = stats.minTier === stats.maxTier
      ? `Tier ${stats.minTier}`
      : `Tier ${stats.minTier}-${stats.maxTier}`;
    const difficultyElement = document.getElementById('stat-difficulty');
    if (difficultyElement) {
      difficultyElement.textContent = difficultyText;
    }

    const recordsElement = document.getElementById('stat-records');
    if (recordsElement) {
      recordsElement.textContent = stats.recordsCount;
    }

    Screen.show('complete-screen');
  },

  showProgressScreen() {
    const mastery = ProgressTracker.getTierMastery();
    const multipliers = ProgressTracker.getMultiplierPerformance();
    const pb = PersonalBests.get();

    // Render tier grid
    const tierGrid = document.getElementById('tier-grid');
    if (tierGrid) {
      tierGrid.innerHTML = mastery.map(tier => `
        <div class="tier-tile ${tier.isMastered ? 'mastered' : ''} ${!tier.isUnlocked ? 'locked' : ''}">
          <div class="tier-number">Tier ${tier.tier}</div>
          <div class="tier-label">${tier.label}</div>
          ${tier.isUnlocked ? `
            <div class="tier-stats">
              <div>${tier.accuracy.toFixed(0)}% accuracy</div>
              <div>${(tier.avgTime / 1000).toFixed(1)}s avg</div>
              <div>${tier.attempted} attempts</div>
            </div>
          ` : '<div class="tier-locked">🔒 Not attempted</div>'}
        </div>
      `).join('');
    }

    // Render multiplier performance
    const multChart = document.getElementById('multiplier-chart');
    if (multChart) {
      multChart.innerHTML = multipliers.map(m => `
        <div class="mult-bar">
          <div class="mult-label">×${m.multiplier}</div>
          <div class="mult-progress-bar">
            <div class="mult-fill" style="width: ${m.accuracy}%"></div>
          </div>
          <div class="mult-stats">${m.accuracy.toFixed(0)}% (${m.totalCorrect}/${m.totalAttempts})</div>
        </div>
      `).join('');
    }

    // Render personal records
    const recordsList = document.getElementById('records-list');
    if (recordsList) {
      const records = Object.entries(pb.bestTimeByTier)
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([tier, record]) => `
          <div class="record-item">
            <span class="record-tier">Tier ${tier}</span>
            <span class="record-time">${(record.time / 1000).toFixed(1)}s</span>
          </div>
        `).join('');
      recordsList.innerHTML = records || '<p class="text-secondary">No records yet. Keep practicing!</p>';
    }

    // Render milestones
    const milestones = document.getElementById('milestones-display');
    if (milestones) {
      milestones.innerHTML = `
        <div class="milestone-item">
          <div class="milestone-value">${pb.milestones.totalProblems}</div>
          <div class="milestone-label">Problems Solved</div>
        </div>
        <div class="milestone-item">
          <div class="milestone-value">${pb.milestones.overallAccuracy.toFixed(0)}%</div>
          <div class="milestone-label">Overall Accuracy</div>
        </div>
        <div class="milestone-item">
          <div class="milestone-value">${pb.milestones.tiersMastered.length}/10</div>
          <div class="milestone-label">Tiers Mastered</div>
        </div>
        <div class="milestone-item">
          <div class="milestone-value">${pb.milestones.longestStreak}</div>
          <div class="milestone-label">Best Streak</div>
        </div>
      `;
    }

    Screen.show('progress-screen');
  },

  showHistory() {
    const sessions = Storage.getSessions();
    const historyList = document.getElementById('history-list');

    if (sessions.length === 0) {
      historyList.innerHTML = `
        <div class="history-empty">
          <p>No sessions yet. Complete a practice session to see it here!</p>
        </div>
      `;
    } else {
      historyList.innerHTML = sessions.map((session, index) => {
        const stats = this.calculateStatsForSession(session);
        const date = formatDate(session.startTime);
        const multipliers = session.config.multipliers.map(m => '×' + m).join(', ');
        const tierInfo = session.config.targetTier ? `Tier ${session.config.targetTier}` :
                        `${session.config.minDigits}-${session.config.maxDigits} digits`;

        return `
          <div class="history-item" data-session-index="${index}">
            <div class="history-item-header" onclick="App.toggleSessionDetails(${index})">
              <div class="history-date">${date}</div>
              <div class="history-stats">
                <span class="${stats.accuracy >= 80 ? 'text-success' : 'text-secondary'}">
                  ${stats.accuracy}% accuracy
                </span>
                <span class="text-secondary">
                  ${stats.correct}/${stats.total} correct
                </span>
                <span class="text-secondary">
                  ${formatDuration(stats.avgTime)} avg
                </span>
              </div>
              <button class="history-expand-btn" aria-label="Expand details">▼</button>
            </div>
            <div class="history-config">
              ${multipliers} • ${tierInfo} • ${session.config.mode} mode
            </div>
            <div class="history-details" id="history-details-${index}" style="display: none;">
              ${this.renderSessionProblems(session)}
            </div>
          </div>
        `;
      }).join('');
    }

    Screen.show('history-screen');
  },

  toggleSessionDetails(sessionIndex) {
    const detailsDiv = document.getElementById(`history-details-${sessionIndex}`);
    const expandBtn = document.querySelector(`[data-session-index="${sessionIndex}"] .history-expand-btn`);

    if (detailsDiv.style.display === 'none') {
      detailsDiv.style.display = 'block';
      expandBtn.textContent = '▲';
      expandBtn.setAttribute('aria-label', 'Collapse details');
    } else {
      detailsDiv.style.display = 'none';
      expandBtn.textContent = '▼';
      expandBtn.setAttribute('aria-label', 'Expand details');
    }
  },

  renderSessionProblems(session) {
    return `
      <div class="session-problems">
        ${session.problems.map((problem, index) => `
          <div class="problem-review">
            <div class="problem-review-header">
              <div class="problem-review-number">#${index + 1}</div>
              <div class="problem-review-problem">${problem.operand1} × ${problem.operand2}</div>
              <div class="problem-review-status ${problem.isCorrect ? 'correct' : 'incorrect'}">
                ${problem.isCorrect ? '✓' : '✗'}
              </div>
            </div>
            <div class="problem-review-answers">
              <div class="problem-review-answer">
                <span class="label">Your answer:</span>
                <span class="${problem.isCorrect ? 'correct' : 'incorrect'}">${problem.userAnswer || '(skipped)'}</span>
              </div>
              ${!problem.isCorrect ? `
                <div class="problem-review-answer">
                  <span class="label">Correct answer:</span>
                  <span class="correct">${problem.correctAnswer}</span>
                </div>
              ` : ''}
              <div class="problem-review-time">
                <span class="label">Time:</span>
                <span>${formatDuration(problem.timeTaken || 0)}</span>
              </div>
            </div>
            <button class="btn btn-sm btn-outline" onclick="App.toggleSolution(event, '${session.id}', ${index})">
              Show Solution
            </button>
            <div class="problem-solution" id="solution-${session.id}-${index}" style="display: none;">
              ${this.renderProblemSolution(problem)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  toggleSolution(event, sessionId, problemIndex) {
    const solutionDiv = document.getElementById(`solution-${sessionId}-${problemIndex}`);
    const btn = event.target;

    if (solutionDiv.style.display === 'none') {
      solutionDiv.style.display = 'block';
      btn.textContent = 'Hide Solution';
    } else {
      solutionDiv.style.display = 'none';
      btn.textContent = 'Show Solution';
    }
  },

  renderProblemSolution(problem) {
    const rule = TrachtenbergRules[problem.operand2];
    if (!rule) return '<p>Solution not available</p>';

    const { steps } = rule.showSteps(problem.operand1);

    return `
      <div class="solution-steps">
        <h4>Trachtenberg Method: ${rule.name}</h4>
        <p class="solution-hint">${rule.hint}</p>
        <div class="solution-steps-list">
          ${steps.map((step, index) => `
            <div class="solution-step">
              <div class="solution-step-number">Step ${index + 1}</div>
              <div class="solution-step-calc">${step.calculation}</div>
              <div class="solution-step-result">
                Digit: <strong>${step.digit}</strong>
                ${step.newCarry > 0 ? `, Carry: ${step.newCarry}` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="solution-final">
          Final answer: <strong>${problem.correctAnswer}</strong>
        </div>
      </div>
    `;
  },

  calculateStatsForSession(session) {
    const problems = session.problems;
    const answered = problems.filter(p => p.userAnswer !== null);
    const correct = problems.filter(p => p.isCorrect === true);

    const totalTime = answered.reduce((sum, p) => sum + (p.timeTaken || 0), 0);
    const avgTime = answered.length > 0 ? totalTime / answered.length : 0;
    const accuracy = answered.length > 0 ? (correct.length / answered.length) * 100 : 0;

    return {
      total: problems.length,
      correct: correct.length,
      accuracy: Math.round(accuracy),
      avgTime
    };
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
