# Project Manager Application

Inspired by freelance designers' need for managing projects, The Project Manager Application is a system for keeping track of projects. The application allows the user to log in or sign up for an account and then create, edit, tag, recategorize, filter, search and delete projects. Overall, this application allows a freelance designer, or anyone else who needs to keep track of projects to efficiently manage projects.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [Features](#features)
5. [API Documentation](#API-documentation)

## Installation

To install this application: fork and clone this repository and run npm install.
To run this application locally, run npm start:dev
The live application is running here: https://project-manager-client-3yww.onrender.com  
The server is located here: https://project-manager-server-c0cu.onrender.com

## Usage

### / loginsignup

![Signup Page](https://github.com/Kyle-Haesler/project-manager/blob/main/images/SignUpScreenShot.png?raw=true)
![Login Page](https://github.com/Kyle-Haesler/project-manager/blob/main/images/LogInScreenShot.png?raw=true)

- If the user is not logged in, they will be redirected to the login / signup page
- If the user has an account, they simply enter their username and password and will be sent to their personalized dashboard page
- If the user does not have an account, they can simply sign up and then will be redirected to their new dashboard page

### /

![Home Page](https://github.com/Kyle-Haesler/project-manager/blob/main/images/HomePageScreenShot.png?raw=true)

- When a user is logged in, they will be directed to the home page, the main page of the application
- Here, the user is able to view all of their existing projects
- The user can create a new project, edit an existing project, update the status of a project by clicking the arrows
- The user is also able to filter projects by status and search for projects in the search bar

### /new

![New Project](https://github.com/Kyle-Haesler/project-manager/blob/main/images/NewProjectScreenShot.png?raw=true)

- Allows user to create a new project
- After submit, the user is directed back to the home page

### /:project_id

![Edit Project](https://github.com/Kyle-Haesler/project-manager/blob/main/images/EditProjectScreenShot.png?raw=true)

- Automatically populates specified project information to be edited
- After submit, the user is directed to back to the home page

### /reservation/:reservation_id/seat

![Seat Reservation](https://github.com/Kyle-Haesler/Capstone-Restaurant-Reservation-System/blob/main/images/SeatReservationScreenShot.png?raw=true)

- Allows user to assign a reservation to a table that must be open and have enough room for the party. Any errors will show up below the form
- After submit, the user is directed back to the dashboard (today's date)

### /search

![Search Reservation](https://github.com/Kyle-Haesler/Capstone-Restaurant-Reservation-System/blob/main/images/SearchReservationScreenShot.png?raw=true)

- Allows user to search for a reservation by phone number
- All reservations that match or partial match will be shown here, regardless of status

## Technologies Used

- Front-end: JavaScript, React, Bootstrap
- Back-end: Node.js, Knex, Express, JavaScript
- Database: PostgreSQL

## Features

- Create new reservation
- Look at reservations for different dates
- Search reservations by phone number
- Edit reservation
- Create new table
- Assign reservation to table
- Cancel reservation
- Free table after customers have finished dining

## API Documentation

### Reservations

#### /reservations?date=x

- Method: GET
- Description: Returns a list of reservations on the date given in the parameter, ordered by reservation time.

#### /reservations?mobile_number

- Method: GET
- Description: Returns a list of reservations whose mobile number matches or partially matches the number given in the parameter, ordered by reservation date.

#### /reservations

- Method: POST
- Description: Creates a new reservation.

#### /reservations/:reservation_id

- Method: GET
- Description: Returns the reservation that matches the reservation ID.

#### /reservations/:reservation_id

- Method: PUT
- Description: Updates the reservation that matches the reservation ID.

#### /reservations/:reservation_id/status

- Method: PUT
- Description: Changes the status of the reservation that matches the reservation ID.

### Tables

#### /tables

- Method: GET
- Description: Returns the list of tables ordered by the table name.

#### /tables

- Method: POST
- Description: Creates a new table.

#### /tables/:table_id

- Method: GET
- Description: Returns the table that matches the table ID.

#### /tables/:table_id/seat

- Method: PUT
- Description: Dual transaction that will seat the table and change the status of the reservation to seated.

#### /tables/:table_id/seat

- Method: DELETE
- Description: Dual transaction that changes the status of the reservation to finished and opens a table.
