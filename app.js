/**
 * TrachTrainer - Main Application Logic
 */

// Application State
const App = {
  currentSession: null,
  currentProblemIndex: 0,
  problemStartTime: null,
  sessionConfig: null,

  init() {
    // Initialize theme
    Theme.init();

    // Populate rules panel
    RulesPanel.populate();

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

    // Setup screen
    document.getElementById('start-session-btn').addEventListener('click', () => {
      this.startSession();
    });

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

    // Enter key on answer inputs
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && Screen.current() === 'practice-screen') {
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

    if (config.minDigits > config.maxDigits) {
      alert('Min digits cannot be greater than max digits');
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

    // Get digit range
    const minDigits = parseInt(document.getElementById('min-digits').value);
    const maxDigits = parseInt(document.getElementById('max-digits').value);

    // Get mode
    const modeRadio = document.querySelector('input[name="mode"]:checked');
    const mode = modeRadio ? modeRadio.value : 'easy';

    // Get problem count
    const problemCount = parseInt(document.getElementById('problem-count').value);

    return {
      multipliers,
      minDigits,
      maxDigits,
      mode,
      problemCount
    };
  },

  showProblem() {
    const problem = this.currentSession.problems[this.currentProblemIndex];

    // Update progress
    document.getElementById('current-problem').textContent = this.currentProblemIndex + 1;
    document.getElementById('total-problems').textContent = this.currentSession.problems.length;

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

        // Auto-focus next input
        input.addEventListener('input', (e) => {
          if (e.target.value && i < totalSlots - 1) {
            const nextInput = gridDiv.querySelector(`[data-digit-index="${i + 1}"]`);
            if (nextInput) nextInput.focus();
          }
        });

        // Backspace to previous input
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !e.target.value && i > 0) {
            const prevInput = gridDiv.querySelector(`[data-digit-index="${i - 1}"]`);
            if (prevInput) prevInput.focus();
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
      const digits = Array.from(inputs).map(input => input.value || '0');
      userAnswer = parseInt(digits.join(''));
    } else {
      const input = document.getElementById('single-answer');
      userAnswer = parseInt(input.value) || 0;
    }

    // Calculate time taken
    const timeTaken = Date.now() - this.problemStartTime;

    // Update problem with user answer
    problem.userAnswer = userAnswer;
    problem.isCorrect = userAnswer === problem.correctAnswer;
    problem.timeTaken = timeTaken;

    // Show feedback
    this.showFeedback(problem);
  },

  showFeedback(problem) {
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

    messageDiv.innerHTML = `
      <div class="feedback-result ${isCorrect ? 'text-success' : 'text-error'}">
        ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}
      </div>
      <div class="text-secondary">
        <p><strong>Your answer:</strong> <span class="font-mono">${problem.userAnswer}</span></p>
        <p><strong>Correct answer:</strong> <span class="font-mono">${problem.correctAnswer}</span></p>
        <p><strong>Time taken:</strong> ${formatDuration(problem.timeTaken)}</p>
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

    return {
      total: problems.length,
      answered: answered.length,
      correct: correct.length,
      accuracy: Math.round(accuracy),
      avgTime
    };
  },

  showCompleteScreen(stats) {
    document.getElementById('stat-accuracy').textContent = stats.accuracy + '%';
    document.getElementById('stat-correct').textContent =
      `${stats.correct}/${stats.answered}`;
    document.getElementById('stat-avg-time').textContent = formatDuration(stats.avgTime);

    Screen.show('complete-screen');
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
      historyList.innerHTML = sessions.map(session => {
        const stats = this.calculateStatsForSession(session);
        const date = formatDate(session.startTime);
        const multipliers = session.config.multipliers.map(m => '×' + m).join(', ');

        return `
          <div class="history-item">
            <div class="history-item-header">
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
            </div>
            <div class="history-config">
              ${multipliers} • ${session.config.minDigits}-${session.config.maxDigits} digits • ${session.config.mode} mode
            </div>
          </div>
        `;
      }).join('');
    }

    Screen.show('history-screen');
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
