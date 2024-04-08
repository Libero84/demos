## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Problems](#problems)
- [Setup](#setup)

## General info

This project consists of two pages. The first page presents the table view. From the table we can switch to the detail view.
We also have the possibility to add new entities and update existing ones.
For the presentation, a simple server was added, whose task is to mock up data.

## Technologies

### Version:

- node 19.9.0
- npm 9.6.3

### Libraries:

- Ag Grid - main table,
- shadcn/ui - form components
- React-Hook-Form - form handling
- Zod - form validation
- tailwindcss - styling
- appolo/client - communication with backend

## Problems

- I used version 19 of node because there was an error code on the server in version 20: 'ERR_UNKNOWN_FILE_EXTENSION' error - related to ts extension - to avoid standing still for this project I decided to use the working version of node

---

- In the application, error handling should be added, as well as short messages in the form of toasts about the successful action of adding and editing an entity.
- It would also be tempting to write unit tests for the form

## Setup

```
$ cd ../mock-server
$ npm install
$ npm start

$ cd ../client-task
$ npm install
$ npm run dev
```
