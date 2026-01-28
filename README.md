# Task-Tracker
A Basic Task Tracker Application for Daily use

## Project Description
Task Tracker is a simple web-based productivity application built using HTML, CSS, and JavaScript.  
It allows users to add, manage, and organize tasks using priorities, categories, due dates, and filters.  
The project focuses on DOM manipulation, event handling, and persistent data storage using localStorage.

---

## Features Implemented
- Add new tasks with title, due date, category, and priority
- Priority selection using buttons (High, Medium, Low)
- Mark tasks as done or undo completion
- Edit existing tasks
- Delete tasks
- Filter tasks by:
  - Status (All, Pending, Done)
  - Priority (High, Medium, Low)
  - Category (dropdown filter)
- Dark mode and light mode toggle
- Persistent task storage using browser localStorage
- Clean and user-friendly UI using Flexbox

---

## DOM Concepts Used
- Dynamic creation of elements using `document.createElement`
- Event handling using `addEventListener` and `onclick`
- Conditional rendering using JavaScript logic
- Class manipulation using `classList`
- DOM selection using `getElementById` and `querySelector`
- Updating UI in real time using `innerText` and `innerHTML`

---

## JavaScript Logic Overview
- Tasks are stored as objects in an array
- Each task contains text, priority, category, due date, and completion status
- Tasks are rendered dynamically based on active filters
- Filters work by checking task properties before displaying them
- All task data is saved in localStorage to persist across page reloads
- Dark mode preference is also saved in localStorage

---

## Steps to Run the Project
1. Download or clone the project folder
2. Open the folder in any code editor (VS Code recommended)
3. Open `index.html` in a modern web browser
4. Start adding and managing tasks

No additional libraries or setup are required.

---

## Known Limitations
- Tasks are stored only in localStorage (no backend or database)
- No user authentication
- Single-user application
- No notifications or reminders for due dates

---

## Technologies Used
- HTML
- CSS
- JavaScript

