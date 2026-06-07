# Agronex (Farmers App) 🌾🚜

Agronex is a next-generation AI-powered agricultural intelligence platform designed to empower farmers and agricultural experts. It provides real-time insights, satellite scans, market price predictions, disease detection, soil analysis, and an interactive AI smart assistant.

---

## 🚀 Key Features

*   **🛰️ NDVI Satellite Scanner**: Scan fields using Google Earth Engine and Sentinel-2 satellite data to calculate vegetation health, soil moisture, and carbon indices.
*   **📈 Market Mandi Prices & Analytics**: Real-time market state/district pricing updates and machine learning-powered crop price predictions.
*   **🍂 Crop Disease Detector**: Upload leaf images to scan for diseases with expert treatment advice.
*   **🧪 Soil Analyzer**: Run chemical analysis on soil inputs and generate custom crop recommendations.
*   **💬 Expert Chat Hub**: Consult with agricultural experts using natural language or voice assistants.
*   **🤖 Smart AI Assistant**: Ask questions about planting cycles, weather warnings, and pest management.
*   **🔮 Yield Predictor**: Predict future crop yields based on historic farm size, location, and soil metrics.
*   **☁️ Weather Integration**: Localized weather tracking and climate alerts.
*   **🌐 Multilingual Support**: Fully localized in multiple Indian languages (English, Hindi, Telugu, etc.).

---

## 🛠️ Tech Stack

**Frontend:**
*   React 18 (TypeScript)
*   Vite (Build Tool)
*   TailwindCSS (Styling)
*   Framer Motion (Micro-animations)
*   React Router DOM (Routing)
*   React Leaflet (GIS Map rendering)
*   Clerk Auth (User Authentication)
*   Firebase (Real-time database for Community Hub)

**Backend:**
*   Express.js (Node.js REST API)
*   Mongoose & MongoDB (Database storage)
*   Google Earth Engine (Satellite image rendering)
*   Groq SDK & OpenAI (AI Chatbot model reasoning)
*   Nodemailer & Razorpay/Stripe (Services)

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js (v20+ recommended)
- `npm` or `pnpm` (configured in lockfiles)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd farmersapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your Environment Variables by copying `.env.example` or editing the `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   VITE_OPENWEATHER_API_KEY=your_weather_key
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   GEE_PROJECT_ID=your_gee_project
   GEE_CLIENT_EMAIL=your_gee_email
   GEE_PRIVATE_KEY=your_gee_private_key
   VITE_PUBLIC_BUILDER_KEY=your_builder_key
   ```

4. Run the development server (runs both frontend and backend concurrently):
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser.

---

## 🌐 Production Deployment (Split Setup)

This project is configured to run in a split deployment architecture:
- **Frontend** hosted on **Vercel** (Vite SPA)
- **Backend** hosted on **Render** (Express Web Service)

### Backend Deployment (Render)
1. Create a **Web Service** on Render pointing to this repository.
2. Select **Node** as the language.
3. Configure the commands:
   *   **Build Command**: `npm install && npm run build:server`
   *   **Start Command**: `npm run start`
4. Set up the environment variables from your `.env` file.
5. Deploy and obtain your Render Web Service URL (e.g. `https://farmersapp-backend.onrender.com`).

### Frontend Deployment (Vercel)
1. Create a new project in Vercel pointing to the same repository.
2. Update **`vercel.json`** in your root directory to ensure the destination points to your Render URL:
   ```json
   {
     "version": 2,
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://YOUR-RENDER-BACKEND-URL.onrender.com/api/$1"
       },
       {
         "source": "/((?!api/).*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
3. In Vercel Project Settings, select **Vite** as the preset.
4. Set **Build Command** to `npm run build:client` and **Output Directory** to `dist/spa`.
5. Set your client environment variables (keys starting with `VITE_`).
6. Deploy!
