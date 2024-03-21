# Introduction
The Booking app is a Web-based Rentals application allowing users to browse, book and list accommodations. The application utilizes the MERN stack for its robustness and flexibility, with Tailwind CSS for a modern and responsive user interface.

# Features
- User Authentication: Users can sign up, log in, and log out securely.
- Listings: Browse through a variety of available listings with detailed information.
- Booking: Users can book accommodations and manage their bookings.
- Host Dashboard: Hosts can manage their listings, bookings, and respond to inquiries.
- Responsive Design: The application is optimized for various screen sizes.

# Technologies Used
- **MongoDB**: A NoSQL database used for storing user data, listings, bookings, and reviews.
- **Express.js**: A Node.js web application framework used for building the server-side application.
- **React.js**: A JavaScript library used for building the user interface components.
- **Node.js**: A JavaScript runtime environment used for building the server-side application.
- **Tailwind CSS**: A utility-first CSS framework used for styling the user interface.

# Getting Started
To run the Booking App on your local environment, follow the instructions below.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vatsalgabani64/booking-app.git
2. Navigate to the project directory:
   
    ```bash
    cd booking-app
3. Navigate to the client directory:

   ```bash
   cd client
4. Install dependencies:

    ```bash
    npm install
5. Navigate back to the root directory:

   ```bash
   cd ..

6. Navigate to the api directory:
   
   ```bash
   cd api
   
7. Install dependencies:

    ```bash
    npm install

8. Navigate back to the root directory:

   ```bash
   cd ..

## Usage

1. Create a .env file in the api directory and add the following environment variables:
   ```bash
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

2. Start the server:
   ```bash
   nodemon app.js

3. Start the client:
   ```bash
   npm run dev -- --host

4. Access the application in your browser at http://127.0.0.1:5173/





