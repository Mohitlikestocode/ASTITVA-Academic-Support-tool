# 🌐 ASTITVA  
**Academic Support Tool For Intervention, Tracking & Value Alignment**  
📍 Built for **SNU-SIH Hackathon**  

---

## 🖼️ Project Snapshots  

### 🎯 Main Hackathon Theme  
<img width="2783" height="1458" alt="image" src="https://github.com/user-attachments/assets/5d283c6b-7edf-47be-8722-e949cde64eee" />

### 🔔 Notification System  
<img width="1540" height="1271" alt="image" src="https://github.com/user-attachments/assets/3bab5bd4-7dc4-42d0-873a-4cd434d4ddb4" />

### 🤖 ML Model (99% Accuracy)  
<img width="1321" height="418" alt="image" src="https://github.com/user-attachments/assets/6bbc719a-aaa8-4e26-8ec0-c4cb9dd41d19" />

### ⚙️ Backend Exploration  
(Started with Java → finalized Node.js)  
<img width="1990" height="1365" alt="image" src="https://github.com/user-attachments/assets/46a61aac-761d-4b32-8b0e-002f3d453eb3" />

---

## 🚩 Problem Statement  
By the time **term-end marks** reveal failures, struggling students have often disengaged beyond recovery.  

- Attendance is in one spreadsheet.  
- Test scores in another.  
- Fee-payment data in a third.  

👉 No **single view** exists to show when a student is slipping in **multiple areas simultaneously**.  

Commercial analytics platforms are **expensive** and demand **heavy maintenance**—beyond the reach of most public institutes.  

---

# We would like to pursue this idea deeply into the "Internet in a box" concept, so we can reach the remotest of the village, and even without internet connection, the teachers and admins can care and analyse the students.

## 💡 Our Solution — *ASTITVA*  
A lightweight, transparent, and ML-powered platform that:  

1. 📂 **Ingests spreadsheets** (attendance, test results, fees, etc.).  
2. ⚡ **Applies ML + rule-based thresholds** to detect at-risk students (dropout likelihood).  
3. 🎨 **Visualizes risks** in a clean dashboard:  
   - ✅ Green (0–75% risk)  
   - ⚠️ Orange (75–90% risk)  
   - 🔴 Red (90%+ risk)  
4. 📱 **Notifies mentors, guardians, and students** via SMS & Email.  
5. 👨‍🏫 Provides **dual roles**:  
   - **Admin View** → consolidated risk dashboard of all students.  
   - **Student View** → personal profile + weak areas & tips.  
6. 🛠️ **Low-cost, easy-to-use, no vendor lock-in**.  

---

## 🏗️ Features at a Glance  
✅ Student Risk Prediction (ML + rule-based logic)  
✅ Excel Upload (drag & drop interface)  
✅ Dashboard with filters, sorting, and color-coded risk levels  
✅ Student Profiles (auto-filled from uploaded Excel)  
✅ Regular Notifications (Email & SMS)  
✅ Admin & Student Interfaces  
✅ Lightweight, scalable, and easy to deploy  

---

## 🔧 Tech Stack  
- **Frontend:** React (Vite, TypeScript, shadcn-ui, Tailwind CSS)  
- **Backend:** Node.js (Express)  
- **Database:** MongoDB  
- **ML Model:** Scikit-learn (Python, 99% accuracy)  
- **Notifications:** Twilio (SMS), Nodemailer (Email)  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js & npm installed → [nvm install guide](https://github.com/nvm-sh/nvm#installing-and-updating)  
- Supabase (local for the future, cloud currently)  

### Run Locally  
```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Step 2: Install dependencies
npm i

# Step 3: Start development server
npm run dev
