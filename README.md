# Registering, authenticating and working with user data

This project was done as part of a student internship.

## Stack:
Server - Node.js, Express.js
Database - MongoDB
Frontend - React, Bootstrap


## Deploy

https://auth-ilearn.onrender.com/


## Description

The Web application allows users to register and authenticate. 
Authenticated users see the "users" table (ID, name, email, registration date, last login date, status) with the users.
The table has left column checkboxes for multiple selection. Above the table, there is a toolbar with actions: Block, Unblock, Delete. 
The user can remove or block himself - this must be immediately unlogged. If someone else blocks or deletes the user, the user is redirected to the login page for any subsequent action.
Unauthenticated users have no access to user management (access only to the registration form or authentication form).
It should be possible to use any password, even one character, when logging in.
A blocked user cannot log in, a deleted user can re-register.

