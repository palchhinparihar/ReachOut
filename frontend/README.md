# ReachOut

ReachOut is a full-stack web application designed to connect individuals and organizations for support, collaboration, and resource sharing. The project streamlines the process of submitting, managing, and reviewing applications for assistance or partnership, making it easier for users to reach out and get the help they need.

## Features
- User authentication (signup, login, logout)
- Application form submission and management
- Dashboard for users to track their applications
- List and review of submitted applications
- Responsive UI with reusable components
- Integration with Supabase for backend services
- Modern design and smooth user experience

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Database & Auth:** Supabase

## Project Structure
```
frontend/
    public/
    src/
        App.jsx, App.css, index.css, main.jsx
        assets/
        components/
            Logout.jsx, ProtectedRoute.jsx, ui/ (Button.jsx, Input.jsx, Particles.jsx)
        context/ (AuthContext.jsx)
        data/ (applicationInputData.js, loginInputData.js)
        hooks/
        lib/ (supabaseClient.js)
        pages/ (ApplicationForm.jsx, ApplicationList.jsx, Dashboard.jsx, Login.jsx, Navbar.jsx, Signup.jsx)
    package.json
    vite.config.js
    eslint.config.js
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ReachOut.git
    cd ReachOut
    ```
2. Install dependencies:
    ```bash
    cd frontend
    npm install
    ```

### Running the App

Start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will be available at [http://localhost:5173](http://localhost:5173).


## Hack United Hackathon Submission
- Team: Solo
- Members: [palchhinparihar](https://github.com/palchhinparihar)
- Track: Theme track
- Demo: [Add link if available]

## License
[MIT](../LICENSE)