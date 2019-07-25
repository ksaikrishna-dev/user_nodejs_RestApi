var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
  //initial();
});

require('./app/route/user.route.js')(app);

//START For file uploading...
var router = express.Router();
  var upload = require('./app/config/multer.config.js');
      global.__basedir = __dirname;

  app.use(express.static('resources'));	
require('./app/route/file.route.js')(app, router, upload);
//END

// Create a Server
var server = app.listen(2244, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})




function initial(){

  let users = [
    {
      id: 1,
      firstname: "Joe",
      lastname: "Thomas",
      age: 36
    },
    {
      id: 2,
      firstname: "Peter",
      lastname: "Smith",
      age: 18
    },
    {
      id: 3,
      firstname: "Lauren",
      lastname: "Taylor",
      age: 31
    },
    {
      id: 4,
      firstname: "Mary",
      lastname: "Taylor",
      age: 24
    },
    {
      id: 5,
      firstname: "David",
      lastname: "Moore",
      age: 25
    },
    {
      id: 6,
      firstname: "Holly",
      lastname: "Davies",
      age: 27
    },
    {
      id: 7,
      firstname: "Michael",
      lastname: "Brown",
      age: 45
    }
  ]

  // Init data -> save to MySQL
  const User = db.users;
  for (let i = 0; i < users.length; i++) { 
    User.create(users[i]);  
  }
}