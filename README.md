# Himalayan Khadu - Travel & Tour Management Platform

A full-stack MERN application for managing travel packages, user bookings, customer reviews, and administrative operations.

## 🚀 Key Features & Updates

### 👤 User Profile Management
- **Profile View & Edit**: Registered users can view and update their personal profile details and phone numbers dynamically.
- **Real-Time Synchronization**: Synchronized backend profile API endpoints with global Redux store state to maintain real-time updates without manual browser refreshes.

### 🛡️ Admin Dashboard & View Details
- **User Management & View Details**: Admins can view all registered users and click the **"View Details"** button on any user row to open a dedicated, parameterized view (`/Dashboard/users/:userId`) displaying complete profile information and booking history.
- **Responsive Layout Architecture**: Refactored dashboard user cards and tables with fluid grid breakpoints (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) and CSS flex containment (`min-w-0 flex-1`) to prevent overflow when resizing windows.
- **Collapsible Navigation Drawer**: Built a stateful collapsible sidebar layout with `ChevronLeft` (hide) and `ChevronRight` (show menu) arrow buttons for seamless mobile and desktop navigation.

### 🌐 Mobile Navigation & Header Optimization
- **Responsive Logo Sizing**: Optimized the company logo in `Navbar.jsx` with responsive aspect containment (`object-contain shrink-0`) and compact mobile padding to ensure crisp legibility across all mobile screen sizes.
- **Mobile Action Header**: Adjusted header navigation buttons to scale harmoniously on small screen viewports.

---

## 🛠️ Tech Stack
- **Frontend**: React, React Router, Redux Toolkit, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT Authentication
