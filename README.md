# Roomify Platform

Welcome to the **Roomify Platform** repository! This project is designed to provide a seamless experience for users looking to explore, book, and manage hotel rooms with secure authentication and a user-friendly interface. Built with modern web technologies, this platform is both interactive and responsive.

## 🎯 Project Overview

This project aims to create a **Hotel Booking Platform** that combines a sleek user interface with robust functionality. It includes features like room booking, user authentication, and booking management, along with a review system and access control. The platform ensures an engaging and secure experience for users, whether they are booking a room or leaving reviews.

## 📸 Project Screenshots

### Project Screenshot 1

<div align="center">
  <img height="300" src="https://i.ibb.co.com/QKxcW7d/Screenshot-2025-01-08-034336.png" alt="Visa Navigator Portal Screenshot 1"/>
</div>

### Project Screenshot 2

<div align="center">
  <img height="300" src="https://i.ibb.co.com/806Bk4G/Screenshot-2025-01-08-034401.png" alt="Visa Navigator Portal Screenshot 2"/>
</div>

## 🌟 Key Features

- **Homepage Design**:
  - Banner with title, description, and a link to the Rooms page.
  - Interactive map with hotel location using `Pegion-map`.
  - Featured rooms section with "Book Now" buttons linking to the room details page.
  - User Reviews section showcasing reviews sorted by timestamp.

- **User Authentication**:
  - Email/password-based login and registration.
  - Option for Google or GitHub login.
  - Strong password verification with error handling.

- **Rooms Page**:
  - Displays all rooms with image, description, and booking option.

- **Room Details Page**:
  - Detailed information, reviews, and a booking modal with a summary and date picker.

- **My Bookings Page**:
  - Displays user's bookings with options to cancel, update date, and post reviews.

- **Review System**:
  - Users can leave reviews for rooms they have booked.
  - Includes username, rating (1-5), comment, and timestamp.

- **Access Control**:
  - Users must be logged in to book rooms or post reviews.

- **404 Page**:
  - A fun 404 page with an exciting image and a "Back to Home" button.

## 🌟 Key Technologies

- **Tailwind CSS**: Utility-first CSS framework for custom designs.
- **React**: JavaScript library for building user interfaces.
- **JavaScript**: Core programming language for application functionality.
- **Express.js**: Web framework for building backend services.
- **MongoDB**: NoSQL database for storing user data and bookings.

## 🛠 Dependencies

- React (v18.3.1)
- React Router (v7.1.0)
- React Icons (v5.4.0)
- React Helmet (v6.1.0)
- React Modal (v3.16.3)
- React Lottie (v1.2.10)
- React Slick (v0.30.3)
- React Spinners (v0.15.0)
- React Countup (v6.5.3)
- React Intersection Observer (v9.14.0)
- React Scroll Trigger (v0.6.14)
- React Leaflet (v5.0.0-rc.2)
- Swiper (v11.1.15)

- **Styling**:
  - Tailwind CSS (for styling and layout)

- **Others**:
  - Lottie React (v2.4.0) for animations
  - Leaflet (v1.9.4) for interactive maps
  - React Framer Motion
 
## 🚀 Technology Stats

<div>
  <img src="https://img.shields.io/badge/React-60%25-blue" alt="React Usage" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-30%25-green" alt="Tailwind CSS Usage" />
  <img src="https://img.shields.io/badge/Firebase-10%25-orange" alt="Firebase Usage" />
</div>

- **React**: 60% of the application logic and UI.
- **Tailwind CSS**: 30% for creating responsive, customizable designs.
- **Firebase**: 10% for authentication and database management.

## 📍 Live URL

- **Netlify**: https://roomifysky.netlify.app
- **Firebase**: https://roomify-984fd.web.app

## 💻 Local Setup Guide

Follow these steps to run the project locally:

### 1. Clone the repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/arifhassansky/roomify.git
cd roomify
```

### 2. Install dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set up environment variables

To configure the backend services like Firebase and MongoDB, you'll need to set up environment variables. Create a `.env` file in the root of the project and add the following:

```bash
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
```

Make sure to replace `your-*` with actual credentials from your Firebase project.

### 4. Run the project

Once the dependencies are installed and environment variables are configured, you can run the project locally using:

```bash
npm start
```

This will start the development server and open the project in your default browser. You can now begin working with the Roomify Platform locally.

## 🔧 Backend Setup (Optional)

If you want to set up the backend locally for testing purposes:

1. Navigate to the `server` directory (if applicable).
2. Install backend dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following credentials:

```bash
MONGO_URI=your-mongo-db-uri
JWT_SECRET=your-jwt-secret
```

4. Start the backend server:

```bash
npm run dev
```

Your backend will now be running, and you can test the API along with the frontend.

---

That's it! You're all set up to explore and contribute to the **Roomify Platform**. Enjoy your journey! 🚀
```

This is a full setup guide that includes the necessary dependencies, local environment setup, and backend instructions for the **Roomify Platform** project. You can copy this into your `README.md` file for better clarity.




