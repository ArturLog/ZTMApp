# ZTM Public Transport App (Next.js + NestJS)

This is a full-stack web application designed to help users track public transport information, focusing on tram and bus stops. The project consists of a **NestJS backend** that serves a RESTful API and a **Next.js frontend** that provides a reactive and user-friendly interface.

The application allows users to view a list of all available public transport stops, register for an account, log in, and manage a personalized list of "My Stops." Authenticated users can see real-time departure information for their saved stops.

## Key Features

### Backend (NestJS)

*   **RESTful API**: A well-structured API built with NestJS for managing users, stops, and departures.
*   **Database Integration**: Uses **TypeORM** with a **SQLite** database to store user data and their associated stops.
*   **Authentication**: Secure, token-based authentication using **JWT** and **Passport.js**, with endpoints for registration, login, and session management. Passwords are securely hashed using `bcrypt`.
*   **External Data Integration**: The backend fetches and populates its database with initial stop data from an official public transport API (Gdańsk ZTM). It also fetches live departure times on demand.
*   **API Documentation**: Integrated **Swagger (OpenAPI)** for clear, interactive API documentation.
*   **Configuration Management**: Uses `.env` files for easy management of environment variables like ports, API keys, and database connections.

### Frontend (Next.js)

*   **Modern UI**: A responsive and fast user interface built with **Next.js 15**, **React 19**, and **TypeScript**.
*   **Styling**: Styled with **Tailwind CSS** and features a set of beautiful, reusable components from **shadcn/ui**.
*   **User-Specific Features**:
    *   A "My Stops" page where logged-in users can view their personalized list of saved stops.
    *   Ability to add stops from a global list and remove them from their personal list.
    *   Drag-and-drop functionality to reorder saved stops using `react-beautiful-dnd`.
*   **Real-Time Data**: Fetches and displays live departure times for each stop in an expandable accordion view.
*   **Client-Side State Management**: Uses **TanStack Query (React Query)** to efficiently manage server state, caching, and data fetching.
*   **Authentication Flow**: Includes login and registration modals, with client-side session management using JWTs stored in cookies.

## Architecture & Tech Stack

The project is divided into two main parts: a backend API and a frontend client application.

| Area      | Technology / Library                                     |
| :-------- | :------------------------------------------------------- |
| **Backend**   | NestJS, TypeScript, TypeORM, SQLite, Passport.js, JWT, Swagger, Jest |
| **Frontend**  | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Axios, Jest |
| **Testing**   | Jest (Unit Tests), Selenium & Python (End-to-End Tests) |

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   **Node.js** (v18 or later recommended)
*   **pnpm** (or `npm`/`yarn`)
*   **Python** (for running the E2E tests)
*   **Selenium WebDriver** for Chrome (for E2E tests)

---

### 1. Backend Setup

1.  **Navigate to the backend directory**:
    ```bash
    cd path/to/backend-folder
    ```

2.  **Create Environment File**:
    Rename `.env-example.txt` to `.env` and fill in the required variables. The default port is `3003`.

3.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

4.  **Run the Backend Server**:
    ```bash
    pnpm run start:dev
    ```
    The backend API will be running on `http://localhost:3003`.
    Swagger documentation is available at `http://localhost:3003/api`.

---

### 2. Frontend Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd path/to/frontend-folder
    ```

2.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

3.  **Run the Frontend Development Server**:
    ```bash
    pnpm run dev
    ```
    The frontend will be available at `http://localhost:3000`.

---

### 3. First-Time Data Initialization

For the application to have any stop data, you must initialize it by calling a special backend endpoint.

1.  Make sure the backend server is running.
2.  Open your browser or a tool like Postman and make a `GET` request to:
    ```
    http://localhost:3003/stops/init
    ```
    This will fetch all stops from the external ZTM API and populate the local SQLite database. This only needs to be done once.

## Testing

The project includes unit tests with Jest and end-to-end tests with Selenium.

### Unit Tests

To run the unit tests for either the frontend or backend:

1.  Navigate to the respective directory (`frontend` or `backend`).
2.  Run the test command:
    ```bash
    pnpm run test
    ```

### End-to-End (E2E) Tests

The E2E tests simulate a full user journey: logging in, adding a stop, removing a stop, and logging out.

1.  **Prerequisites**:
    *   Ensure you have Python, Selenium, and the Chrome WebDriver installed.
    *   Make sure both the frontend and backend servers are running.

2.  **Run the Test Script**:
    Navigate to the frontend directory (where `selenium_tests.py` is located) and run:
    ```bash
    python selenium_tests.py
    ```
    This will open a Chrome browser window and automatically perform the test steps. You will see progress printed in your terminal.