# Campus Notifications Dashboard

A responsive React-based notification dashboard developed as part of the Affordmed Frontend Evaluation.

The application displays campus notifications with priority-based sorting and filtering capabilities. Notifications are categorized into **Placement**, **Event**, and **Result**, with placement notifications receiving the highest priority.

---

# Features

* Fetch notifications from Affordmed Notification API
* Filter notifications by type
* Limit and page-based notification retrieval
* Priority-based notification ordering

  * Placement → Priority 3
  * Event → Priority 2
  * Result → Priority 1
* Responsive desktop and mobile design
* Material UI based modern interface
* Notification cards with category indicators
* Loading and error handling support
* Logging integration using Evaluation Logging API

---

# Tech Stack

* React JS
* Material UI (MUI)
* Axios
* JavaScript
* CSS
* Git & GitHub

---

# Priority Sorting Logic

Notifications are displayed according to the following priority order:

| Notification Type | Priority |
| ----------------- | -------- |
| Placement         | 3        |
| Event             | 2        |
| Result            | 1        |

When multiple notifications have the same priority, the latest notification is displayed first.

---

# Screenshots
 Mobile View – Event Notifications

 Mobile View – Placement Notifications

 Desktop View – Notifications Dashboard (Limit 10, Page 2)

 Desktop View – Placement Notifications (Limit 10, Page 1)

 Desktop View – Event Notifications (Limit 5, Page 1)

---

# Project Structure

```text
notification_app_fe/
│
├── public/
│
├── src/
│   ├── App.js
│   ├── logger.js
│   ├── index.js
│   └── App.css
│
├── package.json
├── README.md
└── package-lock.json
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/chavvalaalasa2005-laalasa/2023003527.git
```

## Move to Project Directory

```bash
cd notification_app_fe
```

## Install Dependencies

```bash
npm install
```

## Run Application

```bash
npm start
```

Application will run at:

```text
http://localhost:3000
```

---

# API Parameters Used

## Notifications API

```text
limit
page
notification_type
```

### Examples

```text
/evaluation-service/notifications?limit=5

/evaluation-service/notifications?limit=5&page=2

/evaluation-service/notifications?notification_type=Placement
```

---

# Responsive Design

The application supports:

* Desktop Screens
* Tablet Screens
* Mobile Screens

All components automatically adjust according to screen size using Material UI Grid and responsive layouts.

---

# Author

**Chavva Laalasa**

Affordmed Frontend Evaluation Submission
