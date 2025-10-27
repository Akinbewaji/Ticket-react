# Ticket Management App - React Version

A comprehensive ticket management web application built with React.

## Frameworks and Libraries Used

- **React**: 18.x (Frontend framework)
- **React Router DOM**: 6.x (Routing)
- **CSS**: Custom styles with shared stylesheet

## Setup and Execution

1. Navigate to the React version directory:
   ```bash
   cd ticket-management-app/ticket-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Switching Between Versions

To switch to other versions:
- Vue.js: `cd ../vue && npm run serve`
- Twig: Open `../twig/index.html` in browser

## UI Components and State Structure

### Components
- **Landing**: Hero section with wavy background, decorative circles, CTA buttons
- **Auth**: Login/Signup forms with validation and toast notifications
- **Dashboard**: Statistics display with logout functionality
- **Tickets**: CRUD interface for ticket management

### State Management
- Authentication: localStorage with key `ticketapp_session`
- Tickets: localStorage for persistence
- Form validation: Client-side with inline error messages

## Accessibility and Known Issues

### Accessibility Features
- Semantic HTML elements
- Alt text for images (none in this version)
- Visible focus states via CSS
- Sufficient color contrast in styles

### Known Issues
- No server-side validation (client-side only)
- Authentication is simulated
- No real-time updates between tabs

## Test User Credentials

- Username: `admin`
- Password: `password`
# Ticket-react
