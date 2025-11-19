# Mini E-Commerce (MERN + Vite)

A full-stack e-commerce web application where users can browse products, add items to cart, and manage orders.  
Built with **React (Vite) + Node.js + Express + MongoDB**.

---

## 🚀 Features

- User authentication (JWT)
- Add to cart functionality
- Product listing & details page
- MongoDB database integration
- REST API (controllers, models & routes)
- Admin/User access (future scope)

---

## 🧠 Tech Stack

| Frontend     | Backend    | Database | Other      |
| ------------ | ---------- | -------- | ---------- |
| React + Vite | Node.js    | MongoDB  | JWT Auth   |
| Axios        | Express.js | Mongoose | Middleware |

---

## ⚙ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/riyaa-fathima/mini_e_com
cd mini_e_com
```
### 2️⃣ Install dependencies
```bash
# frontend setup
cd client
npm install

# backend setup
cd ../server
npm install
```

### 3️⃣ Setup environment variables

#### 📌 `server/.env`
```ini
PORT=5000
MONGO_URI=your_mongodb_connection_url
JWT_SECRET=your_secret_key
```

#### 📌 `client/.env`
```ini
VITE_API_URL=http://localhost:5000

```
#### 4️⃣ Run the backend

```bash
cd server
npm start
```

#### 5️⃣ Run the frontend

```bash
cd client
npm run dev
```
## 📡 API Endpoints (Backend)

| Method | Route | Description |
|--------|-------|-------------|
| POST   | /api/auth/login     | Login user |
| POST   | /api/auth/register  | Register user |
| GET    | /api/products       | Get all products |
| POST   | /api/cart/add       | Add item to cart |
| DELETE | /api/cart/remove    | Remove item from cart |

## 📸 Screenshots

> Add UI screenshots here once the frontend is complete.

## 📁 Folder Structure

mini_e_com/
├── client/         # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main screens
│   └── .env
│
├── server/         # Backend - Node + Express
│   ├── controllers/   # Logic for API routes
│   ├── models/        # MongoDB schemas (Mongoose)
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth & validation
│   └── .env
│
├── .gitignore
└── README.md

## 🔮 Future Improvements

- Admin dashboard  
- Payment integration (Stripe / Razorpay)  
- Order history & email notifications  
- Product search & filtering  
- Mobile responsive UI  
