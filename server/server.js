// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = 5000;

// Let's tackle cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials: true,
}
app.use(cors(corsOptions));


app.use(express.json()); //MIDDLEWARE -------------
// It allows passing the data...

// We are telling Server that we are using the Router
//The structure is fixed...
app.use("/api/auth", authRoute); 

// We are telling Server that we are using the contactRouter
app.use("/api/form", contactRoute); 

app.use("/api/data", serviceRoute); 

// Let's define admin route
app.use("/api/admin/", adminRoute); 

// before connection establishment catch the error
app.use(errorMiddleware);

// first establish connection between server and Database...
connectDb().then(() => {
     // now, Let's check Server is running or not...
app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
});
})
