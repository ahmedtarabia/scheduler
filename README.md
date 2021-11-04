# Interview Scheduler

A React application that allows the user to add, edit and delete interview appointments across Monday to Friday.

## Final Product

### To Browse through the appointments in different days

The user can view all the appointments on the weekdays as shown below:

## ![Browse appointment](./docs/switchInterview.gif)

### Booking an appointment

The user can add a new appointment by clicking on the add or + button in the empty slots available as seen below:

## ![Save new appointment](./docs/addInterview.gif)

### Editing an appointment

The user can edit existing appointments by clicking on the edit icon on the bottom right on the existing appointment. After entering the information, the user can save and implement the new changes or click cancel and revert back to the older appointment as shown below:

## ![Edit existing appointment](./docs/editInterview.gif)

### Deleting an existing appointment

The user can delete existing appointments by clicking on the trash icon. The user will be asked to confirm or cancel deletion.

## ![Delete existing appointment](./docs/deleteInterview.gif)

### Edge case and Error Handling

If the name of interviewer is not entered, the user will be asked to enter the name. If the user cannot book an appointment or delete an appointment, an error will be shown to the user as can be seen below:

## ![Error handling](./docs/error.gif)

## Optimization

This project can be improved by doing the following:
- Implement a registration / login / logout
- Deploy on Heroku for the backend and Netlify for the frontend
- Implement a CI/CD (continuous integration / continuous deployment)
- Connect to a websocket server

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- React
- React Testing Library
- Webpack Development Server
- Axios
- Class Names
- Cypress
