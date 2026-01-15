#  Event Scheduler Application

A full-stack **Event Scheduler Application** that allows users to view upcoming events through an interactive calendar, while admins can create, edit, and manage events efficiently. The application focuses on clean UI/UX, responsiveness, and smooth user interaction.

---

##  Features

###  User Features
-  Interactive calendar view using **FullCalendar**
-  Visual indicators (dots) on dates that have events
-  Click on a date to view all events scheduled for that day
-  View event details including:
  - Title
  - Date
  - Start & End Time
  - Description
-  Fully responsive design (mobile, tablet, desktop)

---

###  Admin Features
-  Create new events
-  Edit existing events
-  Delete events with confirmation toast
-  Real-time UI refresh after event operations
-  Toast notifications for success & error actions

---

##  Tech Stack

### Frontend
-  React (Vite)
-  Tailwind CSS
-  FullCalendar
-  React Toastify
-  Axios

### Backend
-  Node.js
-  Express.js
-  MongoDB (MongoDB Atlas)
-  REST API architecture

---

##  Admin Login Credentials (For Testing)
Username: admin
Password: admin123
> ⚠️ **Note:** These credentials are for testing purposes only.

---

##  Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/GourinandhanaES/event-scheduler-app.git
cd event-scheduler-app
## Frontend
cd frontend
npm install
npm run dev
## Backend
cd backend
npm install
node server.js



