# 📚 Automated-Attendance-Grading-Complaint-System
An all-in-one academic management platform that streamlines attendance tracking, grading, and complaint handling for educational institutions.

<details>
  <summary>Screenshot 1 (Home Page)</summary>
  <img width="1440" height="812" alt="Screenshot 2025-07-20 at 12 52 45 AM" src="https://github.com/user-attachments/assets/2a7135cb-6026-41a5-a7c6-3de3634351c9" />
</details>

<details>
  <summary>Screenshot 2 (Login Page)</summary>
  <img width="1440" height="812" alt="Screenshot 2025-07-20 at 12 53 08 AM" src="https://github.com/user-attachments/assets/b87f460a-29ee-4cfc-aad7-0a711af7cdfa" />
</details>

<details>
  <summary>Screenshot 3 (Admin View)</summary>
  <img width="1440" height="812" alt="Screenshot 2025-07-20 at 12 53 17 AM" src="https://github.com/user-attachments/assets/a9b70e7c-5131-4e24-9631-abdc43bf37da" />
</details>

<details>
  <summary>Screenshot 4 (Professor View)</summary>
  <img width="1440" height="812" alt="Screenshot 2025-07-20 at 12 57 29 AM" src="https://github.com/user-attachments/assets/619ac2b4-018e-4b8d-b2e7-4e47050ccefa" />
</details>

<details>
  <summary>Screenshot 5 (Student View)</summary>
  <img width="1440" height="812" alt="Screenshot 2025-07-20 at 12 57 39 AM" src="https://github.com/user-attachments/assets/c2dbe992-608f-474a-bf44-0721a102ad4d" />
</details>

# 🔍 Project Overview
This project provides a centralized web portal for students and faculty to manage:
- 📆 Attendance – Automated attendance recording and reporting.
- 📝 Grading – Faculty can upload and manage grades efficiently.
- 🗣️ Complaint System – Students can raise and track academic complaints.

The system enhances transparency, saves time, and reduces paperwork through digitization of academic processes.

# 🚀 Features
- ✅ Secure faculty & student login
- 📊 Real-time attendance status
- 📄 Grade management with upload & view options
- 📨 Complaint registration, resolution & tracking
- 🔒 Role-based dashboard for students and faculty
- 📁 Admin access for system-wide management

# 🔐 Access Control & User Roles
The system supports three distinct access views, each tailored to the specific role of the user. Authentication is implemented using Passport.js, and access to each dashboard is restricted accordingly.

## 🛠️ Admin View
> Email: admin@iiitm.ac.in

> Password: admin

This view is protected by authentication and offers several admin-specific functionalities:
- Add Professors – Register new professors into the system.
- Add Students – Add new students and assign them to their respective batches.
- Manage Complaints – View all user-submitted complaints and remove them once resolved.

## 👨‍🏫 Professor View
Professors have access to the following features:

- Class Management – Create new classes. Students are automatically enrolled based on their batch.
- Attendance – Take and review student attendance records.
- Grades – Enter and manage student grades for different courses.

## 👨‍🎓 Student View
Students can access features relevant to their academic activities:

- Class Overview – View all classes in which they are enrolled.
- Attendance & Grades – Monitor their attendance and grade records for each course.
- Complaint System – Submit academic or administrative complaints directly through the portal.

# 🛠️ Tech Stack
- **Frontend**: EJS, HTML, CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Passport.js (Local Strategy)

# 🧑‍💻 Installation
To run this project locally:

```bash
# Clone the repository
git clone https://github.com/skrishan07/Automated-Attendance-Grading-Complaint-System.git
cd Automated-Attendance-Grading-Complaint-System

# Install dependencies
npm install

# Run the server
node app.js
```

# 🙌 Acknowledgements
This project was developed as part of an academic initiative to improve transparency and efficiency in education systems.


