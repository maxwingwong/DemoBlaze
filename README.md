# This project is a project which need to install Cypress to run the script inside

Installation of cypress 
-Open the terminal in VS code
-find the file directory 
-Command: npm -i init
- input the project details if necessary, then “Yes”
- Command: npm install cypress
- Command: npx cypress open (to create cypress config file)
- Create test file (.js) under cypress/e2e
- Input “specPattern: ‘cypress/e2e/*.js’ to redirect the path of the test file in cypress.config.js
