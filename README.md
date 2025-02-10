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

## 📚 Installation

Here’s the full installation process for **The Tourist Guide** project:

### 1. **Clone the Repository**

First, clone the project repository to your local machine:

```bash
git clone https://github.com/arifhassansky/roomify.git
```

### 2. **Install Dependencies (Frontend)**

After cloning the repository, navigate to the project directory:

```bash
cd client
```

Then, install the required dependencies for the frontend:

```bash
npm install
```

### 3. **Install Dependencies (Backend)**

For the backend, you'll need to set up a separate project folder, assuming you already have the backend code. If not, you may need to clone the backend repository as well.

Once in the backend directory, install dependencies:

```bash
cd server
```

```bash
npm install
```

### 4. **Create a `.env` File (Backend)**

You’ll need to create a `.env` file to store your environment variables such as MongoDB connection string, JWT secret, and Stripe keys. Here’s an example of what the `.env` file might look like:

```env
ACCESS_TOKEN_SECRET=your-jwt-secret
MONGO_URI=your-mongodb-uri
```

Make sure to replace the placeholders with your actual values.

### 5. **Firebase Authentication Setup**

Go to the [Firebase Console](https://console.firebase.google.com/), create a project, and set up Firebase Authentication with the required methods (email/password, Google, etc.). Add your Firebase config to the backend `.env` file.

### 6. **Start the Backend Server**

Start the backend server by running:

```bash
npm start
```

This will start your Express server and connect to MongoDB.

### 7. **Start the Frontend Server**

Now, go to the frontend directory and start the React development server:

```bash
npm run dev
```

This will start the React development server, and you should be able to view the app by visiting [http://localhost:3000](http://localhost:3000).

### 8. **Payment Integration (Stripe)**

Ensure you have set up a Stripe account and retrieved your **Publishable Key** and **Secret Key**. Insert these keys in the backend `.env` file under `STRIPE_SECRET_KEY` and `STRIPE_PUBLIC_KEY`.

You can also use test cards provided by Stripe for local development. You can find those details in the [Stripe documentation](https://stripe.com/docs/testing).

### 9. **Environment Configuration**

Ensure you have your environment configured for React and Node. You may also need tools like:

- **MongoDB** (for database)
- **Stripe** (for payment system)
- **React Router** (for navigation)

### 10. **Testing the Application**

Once both frontend and backend are running, you can test the application on your local machine. Ensure you check for any issues related to authentication, Stripe payment, and dynamic content.
