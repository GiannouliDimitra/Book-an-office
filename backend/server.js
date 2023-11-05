const express = require ("express");
const connection = require ("./connection");
const cors = require ("cors");
/* const user_routers = require("./routers/user_routers");*/
const officeRoutes = require("./routers/officeRouter"); 


const app = express();
const port = 8000;

//middleware 
app.use(express.json());
app.use(cors());

// Use the routers
app.use ("/", officeRoutes);
/* app.use("/", user_routers); */



app.listen (port, () => {
    console.log (`The server is working in port ${port}`)
});