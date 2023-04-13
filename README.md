# FrontEnd Task By AlgoBulls
# To-do Application by Hilag Shah | <a href="https://fttodoapp.netlify.app">DEMO</a>

## Requirements

* [X] Tasks should be displayed in a Tabular format, using the Ant Pro table component.
* [X] Table should have timestamp(auto set and uneditable).
* [X] Table should have title(Mandatory Field with create and update, maxlength=100)
* [X] Table should have description(Mandatory Field with create and update,maxlength=1000)
* [X] Table should have due_date(Optional Field with create and update,date should not be greater than the current timestamp)
* [X] Table should have tags(Optional Field with create and update,multiple tags with same name should appear once)
* [X] Table should have tags(Optional Field with create and update,multiple tags with same name should appear once)
* [X] Table should have status(Optional Field with create and update,four status - OPEN,WORKING,DONE,OVERDUE)
* [X] Table should support pagination
* [X] User should be able to ADD,MODIFY,DELETE,FILTER,SORT the data
* [X] Case insensitive search of tasks
* [X] Mock API Data(need to follow step 1 i.e. "npm run mock api" to see data)
* [X] Deploy Application and add comments to code

**Note: I did not have a VISA credit card/debit card and thus failed to deploy on AWS,GCP or Azure.Thus I have deployed the application on Netlify.** 

## How to setup the application 

In the project directory, you can run:

### `npm install --save-dev` or `npm install`

This will install all the dependencies in node_modules folder

### `npm run mock-api`
Runs the mock-api to feed data into our todo application.\
The API will by default run on PORT 3001 [http://localhost:3001](http://localhost:3001) from where we fetch the JSON data and feed it into out ant-pro table.\
Open a new console on completion and keep the current console running.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.This is basically because of some configuration issues while using ant-pro tables.

### `npm test`

Launches the test runner in the interactive watch mode.
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### Tech Stack
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white&style=plastic) ![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white&style=plastic) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&style=plastic) ![React](https://img.shields.io/badge/React-4D4DFF?style=for-the-badge&logo=react&logoColor=white&style=plastic) ![Ant-Pro Table](https://img.shields.io/badge/AntPro-4EA94B?style=for-the-badge&logo=antpro&logoColor=white&style=plastic)
