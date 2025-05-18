# Notification Microservice

**Send email/SMS/in-app notifications via queue**

## 🛠 Setup
1. `git clone [repo-url] && cd notification-service`
2. `npm install`
3. Create `.env` (copy from `.env.example`)
4. Start services:
   ```bash
   docker-compose up -d  # MongoDB + RabbitMQ
   npm run dev          # API (port 5000)
   npm run worker       # Queue processor


🌟 Key Features
3 notification types (email via Mailtrap, SMS mock, in-app)

Async processing with RabbitMQ

MongoDB storage

REST API endpoints

📌 Assumptions
No auth (dev only)

Mailtrap for email testing

SMS uses console logs

Basic retry mechanism

🚦 Test Flow
curl -X POST http://localhost:5000/notifications \
-H "Content-Type: application/json" \
-d '{"userId":"test123","type":"email","title":"Test","message":"Hello"}'


This version:
1. Uses **exactly one mention** per concept
2. Contains **all essential information** in 15 lines
3. Follows GitHub-flavored Markdown
4. Maintains clear section separation
5. Provides **copy-paste ready** commands

Would you like me to adjust the formatting or content further?
