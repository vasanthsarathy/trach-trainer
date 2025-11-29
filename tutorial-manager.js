// Tutorial Manager - State Management and Progression Logic

const TutorialManager = {
  // Sequential curriculum
  curriculum: [11, 12, 6, 7, 5, 8, 9, 4, 2, 3],

  // Current state
  currentLesson: null,
  currentPhase: null, // intro|theory|guided|independent
  currentGuidedProblem: 0,
  currentGuidedStep: 0,
  currentIndependentProblem: 0,
  independentProblems: [],

  // Initialize
  init() {
    this.loadProgress();
  },

  // Check if lesson is unlocked
  isLessonUnlocked(multiplier) {
    const progress = this.getProgress();
    const index = this.curriculum.indexOf(multiplier);

    // First lesson always unlocked
    if (index === 0) return true;

    // Check if previous lesson is completed
    const previousMult = this.curriculum[index - 1];
    return progress.lessons[previousMult]?.status === 'completed' ||
           progress.lessons[previousMult]?.status === 'mastered';
  },

  // Get lesson status
  getLessonStatus(multiplier) {
    const progress = this.getProgress();
    const lessonData = progress.lessons[multiplier];

    if (!lessonData) {
      return this.isLessonUnlocked(multiplier) ? 'available' : 'locked';
    }

    return lessonData.status || 'locked';
  },

  // Start a lesson
  startLesson(multiplier) {
    if (!this.isLessonUnlocked(multiplier)) {
      alert('Complete previous lessons first!');
      return;
    }

    this.currentLesson = multiplier;
    this.currentPhase = 'intro';
    this.currentGuidedProblem = 0;
    this.currentGuidedStep = 0;
    this.currentIndependentProblem = 0;
    this.saveProgress();

    TutorialUI.renderLesson(multiplier, 'intro');
  },

  // Advance to next phase
  advancePhase() {
    const phases = ['intro', 'theory', 'guided', 'independent'];
    const currentIndex = phases.indexOf(this.currentPhase);

    if (currentIndex < phases.length - 1) {
      this.currentPhase = phases[currentIndex + 1];

      // Reset counters for new phase
      if (this.currentPhase === 'guided') {
        this.currentGuidedProblem = 0;
        this.currentGuidedStep = 0;
      } else if (this.currentPhase === 'independent') {
        this.currentIndependentProblem = 0;
        this.generateIndependentProblems();
      }

      this.saveProgress();
      TutorialUI.renderLesson(this.currentLesson, this.currentPhase);
    }
  },

  // Go back to previous phase
  previousPhase() {
    const phases = ['intro', 'theory', 'guided', 'independent'];
    const currentIndex = phases.indexOf(this.currentPhase);

    if (currentIndex > 0) {
      this.currentPhase = phases[currentIndex - 1];
      this.saveProgress();
      TutorialUI.renderLesson(this.currentLesson, this.currentPhase);
    }
  },

  // Check guided practice answer
  checkGuidedAnswer(userAnswer, expectedAnswer, hasCarry) {
    // Normalize answers
    const userNorm = String(userAnswer).trim();
    const expectedNorm = String(expectedAnswer).trim();

    if (userNorm === expectedNorm) {
      return {
        correct: true,
        feedback: "Correct! ✓",
        carry: hasCarry
      };
    } else {
      return {
        correct: false,
        feedback: `Not quite. Expected ${expectedAnswer}`,
        hint: "Remember to work right to left"
      };
    }
  },

  // Advance guided practice step
  advanceGuidedStep() {
    const content = TutorialContent[this.currentLesson];
    const currentProblem = content.guidedPractice.problems[this.currentGuidedProblem];

    this.currentGuidedStep++;

    // Check if current problem is complete
    if (this.currentGuidedStep >= currentProblem.prompts.length) {
      // Move to next problem
      this.currentGuidedProblem++;
      this.currentGuidedStep = 0;

      // Check if all guided problems complete
      if (this.currentGuidedProblem >= content.guidedPractice.problems.length) {
        // Guided practice complete, advance to independent
        this.advancePhase();
        return;
      }

      // New problem - re-render entire guided practice
      this.saveProgress();
      TutorialUI.renderGuidedPractice(content.guidedPractice);
      return;
    }

    // Same problem, just next step
    this.saveProgress();
    TutorialUI.renderGuidedStep();
  },

  // Generate independent practice problems
  generateIndependentProblems() {
    const content = TutorialContent[this.currentLesson];
    const config = content.independentPractice;
    const multiplier = this.currentLesson;

    this.independentProblems = [];

    for (let i = 0; i < config.problemCount; i++) {
      const digitCount = randomInt(config.digitRange[0], config.digitRange[1]);
      const operand1 = generateNumber(digitCount);
      const rule = TrachtenbergRules[multiplier];
      const correctAnswer = rule.calculate(operand1);

      this.independentProblems.push({
        id: generateId(),
        operand1,
        operand2: multiplier,
        correctAnswer,
        rule: rule.name,
        hint: rule.hint,
        userAnswer: null,
        isCorrect: null,
        timeTaken: null
      });
    }
  },

  // Get current independent problem
  getCurrentIndependentProblem() {
    return this.independentProblems[this.currentIndependentProblem];
  },

  // Submit independent practice problem
  submitIndependentProblem(userAnswer, timeTaken) {
    const problem = this.getCurrentIndependentProblem();
    const isCorrect = String(userAnswer).trim() === String(problem.correctAnswer).trim();

    problem.userAnswer = userAnswer;
    problem.isCorrect = isCorrect;
    problem.timeTaken = timeTaken;

    // Update progress
    const progress = this.getProgress();
    if (!progress.lessons[this.currentLesson]) {
      progress.lessons[this.currentLesson] = {};
    }
    const lessonData = progress.lessons[this.currentLesson];

    lessonData.independentAttempts = (lessonData.independentAttempts || 0) + 1;
    if (isCorrect) {
      lessonData.independentCorrect = (lessonData.independentCorrect || 0) + 1;
      lessonData.currentStreak = (lessonData.currentStreak || 0) + 1;
    } else {
      lessonData.currentStreak = 0;
    }

    this.saveProgress();

    // Check passing criteria
    const criteria = TutorialContent[this.currentLesson].independentPractice.passingCriteria;
    const accuracy = lessonData.independentCorrect / lessonData.independentAttempts * 100;

    const passed = lessonData.currentStreak >= criteria.correctInRow ||
                   (lessonData.independentAttempts >= 5 && accuracy >= criteria.minAccuracy);

    return {
      isCorrect,
      passed,
      accuracy,
      streak: lessonData.currentStreak,
      attempts: lessonData.independentAttempts,
      correct: lessonData.independentCorrect
    };
  },

  // Advance to next independent problem
  nextIndependentProblem() {
    this.currentIndependentProblem++;
    this.saveProgress();

    if (this.currentIndependentProblem >= this.independentProblems.length) {
      // Generate more if needed
      this.generateIndependentProblems();
      this.currentIndependentProblem = 0;
    }
  },

  // Complete lesson
  completeLesson() {
    const progress = this.getProgress();

    if (!progress.lessons[this.currentLesson]) {
      progress.lessons[this.currentLesson] = {};
    }

    progress.lessons[this.currentLesson].status = 'completed';
    progress.lessons[this.currentLesson].completedAt = Date.now();

    if (!progress.lessonsCompleted.includes(this.currentLesson)) {
      progress.lessonsCompleted.push(this.currentLesson);
    }

    // Unlock next lesson
    const index = this.curriculum.indexOf(this.currentLesson);
    if (index < this.curriculum.length - 1) {
      const nextMult = this.curriculum[index + 1];
      if (!progress.lessons[nextMult]) {
        progress.lessons[nextMult] = { status: 'available', phase: 'intro' };
      }
    }

    this.saveProgress();
    TutorialUI.showCompletionCelebration(this.currentLesson);
  },

  // Return to overview
  returnToOverview() {
    this.currentLesson = null;
    this.currentPhase = null;
    this.currentGuidedProblem = 0;
    this.currentGuidedStep = 0;
    this.currentIndependentProblem = 0;
    this.saveProgress();

    TutorialUI.renderOverview();
    Screen.show('tutorial-overview-screen');
  },

  // LocalStorage persistence
  getProgress() {
    const data = localStorage.getItem('trach_tutorial_progress');
    return data ? JSON.parse(data) : this.getEmptyProgress();
  },

  getEmptyProgress() {
    return {
      lessonsCompleted: [],
      currentLesson: null,
      lessons: {
        11: { status: 'available', phase: 'intro' }
      }
    };
  },

  saveProgress() {
    const progress = this.getProgress();
    progress.currentLesson = this.currentLesson;

    if (this.currentLesson) {
      if (!progress.lessons[this.currentLesson]) {
        progress.lessons[this.currentLesson] = {};
      }

      progress.lessons[this.currentLesson].status =
        progress.lessons[this.currentLesson].status === 'completed' ? 'completed' : 'in_progress';
      progress.lessons[this.currentLesson].phase = this.currentPhase;
      progress.lessons[this.currentLesson].guidedProblem = this.currentGuidedProblem;
      progress.lessons[this.currentLesson].guidedStep = this.currentGuidedStep;
    }

    localStorage.setItem('trach_tutorial_progress', JSON.stringify(progress));
  },

  loadProgress() {
    const progress = this.getProgress();
    this.currentLesson = progress.currentLesson;
    if (this.currentLesson && progress.lessons[this.currentLesson]) {
      this.currentPhase = progress.lessons[this.currentLesson].phase;
      this.currentGuidedProblem = progress.lessons[this.currentLesson].guidedProblem || 0;
      this.currentGuidedStep = progress.lessons[this.currentLesson].guidedStep || 0;
    }
  }
};
