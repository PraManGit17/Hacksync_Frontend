# Career Roadmap API - JSON Structure Documentation

## Overview
This document defines the exact JSON structures required for the two different roadmap components in your application.

---

## 1. Simple Career Roadmap (Used in Career.jsx)

This roadmap displays a visual path with milestone nodes connected by an animated SVG path.

### Component Location
- **Component**: `src/components/Roadmap.jsx`
- **Data Source**: `src/data/RoadmapData.js`
- **Page**: `src/pages/Career.jsx`

### Expected API Response Structure

```json
{
  "careerPath": {
    "userId": "user123",
    "careerTitle": "Full Stack Developer",
    "generatedAt": "2026-01-15T10:30:00Z",
    "totalSteps": 5,
    "completedSteps": 1,
    "roadmapSteps": [
      {
        "id": 1,
        "title": "AI Career Path Recommender",
        "desc": "Analyzing skills, education, and interests to suggest trending roles.",
        "status": "completed",
        "icon": "Sparkles",
        "x": "25%",
        "y": "5%"
      },
      {
        "id": 2,
        "title": "AI Resume & Readiness",
        "desc": "Generating ATS-compatible resumes and evaluating job readiness.",
        "status": "current",
        "icon": "FileText",
        "x": "75%",
        "y": "28%"
      },
      {
        "id": 3,
        "title": "Personalized Learning Guide",
        "desc": "Identifying skill gaps and recommending relevant certifications.",
        "status": "locked",
        "icon": "Target",
        "x": "25%",
        "y": "51%"
      },
      {
        "id": 4,
        "title": "Interactive Interview Module",
        "desc": "Live simulator with video, coding support, and AI feedback.",
        "status": "locked",
        "icon": "Video",
        "x": "75%",
        "y": "74%"
      },
      {
        "id": 5,
        "title": "Career Persona Generator",
        "desc": "Final summarized professional profile and portfolio deployment.",
        "status": "locked",
        "icon": "Sparkles",
        "x": "50%",
        "y": "95%"
      }
    ]
  }
}
```

### Field Definitions (Simple Roadmap)

| Field | Type | Required | Description | Valid Values |
|-------|------|----------|-------------|--------------|
| `id` | number | ✅ | Unique identifier for the milestone | Any positive integer |
| `title` | string | ✅ | Short title of the milestone | Max 60 characters |
| `desc` | string | ✅ | Description explaining the milestone | Max 150 characters |
| `status` | string | ✅ | Current status of this milestone | `"completed"`, `"current"`, `"locked"` |
| `icon` | string | ✅ | Icon name from lucide-react | `"Sparkles"`, `"FileText"`, `"Target"`, `"Video"`, `"Lock"` |
| `x` | string | ✅ | Horizontal position on SVG path | Format: `"XX%"` (e.g., `"25%"`, `"75%"`) |
| `y` | string | ✅ | Vertical position on SVG path | Format: `"XX%"` (e.g., `"5%"`, `"95%"`) |

### Status Values Explained
- **`"completed"`**: User has finished this milestone (green checkmark, glowing purple)
- **`"current"`**: User is currently on this milestone (white glow, active)
- **`"locked"`**: User hasn't reached this milestone yet (gray, locked icon)

### Icon Options
Available icons from lucide-react library:
- `"Sparkles"` - AI/magic related
- `"FileText"` - Document/resume related
- `"Target"` - Goal/learning related
- `"Video"` - Video/interview related
- `"Lock"` - Locked state
- `"Award"` - Achievement/certification
- `"Code"` - Programming/coding
- `"Briefcase"` - Career/professional

### X/Y Positioning Guide
The roadmap follows a snake-like path:
- **Start (Top-Left)**: `x: "25%", y: "5%"`
- **Right Peak**: `x: "75%", y: "28%"`
- **Left Peak**: `x: "25%", y: "51%"`
- **Right Peak**: `x: "75%", y: "74%"`
- **End (Center-Bottom)**: `x: "50%", y: "95%"`

For custom paths, ensure x is less than 50% for left-aligned cards, greater than 50% for right-aligned cards.

---

## 2. Detailed Learning Roadmap (Used in RoadmapDetailPage.jsx)

This roadmap displays a hierarchical, level-based learning path with detailed topics, prerequisites, and resources.

### Component Location
- **Component**: `src/components/RoadmapView.jsx`
- **Data Source**: `src/data/frontendRoadmap.js`
- **Page**: `src/pages/RoadmapDetailPage.jsx`
- **Sub-components**: `RoadmapLevel.jsx`, `RoadmapNode.jsx`, `RoadmapPanel.jsx`

### Expected API Response Structure

```json
{
  "roadmap": {
    "id": "frontend-dev-2026",
    "title": "Frontend Developer",
    "description": "Complete learning path from HTML/CSS fundamentals to advanced React frameworks",
    "careerRole": "Frontend Developer",
    "userId": "user123",
    "createdAt": "2026-01-15T10:30:00Z",
    "estimatedDuration": "6-9 months",
    "difficulty": "beginner-to-intermediate",
    "levels": [
      {
        "level": 1,
        "label": "Foundations",
        "description": "Core web technologies and fundamentals",
        "estimatedWeeks": 4,
        "nodes": [
          {
            "id": "html",
            "title": "HTML",
            "description": "Learn semantic HTML, accessibility, and document structure.",
            "priority": "must",
            "estimatedHours": 20,
            "prerequisites": [],
            "resources": [
              {
                "label": "MDN HTML Guide",
                "url": "https://developer.mozilla.org/en-US/docs/Web/HTML",
                "type": "documentation"
              },
              {
                "label": "freeCodeCamp HTML Course",
                "url": "https://www.freecodecamp.org/learn",
                "type": "course"
              }
            ]
          },
          {
            "id": "css",
            "title": "CSS",
            "description": "Master layout, Flexbox, Grid, animations, and responsive design.",
            "priority": "must",
            "estimatedHours": 30,
            "prerequisites": ["html"],
            "resources": [
              {
                "label": "CSS Tricks Complete Guide",
                "url": "https://css-tricks.com",
                "type": "documentation"
              },
              {
                "label": "Flexbox Froggy Game",
                "url": "https://flexboxfroggy.com",
                "type": "interactive"
              }
            ]
          }
        ]
      },
      {
        "level": 2,
        "label": "Core JavaScript",
        "description": "JavaScript fundamentals and ES6+ features",
        "estimatedWeeks": 6,
        "nodes": [
          {
            "id": "js-basics",
            "title": "JavaScript Fundamentals",
            "description": "Variables, data types, functions, control flow, and operators.",
            "priority": "must",
            "estimatedHours": 40,
            "prerequisites": ["html", "css"],
            "resources": [
              {
                "label": "JavaScript.info Tutorial",
                "url": "https://javascript.info",
                "type": "documentation"
              },
              {
                "label": "Eloquent JavaScript Book",
                "url": "https://eloquentjavascript.net",
                "type": "book"
              }
            ]
          },
          {
            "id": "js-advanced",
            "title": "Advanced JavaScript",
            "description": "Closures, async/await, promises, DOM manipulation, ES6+ features.",
            "priority": "must",
            "estimatedHours": 50,
            "prerequisites": ["js-basics"],
            "resources": [
              {
                "label": "You Don't Know JS",
                "url": "https://github.com/getify/You-Dont-Know-JS",
                "type": "book"
              }
            ]
          }
        ]
      },
      {
        "level": 3,
        "label": "Frontend Frameworks",
        "description": "Modern component-based UI development",
        "estimatedWeeks": 8,
        "nodes": [
          {
            "id": "react",
            "title": "React.js",
            "description": "Hooks, state management, component lifecycle, performance optimization.",
            "priority": "must",
            "estimatedHours": 60,
            "prerequisites": ["js-advanced"],
            "resources": [
              {
                "label": "Official React Documentation",
                "url": "https://react.dev",
                "type": "documentation"
              },
              {
                "label": "React Tutorial for Beginners",
                "url": "https://www.youtube.com/watch?v=react-tutorial",
                "type": "video"
              }
            ]
          },
          {
            "id": "react-router",
            "title": "React Router",
            "description": "Client-side routing and navigation for single-page applications.",
            "priority": "should",
            "estimatedHours": 15,
            "prerequisites": ["react"],
            "resources": [
              {
                "label": "React Router Documentation",
                "url": "https://reactrouter.com",
                "type": "documentation"
              }
            ]
          }
        ]
      },
      {
        "level": 4,
        "label": "State Management & APIs",
        "description": "Advanced state management and backend integration",
        "estimatedWeeks": 6,
        "nodes": [
          {
            "id": "redux",
            "title": "Redux / Zustand",
            "description": "Global state management patterns and libraries.",
            "priority": "should",
            "estimatedHours": 30,
            "prerequisites": ["react"],
            "resources": [
              {
                "label": "Redux Toolkit Documentation",
                "url": "https://redux-toolkit.js.org",
                "type": "documentation"
              },
              {
                "label": "Zustand GitHub",
                "url": "https://github.com/pmndrs/zustand",
                "type": "documentation"
              }
            ]
          },
          {
            "id": "api-integration",
            "title": "REST APIs & Axios",
            "description": "Fetching data, error handling, authentication, and API integration.",
            "priority": "must",
            "estimatedHours": 25,
            "prerequisites": ["react"],
            "resources": [
              {
                "label": "Axios Documentation",
                "url": "https://axios-http.com",
                "type": "documentation"
              }
            ]
          }
        ]
      },
      {
        "level": 5,
        "label": "Build Tools & Deployment",
        "description": "Production-ready workflows and deployment",
        "estimatedWeeks": 4,
        "nodes": [
          {
            "id": "vite-webpack",
            "title": "Vite / Webpack",
            "description": "Module bundlers, build optimization, and development tools.",
            "priority": "should",
            "estimatedHours": 20,
            "prerequisites": ["react"],
            "resources": [
              {
                "label": "Vite Official Guide",
                "url": "https://vitejs.dev",
                "type": "documentation"
              }
            ]
          },
          {
            "id": "deployment",
            "title": "Deployment (Vercel/Netlify)",
            "description": "Deploy applications to production with CI/CD pipelines.",
            "priority": "must",
            "estimatedHours": 15,
            "prerequisites": ["vite-webpack"],
            "resources": [
              {
                "label": "Vercel Documentation",
                "url": "https://vercel.com/docs",
                "type": "documentation"
              },
              {
                "label": "Netlify Documentation",
                "url": "https://docs.netlify.com",
                "type": "documentation"
              }
            ]
          }
        ]
      },
      {
        "level": 6,
        "label": "Advanced & Optional",
        "description": "Specialized topics and modern tools",
        "estimatedWeeks": 8,
        "nodes": [
          {
            "id": "typescript",
            "title": "TypeScript",
            "description": "Static typing, interfaces, generics, and type safety.",
            "priority": "nice",
            "estimatedHours": 40,
            "prerequisites": ["react"],
            "resources": [
              {
                "label": "TypeScript Official Handbook",
                "url": "https://www.typescriptlang.org/docs/handbook/",
                "type": "documentation"
              }
            ]
          },
          {
            "id": "nextjs",
            "title": "Next.js",
            "description": "Server-side rendering, static generation, and full-stack React framework.",
            "priority": "nice",
            "estimatedHours": 50,
            "prerequisites": ["react", "api-integration"],
            "resources": [
              {
                "label": "Next.js Documentation",
                "url": "https://nextjs.org/docs",
                "type": "documentation"
              }
            ]
          },
          {
            "id": "testing",
            "title": "Testing (Jest/Vitest)",
            "description": "Unit testing, integration testing, and test-driven development.",
            "priority": "should",
            "estimatedHours": 30,
            "prerequisites": ["react"],
            "resources": [
              {
                "label": "Jest Documentation",
                "url": "https://jestjs.io",
                "type": "documentation"
              },
              {
                "label": "React Testing Library",
                "url": "https://testing-library.com/react",
                "type": "documentation"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Field Definitions (Detailed Roadmap)

#### Root Object
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier for this roadmap |
| `title` | string | ✅ | Roadmap title (e.g., "Frontend Developer") |
| `description` | string | ⚪ | Brief overview of the roadmap |
| `careerRole` | string | ⚪ | Target career role |
| `userId` | string | ⚪ | User this roadmap is for |
| `createdAt` | string | ⚪ | ISO 8601 timestamp |
| `estimatedDuration` | string | ⚪ | Total time estimate |
| `difficulty` | string | ⚪ | Overall difficulty level |
| `levels` | array | ✅ | Array of level objects (see below) |

#### Level Object
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `level` | number | ✅ | Level number (1, 2, 3, ...) |
| `label` | string | ✅ | Level name/title |
| `description` | string | ⚪ | What this level covers |
| `estimatedWeeks` | number | ⚪ | Time to complete this level |
| `nodes` | array | ✅ | Array of node objects (topics) |

#### Node Object (Topic/Module)
| Field | Type | Required | Description | Valid Values |
|-------|------|----------|-------------|--------------|
| `id` | string | ✅ | Unique identifier (used for prerequisites) | Lowercase, hyphenated (e.g., `"js-basics"`) |
| `title` | string | ✅ | Topic name displayed on card | Max 40 characters |
| `description` | string | ✅ | Detailed explanation of the topic | Max 200 characters |
| `priority` | string | ✅ | How important this topic is | `"must"`, `"should"`, `"nice"` |
| `estimatedHours` | number | ⚪ | Time needed to complete | Positive integer |
| `prerequisites` | array | ✅ | IDs of nodes that must be completed first | Array of node IDs (can be empty `[]`) |
| `resources` | array | ✅ | Learning resources for this topic | Array of resource objects |

#### Resource Object
| Field | Type | Required | Description | Valid Values |
|-------|------|----------|-------------|--------------|
| `label` | string | ✅ | Display name of the resource | Max 60 characters |
| `url` | string | ✅ | Full URL to the resource | Valid HTTP/HTTPS URL |
| `type` | string | ⚪ | Type of resource | `"documentation"`, `"course"`, `"video"`, `"book"`, `"interactive"`, `"article"` |

### Priority Levels Explained
- **`"must"`**: Essential/core topic - required for career success
- **`"should"`**: Important but not critical - strongly recommended
- **`"nice"`**: Optional/advanced - good to know but not required

### Prerequisites Logic
- Nodes with `prerequisites: []` are available immediately (status: `"available"`)
- Nodes with prerequisites are locked until ALL prerequisites are completed
- When a node is marked complete, all nodes that list it as a prerequisite are checked and unlocked if all requirements are met

---

## API Endpoint Recommendations

### For Simple Career Roadmap
```
GET /api/roadmap/career-path/:userId
Response: Simple roadmap JSON as shown above
```

### For Detailed Learning Roadmap
```
GET /api/roadmap/learning-path/:userId/:careerRole
Response: Detailed roadmap JSON as shown above

Example:
GET /api/roadmap/learning-path/user123/frontend-developer
```

### User Progress Tracking
```
POST /api/roadmap/progress
Body: {
  "userId": "user123",
  "nodeId": "react",
  "status": "completed",
  "completedAt": "2026-01-15T10:30:00Z"
}
```

---

## Full Example: Complete Backend Response

### Simple Career Roadmap API Response
```json
{
  "success": true,
  "data": {
    "careerPath": {
      "userId": "user123",
      "careerTitle": "Full Stack Developer",
      "generatedAt": "2026-01-15T10:30:00Z",
      "totalSteps": 5,
      "completedSteps": 1,
      "currentStep": 2,
      "roadmapSteps": [
        {
          "id": 1,
          "title": "AI Career Path Recommender",
          "desc": "Analyzing skills, education, and interests to suggest trending roles.",
          "status": "completed",
          "icon": "Sparkles",
          "x": "25%",
          "y": "5%"
        },
        {
          "id": 2,
          "title": "AI Resume & Readiness",
          "desc": "Generating ATS-compatible resumes and evaluating job readiness.",
          "status": "current",
          "icon": "FileText",
          "x": "75%",
          "y": "28%"
        },
        {
          "id": 3,
          "title": "Personalized Learning Guide",
          "desc": "Identifying skill gaps and recommending relevant certifications.",
          "status": "locked",
          "icon": "Target",
          "x": "25%",
          "y": "51%"
        },
        {
          "id": 4,
          "title": "Interactive Interview Module",
          "desc": "Live simulator with video, coding support, and AI feedback.",
          "status": "locked",
          "icon": "Video",
          "x": "75%",
          "y": "74%"
        },
        {
          "id": 5,
          "title": "Career Persona Generator",
          "desc": "Final summarized professional profile and portfolio deployment.",
          "status": "locked",
          "icon": "Sparkles",
          "x": "50%",
          "y": "95%"
        }
      ]
    }
  }
}
```

### Detailed Learning Roadmap API Response
```json
{
  "success": true,
  "data": {
    "roadmap": {
      "id": "frontend-dev-user123-2026",
      "title": "Frontend Developer",
      "description": "Personalized learning path based on your resume analysis",
      "careerRole": "Frontend Developer",
      "userId": "user123",
      "createdAt": "2026-01-15T10:30:00Z",
      "estimatedDuration": "6-9 months",
      "difficulty": "beginner-to-intermediate",
      "levels": [
        {
          "level": 1,
          "label": "Foundations",
          "description": "Core web technologies",
          "estimatedWeeks": 4,
          "nodes": [
            {
              "id": "html",
              "title": "HTML",
              "description": "Learn semantic HTML, accessibility, and document structure.",
              "priority": "must",
              "estimatedHours": 20,
              "prerequisites": [],
              "resources": [
                {
                  "label": "MDN HTML Guide",
                  "url": "https://developer.mozilla.org/en-US/docs/Web/HTML",
                  "type": "documentation"
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

---

## Integration Steps for Backend Team

1. **Generate Roadmap from User Profile**
   - Read `userProfile` from the resume parsing step
   - Use Gemini/AI to analyze skills, education, and experience
   - Generate personalized roadmap with appropriate difficulty and topics

2. **Determine Prerequisites**
   - Based on user's existing skills, mark some nodes as "completed"
   - Calculate which nodes should be "available" vs "locked"

3. **Personalize Content**
   - Adjust `estimatedHours` based on user's skill level
   - Recommend resources matching user's learning style
   - Reorder or skip levels based on existing knowledge

4. **Save to MongoDB**
   - Store roadmap with user association
   - Track completion status
   - Update as user marks topics complete

5. **Return JSON**
   - Use the exact structure shown above
   - Ensure all required fields are present
   - Validate URLs in resources array

---

## Notes for Implementation

### Frontend Expects
- **Simple Roadmap**: The component directly maps `roadmapSteps` array to render nodes
- **Detailed Roadmap**: Automatically calculates status based on prerequisites

### Status Calculation (Frontend)
The frontend will automatically manage node status:
- Nodes with `prerequisites: []` → `"available"`
- Nodes with incomplete prerequisites → `"locked"`
- User marks nodes as → `"completed"` (triggers unlock check)

### Icons
Frontend uses lucide-react icons. Backend should send icon name as string:
- `"Sparkles"`, `"FileText"`, `"Target"`, `"Video"`, `"Lock"`, `"Code"`, `"Award"`, `"Briefcase"`

### Positioning (Simple Roadmap Only)
If backend generates custom paths, ensure:
- X values are `"XX%"` format (0-100)
- Y values increase progressively (5% → 95%)
- Cards align properly based on X < 50% (left) or X > 50% (right)

---

## Testing Checklist

- [ ] All required fields present
- [ ] Valid status values (`"completed"`, `"current"`, `"locked"`)
- [ ] Valid priority values (`"must"`, `"should"`, `"nice"`)
- [ ] Prerequisites reference existing node IDs
- [ ] All resource URLs are valid and accessible
- [ ] Icon names match lucide-react library
- [ ] X/Y values in correct percentage format
- [ ] No circular dependencies in prerequisites
- [ ] Level numbers are sequential (1, 2, 3...)
- [ ] Node IDs are unique across all levels
