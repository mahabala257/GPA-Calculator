# 🎓 GPA & Marks Calculator

A clean, modern, and fully interactive web application that helps students calculate their **CGPA, GPA, and overall academic performance** in one place.

---

## 🚀 Features

### 🔢 Marks → CGPA

* Enter subject-wise marks (0–100)
* Automatically converts marks into grades
* Calculates CGPA instantly
* Displays **PASS / FAIL** status

---

### ⚖️ GPA Calculator (Weighted)

* Input grade and credit for each subject
* Uses weighted calculation for accuracy
* Displays total credits and GPA

---

### 📊 CGPA from Semesters

* Enter GPA for each semester
* Computes overall CGPA easily

---

### 🎨 UI/UX Highlights

* Clean dark-themed modern interface
* Fully responsive design
* Smooth animations and transitions
* Dynamic input generation (no page reload)

---

## 🧠 Core Logic

### 1. Grade Calculation

Marks are converted into grades using predefined ranges:

| Marks Range | Grade | Points |
| ----------- | ----- | ------ |
| 96–100      | O     | 10     |
| 91–95       | A+    | 9      |
| 81–90       | A     | 8      |
| 71–80       | B+    | 7      |
| 61–70       | B     | 6      |
| 51–60       | C+    | 5      |
| 50          | C     | 4      |
| < 50        | U     | 0      |

---

### 2. CGPA from Marks

CGPA is calculated using:

```
CGPA = Total Grade Points / Number of Subjects
```

* Each subject's marks are converted to grade points
* If any subject has grade **U**, result is marked as **FAIL**

---

### 3. GPA Calculation (Weighted)

Weighted GPA formula:

```
GPA = Σ(Grade Points × Credits) / Σ(Credits)
```

* Takes into account subject importance via credits
* Provides accurate academic performance

---

### 4. CGPA from Semesters

Overall CGPA is calculated as:

```
CGPA = Σ(Semester GPA) / Number of Semesters
```

---

### 5. Dynamic Input System

* Input fields are generated dynamically based on user selection
* Ensures flexibility for any number of subjects or semesters

---

## 🛠️ Tech Stack

| Category       | Technology                   |
| -------------- | ---------------------------- |
| Language       | HTML, CSS, JavaScript        |
| Styling        | Custom CSS (Dark Theme)      |
| Logic Handling | Vanilla JavaScript           |
| Fonts          | Google Fonts (Syne, DM Mono) |

---

## 📁 Project Structure

```
gpa-calculator/
├── index.html       # Main UI structure
├── css/
│   └── style.css    # Styling and layout
├── js/
│   └── app.js       # Core logic and functionality
└── README.md
```

---



## 🔮 Future Improvements

* Save results using **Local Storage**
* Export results as **PDF**
* Add **grade analytics charts**
* Convert to **React / Full Stack App**
* Add **user login system**

---

