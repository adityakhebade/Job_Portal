# MERN Job Portal — Full-Stack Web Application

A feature-rich job portal supporting Job Seekers, Employers, and Admins, built on the MERN stack with a vibrant, colorful design.

---

## Architecture Overview

```
d:\ADITYA\MERN Job Portal\
├── client/        ← React frontend (Vite)
└── server/        ← Node.js + Express backend
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6, Axios, React Query |
| Styling | Vanilla CSS with custom design system (vibrant gradients) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT (access + refresh tokens) |
| File Upload | Multer + Cloudinary (resume/logo upload) |
| Email | Nodemailer (Gmail SMTP or SendGrid) |
| State Management | React Context + React Query |

---

## User Roles

- **Job Seeker** — Browse jobs, apply, upload resume, track applications
- **Employer** — Post jobs, manage listings, view and filter applicants
- **Admin** — Manage all users, all job listings, view reports/stats

---

## Proposed Changes

### Backend (`server/`)

#### [NEW] Project structure
```
server/
├── config/
│   ├── db.js              ← MongoDB Atlas connection
│   └── cloudinary.js      ← Cloudinary config
├── middleware/
│   ├── auth.js            ← JWT verification middleware
│   ├── authorize.js       ← Role-based access control
│   └── upload.js          ← Multer config for file uploads
├── models/
│   ├── User.js            ← User schema (seeker | employer | admin)
│   ├── Job.js             ← Job listing schema
│   └── Application.js     ← Application schema
├── controllers/
│   ├── authController.js
│   ├── jobController.js
│   ├── applicationController.js
│   └── adminController.js
├── routes/
│   ├── auth.js
│   ├── jobs.js
│   ├── applications.js
│   └── admin.js
├── utils/
│   └── sendEmail.js       ← Nodemailer email helper
├── .env                   ← Environment variables
├── package.json
└── server.js              ← Entry point
```

#### Key API Endpoints

**Auth**
- `POST /api/auth/register` — Register (seeker or employer)
- `POST /api/auth/login` — Login, returns JWT
- `GET  /api/auth/me` — Get current user profile
- `PUT  /api/auth/profile` — Update profile / upload resume

**Jobs**
- `GET    /api/jobs` — List jobs (with search + filter query params)
- `GET    /api/jobs/:id` — Single job detail
- `POST   /api/jobs` — Create job (employer only)
- `PUT    /api/jobs/:id` — Edit job (employer only)
- `DELETE /api/jobs/:id` — Delete job (employer/admin)

**Applications**
- `POST /api/applications/:jobId` — Apply to job (seeker)
- `GET  /api/applications/my` — Seeker's applications
- `GET  /api/applications/job/:jobId` — Applicants for a job (employer)
- `PUT  /api/applications/:id/status` — Update status (employer)

**Admin**
- `GET    /api/admin/users` — All users
- `DELETE /api/admin/users/:id` — Delete user
- `GET    /api/admin/jobs` — All jobs
- `DELETE /api/admin/jobs/:id` — Delete job
- `GET    /api/admin/stats` — Dashboard stats

---

### Frontend (`client/`)

#### [NEW] Project structure
```
client/
├── src/
│   ├── api/               ← Axios instances and API helpers
│   ├── assets/            ← Images and icons
│   ├── components/
│   │   ├── layout/        ← Navbar, Footer, Sidebar
│   │   ├── jobs/          ← JobCard, JobFilters, JobDetail
│   │   ├── auth/          ← LoginForm, RegisterForm
│   │   └── ui/            ← Button, Badge, Modal, Spinner
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── JobDetail.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── seeker/
│   │   │   ├── SeekerDashboard.jsx
│   │   │   └── MyApplications.jsx
│   │   ├── employer/
│   │   │   ├── EmployerDashboard.jsx
│   │   │   ├── PostJob.jsx
│   │   │   ├── ManageJobs.jsx
│   │   │   └── Applicants.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageUsers.jsx
│   │       └── ManageJobs.jsx
│   ├── index.css          ← Global design system
│   ├── App.jsx
│   └── main.jsx
└── index.html
```

#### Key Pages

| Page | Description |
|------|-------------|
| **Home** | Hero, stats banner, featured jobs, how-it-works section |
| **Jobs** | Search bar, filter sidebar (type, location, salary), job cards grid |
| **Job Detail** | Full description, apply button, company info |
| **Login / Register** | Tabbed auth forms with role selection |
| **Seeker Dashboard** | Applied jobs, resume upload, profile edit |
| **Employer Dashboard** | Stats, recent applicants, quick post |
| **Post / Edit Job** | Rich form for job listing |
| **Applicants** | Applicant cards, status dropdown |
| **Admin Dashboard** | Charts for stats, user table, job table |

---

## Design System

- **Color Palette**: Vibrant purple-to-orange gradient brand, electric blue accents
- **Typography**: Google Fonts — `Outfit` (headings) + `Inter` (body)
- **Components**: Glassmorphism cards, gradient buttons, animated hero
- **Dark Mode**: Auto-detect via `prefers-color-scheme`, manual toggle
- **Animations**: Framer Motion-style CSS transitions, scroll reveals

---

## Data Models

### User
```js
{
  name, email, password (hashed),
  role: 'seeker' | 'employer' | 'admin',
  avatar, bio, location,
  // Seeker-specific
  resume: { url, filename },
  skills: [String],
  // Employer-specific
  company: { name, logo, website, description }
}
```

### Job
```js
{
  title, description, requirements,
  company, location, salary: { min, max, currency },
  type: 'full-time' | 'part-time' | 'remote' | 'contract' | 'internship',
  category, tags: [String],
  employer (ref User),
  deadline, isActive,
  createdAt
}
```

### Application
```js
{
  job (ref Job), seeker (ref User),
  coverLetter, resumeUrl,
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted',
  appliedAt
}
```

---

## Open Questions

> [!IMPORTANT]
> **Cloudinary**: I'll use Cloudinary for resume + employer logo uploads. You'll need a free Cloudinary account. I'll show you exactly where to put the credentials in `.env`.

> [!IMPORTANT]
> **Email**: For email notifications (application received, status updated), I'll set it up with Nodemailer + Gmail. You'll need an App Password from your Gmail. Alternatively, I can skip email and add it later.

> [!NOTE]
> **Admin account**: The first admin account will be created by manually setting `role: 'admin'` in MongoDB, or via a seeded script — I'll include a seed script.

---

## Development Plan (Phases)

1. **Phase 1**: Backend setup — Express server, MongoDB connection, User model + Auth (register/login/JWT)
2. **Phase 2**: Job & Application models + REST APIs
3. **Phase 3**: Admin APIs + email utility
4. **Phase 4**: React frontend scaffold — design system, routing, auth pages
5. **Phase 5**: Job listings page, search/filter
6. **Phase 6**: Seeker dashboard + application flow
7. **Phase 7**: Employer dashboard + job management + applicant view
8. **Phase 8**: Admin panel
9. **Phase 9**: Polish — animations, responsive design, error handling

---

## Verification Plan

### Automated
- Test API endpoints with backend server running
- Check auth JWT flow end-to-end

### Manual
- Walk through all user flows: register → login → apply / post job / manage
- Verify role-based route protection
- Test file uploads (resume, logo)
- Confirm email notifications fire correctly
