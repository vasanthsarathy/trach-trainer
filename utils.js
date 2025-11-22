/**
 * Utility Functions for TrachTrainer
 */

// Generate random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random number with specified digit count
function generateNumber(digitCount) {
  if (digitCount === 1) {
    return randomInt(1, 9);
  }
  const min = Math.pow(10, digitCount - 1);
  const max = Math.pow(10, digitCount) - 1;
  return randomInt(min, max);
}

// Convert number to array of digits
function numberToDigits(num) {
  return String(num).split('').map(d => parseInt(d));
}

// Convert array of digits to number
function digitsToNumber(digits) {
  return parseInt(digits.join(''));
}

// Format timestamp to readable date
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Format duration in milliseconds to seconds
function formatDuration(ms) {
  return (ms / 1000).toFixed(1) + 's';
}

// Calculate percentage
function calculatePercentage(part, total) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// LocalStorage helpers
const Storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error writing to localStorage:', e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing from localStorage:', e);
      return false;
    }
  },

  // Session-specific helpers
  getSessions() {
    return this.get('trach_sessions') || [];
  },

  saveSessions(sessions) {
    return this.set('trach_sessions', sessions);
  },

  addSession(session) {
    const sessions = this.getSessions();
    sessions.unshift(session); // Add to beginning
    return this.saveSessions(sessions);
  },

  getTheme() {
    return this.get('trach_theme') || 'light';
  },

  setTheme(theme) {
    return this.set('trach_theme', theme);
  }
};

// Screen navigation helpers
const Screen = {
  show(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    // Show requested screen
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.add('active');
    }
  },

  current() {
    const activeScreen = document.querySelector('.screen.active');
    return activeScreen ? activeScreen.id : null;
  }
};

// Theme helpers
const Theme = {
  set(theme) {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
    Storage.setTheme(theme);
    this.updateIcon();
  },

  toggle() {
    const current = this.get();
    this.set(current === 'dark' ? 'light' : 'dark');
  },

  get() {
    return document.body.hasAttribute('data-theme') ? 'dark' : 'light';
  },

  updateIcon() {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.textContent = this.get() === 'dark' ? '☀️' : '🌙';
    }
  },

  init() {
    const savedTheme = Storage.getTheme();
    this.set(savedTheme);
  }
};

// Rules panel helpers
const RulesPanel = {
  open() {
    const panel = document.getElementById('rules-panel');
    if (panel) {
      panel.classList.add('open');
    }
  },

  close() {
    const panel = document.getElementById('rules-panel');
    if (panel) {
      panel.classList.remove('open');
    }
  },

  toggle() {
    const panel = document.getElementById('rules-panel');
    if (panel) {
      panel.classList.toggle('open');
    }
  },

  populate() {
    const content = document.querySelector('.rules-panel-content');
    if (!content) return;

    content.innerHTML = '';

    // Get all rule multipliers and sort them
    const multipliers = Object.keys(TrachtenbergRules).sort((a, b) => parseInt(a) - parseInt(b));

    multipliers.forEach(multiplier => {
      const rule = TrachtenbergRules[multiplier];

      const ruleCard = document.createElement('div');
      ruleCard.className = 'rule-card';

      const title = document.createElement('h3');
      title.textContent = rule.name;

      const description = document.createElement('p');
      description.className = 'rule-description';
      description.textContent = rule.hint;

      ruleCard.appendChild(title);
      ruleCard.appendChild(description);
      content.appendChild(ruleCard);
    });
  }
};
