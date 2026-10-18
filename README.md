# Event Management System

A simple React application for exploring Ticketmaster events and managing event registrations.

## Features

- User registration, login and logout
- Login session saved in local storage
- Protected My Events page
- Ticketmaster event listing and search
- Event details
- User-specific event registration
- Duplicate registration prevention
- Upcoming and completed events
- Registration cancellation

## Technologies

- React
- Redux Toolkit
- React Router
- Ticketmaster Discovery API
- Vite

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mShaheer0/Event-Management-System.git
   cd Event-Management-System
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to a new file named `.env`.

4. Add your Ticketmaster API key to `.env`:

   ```env
   VITE_TICKETMASTER_API_KEY=your_ticketmaster_api_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

Open the local URL shown in the terminal.

## Other Commands

```bash
npm run build
npm run lint
```

The `.env` file is ignored by Git and should not be uploaded to GitHub.
