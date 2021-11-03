# Interview Scheduler

A React application that allows the user to add, edit and delete interview appointments across Monday to Friday.

## Final Product

The user can view all the appointments on the weekdays as shown below:

## ![Browse appointment](./docs/switchInterview.gif)

The user can add a new appointment by clicking on the add or + button in the empty slots available as seen below:

## ![Save new appointment](./docs/addInterview.gif)

The user can edit existing appointments by clicking on the edit icon on the bottom right on the existing appointment. After entering the information, the user can save and implement the new changes or click cancel and revert back to the older appointment as shown below:

## ![Edit existing appointment](./docs/editInterview.gif)

The user can delete existing appointments by clicking on the trash icon. The user will be asked to confirm or cancel deletion.

## ![Delete existing appointment](./docs/deleteInterview.gif)

If the name of interviewer is not entered, the user will be asked to enter the name. If the user cannot book an appointment or delete an appointment, an error will be shown to the user as can be seen below:

## ![Error handling](./docs/errorHandling.gif)

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
