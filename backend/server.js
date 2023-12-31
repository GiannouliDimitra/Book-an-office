const express = require ("express");
const connection = require ("./connection");
const cors = require ("cors");

const userRouters = require("./routers/userRouter");
const officeRoutes = require("./routers/officeRouter");
const reservationRouters =require("./routers/reservationRouter");
const paymentRouters = require("./routers/paymentRouter");


const app = express();
const port = 8000;

//middleware 
app.use(express.json());
app.use(cors());

// Use the routers
app.use ("/", officeRoutes);
app.use("/", userRouters);
app.use("/", reservationRouters);
app.use("/", paymentRouters);



app.listen (port, () => {
    console.log (`The server is working in port ${port}`)
});