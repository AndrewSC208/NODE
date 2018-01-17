1. Using Require: This allows us to import modules from npm or local files, this will be changing with ES6 syntax.
    a. when a file is required it automatically runs the module.
    b. nodemon, lodash -> great 3rd party libs

2. Input from a user: 
    a. cmd line args:  'node app.js list'
        -> 'list' is the cmd line arg.
    b. can access these vars on the process.argv['position of cmd'] module.
    c. A good module to simplify parsing of cmd line args is yargs.

