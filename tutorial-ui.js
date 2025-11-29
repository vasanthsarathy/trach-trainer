// Tutorial UI - Rendering Logic

const TutorialUI = {

  // Render overview screen
  renderOverview() {
    const progress = TutorialManager.getProgress();
    const completed = progress.lessonsCompleted.length;
    const total = TutorialManager.curriculum.length;

    const curriculumHTML = TutorialManager.curriculum.map(mult => {
      const lessonData = progress.lessons[mult];
      const content = TutorialContent[mult];
      const isUnlocked = TutorialManager.isLessonUnlocked(mult);
      const status = lessonData?.status || 'locked';

      return `
        <div class="lesson-card ${status} ${!isUnlocked ? 'locked' : ''}">
          <div class="lesson-status">
            ${status === 'completed' ? '✓' :
              status === 'in_progress' ? '⟳' :
              isUnlocked ? '→' : '🔒'}
          </div>
          <h3>${content.name}</h3>
          <p class="lesson-difficulty">${content.difficulty}</p>
          <p class="lesson-time">${content.estimatedTime}</p>
          <button class="btn btn-sm ${isUnlocked ? 'btn-primary' : ''}"
                  onclick="TutorialManager.startLesson(${mult})"
                  ${!isUnlocked ? 'disabled' : ''}>
            ${status === 'completed' ? 'Review' :
              isUnlocked ? 'Start' : 'Locked'}
          </button>
        </div>
      `;
    }).join('');

    document.getElementById('tutorial-overview-content').innerHTML = `
      <div class="tutorial-header">
        <h1>Learn the Trachtenberg Method</h1>
        <p class="tutorial-subtitle">Master multiplication through step-by-step lessons</p>
      </div>

      <div class="tutorial-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${completed/total*100}%"></div>
        </div>
        <p class="progress-text">${completed}/${total} lessons complete</p>
      </div>

      <div class="curriculum-grid">${curriculumHTML}</div>
    `;

    Screen.show('tutorial-overview-screen');
  },

  // Render lesson screen
  renderLesson(multiplier, phase) {
    const content = TutorialContent[multiplier];

    // Update header
    document.getElementById('lesson-title').textContent = content.name;
    document.getElementById('lesson-phase').textContent = this.getPhaseDisplayName(phase);

    // Update sidebar
    this.updateSidebar(multiplier, phase);

    // Render phase content
    const mainContent = document.getElementById('lesson-content');

    switch(phase) {
      case 'intro':
        mainContent.innerHTML = this.renderIntroduction(content.introduction);
        break;
      case 'theory':
        mainContent.innerHTML = this.renderTheory(content.theory);
        break;
      case 'guided':
        this.renderGuidedPractice(content.guidedPractice);
        break;
      case 'independent':
        this.renderIndependentPractice();
        break;
    }

    // Update navigation buttons
    this.updateNavigationButtons(phase);

    Screen.show('tutorial-lesson-screen');
  },

  // Get display name for phase
  getPhaseDisplayName(phase) {
    const names = {
      'intro': 'Introduction',
      'theory': 'Theory',
      'guided': 'Guided Practice',
      'independent': 'Independent Practice'
    };
    return names[phase] || phase;
  },

  // Update sidebar
  updateSidebar(currentMultiplier, currentPhase) {
    const progress = TutorialManager.getProgress();

    // Lesson navigation
    const lessonNavHTML = TutorialManager.curriculum.map(mult => {
      const content = TutorialContent[mult];
      const status = TutorialManager.getLessonStatus(mult);
      const isActive = mult === currentMultiplier;

      return `
        <div class="lesson-nav-item ${isActive ? 'active' : ''} ${status}">
          ${status === 'completed' ? '✓' :
            status === 'in_progress' ? '→' :
            status === 'available' ? '→' : '🔒'}
          ${content.name}
        </div>
      `;
    }).join('');

    document.getElementById('lesson-nav').innerHTML = lessonNavHTML;

    // Phase checklist
    const phases = ['intro', 'theory', 'guided', 'independent'];
    const currentIndex = phases.indexOf(currentPhase);

    const phaseChecklistHTML = phases.map((phase, index) => {
      const isCompleted = index < currentIndex;
      const isActive = index === currentIndex;

      return `
        <div class="phase-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
          ${isCompleted ? '✓' : isActive ? '→' : ''}
          ${this.getPhaseDisplayName(phase)}
        </div>
      `;
    }).join('');

    document.getElementById('phase-checklist').innerHTML = phaseChecklistHTML;
  },

  // Render introduction phase
  renderIntroduction(intro) {
    return `
      <div class="tutorial-phase-content">
        <h3>${intro.title}</h3>
        ${intro.paragraphs.map(p => `<p class="tutorial-paragraph">${p}</p>`).join('')}
        <div class="key-insight">
          <strong>Key Insight:</strong> ${intro.keyInsight}
        </div>
      </div>
    `;
  },

  // Render theory phase
  renderTheory(theory) {
    return `
      <div class="tutorial-phase-content">
        <div class="rule-statement">
          <h3>The Rule</h3>
          <p class="rule-text">${theory.rule}</p>
        </div>

        ${theory.steps && theory.steps.length > 0 ? `
          <div class="rule-steps">
            <h4>Steps:</h4>
            <ol>
              ${theory.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        ` : ''}

        ${theory.examples && theory.examples.length > 0 ? `
          <div class="worked-examples">
            <h4>Examples:</h4>
            ${theory.examples.map(ex => `
              <div class="example">
                <h5 class="example-problem">${ex.problem}</h5>
                <div class="example-steps">
                  ${ex.steps.map((s, i) => `
                    <div class="example-step">
                      <span class="step-number">${i+1}.</span>
                      <span class="step-calc">${s.calc}</span>
                      <span class="step-result">→ ${s.result}</span>
                      ${s.carry ? `<span class="step-carry">Carry: ${s.carry}</span>` : ''}
                    </div>
                  `).join('')}
                </div>
                <p class="example-answer">Answer: <strong>${ex.answer}</strong></p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  },

  // Render guided practice
  renderGuidedPractice(guidedPractice) {
    const problemIndex = TutorialManager.currentGuidedProblem;
    const problem = guidedPractice.problems[problemIndex];

    if (!problem) {
      // All guided problems complete, should advance
      TutorialManager.advancePhase();
      return;
    }

    const mainContent = document.getElementById('lesson-content');
    mainContent.innerHTML = `
      <div class="guided-practice">
        <div class="guided-header">
          <h3>Guided Practice</h3>
          <p class="guided-progress">Problem ${problemIndex + 1} of ${guidedPractice.problems.length}</p>
        </div>

        <div class="guided-problem">
          <h2 class="guided-equation">${problem.operand} × ${TutorialManager.currentLesson}</h2>

          <div id="guided-steps" class="guided-steps-completed">
            <!-- Completed steps will appear here -->
          </div>

          <div id="guided-input" class="guided-input-area">
            <!-- Current step will appear here -->
          </div>
        </div>
      </div>
    `;

    // Render current step
    this.renderGuidedStep();
  },

  // Render current guided step
  renderGuidedStep() {
    const content = TutorialContent[TutorialManager.currentLesson];
    const problemIndex = TutorialManager.currentGuidedProblem;
    const problem = content.guidedPractice.problems[problemIndex];
    const stepIndex = TutorialManager.currentGuidedStep;
    const prompt = problem.prompts[stepIndex];

    if (!prompt) {
      // Problem complete, move to next
      TutorialManager.advanceGuidedStep();
      return;
    }

    const inputArea = document.getElementById('guided-input');
    inputArea.innerHTML = `
      <p class="guided-prompt">${prompt.text}</p>
      <input type="text" id="guided-answer" class="input" autofocus />
      <button class="btn btn-primary" id="guided-submit-btn">Submit</button>
      <div id="guided-feedback" class="guided-feedback"></div>
    `;

    // Add event listeners
    document.getElementById('guided-submit-btn').addEventListener('click', () => {
      this.checkGuidedStep(prompt);
    });

    document.getElementById('guided-answer').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.checkGuidedStep(prompt);
      }
    });
  },

  // Check guided step answer
  checkGuidedStep(prompt) {
    const userAnswer = document.getElementById('guided-answer').value.trim();
    const expectedAnswer = prompt.answer;
    const feedback = TutorialManager.checkGuidedAnswer(userAnswer, expectedAnswer, prompt.carry);

    const feedbackDiv = document.getElementById('guided-feedback');

    if (feedback.correct) {
      feedbackDiv.innerHTML = `<p class="feedback-correct">${feedback.feedback}</p>`;

      // Add to completed steps
      const completedSteps = document.getElementById('guided-steps');
      const stepDiv = document.createElement('div');
      stepDiv.className = 'guided-step-completed';
      stepDiv.innerHTML = `
        <span class="step-prompt">${prompt.text}</span>
        <span class="step-answer">${userAnswer}</span>
        ${prompt.carry ? `<span class="step-carry-note">Carry ${prompt.carry}</span>` : ''}
      `;
      completedSteps.appendChild(stepDiv);

      // Advance after a short delay
      setTimeout(() => {
        TutorialManager.advanceGuidedStep();
      }, 800);
    } else {
      feedbackDiv.innerHTML = `
        <p class="feedback-incorrect">${feedback.feedback}</p>
        ${feedback.hint ? `<p class="feedback-hint">Hint: ${feedback.hint}</p>` : ''}
      `;
    }
  },

  // Render independent practice
  renderIndependentPractice() {
    const problem = TutorialManager.getCurrentIndependentProblem();
    const progress = TutorialManager.getProgress();
    const lessonData = progress.lessons[TutorialManager.currentLesson] || {};
    const criteria = TutorialContent[TutorialManager.currentLesson].independentPractice.passingCriteria;

    const mainContent = document.getElementById('lesson-content');
    mainContent.innerHTML = `
      <div class="independent-practice">
        <div class="independent-header">
          <h3>Independent Practice</h3>
          <div class="independent-progress">
            <p>Problem ${TutorialManager.currentIndependentProblem + 1}</p>
            <p class="progress-stats">
              Correct: ${lessonData.independentCorrect || 0} |
              Streak: ${lessonData.currentStreak || 0} |
              Accuracy: ${lessonData.independentAttempts ? Math.round((lessonData.independentCorrect || 0) / lessonData.independentAttempts * 100) : 0}%
            </p>
            <p class="passing-criteria">
              Pass by: ${criteria.correctInRow} in a row OR ${criteria.minAccuracy}% accuracy (min 5 problems)
            </p>
          </div>
        </div>

        <div class="independent-problem">
          <h2 class="independent-equation">${problem.operand1} × ${problem.operand2}</h2>

          <div id="independent-answer-area" class="independent-answer-area">
            <!-- Answer input will be inserted here -->
          </div>

          <button class="btn btn-primary" id="independent-submit-btn">Submit Answer</button>
        </div>

        <div id="independent-feedback" class="independent-feedback" style="display: none;">
          <!-- Feedback will appear here -->
        </div>
      </div>
    `;

    // Render digit inputs (reusing easy mode pattern)
    this.renderIndependentInputs(problem);

    // Add event listener
    document.getElementById('independent-submit-btn').addEventListener('click', () => {
      this.submitIndependentAnswer();
    });
  },

  // Render input fields for independent practice
  renderIndependentInputs(problem) {
    const answerLength = String(problem.correctAnswer).length;
    const answerArea = document.getElementById('independent-answer-area');

    let inputsHTML = '<div class="digit-inputs">';
    for (let i = 0; i < answerLength; i++) {
      inputsHTML += `<input type="text" class="digit-input" maxlength="1" data-index="${i}" />`;
    }
    inputsHTML += '</div>';

    answerArea.innerHTML = inputsHTML;

    // Add navigation between inputs
    const inputs = answerArea.querySelectorAll('.digit-input');
    inputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        if (e.target.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });

    // Focus first input
    inputs[0].focus();
  },

  // Submit independent practice answer
  submitIndependentAnswer() {
    const inputs = document.querySelectorAll('.digit-input');
    const userAnswer = Array.from(inputs).map(inp => inp.value).join('');

    if (!userAnswer || userAnswer.includes('')) {
      alert('Please fill in all digits');
      return;
    }

    const timeTaken = 0; // TODO: Add timer
    const result = TutorialManager.submitIndependentProblem(userAnswer, timeTaken);

    this.showIndependentFeedback(result);
  },

  // Show feedback for independent practice
  showIndependentFeedback(result) {
    const problem = TutorialManager.getCurrentIndependentProblem();
    const feedbackDiv = document.getElementById('independent-feedback');

    let feedbackHTML = `
      <div class="card">
        <h4 class="${result.isCorrect ? 'text-success' : 'text-error'}">
          ${result.isCorrect ? 'Correct! ✓' : 'Incorrect ✗'}
        </h4>
        <p>Your answer: ${problem.userAnswer}</p>
        <p>Correct answer: ${problem.correctAnswer}</p>
    `;

    // Show solution steps
    const rule = TrachtenbergRules[problem.operand2];
    const { steps } = rule.showSteps(problem.operand1);

    feedbackHTML += `
      <div class="problem-solution">
        <h5>Solution:</h5>
        ${steps.map(step => `
          <div class="solution-step">
            <span class="step-calc">${step.calculation}</span>
            <span class="step-result">→ ${step.resultDigit}</span>
            ${step.carry > 0 ? `<span class="step-carry">Carry: ${step.carry}</span>` : ''}
          </div>
        `).join('')}
      </div>
    `;

    // Show progress towards passing
    if (result.passed) {
      feedbackHTML += `
        <h4 class="text-success">🎉 Lesson Complete!</h4>
        <p>Final stats: ${result.correct}/${result.attempts} correct (${Math.round(result.accuracy)}%)</p>
        <button class="btn btn-primary" id="complete-lesson-btn">Continue</button>
      `;
    } else {
      feedbackHTML += `
        <p>Progress: ${result.streak} in a row | ${Math.round(result.accuracy)}% accuracy</p>
        <button class="btn btn-primary" id="next-independent-btn">Next Problem</button>
      `;
    }

    feedbackHTML += `</div>`;

    feedbackDiv.innerHTML = feedbackHTML;
    feedbackDiv.style.display = 'block';

    // Add event listeners
    const nextBtn = document.getElementById('next-independent-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        TutorialManager.nextIndependentProblem();
        feedbackDiv.style.display = 'none';
        this.renderIndependentPractice();
      });
    }

    const completeBtn = document.getElementById('complete-lesson-btn');
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        TutorialManager.completeLesson();
      });
    }
  },

  // Show completion celebration
  showCompletionCelebration(multiplier) {
    const content = TutorialContent[multiplier];
    const progress = TutorialManager.getProgress();
    const lessonData = progress.lessons[multiplier];

    const mainContent = document.getElementById('lesson-content');
    mainContent.innerHTML = `
      <div class="lesson-complete">
        <h2>🎉 Congratulations!</h2>
        <h3>You've completed ${content.name}</h3>

        <div class="completion-stats">
          <p>Final Accuracy: ${Math.round((lessonData.independentCorrect || 0) / (lessonData.independentAttempts || 1) * 100)}%</p>
          <p>Problems Solved: ${lessonData.independentAttempts || 0}</p>
        </div>

        <div class="completion-actions">
          <button class="btn btn-primary" onclick="TutorialManager.returnToOverview()">
            Back to Lessons
          </button>
        </div>
      </div>
    `;
  },

  // Update navigation buttons
  updateNavigationButtons(phase) {
    const backBtn = document.getElementById('tutorial-back');
    const nextBtn = document.getElementById('tutorial-next');

    // Back button
    if (phase === 'intro') {
      backBtn.textContent = '← Exit';
      backBtn.onclick = () => TutorialManager.returnToOverview();
    } else {
      backBtn.textContent = '← Back';
      backBtn.onclick = () => TutorialManager.previousPhase();
    }

    // Next button
    if (phase === 'intro' || phase === 'theory') {
      nextBtn.style.display = 'inline-block';
      nextBtn.textContent = 'Continue →';
      nextBtn.onclick = () => TutorialManager.advancePhase();
    } else {
      nextBtn.style.display = 'none';
    }
  }
};
