# smart-inventory-system-web

A web-based inventory management system built with Angular to facilitate device, group, shelf, and item management along with user authentication and statistical insights.

## Table of Contents
- [Features](#features)
- [Stack](#stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [Configuration](#configuration)

## Features
- User registration, login, and JWT-based authentication.
- Group management: create groups, add/remove users, and leave groups.
- Device management: create, activate, edit, and view device history.
- Shelf management: create, view, edit shelves and control shelf lighting.
- Item management: add, edit, delete items, generate QR codes, and view item history.
- Search and filter capabilities for items and shelves.
- Pagination support across listing views.
- Multi-language support with English and Ukrainian translations.
- Detailed statistics including:
  - Items popularity by actions count.
  - Shelves grouped by item count.
  - User activity.
  - Users by items taken.
- Responsive UI with Bootstrap styling.

## Stack
- **Frontend Framework:** Angular 17
- **Language:** TypeScript, HTML, CSS
- **Authentication:** JSON Web Tokens with @auth0/angular-jwt
- **Internationalization:** @ngx-translate/core & http-loader
- **Styling:** Bootstrap 5, FontAwesome for icons
- **Build & Dev Tools:** Angular CLI, Karma for unit tests, Visual Studio Code devcontainers

## Installation

### Prerequisites
- Node.js (>= 18.x recommended)
- npm (comes with Node.js)
- Angular CLI (install globally):  
  ```bash
  npm install -g @angular/cli
  ```
- Git (to clone the repository)
- Optional: Visual Studio Code with recommended extensions

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Shchoholiev/smart-inventory-system-web.git
   cd smart-inventory-system-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Serve the application locally:
   ```bash
   npm start
   ```
   This will start the Angular development server. Navigate to `http://localhost:4200/` in your web browser.

4. To build the production bundle:
   ```bash
   npm run build
   ```
   The build output will be in the `dist/smart-inventory-system-web/` directory.

5. To run unit tests:
   ```bash
   npm test
   ```

## Configuration

The frontend depends on a backend API service URL which is configured via environment variables.

- Edit the environment file located at:  
  `src/environments/environment.ts`

- Example configuration:
  ```typescript
  export const environment = {
    production: false,
    apiUrl: 'https://your-api-server.com/api'
  };
  ```

- Replace `'https://your-api-server.com/api'` with the actual backend API base URL.

- The authentication token is stored in `localStorage` under the key `accessToken`.

- Language preferences are saved in the browser's local storage under the key `language`.
