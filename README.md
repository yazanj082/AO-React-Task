# React Task V3

## Introduction

Welcome to React Task V3! This project is a TypeScript Vite React application with a sidebar that opens different pages. In this README, you'll find instructions on how to run the project and a description of its structure and functionalities.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install` or `yarn install`.
4. Start the development server with `npm run dev` or `yarn dev`.

## Project Structure

The project structure is organized as follows:

# Project Structure

- `src`: This is where the source code of the project is located.
  - `App.tsx` and `main.tsx`: These are TypeScript files, containing the main components and logic of the application.
  - `router`: This directory contains files related to routing, which manages the navigation of the application.
  - `styles`: This directory contains CSS files for styling the application.
  - `assets`: This directory contains static assets like images or icons used in the application.
  - `modules`: This directory likely contains different modules or features of the application, organized into subdirectories.
    - Inside `modules`, there are subdirectories like `home`, `layout`, `patient`, and `star-wars`, each representing a different part of the application.
      - Each module directory contains `components`, `pages`, and possibly other related files.
      - `components`: These are reusable UI components used throughout the module.
      - `pages`: These are the individual pages or views of the module.
      - `routes.tsx`: This file defines the routes for the module, specifying which components or pages to render for different URLs.
      - `services`: This directory contain files for interacting with external services or APIs.
      - `interfaces`: This directory contain TypeScript interface definitions for data structures used in the module.

## Features

### Page 1: People List from Star Wars API

- **Description**: Displays a table with people from the Star Wars API.
- **Attributes**: Name, Gender, Height, Eye Color.
- **Additional Functionality**:
  - Pagination.
  - Search by name.
  - More details button to navigate to Page 2.

### Page 2: Add Workspace Form

- **Description**: Form for adding Patient with validation and error messaging.
- **Fields**:
  - First Name (required).
  - Last Name (required).
  - Gender (required).
  - Disorder (required).
  - Date Of Birth (required).
  - Workspace (required).
  - Additional workspace fields can be added dynamically.
- **Functionality**:
  - Validation and error messages.
  - Display form data inside an alert on submit.
## Tests
- Added only one simple test file for PeopleList

## Technologies Used

- React
- TypeScript
- Vite
- Material-UI
- React Router
- React Hook Form
- Vitest
