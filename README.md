# NodeJSLabs

These are the labs done during backend node.js lessons followed in ECE Paris.

The number of each folder is respectively the labs number. 

# Requirements

Please ensure that you have npm and node installed on your computer:

Tap:
      `node --version`

If it is not installed, tap: 

`brew install node` (only for mac users)
      
# Necessary installations:

`git clone https://github.com/Lazovchik/NodeJSLabs`

Go to the labs folder

Run: `npm install` to install all the dependencies

# To launch:

Go to the labs folder

Run: 
      `./node_modules/.bin/nodemon index.js`
          OR
      `node index.js`

In any browser go to: http://localhost:8090

# To test

Add `/hello?name=smt` to the adress prompt in the browser

Try to guess what's my name and see some bonus output :)

Or just look for it in the code

# For the lab 2

# Requirements and installation are the same

# To run:

In both subfolders run:

`npm run start`

In any browser go to: http://localhost:8080

OR

to: http://localhost:1337


# Lab 2 ExpressJS subfolder:

# Lab 2 TypeScript subfolder:

If you want to "transiple" .js out of typrscript run:

`npm run build`

Than you can find a transpiled js code in dist/server.js

# Lab 3

Same Requirements

Same Installation instructions

# To test the DB management

Install Postman

`brew cask install postman`

In Postman: 

In the adress field enter :`localhost:8080/`

In HEADRES add: 

KEY : `Content-Type`

VALUE : `application/json` 

# GET requests

`localhost:8080/metrics` to get all the metrics from the database

`localhost:8080/metrics/metrics_ID/metrics_number` to get a concrete metric

# POST requests

To add some metrics into the database

`localhost:8080/metrics/metrics_ID`

in Body enter `[
  { "timestamp":"1384686660000", "value":"10" },
  { "timestamp":"1384686660001", "value":"12" },
  { "timestamp":"1384686660002", "value":"13" }
]`

To remove a certain metric from the database

`localhost:8080/metrics/metrics_ID`
