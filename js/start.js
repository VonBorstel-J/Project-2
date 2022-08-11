
require('./initDB')(); // This will call the mongodb file connecting the project to mongo

require('../models/Registration');   //This will call to the schema needed to fill our database will the user information from the sign up / login buttons
const app = require('./app');               

const server = app.listen(3000, () => {  
    console.log(`Express is running on port ${server.address().port}`);                 // This will set the server to https://localhost:3000 
}); 

const morgan = require('morgan');
app.use(morgan('tiny'));