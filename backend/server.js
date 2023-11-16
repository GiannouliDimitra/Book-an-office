const express = require ("express");
const connection = require ("./connection");
const cors = require ("cors");
const userRouters = require("./routers/userRouter");
const officeRoutes = require("./routers/officeRouter"); 


const app = express();
const port = 8000;

//middleware 
app.use(express.json());
app.use(cors());

// Use the routers
app.use ("/", officeRoutes);
app.use("/", userRouters);



app.listen (port, () => {
    console.log (`The server is working in port ${port}`)
});