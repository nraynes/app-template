# App Template

This is a template code base for a single page web application using
React framework. I am a fully functional full stack web application
equipped with JWT authentication, a color picker, profile editor &
profile photos, landing page, encryption, full app testing with unit
tests and e2e tests, full color customization built right in to
propagate a custom color theme, and more!

## Installation Instructions:

To get this app up and running, all you need to do is run the "npm run
dev" command in the terminal while in the project root directory folder.
This will run both the backend server and frontend in one terminal.

You will also need to have a postgres database up and running, which you
can do through docker.

To make the database, use this command in the terminal while having
docker installed on your computer: "docker run \--name app-template -e
POSTGRES_PASSWORD=a1eb0421c1af18c0 -p 49176:5432 -d postgres".

You can also substitute for your own password and/or port number if you
would like, just sub out the random string of characters at
POSTGRES_PASSWORD for your own password, and for port just change 49176
to your choice of port. Make sure to leave 5432 as it is so that it can
map to the correct Postgres port. You will need to change the database
url environment variable listed below to use whatever password/port you
have chosen.

You will need environment variables in both the backend and frontend
folders. To do this, make a new file called ".env" in both the frontend
folder and the backend folder.

**For the backend folder, you will need these environment variables:**

    # Environment

    NODE_ENV=development

    # Port number

    PORT=3001

    # URL of the PostgreSQL DB

    DATABASE_URL="postgresql://postgres:a1eb0421c1af18c0\@localhost:49176/postgres?schema=public"

    SECRET_KEY="Some random string of characters that is 128 characters
    long."

    SECRET_STATIC_SALT="Some random string of characters that is preferably
    24 characters long."

    SECRET_IV="Some random string of characters that is exactly 24
    characters long (It has to be 24 characters)."

    STATIC_SALT="Some random string of characters that is preferably at
    least 32 characters long."

    JWT_ACCESS_SECRET="Some random string of characters preferably 128
    characters long."

    JWT_REFRESH_SECRET="Some random string of characters preferably 128
    characters long."

    JWT_ACCESS_EXPIRATION_MINUTES=30

    JWT_REFRESH_EXPIRATION_DAYS=30

    APP_EMAIL='This will be any email you set up for your app.'

    SENDGRID_API_KEY='This app uses sendgrid as a free transactional email
    service, you need to sign up with sendgrid and get your api key and put
    it here to use email features. (Email features a required to verify
    accounts upon signing up by default).'

    RECAPTCHA_SECRET_KEY='This will be your google recaptcha secret key.
    This is required by default for new accounts. If you want to use this
    you'll need to sign up with google recaptcha and get your secret key and
    put it here.'

**For the frontend folder you will need these variables:**

    # Environment
    NODE_ENV=development

    REACT_APP_API_URL='http://localhost:3001/api'

    REACT_APP_SITE_KEY='This will be your google recaptcha site key, You
    will get this when you sign up for google recaptcha along with your
    secret key.'

This app was designed to be deployed to heroku cloud platform service.
If you decide to use heroku for deployment then all of your environment
variables will go in one spot on heroku, just make sure to include all
of the ones listed here.

After you set up the environment variables and a database, you should be
good to go and when you run "npm run dev" from the root folder that will
start the app.

## Testing:

To test the app, just run "npm run test" from the root folder to test
both the frontend and backend. Alternatively, run this command from
either backend or frontend folder to only test that folder. This will
run all the unit tests. There are time based unit tests that test
whether certain utility functions are operating within a specified
timeframe, if these fail it may be because of the machine you are using
or a random bug. If this happens try running the tests again to make
sure it's not because of a random glitch. You can also remove these
tests entirely if you would like as they are only used to test how fast
the utility functions are.

To run e2e tests, find the file called "frontEndTesting.js" in
"backend/src/config" and open it, then change the variable
"frontEndIsBeingTested" and change its value to true. This will disable
captcha checking so that you can run the e2e tests. Next, cd into the
frontend folder and run "npm run cypress:run" to run all of the e2e
tests. Alternatively, you can use "npm run cypress:open" to open the
cypress gui and run the tests from there. Make sure to set
"frontEndIsBeingTested" back to false when you are done (If you forget
to do this, don't worry, it will only affect the development
environment, if NODE_ENV is set to production then captcha cannot be
disabled by "frontEndIsBeingTested").

## Folder Structure

**The folders in the backend src are structured in the following way:**

***assets:*** Image files and assets are stored in this folder.  
***config:*** Global server configuration files.  
***controllers:*** Controller files that call upon various services to perform api functions.  
***db:*** All database stuff is in here.  
***middlewares:*** Express middlewares and custom middlewares stored here.  
***routes:*** Express Router files that define the routes for the api calls and where those calls go.  
***services:*** Service files that contain functions that do the actual work such as interacting with the database.  
***tests:*** All unit testing files along with setup and teardown files are in here.  
***utils:*** These are custom made utility functions that perform various tasks.  
***validation:*** Joi validation files to be used in routes to validate input.  


**The folders in the frontend src are structured in the following way:**

***api:*** Global API calls are stored in individual files here.  
***assets:*** Image files and such would be stored here.  
***components:*** Global react components are stored here.  
***config:*** Frontend global app configuration files and color scheme.  
***features:*** All individual features are separated here for organization, to include components, API calls, and routes for each feature.  
***hooks:*** Custom react hooks.  
***lib:*** library extension or modification files.  
***providers:*** Global app and library providers and custom providers.  
***routes:*** All routes in react router.  
***stores:*** Global state stores go here.  
***styles:*** Custom CSS files.  
***tests:*** All unit tests.  
***utils:*** These are custom made utility functions that perform various tasks.  

*e2e tests are stored above the src folder and are contained in the cypress/e2e folder.*

## Issue Tracker:

No known issues in this version.

## Version History:

This is the first version of this app template. This will fill in as you
take the template and make an app out of it.

## Notes:

All code should is named for what it does, and the naming convention
used for all main code is camelCase. All database attributes use
snake_case as their naming convention to differentiate. All utility
functions should have comment descriptions, and inputs and outputs are
documented throughout the app.
