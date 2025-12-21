# 📚 BookCourier

**BookCourier** is a full-stack online book delivery and management platform where users can explore books, place orders, manage wishlists, and track deliveries — while librarians and admins handle inventory and orders through a powerful dashboard.

---

## 🎯 Purpose

The purpose of BookCourier is to provide a modern, user-friendly digital library and book delivery system that connects readers with librarians, enabling seamless browsing, ordering, and management of books with role-based dashboards.

---

## 🌐 Live URL

- Backend API:  https://book-courier-server-hazel.vercel.app

- Frontend:  https://bookcourier-bd993.web.app

---

## ✨ Key Features

### 🧭 Layout & Navigation
- Responsive **Navbar** with logo, links, user avatar & hamburger menu
- **Theme toggle** (Light/Dark mode)
- Modern **Footer** with quick links, contact info & social icons (new X logo)
- Traditional layout: Navbar → Content → Footer
- Responsive **Dashboard layout** with collapsible sidebar

---

### 🔐 Authentication System
- Email & password login
- Social login (Google)
- Registration with:
  - Name, Email, Password, Profile Image upload
  - Strong password validation
- Profile image updates on registration
- Firebase authentication
- JWT token verification for protected routes

---

### 🏠 Home Page
- Banner with **3+ sliders** featuring books & CTA
- 📚 **Latest Books** section (recently added)
- 🗺️ **Coverage Map** of delivery cities
- 💡 **Why Choose BookCourier** section
- 🎞️ Newsletter Section
- ➕ Review from Readers
- Skeleton loaders for better UX

---

### 📖 All Books
- Display all published books in card layout
- Search books by name
- Sort books by price (Low → High, High → Low)
- Responsive grid with equal card sizes

---

### 📘 Book Details
- Full book info page
- ❤️ Add to Wishlist
- 🛒 Order Now modal with:
  - Name & Email (readonly)
  - Phone & Address
- Order saved with:
  - Status: `pending`
  - Payment: `unpaid`

---

## 👤 User Dashboard

- 📦 **My Orders**
  - View order list & status
  - Cancel if pending
  - Pay Now button for unpaid orders
- 💳 **Invoices**
  - Payment ID, amount & date
- ❤️ **My Wishlist**
  - View & remove wishlisted books
- 🙍 **My Profile**
  - Update name & profile image

---

## 📚 Librarian Dashboard

- ➕ **Add Book**
  - Name, image, author, price, status (published/unpublished)
- 📖 **My Books**
  - View & edit own books
  - Unpublish books (cannot delete)
- 🚚 **Orders**
  - View orders of own books
  - Change status: `pending → shipped → delivered`
  - Cancel orders

---

## 🛡️ Admin Dashboard

- 👥 **All Users**
  - Promote users to Librarian/Admin
- 🗂️ **Manage Books**
  - Publish/unpublish
  - Delete books (also removes related orders)
- 🙍 **My Profile**
  - Same as user profile page
- 📊 Dashboard charts & stats

---

## 🎨 UI/UX Design Highlights

- Unique, modern UI inspired by professional templates
- Consistent heading styles across sections
- Equal card sizes & grid layouts
- Balanced spacing & alignment
- Fully responsive (mobile, tablet, desktop)
- Full-width dashboard with charts & profile section


---

## ⚡ Challenge Features

- ❤️ Wishlist system
- 🔍 Search & sort books
- 🔐 JWT protected routes using Firebase token
- ⚡ TanStack Query for data caching & revalidation

---

## 🧰 Tech Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- DaisyUI
- Framer Motion
- AOS
- React Icons
- Swiper.js
- TanStack Query
- SweetAlert2
- React Hot Toast
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

### Authentication & Hosting
- Firebase Authentication
- Firebase Token Verification
- (Optional) Firebase / Vercel / Netlify for hosting

---

## 📦 NPM Packages Used

```bash
react
react-router-dom
firebase
axios
sweetalert2
react-hot-toast
aos
framer-motion
swiper
@tanstack/react-query
react-icons
recharts
express
mongoose
jsonwebtoken
cors
dotenv

```

---


### 🚀 How to Run Locally

# Clone repo
- git clone https://github.com/mollikafaria06/BookCourier-Client.git
- git clone https://github.com/MollikaFaria06/BookCourier-Server.git

# Frontend
- cd bookCourierClient
- npm install
- npm run dev

# Backend
- cd bookCourierServer
- npm install
- npm run start

---


### 👨‍💻 Author

-  Faria Alam
-  Mern Stack Developer
-  📧 Email:  fariamk007@gmail.com
-  🔗 GitHub: https://github.com/mollikafaria06