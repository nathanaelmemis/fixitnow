# FixItNow!

## Overview

FixItNow! is a comprehensive maintenance reporting system designed to streamline the process of reporting and managing maintenance issues within your organization. This system aims to improve communication, enhance efficiency, and ensure that maintenance concerns are addressed promptly.

## Features
- **User-Friendly Interface:**
   - Intuitive and easy-to-navigate design for users of all technical levels.
   - Clearly defined sections for submitting, tracking, and resolving maintenance requests.
- **Submission of Maintenance Requests:**
   - Users can easily submit maintenance requests, providing essential details about the issue.
   - Attach images or documents to help in better understanding the problem.
- **Real-Time Tracking:**
   - Track the status of submitted requests in real-time.
   - Receive notifications and updates as the maintenance team works on the reported issues.
- **Prioritization and Categorization:**
   - Categorize maintenance requests based on urgency and type.
   - Prioritize tasks to ensure critical issues are addressed promptly.
- **Communication Hub:**
   - Built-in messaging system for seamless communication between users and maintenance personnel.
   - Keep all relevant parties informed about the progress of ongoing tasks.
- **Reporting and Analytics:**
   - Generate reports to analyze trends, identify recurring issues, and optimize maintenance processes.
   - Utilize analytics to improve decision-making and resource allocation.
- **User Management:**
   - Administer user roles and permissions to control access levels.
   - Ensure secure and authorized usage of the system.

## Tech Stack
- **Frontend:** HTML, CSS, Javascript
- **Database:** Firebase
- **Deployment:** Netlify

## Website
[fix-it-now.netlify.app/](https://fix-it-now.netlify.app/)

## Demo Admin Account
- Email: adminuser@gmail.com
- Password: adminuser

### Prerequisites
- XAMPP
- Firebase Realtime Database

### Installation
1. **Clone the repository:**
    ```
    git clone https://github.com/nathanaelmemis/fixitnow.git
    ```
2. **Configure Firebase Realtime Database**
    - Change the constant `firebaseConfig` under the file `fixitnow/public/JS/firebaseConfig.js` to your Fibase configuration.
3. **Start the development server:**
    - Start your XAMPP web server with the website configured into it.