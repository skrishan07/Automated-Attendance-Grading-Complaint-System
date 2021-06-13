# Automated-Attendance-Grading-Complaint-System
Automated Attendance Grading Complaint System is an online attendance, grading, and complaint management system. This platform helps in maintaining the student's attendance, grade, and complaint.

# Access
Their are three access-views of the website :
- Admin View
    This view is protected by authentication using passport.js
    use the mentioned Email and password to access the admin view.
   >**Email**: admin@iiitm.ac.in
   >**Password**: admin
    
    In this view their are multiple admin-side features :
    
   - Add Professors: It will add a new professor to the database.
    
   - Add Students: It will add a new student to the database.
    
   - Manage Complaints: View all the complaints registered by the uses, and when they solve, delete the complaint from the database.

- Professor View 
    In this view their are multiple professor-side features :
    
   - Class: View/Create new class to the database (Student will automatically enrolled based on there batch).
    
   - Attendance: View/Take attendance of the students.
    
   - Grade: View/Add grade of the students.


- Student View 
    In this view their are multiple student-side features :
    
   - Class: View all the classes in which the student was enrolled.
    
   - Attendance/Grade: View attendance/grade in a particular course.
    
   - Complaint: Add complaint regarding a particular issue.


## Technology Stack
- NodeJS
- Express
- MongoDB Atlas
- EJS templating engine
- Bootstrap and CSS
