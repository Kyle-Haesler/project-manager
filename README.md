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

## Technologies Used

- Front-end: JavaScript, React, Bootstrap, HTML, CSS
- Back-end: Node.js, Knex, Express, JavaScript
- Database: PostgreSQL

## Features

- Create new project
- Edit existing projects
- Change status of project by clicking arrows
- Assign projects a color tag
- Filter projects by status
- Delete projects
- Search for projects

## API Documentation

### Users

#### /users

- Method: POST
- Description: Creates a new user that consists of username, email and password

#### /users/:user_name

- Method: GET
- Description: Returns specific user information

#### /users/:user_name/:password

- Method: GET
- Description: Returns specific user based on user_name and password for the purpose of logging in

### Projects

router.route("/search/:searchData").get(controller.search);
router.route("/:project_id/edit").put(controller.update);
router
.route("/:project_id")
.get(controller.read)
.put(controller.updateStatus)
.delete(controller.delete);
router.route("/").get(controller.list).post(controller.create);
router.use(notFound);

#### /projects

- Method: GET
- Description: Returns the list of projects for the logged in user

#### /projects

- Method: POST
- Description: Creates a new project

#### /projects/:project_id

- Method: GET
- Description: Returns the project that matches the project_id for the logged in user

#### /projects/:project_id

- Method: PUT
- Description: Updates project status that matches the project_id for the logged in user

#### /projects/:project_id

- Method: DELETE
- Description: Deletes project that matches the project_id for the logged in user

#### /projects/:project_id/edit

- Method: PUT
- Description: Updates project that matches the project_id for the logged in user

#### /projects/search/:searchData

- Method: GET
- Description: Returns any partial matches for any project information for the logged in user
