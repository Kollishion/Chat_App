# 💬 Chat App

A **real-time chat application** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and powered by **Socket.IO** for instant communication. The app provides secure user authentication with **bcrypt** and **JWT**, along with a responsive frontend for smooth user experience.

---

## 🚀 Features

- **Real-time Messaging** – Chat instantly with other users using Socket.IO.
- **User Authentication** – Registration & login with secure password hashing via bcrypt.
- **JWT Authorization** – Protected API routes and persistent user sessions.
- **Responsive Design** – Optimized UI for both desktop and mobile.
- **Scalable Structure** – Clean separation of backend (API) and frontend (React) code.

---

## 🛠️ Tech Stack

### **Frontend**

- [React.js](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/) (for API requests)
- [Socket.IO Client](https://socket.io/)

### **Backend**

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [Socket.IO](https://socket.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt) (for password hashing)
- [jsonwebtoken (JWT)](https://www.npmjs.com/package/jsonwebtoken)

### **Dev Tools**

- [nodemon](https://www.npmjs.com/package/nodemon) (for development)
- [concurrently](https://www.npmjs.com/package/concurrently) (to run frontend + backend together)

---

## 📂 Project Structure

```
└── 📁Chat_App
        └── 📁hooks
            ├── applypatch-msg.sample
            ├── commit-msg.sample
            ├── fsmonitor-watchman.sample
            ├── post-update.sample
            ├── pre-applypatch.sample
            ├── pre-commit.sample
            ├── pre-merge-commit.sample
            ├── pre-push.sample
            ├── pre-rebase.sample
            ├── pre-receive.sample
            ├── prepare-commit-msg.sample
            ├── push-to-checkout.sample
            ├── update.sample
        └── 📁info
            ├── exclude
        └── 📁logs
            └── 📁refs
                └── 📁heads
                    ├── main
                └── 📁remotes
                    └── 📁origin
                        ├── main
            ├── HEAD
        └── 📁objects
        └── 📁refs
            └── 📁heads
                ├── main
            └── 📁remotes
                └── 📁origin
                    ├── main
            └── 📁tags
        ├── COMMIT_EDITMSG
        ├── config
        ├── description
        ├── FETCH_HEAD
        ├── HEAD
        ├── index
        ├── ORIG_HEAD
    └── 📁.vscode
        ├── settings.json
    └── 📁backend
        └── 📁controllers
            ├── auth.controller.js
            ├── message.controller.js
            ├── otp.controller.js
            ├── user.controller.js
        └── 📁db
            ├── connectToMongoDB.js
        └── 📁middleware
            ├── protectRoute.js
        └── 📁models
            ├── conversation.model.js
            ├── message.model.js
            ├── user.model.js
        └── 📁routes
            ├── auth.routes.js
            ├── message.routes.js
            ├── otp.routes.js
            ├── user.routes.js
        └── 📁socket
            ├── socket.js
        └── 📁utils
            ├── generateToken.js
            ├── mailer.js
        ├── server.js
    └── 📁frontend
        └── 📁src
            └── 📁assets
                ├── bg.jpg
            └── 📁components
                └── 📁footer
                    ├── Footer.jsx
                └── 📁logout
                    ├── Logout.jsx
                └── 📁messages
                    ├── Message.jsx
                    ├── MessageContainer.jsx
                    ├── MessageInput.jsx
                    ├── Messages.jsx
                └── 📁navbar
                    ├── Navbar.jsx
                └── 📁privateRoute
                    ├── PrivateRoute.jsx
                └── 📁sidebar
                    ├── Conversation.jsx
                    ├── Conversations.jsx
                    ├── LogoutButton.jsx
                    ├── SearchInput.jsx
                    ├── Sidebar.jsx
                └── 📁skeletons
                    ├── MessageSkeleton.jsx
            └── 📁hooks
                ├── useBlockContact.js
                ├── useGetConversation.js
                ├── useGetMessages.jsx
                ├── useLogin.js
                ├── useSendMessage.js
                ├── useSignup.js
                ├── useSocket.js
            └── 📁pages
                └── 📁forgotpassword
                    ├── ForgotPassword.jsx
                    ├── ResetPassword.jsx
                └── 📁home
                    ├── Home.jsx
                └── 📁login
                    ├── Login.jsx
                └── 📁signup
                    ├── GenderCheckbox.jsx
                    ├── SignUp.jsx
            └── 📁redux
                ├── authSlice.js
                ├── conversationSlice.js
                ├── getMessagesSlice.js
                ├── store.js
                ├── useMessageSlice.js
            └── 📁socketContext
                ├── socketProvider.jsx
            └── 📁utils
                ├── emoji.js
                ├── extractTime.js
            ├── App.css
            ├── App.jsx
            ├── index.css
            ├── main.jsx
        ├── .env
        ├── .eslintrc.cjs
        ├── .gitignore
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── README.md
        ├── tailwind.config.js
        ├── vite.config.js
    ├── .env
    ├── .gitignore
    ├── image.png
    ├── package-lock.json
    ├── package.json
    └── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Kollishion/Chat_App.git
cd Chat_App

2. Install dependencies
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

3. Environment Variables
Create a .env file in the backend folder with the following:
PORT=5000
MONGO_DB_URI=your_mongodb_uri
USER=your_user_name
JWT_SECRET=your_jwt_secret
NODE_ENV=development
EMAIL_PASS=your_email_pass
EMAIL_USER=your_email_id
FRONTEND_URL=http://localhost:3000
JWT_EXPIRE=your_jwt_expire_time_in_days
RESET_PASSWORD_EXPIRE=your_reset_password__expire_time_taken_in_days
COOKIE_EXPIRE=your_cookie_expire_time_in_days
```

### Running the App

At the root of the project, run:
npm run dev

This will:
Start the backend server on http://localhost:5000
Start the frontend React app on http://localhost:3000

### Available Scripts

In the backend:

npm run server – Start backend using nodemon.

In the frontend:

npm start – Start React development server.

npm run build – Build the React app for production.

At the root:

npm run dev – Run both frontend & backend concurrently.

### Authentication Flow

Register → User signs up with email & password. Password is hashed with bcrypt.

Login → User logs in, receives a JWT token.

Protected Routes → API checks JWT for authentication before granting access.

Real-time Chat → After authentication, users connect via Socket.IO to send/receive messages instantly.

### Contributing

Fork this repository

Create your feature branch: git checkout -b feature/new-feature

Commit your changes: git commit -m 'Add some feature'

Push to the branch: git push origin feature/new-feature

Open a pull request

### License

This project is licensed under the MIT License – feel free to use and modify it for your own projects.

### Acknowledgments

Inspired by real-world chat apps like WhatsApp, Discord, and Slack.

Thanks to Socket.IO
for making real-time communication simple.
