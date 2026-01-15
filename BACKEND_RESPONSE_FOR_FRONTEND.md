# Backend Response - AI-Powered Mock Interview Integration

## ✅ Confirmed API Endpoints

**Base URL:** `http://localhost:3000` (Development)

### 1. Start Interview
```
POST /api/interview/start
Content-Type: application/json
```

### 2. Get Next Question
```
POST /api/interview/next
Content-Type: application/json
```

### 3. Generate Feedback Report
```
POST /api/interview/feedback
Content-Type: application/json
```

---

## 📋 Complete Request/Response Schemas

### **1. Start Interview Endpoint**

**Purpose:** Initialize interview session and receive the first AI-generated question

#### Request Schema
```json
{
  "resumeData": {
    "fullName": "string (required)",
    "email": "string (optional)",
    "phone": "string (optional)",
    "skills": ["array of strings (required)"],
    "education": [
      {
        "degree": "string",
        "field": "string",
        "institution": "string",
        "graduationYear": "string"
      }
    ],
    "workExperience": [
      {
        "position": "string",
        "company": "string",
        "duration": "string",
        "responsibilities": "string"
      }
    ],
    "projects": [
      {
        "name": "string",
        "description": "string",
        "technologies": ["array of strings"]
      }
    ]
  },
  "selectedRole": "string (required - e.g., 'FULL-STACK', 'Frontend', 'Backend', 'Data Scientist')"
}
```

#### Required Fields
- `resumeData` (object)
- `resumeData.fullName` (string)
- `resumeData.skills` (array)
- `selectedRole` (string)

#### Optional Fields
- `resumeData.email`, `phone`, `education`, `workExperience`, `projects`

#### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "sessionId": "interview_1736874564789_a1b2c3d4e5f6g7h8",
    "firstQuestion": "Hello Siddhant! Let's begin. I see you've worked on an E-commerce Platform using Django and React. Can you walk me through how you structured the backend API and integrated it with the React frontend?"
  }
}
```

#### Error Response (400 Bad Request)
```json
{
  "success": false,
  "error": "Missing or invalid resumeData. Provide the user's resume as a JSON object."
}
```

#### Error Response (500 Internal Server Error)
```json
{
  "success": false,
  "error": "Failed to start interview",
  "details": "AI service timeout"
}
```

---

### **2. Get Next Question Endpoint**

**Purpose:** Submit user's answer and receive the next AI-generated question

#### Request Schema
```json
{
  "sessionId": "string (required - from /api/interview/start response)",
  "currentQuestionIndex": "number (required - 0-based index, e.g., 0, 1, 2...)",
  "userAnswer": "string (required - the transcribed answer from Speech-to-Text)",
  "previousQuestion": "string (required - the question that was just answered)",
  "resumeData": {
    "fullName": "string",
    "skills": ["array"],
    "projects": [...]
  },
  "selectedRole": "string (required - same as start endpoint)"
}
```

#### Required Fields
- `sessionId` (string)
- `currentQuestionIndex` (number)
- `userAnswer` (string)
- `previousQuestion` (string)
- `resumeData` (object - same structure as start endpoint)
- `selectedRole` (string)

#### Success Response - More Questions Available (200 OK)
```json
{
  "success": true,
  "data": {
    "nextQuestion": "That's interesting! How did you handle authentication and authorization in your Django backend? Did you use JWT or session-based authentication?",
    "hasMoreQuestions": true
  }
}
```

#### Success Response - Interview Complete (200 OK)
```json
{
  "success": true,
  "data": {
    "nextQuestion": null,
    "hasMoreQuestions": false
  }
}
```

**Note:** When `hasMoreQuestions` is `false`, the frontend should navigate to the feedback page and call `/api/interview/feedback`

#### Error Response (400 Bad Request)
```json
{
  "success": false,
  "error": "Missing sessionId"
}
```

---

### **3. Generate Feedback Endpoint**

**Purpose:** Analyze all Q&A pairs and generate comprehensive feedback report

#### Request Schema
```json
{
  "sessionId": "string (required)",
  "transcripts": [
    {
      "questionIndex": 0,
      "question": "Tell me about your E-commerce Platform project",
      "answer": "I built it using Django REST Framework for the backend and React for the frontend. I implemented user authentication, product catalog, shopping cart, and integrated Stripe for payments..."
    },
    {
      "questionIndex": 1,
      "question": "How did you handle payment processing securely?",
      "answer": "I used Stripe API with proper CSRF protection and validated all payment data on the backend before sending to Stripe..."
    }
  ],
  "resumeData": {
    "fullName": "string",
    "skills": ["array"],
    "projects": [...]
  },
  "selectedRole": "string (required)",
  "integrityFlags": "number (optional - default: 0, represents proctoring warnings count)"
}
```

#### Required Fields
- `sessionId` (string)
- `transcripts` (array of objects)
  - Each object must have: `questionIndex`, `question`, `answer`
- `resumeData` (object)
- `selectedRole` (string)

#### Optional Fields
- `integrityFlags` (number - default: 0)

#### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "overallScore": 7.8,
    "questions": [
      {
        "questionIndex": 0,
        "question": "Tell me about your E-commerce Platform project",
        "answer": "I built it using Django REST Framework...",
        "rating": 8,
        "feedback": "Great overview of your project! You clearly explained the tech stack and key features. However, you could have mentioned specific challenges you faced and how you overcame them.",
        "category": "Technical"
      },
      {
        "questionIndex": 1,
        "question": "How did you handle payment processing securely?",
        "answer": "I used Stripe API with proper CSRF protection...",
        "rating": 9,
        "feedback": "Excellent answer! You demonstrated strong understanding of security best practices with CSRF protection and backend validation. Your mention of webhook handlers shows attention to detail.",
        "category": "Technical"
      },
      {
        "questionIndex": 2,
        "question": "Describe a challenging bug you encountered",
        "answer": "I had an issue with race conditions in the checkout process...",
        "rating": 7,
        "feedback": "Good problem-solving approach. You identified the root cause and implemented a solution. Consider explaining the debugging process in more detail.",
        "category": "Problem-Solving"
      }
    ],
    "strengths": [
      "Strong understanding of full-stack development",
      "Clear communication and structured explanations",
      "Good knowledge of security best practices",
      "Practical experience with modern frameworks (Django, React)"
    ],
    "weaknesses": [
      "Could provide more specific examples of challenges faced",
      "Limited discussion of testing strategies",
      "Could elaborate more on system design considerations"
    ],
    "recommendations": [
      "Practice explaining technical concepts with real-world examples and metrics",
      "Study common system design patterns (caching, load balancing, database optimization)",
      "Prepare STAR method responses for behavioral questions",
      "Review testing methodologies (unit tests, integration tests, TDD)"
    ]
  }
}
```

#### Response Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `overallScore` | Number (0-10) | Average rating across all questions, rounded to 1 decimal |
| `questions` | Array | Individual analysis for each Q&A pair |
| `questions[].rating` | Number (1-10) | Score for this specific answer |
| `questions[].feedback` | String | 2-3 sentence constructive feedback |
| `questions[].category` | String | "Technical", "Behavioral", "Communication", or "Problem-Solving" |
| `strengths` | Array of Strings | 2-4 key strengths identified |
| `weaknesses` | Array of Strings | 2-4 areas needing improvement |
| `recommendations` | Array of Strings | 2-4 actionable tips for improvement |

---

## 🔧 Answers to Your Questions

### 1. AI Model Details

**Model:** Google Gemini 2.5 Flash
- **Provider:** Google AI Studio
- **Token Limit:** 8192 tokens max output
- **Response Time:** 2-5 seconds average per request

**Number of Questions:**
- **Total:** 7 questions per interview (configurable)
- **Generation:** Dynamic, one-by-one (NOT all upfront)
- **Logic:** First question generated at `/start`, subsequent questions generated at `/next` based on previous answers

**Question Progression:**
- Q1: Opening question about most relevant project/skill
- Q2-5: Follow-up questions or dive into other projects
- Q6-7: Wrap-up questions (advanced concepts, system design, or behavioral)

---

### 2. Session Management

**Approach:** ✅ **STATELESS** (Backend does NOT store conversation history)

**Session ID:**
- ✅ **Generated by backend** at `/api/interview/start`
- Format: `interview_<timestamp>_<random_hex>`
- Example: `interview_1736874564789_a1b2c3d4e5f6g7h8`
- **Purpose:** For tracking and logging only (not used for state retrieval)

**Conversation History:**
- ✅ **Frontend responsibility** - You MUST maintain the full transcript array
- Send entire conversation history in `/api/interview/feedback` request
- Backend does NOT persist or cache any interview data

**Session Persistence:**
- No server-side session storage
- No database storage during interview
- All state is client-side (use React Context or localStorage)

---

### 3. Question Generation Logic

**How AI Personalizes Questions:**

1. **Resume Analysis:** 
   - Extracts key skills, projects, and work experience
   - Identifies strongest areas (for deep-dive questions)
   - Identifies missing skills for the target role

2. **Role-Specific Focus:**
   - **FULL-STACK:** Asks about both frontend and backend projects
   - **Frontend:** Focuses on React, CSS, UI/UX, state management
   - **Backend:** Focuses on APIs, databases, architecture, scalability
   - **Data Scientist:** Focuses on ML models, data pipelines, statistical methods

3. **Dynamic Follow-ups:**
   - If answer is strong (rating 7+): Ask deeper follow-up question
   - If answer is weak (rating <6): Move to different project/skill
   - Progressively increase difficulty throughout interview

4. **Project-Centric:**
   - Questions reference specific projects from resume
   - Example: "In your E-commerce Platform, how did you..."
   - Asks about technologies mentioned in project descriptions

**Supported Roles:**
- "FULL-STACK" (or "Full Stack Developer")
- "Frontend" (or "Frontend Developer")
- "Backend" (or "Backend Developer")
- "Data Scientist"
- "DevOps" (or "DevOps Engineer")
- Any role you provide - AI adapts dynamically

---

### 4. Feedback Generation

**When Feedback is Generated:**
- ❌ NOT in real-time (not after each answer during interview)
- ✅ Only at the END via `/api/interview/feedback` endpoint

**Rating Scale:** 1-10 (integer)
- 9-10: Excellent
- 7-8: Good/Above Average
- 5-6: Average/Satisfactory
- 3-4: Below Average/Needs Improvement
- 1-2: Poor

**Overall Score Calculation:**
```javascript
overallScore = (sum of all individual ratings) / (total number of questions)
// Rounded to 1 decimal place (e.g., 7.8, 6.5, 9.0)
```

**Feedback Categories:**
- **Technical:** Questions about specific technologies, frameworks, tools
- **Behavioral:** Questions about teamwork, challenges, problem-solving approach
- **Communication:** How clearly and concisely the candidate explained concepts
- **Problem-Solving:** How the candidate approached debugging, optimization, or design challenges

**Feedback Algorithm:**
1. AI analyzes each Q&A pair individually
2. Rates each answer on technical accuracy, depth, and clarity
3. Identifies patterns across all answers (strengths/weaknesses)
4. Generates personalized recommendations based on gaps

---

### 5. Error Handling

**HTTP Status Codes:**
- `200 OK` - Success
- `400 Bad Request` - Invalid input (missing fields, wrong data types)
- `500 Internal Server Error` - Server/AI failure

**Error Response Format:**
```json
{
  "success": false,
  "error": "Human-readable error message",
  "details": "Technical details (optional, for debugging)"
}
```

**Common Errors:**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Missing or invalid resumeData" | `resumeData` is null or not an object | Ensure resumeData is a valid JSON object |
| "Missing sessionId" | `sessionId` not provided in request | Pass sessionId from `/start` response |
| "Missing or invalid currentQuestionIndex" | Index is missing or not a number | Send 0-based index (0, 1, 2...) |
| "Failed to parse AI response" | AI returned malformed JSON | Retry the request (rare occurrence) |
| "AI service timeout" | Gemini API is slow/down | Retry after 3-5 seconds |

**Invalid Resume Data Handling:**
- If `skills` array is empty, AI generates generic opening question
- If `projects` array is empty, AI asks about work experience or skills
- If all fields are minimal, AI asks broader behavioral questions

**AI Failure Scenarios:**
- **Retry Mechanism:** No automatic retry - frontend should implement retry logic
- **Fallback:** If AI fails, return 500 error with details
- **Timeout:** Requests timeout after 30 seconds

---

### 6. Rate Limiting & Performance

**Rate Limits:**
- ❌ **No rate limiting currently implemented**
- ⚠️ Recommendation: Implement frontend throttling (1 request per 2-3 seconds)
- Future: May add rate limiting (e.g., 100 requests/hour per IP)

**Average Response Times:**

| Endpoint | Avg Response Time | Max Expected |
|----------|-------------------|--------------|
| `/api/interview/start` | 2-4 seconds | 8 seconds |
| `/api/interview/next` | 2-4 seconds | 8 seconds |
| `/api/interview/feedback` | 4-7 seconds | 15 seconds |

**Token Limits:**
- **Input:** No hard limit, but keep resume data concise (<2000 words)
- **Output:** Max 8192 tokens per response (sufficient for all use cases)
- **Transcript Length:** Recommend limiting answers to 300-500 words each

**Performance Tips:**
- Show loading spinner during AI requests
- Cache `sessionId` and `resumeData` in state (don't re-fetch)
- Debounce "Submit Answer" button (prevent double-clicks)
- For feedback endpoint, expect 5-10 second delay (analyze multiple Q&As)

---

### 7. Data Format Clarifications

#### **resumeData Structure (Complete)**

```typescript
{
  // ✅ REQUIRED FIELDS
  fullName: string;          // User's full name
  skills: string[];          // Array of skill names (e.g., ["React", "Node.js"])

  // ⚠️ OPTIONAL FIELDS (but highly recommended)
  email?: string;
  phone?: string;
  
  education?: Array<{
    degree: string;          // "Bachelor of Technology", "Master of Science"
    field?: string;          // "Computer Science", "Data Science"
    institution: string;     // University name
    graduationYear?: string; // "2024", "May 2024"
  }>;
  
  workExperience?: Array<{
    position: string;        // "Software Engineer", "Backend Developer Intern"
    company: string;         // Company name
    duration?: string;       // "2 years", "Jan 2023 - Dec 2024"
    responsibilities?: string; // Brief description
  }>;
  
  projects?: Array<{
    name: string;            // Project title
    description: string;     // 1-2 sentence description
    technologies?: string[]; // ["Django", "React", "PostgreSQL"]
  }>;
}
```

#### **Transcript Text Handling**

**Should you clean the transcript before sending?**
- ✅ **YES** - Basic cleaning recommended:
  - Remove filler words ("um", "uh", "like")
  - Fix capitalization (first letter capitalized)
  - Remove extra spaces
  - Keep punctuation for clarity

**Example:**
```javascript
// Raw Speech-to-Text output
"um so like I used react and uh node js for this project   and it was pretty cool"

// Cleaned (recommended)
"I used React and Node.js for this project and it was pretty cool."
```

- ❌ **DON'T** over-clean:
  - Don't correct grammar (AI evaluates natural speech)
  - Don't add content that wasn't spoken
  - Don't remove technical terms

---

## 🔄 Complete Integration Flow (Updated)

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER COMPLETES ONBOARDING                               │
│     → Resume data stored in localStorage/Context            │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  2. NAVIGATE TO /interview-lobby                            │
│     → Set up camera/mic permissions                         │
│     → User selects role (e.g., "FULL-STACK")              │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  3. USER CLICKS "START INTERVIEW"                           │
│     Frontend: POST /api/interview/start                     │
│     Request: { resumeData, selectedRole }                   │
│                                                             │
│     Backend Response:                                       │
│     { sessionId: "...", firstQuestion: "..." }             │
│                                                             │
│     Frontend Actions:                                       │
│     - Store sessionId in state                             │
│     - Initialize transcripts array: []                      │
│     - Display firstQuestion                                 │
│     - Enable Speech-to-Text                                 │
│     - Start Text-to-Speech to read question aloud          │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  4. USER SPEAKS ANSWER                                      │
│     → Speech-to-Text captures answer                        │
│     → Display live subtitles in currentTranscript          │
│     → User clicks "Confirm & Next" button                  │
│                                                             │
│     Frontend: POST /api/interview/next                      │
│     Request: {                                              │
│       sessionId,                                            │
│       currentQuestionIndex: 0,                              │
│       userAnswer: "transcribed text",                       │
│       previousQuestion: "the question just answered",       │
│       resumeData,                                           │
│       selectedRole                                          │
│     }                                                        │
│                                                             │
│     Backend Response:                                       │
│     { nextQuestion: "...", hasMoreQuestions: true }        │
│                                                             │
│     Frontend Actions:                                       │
│     - Append to transcripts array: {                       │
│         questionIndex: 0,                                   │
│         question: previousQuestion,                         │
│         answer: userAnswer                                  │
│       }                                                      │
│     - Display nextQuestion                                  │
│     - Reset currentTranscript to ""                        │
│     - Increment currentQuestionIndex                        │
│     - Repeat Speech-to-Text cycle                          │
└─────────────────────────────────────────────────────────────┘
                         ↓
         ┌───────────────────────────────┐
         │  REPEAT STEP 4 UNTIL...       │
         │  hasMoreQuestions = false     │
         └───────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  5. INTERVIEW COMPLETE                                      │
│     Backend Response (from /next):                          │
│     { nextQuestion: null, hasMoreQuestions: false }        │
│                                                             │
│     Frontend Actions:                                       │
│     - Navigate to /interview-feedback                       │
│     - Show loading spinner                                  │
│                                                             │
│     Frontend: POST /api/interview/feedback                  │
│     Request: {                                              │
│       sessionId,                                            │
│       transcripts: [                                        │
│         { questionIndex: 0, question: "...", answer: "..." },│
│         { questionIndex: 1, question: "...", answer: "..." },│
│         ...                                                 │
│       ],                                                     │
│       resumeData,                                           │
│       selectedRole,                                         │
│       integrityFlags: 2                                     │
│     }                                                        │
│                                                             │
│     Backend Response:                                       │
│     {                                                        │
│       overallScore: 7.8,                                    │
│       questions: [ /* individual ratings & feedback */ ],   │
│       strengths: [...],                                     │
│       weaknesses: [...],                                    │
│       recommendations: [...]                                │
│     }                                                        │
│                                                             │
│     Frontend Actions:                                       │
│     - Display overall score (big number)                    │
│     - Show strengths/weaknesses sections                    │
│     - Display detailed question-by-question feedback        │
│     - Show recommendations                                  │
│     - Option to download report as PDF                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Frontend Implementation Checklist

### Phase 1: Setup (Day 1)
- [ ] Create `useAIInterview` custom hook for API integration
- [ ] Add state variables to `InterviewContext.jsx`:
  - `sessionId`
  - `transcripts` (array)
  - `currentQuestionIndex`
  - `currentQuestion`
- [ ] Create API utility functions:
  - `startInterviewAPI(resumeData, selectedRole)`
  - `getNextQuestionAPI(sessionId, questionIndex, answer, previousQuestion, resumeData, selectedRole)`
  - `getFeedbackAPI(sessionId, transcripts, resumeData, selectedRole, integrityFlags)`

### Phase 2: Interview Flow (Day 2-3)
- [ ] Update `/interview-lobby`:
  - Add role selector dropdown
  - Call `startInterviewAPI()` on "Start Interview" button
  - Store `sessionId` and `firstQuestion` in context
  - Navigate to `/interview-room`

- [ ] Update `/interview-room` (Questions.jsx):
  - Display `currentQuestion` from context
  - Use Text-to-Speech to read question aloud
  - Capture user answer via Speech-to-Text
  - Show live subtitles in `currentTranscript`
  - On "Confirm & Next":
    - Call `getNextQuestionAPI()`
    - Append Q&A to `transcripts` array
    - If `hasMoreQuestions = false`, navigate to `/interview-feedback`
    - Otherwise, update `currentQuestion` and repeat

### Phase 3: Feedback Display (Day 4)
- [ ] Update `/interview-feedback` (FeedbackReport.jsx):
  - Call `getFeedbackAPI()` on component mount
  - Show loading spinner (5-10 seconds expected)
  - Display overall score (large number with gauge/progress bar)
  - Create sections for:
    - Strengths (green checkmark icons)
    - Weaknesses (orange warning icons)
    - Recommendations (blue lightbulb icons)
  - Create expandable accordion for detailed Q&A feedback:
    - Show question, answer, rating (stars), feedback text, category badge

### Phase 4: Error Handling (Day 5)
- [ ] Add try-catch blocks around all API calls
- [ ] Show user-friendly error messages (toast/modal)
- [ ] Handle network failures (retry button)
- [ ] Handle AI failures (graceful degradation)
- [ ] Add request timeout handling (30 seconds)

### Phase 5: Polish & Testing (Day 6-7)
- [ ] Add loading states for all API calls
- [ ] Test with various resume data (minimal, complete, edge cases)
- [ ] Test with different roles (Full Stack, Frontend, Backend)
- [ ] Test error scenarios (invalid data, network failure)
- [ ] Performance optimization (debounce, caching)
- [ ] Accessibility (screen readers, keyboard navigation)

---

## 🧪 Testing with Postman

### Test 1: Start Interview
```
POST http://localhost:3000/api/interview/start

Body (raw JSON):
{
  "resumeData": {
    "fullName": "John Doe",
    "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
    "projects": [
      {
        "name": "Portfolio Website",
        "description": "Built a personal portfolio using React and Tailwind CSS",
        "technologies": ["React", "Tailwind CSS", "Vercel"]
      }
    ]
  },
  "selectedRole": "FULL-STACK"
}

Expected Response:
{
  "success": true,
  "data": {
    "sessionId": "interview_1736874564789_a1b2c3d4e5f6g7h8",
    "firstQuestion": "Hello John! Let's get started. Tell me about your Portfolio Website project..."
  }
}
```

### Test 2: Get Next Question
```
POST http://localhost:3000/api/interview/next

Body (raw JSON):
{
  "sessionId": "interview_1736874564789_a1b2c3d4e5f6g7h8",
  "currentQuestionIndex": 0,
  "userAnswer": "I built my portfolio using React to showcase my projects. I used Tailwind CSS for styling and deployed it on Vercel. The site includes a project gallery, contact form, and blog section.",
  "previousQuestion": "Tell me about your Portfolio Website project",
  "resumeData": {
    "fullName": "John Doe",
    "skills": ["JavaScript", "React", "Node.js"],
    "projects": [{"name": "Portfolio Website", "description": "Built with React"}]
  },
  "selectedRole": "FULL-STACK"
}

Expected Response:
{
  "success": true,
  "data": {
    "nextQuestion": "That's great! How did you implement the contact form? Did you use a backend service or a third-party API?",
    "hasMoreQuestions": true
  }
}
```

### Test 3: Generate Feedback
```
POST http://localhost:3000/api/interview/feedback

Body (raw JSON):
{
  "sessionId": "interview_1736874564789_a1b2c3d4e5f6g7h8",
  "transcripts": [
    {
      "questionIndex": 0,
      "question": "Tell me about your Portfolio Website project",
      "answer": "I built my portfolio using React to showcase my projects. I used Tailwind CSS for styling and deployed it on Vercel."
    },
    {
      "questionIndex": 1,
      "question": "How did you implement the contact form?",
      "answer": "I used EmailJS to handle form submissions without a backend. I validated inputs on the client side and showed success/error messages."
    }
  ],
  "resumeData": {
    "fullName": "John Doe",
    "skills": ["JavaScript", "React"],
    "projects": [{"name": "Portfolio Website"}]
  },
  "selectedRole": "FULL-STACK",
  "integrityFlags": 0
}

Expected Response:
{
  "success": true,
  "data": {
    "overallScore": 7.5,
    "questions": [
      {
        "questionIndex": 0,
        "question": "Tell me about your Portfolio Website project",
        "answer": "I built my portfolio using React...",
        "rating": 8,
        "feedback": "Good explanation of your tech stack and deployment strategy. Consider mentioning performance optimizations or accessibility features.",
        "category": "Technical"
      },
      {
        "questionIndex": 1,
        "question": "How did you implement the contact form?",
        "answer": "I used EmailJS...",
        "rating": 7,
        "feedback": "Practical solution with EmailJS. However, as a full-stack developer, you should also be familiar with building custom backend APIs.",
        "category": "Technical"
      }
    ],
    "strengths": [
      "Clear communication",
      "Good knowledge of modern frontend tools"
    ],
    "weaknesses": [
      "Limited backend experience",
      "Could elaborate more on technical challenges"
    ],
    "recommendations": [
      "Build a project with custom backend API (Express/Node.js)",
      "Study RESTful API design principles"
    ]
  }
}
```

---

## 🔐 Special Considerations

### CORS (Cross-Origin Resource Sharing)
✅ **Already configured** - Backend has CORS enabled for all origins
```javascript
app.use(cors());
```
No additional frontend configuration needed.

### Authentication
❌ **Not implemented** - Currently no authentication required
- Future: May add JWT-based authentication
- Future: May add user accounts to save interview history

### Rate Limiting
❌ **Not implemented** - No rate limits currently
- Recommendation: Add frontend throttling (debounce API calls)
- Future: May add server-side rate limiting (e.g., 100 requests/hour)

### Data Privacy
⚠️ **Important Notes:**
- Backend does NOT store interview data in database
- All data is processed in-memory and discarded after response
- No logging of sensitive user information
- SessionID is for tracking purposes only (not persisted)

### Browser Compatibility
✅ **Tested on:**
- Chrome 110+ ✅
- Firefox 100+ ✅
- Edge 110+ ✅
- Safari 16+ ✅

### Required Environment Variables
```env
# Backend .env file
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000
```

---

## 📞 Support & Contact

**Backend Developer:** Siddhant Pandey
**Backend Repository:** HackSync/Backend
**Issues/Bugs:** Open GitHub issue or contact backend team

**Quick Links:**
- API Base URL: `http://localhost:3000` (dev)
- Health Check: `GET http://localhost:3000/` → Returns "Hello, World!"

---

## ✅ Summary for Frontend Developer

**What You Need to Know:**

1. **Three Endpoints:** `/start`, `/next`, `/feedback`
2. **Stateless Backend:** You maintain all conversation history
3. **SessionID:** Generated at `/start`, send with all requests
4. **7 Questions:** Interview ends after 7 questions (when `hasMoreQuestions = false`)
5. **Response Time:** 2-5 seconds per request, 5-10 seconds for feedback
6. **No Real-Time Feedback:** Feedback only at the end
7. **Rating Scale:** 1-10 for each question, average for overall score

**Key Frontend Responsibilities:**

- ✅ Maintain `transcripts` array throughout interview
- ✅ Track `currentQuestionIndex` (0-based)
- ✅ Store `sessionId` from start response
- ✅ Send `resumeData` with every request (from context/localStorage)
- ✅ Handle loading states (2-10 second delays expected)
- ✅ Handle errors gracefully (show user-friendly messages)
- ✅ Clean Speech-to-Text output before sending (remove filler words)

**Integration Estimate:** 5-7 days for complete implementation + testing

**Questions?** Contact backend team or refer to this document.

---

**Happy Coding! 🚀**
