<h1>MealMind(healthlogs)</h1>

MealMind is a React-based web application designed to help users track meals, explore healthier food alternatives, analyze nutrition using AI, manage exercises, and follow personalized diet plans.

The application focuses on Indian and Maharashtrian cuisine and provides intelligent health insights powered by Google Gemini AI.

🚀 Features
Meal tracking and logging
AI-based nutrition analysis
Food alternatives suggestions
Image-based food identification
Exercise tracking and calorie estimation
Predefined and customizable diet plans
Personalized AI recommendations
Health score calculation
🛠️ Tech Stack

Frontend:

React 19.2.0
TypeScript
Vite 6.2.0

Styling:

Tailwind CSS (CDN)

Routing:

React Router DOM 7.9.4

AI Integration:

@google/genai (Google Gemini AI)

Other:

Unsplash API (images)
Custom SVG icons
📁 Project Structure

MealMind/
│
├── index.html
├── index.tsx
├── App.tsx
├── vite.config.ts
├── package.json
├── tsconfig.json
├── README.md
├── .gitignore
├── metadata.json
├── TODO.md
│
├── components/
│ ├── Header.tsx
│ ├── HealthScore.tsx
│ ├── CustomizePlanModal.tsx
│ ├── CustomizeExerciseModal.tsx
│ └── CameraLogModal.tsx
│
├── pages/
│ ├── MealLog.tsx
│ ├── FoodAlternatives.tsx
│ ├── AiAnalyzer.tsx
│ ├── Exercises.tsx
│ └── DietPlans.tsx
│
├── services/
│ └── geminiService.ts
│
├── types.ts
└── constants.tsx

📌 Key Files

App.tsx
Defines application routes:

/ → MealLog
/alternatives → Food Alternatives
/analyzer → AI Analyzer
/exercises → Exercises
/diets → Diet Plans

geminiService.ts
Handles all AI-related features:

Nutrition data retrieval
Food identification from images
AI-generated responses
Diet and exercise plan generation
Calorie burn estimation

types.ts
Contains TypeScript interfaces such as FoodItem, Meal, Exercise, and DietPlan.

constants.tsx
Includes predefined food items, exercises, and diet plans.

🤖 Gemini AI Integration
Uses GoogleGenAI from @google/genai
API key is stored in environment variable

Example:
GEMINI_API_KEY=your_api_key_here

Model used:
gemini-2.5-flash

Capabilities:

Nutrition analysis using Google Search
Food recognition from images
Smart food alternatives
Personalized diet plans
AI-based exercise suggestions
⚙️ Installation & Setup



<h1>
 IMAGE

</h1>
<img width="1904" height="903" alt="image" src="https://github.com/user-attachments/assets/ab7d12b9-6165-4db1-9a2d-f0286035e791" />

cd mealmind

Install dependencies

npm install

Create .env file

GEMINI_API_KEY=your_api_key_here

Run the project

npm run dev

Application will run on:
https://health-logs-six.vercel.app/


📦 Scripts

npm run dev → Start development server
npm run build → Build for production
npm run preview → Preview production build

🎯 Future Scope
User authentication and profiles
Mobile application
Wearable device integration
Advanced analytics dashboard
Social sharing features
Multi-language support
More AI integrations
