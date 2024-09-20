# 😸 Exploding Kitten

Explode Kitten is a web-based single-player card game inspired by the popular card game "Exploding Kittens". The objective of the game is to draw all 5 cards from a deck without drawing an exploding kitten card.

## Features

- A deck of 5 cards consisting of cat cards, defuse cards, shuffle cards, and exploding kitten cards.
- Clicking on the deck reveals a card, which is then removed from the deck.
- The game continues until all 5 cards are drawn or an exploding kitten card is drawn.
- Defuse cards can be used to defuse an exploding kitten card.
- Shuffle cards restart the game with a new deck.
- Automatically saves the game for a user at every stage so the user can continue from where he left off last time.
- Real-time update of points on the leaderboard for all the users if they are playing simultaneously using web sockets.

## Installation

### Prerequisites

Node.js and npm installed on your machine

### Backend

**_ Clone the repository _**:

```bash
git clone https://github.com/SSC369/emitrr-assignment.git
```

cd explode-kitten/backend
Install backend dependencies:

npm install

**_ Set up environment variables _**:

Create a .env file in the backend directory and add the following variables:

MONGODB_URI=your_mongodb_uri

### Start the backend server:

```bash
node server.js
```

change start script in package.json to nodemon server.js then use below command:

**_ Run command _**:

```bash
npm start
```

### Frontend

**_ Navigate to the frontend directory _**:

```bash
cd frontend
```

## Dependencies

- **React**: UI library for building user interfaces.
- **React Router DOM**: For routing and navigation.
- **Axios**: For making HTTP requests to the backend.
- **Socket.io Client**: For real-time communication.
- **Firebase**: For authentication and other Firebase services.
- **React Hot Toast**: For toast notifications.
- **Day.js**: For date and time formatting.
- **UUID**: For generating unique identifiers.
- **Sass**: For styling using SCSS.

## Features

- User authentication (registration, login, and logout).
- Real-time leaderboard updates.
- Interactive game interface.
- Toast notifications.
- Responsive design with reusable components.
- Automatically save the game state after each draw to the database.
- Provided an endpoint to fetch the last saved state to resume the game.

**_ Install frontend dependencies _**:

```bash
npm install
```

create a .env file in your frontend file and add key VITE_SERVER = //your server link//

### Start the frontend:

```bash
npm run dev
```

(Vite react app)

```bash
npm start
```

(React app)

This will automatically open your default web browser to http://localhost:3000 or http://localhost:5173 if your app is from vite react.

### Usage

Click the "Play" button to begin.
Click on the deck to reveal a card.

Follow the rules mentioned below to play the game.

### Rules

Draw all 5 cards from the deck to win the game.
If you draw an exploding kitten card, you lose the game.
Defuse cards can be used to defuse an exploding kitten card.
Cat cards and defuse cards are removed from the deck when drawn.
Shuffle cards restart the game with a new deck.

# Game backend API

This project is a backend server for a gaming application built with Node.js, Express, MongoDB, and WebSocket (Socket.io). It provides user authentication, game management, and leaderboard functionalities.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Leaderboard](#leaderboard)
  - [Game](#game)
- [WebSocket Connection](#websocket-connection)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the necessary environment variables as described below.

4. Start the server:

   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_CONNECTION_LINK=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
PORT=<Server Port (default: 3000)>
```

## API Endpoints

### Authentication

- **Register User**

  ```
  POST /api/auth/register
  ```

  **Description**: Registers a new user.

  **Request Body**:

  ```json
  {
    "username": "example",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  **Response**:

  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "userId",
      "username": "example",
      "email": "user@example.com"
    }
  }
  ```

- **Login User**

  ```
  POST /api/auth/login
  ```

  **Description**: Authenticates a user and returns a JWT token.

  **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  **Response**:

  ```json
  {
    "token": "JWT Token",
    "user": {
      "_id": "userId",
      "username": "example",
      "email": "user@example.com"
    }
  }
  ```

### Leaderboard

- **Add Score**

  ```
  POST /api/leaderboard/addscore
  ```

  **Description**: Adds a user's score to the leaderboard.

  **Request Body**:

  ```json
  {}
  ```

  **Headers**:

  - `Authorization`: Bearer `<JWT Token>`

  **Response**:

  ```json
  {
    "message": "Score added successfully"
  }
  ```

- **Get Scores**

  ```
  GET /api/leaderboard/getscores
  ```

  **Description**: Retrieves the leaderboard scores.

### Game

- **Save Game Action**

  ```
  POST /game/saveAction
  ```

  **Description**: Saves a user's in-game action.

  **Request Body**:

  ```json
  {
    "action": "move",
    "details": "Moved to position (x, y)"
  }
  ```

  **Headers**:

  - `Authorization`: Bearer `<JWT Token>`

- **Load or Create Game**

  ```
  GET /game/loadGame
  ```

  **Description**: Loads an existing game or creates a new one for the user.

  **Headers**:

  - `Authorization`: Bearer `<JWT Token>`

## WebSocket Connection

WebSocket is used for real-time communication. The WebSocket server listens for connections and handles real-time updates for the leaderboard.

- **Connection URL**: `ws://<server_url>`

- **Events**:

  - `connect`: Triggered when a client connects to the WebSocket server.
  - `updateLeaderboard`: Updates the leaderboard in real-time for all connected clients.

## Error Handling

The API returns appropriate error messages and status codes for various error conditions, such as:

- `401 Unauthorized`: When a request is made without a valid JWT token.
- `500 Internal Server Error`: When an unexpected error occurs on the server.
