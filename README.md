
# ReachOut

ReachOut is a modern web application designed to connect individuals and organizations for support, collaboration, and resource sharing. It streamlines the process of submitting, managing, and reviewing applications for assistance or partnership, making it easier for users to reach out and get the help they need. All backend and authentication services are handled via Supabase, ensuring secure and scalable data management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Folder Overview](#folder-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication:** Secure signup, login, and logout flows using Supabase Auth.
- **Application Management:** Submit, edit, and track applications for support or partnership.
- **Dashboard:** Personalized dashboard for users to view and manage their applications.
- **Application List & Review:** Admins and users can view, filter, and review submitted applications.
- **Responsive UI:** Built with React and Tailwind CSS for a seamless experience across devices.
- **Reusable Components:** Modular design with custom UI elements for consistency and maintainability.
- **Supabase Integration:** Real-time database and authentication.
- **Smooth User Experience:** Fast, modern frontend powered by Vite.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend & Auth:** Supabase
- **State Management:** React Context API
- **Build Tools:** Vite
- **Linting:** ESLint

---

## Project Structure

```
ReachOut/
├── public/
│   └── _redirects
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Footer.jsx
│   │   ├── Logout.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── resources/
│   │   │   ├── CoverLetterHelp.jsx
│   │   │   ├── InterviewPrep.jsx
│   │   │   └── ResumeTips.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── FollowUpBadge.jsx
│   │       ├── Input.jsx
│   │       ├── LiquidEther.jsx
│   │       └── Modal.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── data/
│   │   ├── applicationInputData.js
│   │   ├── coverLetterData.js
│   │   ├── emailTemplates.js
│   │   ├── interviewTips.js
│   │   ├── loginInputData.js
│   │   └── resumeTips.js
│   ├── lib/
│   │   ├── followUpUtils.js
│   │   ├── supabaseClient.js
│   │   └── utils.js
│   └── pages/
│       ├── ApplicationForm.jsx
│       ├── ApplicationList.jsx
│       ├── Dashboard.jsx
│       ├── FollowUp.jsx
│       ├── Login.jsx
│       └── Signup.jsx
├── package.json
├── vite.config.js
├── eslint.config.js
├── jsconfig.json
├── index.html
└── README.md
```

---

## Setup & Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- Supabase project (for backend)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ReachOut.git
   cd ReachOut
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Supabase:**
   - Create a project on [Supabase](https://supabase.com/).
   - Copy your Supabase URL and public API key.
   - Create a `.env` file in the root directory and add:
     ```env
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

---

## Usage

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

---

## Environment Variables

Create a `.env` file in the project root and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## Folder Overview

- **public/**: Static files and redirects.
- **src/**: Main source code.
  - **assets/**: Images and other assets.
  - **components/**: Reusable React components.
    - **resources/**: Resource-related components (cover letter, interview prep, resume tips).
    - **ui/**: UI elements (buttons, modals, inputs, badges).
  - **context/**: React Context for global state (e.g., authentication).
  - **data/**: Static data and configuration files.
  - **lib/**: Utility functions and Supabase client setup.
  - **pages/**: Main application pages (forms, dashboard, login, signup, etc.).

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md) and ensure your code adheres to the project's style guidelines.

---

## Hack United Hackathon Submission

- **Team:** Solo
- **Members:** [palchhinparihar](https://github.com/palchhinparihar)
- **Track:** Theme track
- **Demo:** [Add link if available]

---

## License

This project is licensed under the [MIT License](../LICENSE).
