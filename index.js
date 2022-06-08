const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const app = express();
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));
app.use(cors())
const bcrypt = require('bcrypt');
// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/', (req, res) => {
    res.send('Hello World');
});


const authentificationroute = require('./src/Routes/authentificationroute');
app.use('/authentification', authentificationroute);
// import dossier routes
const usedossier = require('./src/Routes/route.dossier');
app.use('/dossier', usedossier);
// import user routes
const userRoutes = require('./src/Routes/user.route');
app.use('/api', userRoutes);
// create Client routes
const clientRoutes = require('./src/Routes/route.client');
app.use('/client', clientRoutes);
// ccreate Admin routes
const admindossier = require('./src/Routes/route.admin');
app.use('/admin', admindossier);
//create Ticket routes
const TicketRoutes =require('./src/Routes/route.ticket');
app.use('/ticket',TicketRoutes); 
// listen to the port
app.listen(port, () => {
    console.log(`Express is running at port ${port}`);
});