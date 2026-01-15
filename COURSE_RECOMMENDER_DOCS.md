# Course Recommender Feature - Frontend Integration

## Overview
The Course Recommender page allows users to get AI-powered course recommendations based on their resume data and target role.

## Route
- **Path**: `/courses`
- **Component**: `CourseRecommender.jsx`

## Features

### 1. **Input Section**
- Target role input field with autocomplete
- 10 popular role suggestions (Full Stack Developer, Data Scientist, etc.)
- Error handling for missing input
- Resume data automatically fetched from localStorage

### 2. **AI Processing**
- Loading state with spinner and "Analyzing Your Profile..." message
- Fetches from `POST http://localhost:3000/api/courses/recommend`
- Sends resume data and target role to backend

### 3. **Results Display**

#### Gap Analysis Card
- Shows skill gap summary in a prominent purple/pink gradient card
- Displays current skills as badges
- Icon: TrendingUp (trending upward arrow)

#### Course Cards
- **Rank Badge**: Numbered 1-7 with color coding:
  - Rank 1-3: Red/Orange gradient (Critical)
  - Rank 4-5: Yellow/Amber gradient (Recommended)
  - Rank 6-7: Green/Emerald gradient (Advanced)

- **Course Information**:
  - Title (bold, hover turns purple)
  - Reason for recommendation
  - Platform badge (purple background)
  - Instructor (if available)
  - Duration (e.g., "40h")
  - Rating (yellow star icon, hidden if N/A)
  - Difficulty badge with color coding:
    - Beginner: Green
    - Intermediate: Yellow
    - Advanced: Red

- **Action Button**: "View Course" with external link icon

### 4. **User Actions**
- "New Search" button (top right of results)
- "Search Another Role" button (bottom)
- "View Learning Roadmap" button (navigates to /roadmaps)
- "Back to Home" button (top left)

## Design System

### Colors
- **Background**: `#080808` (black)
- **Cards**: `zinc-900/50` with `zinc-800` borders
- **Primary**: Purple (`purple-500/600`) and Pink (`pink-500/600`)
- **Success**: Green (`green-400/500`)
- **Warning**: Yellow (`yellow-400/500`)
- **Critical**: Red/Orange (`red-500`, `orange-500`)

### Typography
- **Main Heading**: 5xl, font-black, uppercase
- **Subheading**: 2xl/3xl, font-bold
- **Body**: text-sm to text-base
- **Badges**: text-xs, uppercase, tracking-wider

### Icons (lucide-react)
- **Sparkles**: AI/Magic indicator
- **Target**: Target role input
- **TrendingUp**: Gap analysis
- **BookOpen**: Platform badge
- **Award**: Instructor
- **Clock**: Duration
- **Star**: Rating (filled yellow)
- **ExternalLink**: Course link button

## API Integration

### Request
```javascript
POST http://localhost:3000/api/courses/recommend
Content-Type: application/json

{
  "resumeData": {
    "fullName": "string",
    "email": "string",
    "skills": ["array"],
    "education": [...],
    "workExperience": [...],
    "projects": [...]
  },
  "targetRole": "Full Stack Developer"
}
```

### Response
```javascript
{
  "success": true,
  "targetRole": "Full Stack Developer",
  "currentSkills": ["Python", "Django", ...],
  "data": {
    "gapAnalysis": "You need React, Node.js...",
    "recommendedCourses": [
      {
        "rank": 1,
        "title": "React - The Complete Guide",
        "platform": "Udemy",
        "instructor": "Maximilian Schwarzmüller",
        "difficulty": "Beginner to Advanced",
        "duration": "48h",
        "rating": "4.6/5",
        "reason": "Critical frontend framework missing",
        "link": "https://..."
      }
    ]
  }
}
```

## State Management

### States
- `targetRole`: User's target role input (string)
- `loading`: Loading state (boolean)
- `error`: Error message (string | null)
- `recommendations`: API response data (object | null)

### LocalStorage
- **Key**: `userProfile`
- **Usage**: Resume data fetched automatically when "Get AI Recommendations" is clicked

## Error Handling

1. **No Input**: "Please enter a target role"
2. **No Resume Data**: "No resume data found. Please complete onboarding first."
3. **API Error**: Displays error message from backend
4. **Network Error**: "Failed to get course recommendations"

## Responsive Design
- Max width: `max-w-3xl` (input section), `max-w-5xl` (results)
- Centered layout with `mx-auto`
- Padding: `px-10` horizontal, `pt-32 pb-20` vertical
- Gap spacing: Consistent use of `gap-2/3/4/6`

## Navigation Flow
1. User navigates to `/courses` from Navbar
2. Enters target role (or selects from suggestions)
3. Clicks "Get AI Recommendations"
4. Views results with gap analysis and ranked courses
5. Options:
   - Click "View Course" to open course link
   - Click "Search Another Role" to start over
   - Click "View Learning Roadmap" to see personalized roadmap

## Consistency with Existing Design
- Matches dark theme (`#080808` background)
- Uses same button styles (purple gradient)
- Same card styles (zinc-900/800 with borders)
- Consistent typography and spacing
- Same navbar and navigation patterns
- Matches icon usage from other pages
