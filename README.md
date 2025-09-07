# 🌐 ASTITVA  
**Academic Support Tool For Intervention, Tracking & Value Alignment**  
📍 Built for **SNU-SIH Hackathon**  

## Please do read along to understand deeply about our project, cause and solution! :)
---

## 🖼️ Project Snapshots  

### 🎯 Main Hackathon Theme  
<img width="2783" height="1458" alt="image" src="https://github.com/user-attachments/assets/5d283c6b-7edf-47be-8722-e949cde64eee" />

### Sample Excel Sheet - https://docs.google.com/spreadsheets/d/10mvoTbcSFvQ3lSx7qsmzY0qALmXPxCXU/edit?usp=sharing&ouid=102812434854459205113&rtpof=true&sd=true

### 🔔 Notification System  
<img width="1540" height="1271" alt="image" src="https://github.com/user-attachments/assets/3bab5bd4-7dc4-42d0-873a-4cd434d4ddb4" />

### 🤖 ML Model (99% Accuracy)  
<img width="1321" height="418" alt="image" src="https://github.com/user-attachments/assets/6bbc719a-aaa8-4e26-8ec0-c4cb9dd41d19" />

### ⚙️ Backend Exploration  
(Started with Java → finalized Node.js)  
<img width="1990" height="1365" alt="image" src="https://github.com/user-attachments/assets/46a61aac-761d-4b32-8b0e-002f3d453eb3" />

---

## 🚩 Problem Statement 
By the time **term-end marks** reveal failures, struggling students have often disengaged beyond recovery, which often result in Dropouts.  

- Attendance is in one spreadsheet.  
- Test scores in another.  
- Fee-payment data in a third.  

👉 No **single view** exists to show when a student is slipping in **multiple areas simultaneously**.  

Plus the problem statement says that Commercial analytics (Such as blackboard itself) platforms are **expensive** and demand **heavy maintenance**—beyond the reach of most public institutes.  
##That's where we came with the idea of ASTITVA.

---

## ps - We would like to pursue this idea deeply into the "Internet in a box" concept in our next level, so we can reach the remotest of the village, and even without internet connection, the teachers and admins can care and analyse the students. That will be our implementation plan in the later stages! 

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

## Note for Judges
During development, we experimented with:  
- 🤖 AI-based mentorship chatbots  
- 📊 Complex deep learning models  
- ☁️ Enterprise-grade cloud dashboards  

## But we chose to **stay true to the problem statement**. We read the problem statement EVERY 30 minutes, because ultimately we want to give a true and a vialble solution that matches thee exact requirement of the problem. The govt. itself points out that **costly platforms already exist** — what’s missing is **a viable, grassroots-friendly system**.  


## 🏗️ Features at a Glance  
✅ Student Risk Prediction (ML + rule-based logic)  
✅ Excel Upload (drag & drop interface)  
<img width="2788" height="1413" alt="image" src="https://github.com/user-attachments/assets/dabd8eae-3f5d-480c-a6a9-45ad5d590a8d" />

✅ Dashboard with filters, sorting, and color-coded risk levels  
<img width="2839" height="1420" alt="image" src="https://github.com/user-attachments/assets/aeb5bf2a-c295-4777-bd4d-c354fea1a2d5" />

✅ Student Profiles (auto-filled from uploaded Excel) 
<img width="2753" height="1466" alt="image" src="https://github.com/user-attachments/assets/24765076-23fd-4d53-b5b7-03d11289cb21" />
 
✅ Regular Notifications (Email & SMS)  (We can Notify ALL the students who have less attendance and poor grades)
<img width="2845" height="1341" alt="image" src="https://github.com/user-attachments/assets/a4ad705e-2e75-4aac-a689-a0e39296bc72" />

✅ Easy to understand Interface so it's not too complicated!
<img width="2850" height="1440" alt="image" src="https://github.com/user-attachments/assets/99800fbf-1a3a-47a5-a618-3edd9cbe338d" />

✅ Download RISK wise/ Attendance <75% wise excel sheets after filtering because ultimately a lot of people STILL use excel sheets, so keeping that in mind we had brought this feature!
<img width="2825" height="1332" alt="image" src="https://github.com/user-attachments/assets/5e5dc9ef-1f41-464a-864b-dbc5ee642131" />


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
