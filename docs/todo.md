# TrachTrainer - Development Plan

## Overview
Plan for building and deploying a web-based Trachtenberg multiplication practice app with user authentication and session management.

## Architecture Decisions

### Hosting Options Analysis

#### Option 1: Cloudflare Pages + Workers (RECOMMENDED)
**Pros:**
- Free tier is very generous (100k requests/day)
- Excellent global CDN performance
- Workers for serverless backend logic
- D1 (SQLite) or KV for data storage
- Zero cold starts with Workers
- Built-in DDoS protection
- Simple deployment (git push)
- Can add Cloudflare Access for authentication

**Cons:**
- Workers have execution time limits (CPU time, not wall time)
- D1 still in beta (but stable)
- Learning curve for Workers API

**Best for:** Fast, global, cost-effective deployment

#### Option 2: AWS (Amplify + Lambda + DynamoDB)
**Pros:**
- Mature ecosystem
- Cognito for authentication
- DynamoDB for NoSQL storage
- Lambda for serverless functions
- S3 + CloudFront for static hosting

**Cons:**
- More complex setup
- Can get expensive
- Cold starts on Lambda
- Steeper learning curve

**Best for:** Enterprise-scale, AWS ecosystem integration

#### Option 3: Google Cloud Run
**Pros:**
- Container-based deployment
- Auto-scaling
- Pay per use
- Good for Node.js/Python backends
- Firebase Auth integration

**Cons:**
- Cold starts
- More expensive than Cloudflare
- Requires containerization knowledge

**Best for:** Traditional server architecture, containerized apps

### Recommended Stack

**Frontend:**
- Pure HTML/CSS/JavaScript (no framework needed for MVP)
- Or: Svelte/React if you want component structure
- Progressive Web App (PWA) capabilities

**Backend/Hosting:**
- **Cloudflare Pages** for static frontend
- **Cloudflare Workers** for API endpoints
- **Cloudflare D1** (SQLite) for user data and sessions
- **Cloudflare Access** or custom JWT auth

**Authentication:**
- Start with **email/password** (stored in D1)
- Or use **OAuth** (Google, GitHub) via Workers
- Or **Cloudflare Access** for simple auth

**Data Storage:**
- User profiles (email, name, settings)
- Session history (problems, answers, timestamps, stats)
- Progress tracking

## Technical Considerations

### Authentication & Users
- [ ] User registration/login flow
- [ ] Password hashing (bcrypt)
- [ ] JWT tokens for session management
- [ ] "Remember me" functionality
- [ ] Password reset flow
- [ ] Email verification (optional for MVP)

### Data Model

**Users Table:**
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at INTEGER,
  theme_preference TEXT DEFAULT 'light'
);
```

**Sessions Table:**
```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  config JSON NOT NULL, -- multipliers, digits, mode, etc.
  created_at INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Problems Table:**
```sql
CREATE TABLE problems (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  operand1 TEXT NOT NULL,
  operand2 INTEGER NOT NULL,
  correct_answer TEXT NOT NULL,
  user_answer TEXT,
  time_taken INTEGER, -- milliseconds
  is_correct BOOLEAN,
  order_index INTEGER,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);
```

### Privacy & Security
- [ ] HTTPS only (Cloudflare provides free SSL)
- [ ] CORS configuration
- [ ] Rate limiting on API endpoints
- [ ] Input validation and sanitization
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention
- [ ] CSRF tokens for state-changing operations
- [ ] Password strength requirements
- [ ] Secure password reset tokens

### Performance
- [ ] Static asset caching
- [ ] API response caching where appropriate
- [ ] Lazy loading of resources
- [ ] Minification of CSS/JS
- [ ] Image optimization (if any)
- [ ] Service Worker for offline capability (optional)

### Cost Considerations

**Cloudflare Free Tier:**
- 100,000 requests/day (Workers)
- 10GB storage (D1)
- Unlimited bandwidth (Pages)
- This should handle 1000+ active users easily

**When you'll need to pay:**
- Workers: $5/month for 10M requests
- D1: $5/month for 25GB storage
- Expected cost for first year: $0-10/month

### Scalability
- Cloudflare Workers scale automatically
- D1 can handle millions of rows
- Consider read replicas if you get very popular
- Session history could be archived after X months

## Development Phases

### Phase 1: Local Development (No Auth)
- [ ] Build core practice interface (HTML/CSS/JS)
- [ ] Implement problem generation logic
- [ ] Build all 4 modes (Easy/Standard/Hard/Extreme)
- [ ] Local storage for session persistence
- [ ] Test all multiplier rules (×5, ×6, ×7, ×9, ×11, ×12)
- **Output:** Fully functional app running locally

### Phase 2: Backend & Database
- [ ] Set up Cloudflare account
- [ ] Initialize D1 database
- [ ] Create database schema
- [ ] Build Workers API endpoints:
  - POST /api/sessions - Create new session
  - GET /api/sessions - Get user's sessions
  - GET /api/sessions/:id - Get specific session
  - POST /api/sessions/:id/problems - Save problem result
- [ ] Test API endpoints

### Phase 3: Authentication
- [ ] Build registration page
- [ ] Build login page
- [ ] Implement JWT token generation
- [ ] Add authentication middleware to Workers
- [ ] Build password reset flow
- [ ] Add "guest mode" option (optional)

### Phase 4: Integration
- [ ] Connect frontend to API
- [ ] Replace local storage with API calls
- [ ] Add loading states
- [ ] Error handling and user feedback
- [ ] Session replay functionality

### Phase 5: Polish & Features
- [ ] Tutorial mode
- [ ] Session statistics and analytics
- [ ] User profile page
- [ ] Settings (theme, preferences)
- [ ] Mobile responsive design
- [ ] Keyboard shortcuts

### Phase 6: Deployment
- [ ] Set up Cloudflare Pages
- [ ] Configure custom domain (optional)
- [ ] Set up production D1 database
- [ ] Deploy Workers
- [ ] Test production environment
- [ ] Set up monitoring/logging

### Phase 7: Post-Launch
- [ ] Gather user feedback
- [ ] Analytics (privacy-respecting)
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Feature iterations

## Alternative: Start Without Auth

**Option:** Build MVP without user accounts first
- Use browser localStorage for all data
- Sessions persist only on that device
- Add "Export/Import" feature for session data
- Can add authentication later when users request it

**Pros:**
- Faster to build
- No backend complexity
- No privacy concerns
- No hosting costs

**Cons:**
- Data lost if browser cache cleared
- No cross-device sync
- No social features later

## Open Questions to Decide

1. **Do you want user accounts from day 1, or start with localStorage?**
   - Auth adds complexity but enables cross-device usage
   - localStorage is simpler but limited to one device

2. **Which hosting platform?**
   - Cloudflare (recommended for simplicity + cost)
   - AWS (more complex, enterprise-ready)
   - Google Cloud Run (middle ground)

3. **Tech stack for frontend?**
   - Vanilla JS (simplest, fastest)
   - Svelte (lightweight, modern)
   - React (popular, more overhead)

4. **Authentication method?**
   - Email/password (most control)
   - OAuth only (Google/GitHub - easier for users)
   - Both

5. **Guest mode?**
   - Allow practice without account?
   - Prompt to sign up to save progress?

## Decisions Made

✓ **Storage:** localStorage first, add authentication later
✓ **Frontend:** Vanilla JS (HTML/CSS/JavaScript)
✓ **Hosting:** Cloudflare Pages (when we add backend)
✓ **Guest mode:** Yes (when auth is added)

## Immediate Next Steps

### Phase 1: Core Application (No Backend)
Build the complete practice app using localStorage:

1. **Project Setup**
   - [ ] Create basic HTML structure
   - [ ] Set up file organization (index.html, app.js, utils.js)
   - [ ] Import design system (styles.css already done)

2. **Problem Generation**
   - [ ] Create Trachtenberg rule definitions for each multiplier
   - [ ] Random number generator based on digit constraints
   - [ ] Problem difficulty calculator (optional)

3. **Session Configuration UI**
   - [ ] Session setup screen
   - [ ] Multiplier selection (checkboxes for ×5, ×6, ×7, ×9, ×11, ×12)
   - [ ] Digit range inputs (min/max)
   - [ ] Mode selection (Easy/Standard/Hard/Extreme)
   - [ ] Problem count input

4. **Practice Interface**
   - [ ] Easy Mode: per-digit input grid with carry slots
   - [ ] Standard Mode: per-digit grid without carry UI
   - [ ] Hard Mode: single answer input
   - [ ] Extreme Mode: timed display then hidden
   - [ ] Submit and feedback logic
   - [ ] Next problem flow

5. **Step-by-Step Feedback**
   - [ ] Show correct answer vs user answer
   - [ ] Display Trachtenberg rule application breakdown
   - [ ] Highlight where mistakes occurred

6. **Session Management**
   - [ ] Save session to localStorage
   - [ ] Session history list view
   - [ ] Session replay functionality
   - [ ] Session statistics (accuracy, avg time, error patterns)

7. **Tutorial Mode** (Phase 1.5)
   - [ ] Interactive rule walkthroughs for each multiplier
   - [ ] Visual highlighting of digit + neighbor
   - [ ] Guided practice problems

## Ready to Start?

We'll begin with Phase 1, focusing on getting a fully functional app running locally before thinking about deployment or authentication. Sound good?
