# Habit Tracker Frontend

A modern, responsive, and aesthetically pleasing web application for tracking habits and managing daily tasks. This project features a premium "Glassmorphism" design with a neon-accented dark theme, providing a seamless user experience for monitoring personal growth.

## 🚀 Features

- **User Authentication:** Secure Sign Up and Login functionality with JWT handling.
- **Interactive Dashboard:**
  - **Habit Grid:** Visual weekly tracking of habits with completion status.
  - **Performance Stats:** Real-time calculation of completion rates and streaks.
  - **Visualizations:** Progress bars and dynamic indicators for habit performance.
- **Habit Management:** Create, edit, and delete habits with customizable icons and goals.
- **Task Management:** Dedicated task list with completion tracking and statistics.
- **Responsive Design:** Fully optimized execution for Desktops, Tablets, and Mobile devices.
- **Theme:** Custom Dark Mode with Glassmorphism effects and Neon Green accents.

## 🛠️ Technology Stack

### Frontend
- **Framework:** React (Vite)
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Styling:** Custom Vanilla CSS (Glassmorphism & Flexbox/Grid layouts)
- **Linting:** ESLint

### Backend Integration
The frontend connects to a robust backend system:
- **Runtime:** Node.js & Express
- **Database:** PostgreSQL (managed via Prisma ORM)
- **Security:** Helmet, Rate Limiting, BCrypt (Password Hashing)
- **Authentication:** JSON Web Tokens (JWT)

## 📂 Project Structure

### Frontend Structure
```bash
Habit-Tracker-Frontend/
├── src/
│   ├── api/            # API integration handles (Axios/Fetch wrappers)
│   ├── components/     # Reusable UI components (HabitGrid, Navbar, Modals)
│   ├── context/        # React Context for global state (Auth, Habits)
│   ├── pages/          # Full page layouts (Dashboard, Landing, Login)
│   ├── App.jsx         # Main application component & Routing
│   └── main.jsx        # Entry point
├── index.html
└── vite.config.js
```

### Backend Structure
> **Note:** The backend repository is currently private due to privacy concerns. The structure below is provided for reference regarding the full-stack architecture.

```bash
Habit-Tracker-Backend/
├── middleware/         # Custom middleware (Auth, Error handling)
├── models/             # Database models (extensions to Prisma)
├── prisma/
│   └── schema.prisma   # Database schema definition
├── routes/             # Express route definitions (Auth, Habits, Tasks)
├── server.js           # Server entry point
└── .env                # Environment variables configuration
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- A running instance of the **Habit Tracker Backend**.

### Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/amitraj99053/Habit-Tracker-Frontend.git
    cd habit-tracker-frontend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory (if not present) and set your backend URL:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The app will typically launch at `http://localhost:5173`.

## 🚀 Deployment

### Frontend (Vercel)
This project includes a `vercel.json` configuration for seamless deployment on Vercel.
1.  Connect your GitHub repository to Vercel.
2.  Vercel will detect the `vite` build settings automatically.
3.  Add the `VITE_API_URL` environment variable in the Vercel dashboard pointing to your deployed backend.

### Backend (Render/Railway)
Ensure your backend is deployed and accessible. Refer to the backend repository's `DEPLOYMENT.md` for specific instructions on setting up the Node.js/Express server and PostgreSQL database.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.
