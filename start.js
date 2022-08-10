
require('./initDB')();

require('./models/Registration');
const app = require('./app'); 

const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
}); 

const morgan = require('morgan');
app.use(morgan('tiny'));