# Expense Tracker Application

A full-stack expense tracking application built with React.js and Node.js, featuring user authentication, transaction management, and data visualization.

## Features

- 🔐 **User Authentication**
  - Email/Password login
  - Google OAuth integration
  - Secure session management

- 💰 **Transaction Management**
  - Add income and expenses
  - Categorize transactions
  - Track transaction history
  - View transaction details

- 📊 **Data Visualization**
  - Interactive charts and graphs
  - Expense breakdown by category
  - Income vs Expense analysis
  - Monthly/yearly summaries

- 🎯 **User Features**
  - Personal dashboard
  - Account management
  - Category customization
  - Settings and preferences

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Chart.js for data visualization
- Styled Components for styling
- Context API for state management
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- Google OAuth integration
- RESTful API architecture

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Google OAuth credentials (for Google login)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sarahkamdar/Expense_Tracker.git
cd Expense_Tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
Expense_Tracker/
├── backend/
│   ├── controllers/    # Business logic
│   ├── routes/        # API routes
│   ├── models/        # Database models
│   ├── middleware/    # Custom middleware
│   ├── db/           # Database configuration
│   └── scripts/      # Utility scripts
├── frontend/
│   ├── src/
│   │   ├── Components/  # React components
│   │   ├── context/     # Context providers
│   │   ├── styles/      # Styled components
│   │   └── utils/       # Utility functions
│   └── public/          # Static assets
└── .gitignore
```

## API Endpoints

### Authentication
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - User login
- POST `/api/v1/auth/google` - Google authentication

### User Management
- GET `/api/v1/user/profile` - Get user profile
- PUT `/api/v1/user/profile` - Update user profile
- GET `/api/v1/user/settings` - Get user settings

### Transactions
- GET `/api/v1/transactions` - Get all transactions
- POST `/api/v1/transactions` - Create new transaction
- PUT `/api/v1/transactions/:id` - Update transaction
- DELETE `/api/v1/transactions/:id` - Delete transaction

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Sarah Kamdar - [@sarahkamdar](https://github.com/sarahkamdar)

Project Link: [https://github.com/sarahkamdar/Expense_Tracker](https://github.com/sarahkamdar/Expense_Tracker)
