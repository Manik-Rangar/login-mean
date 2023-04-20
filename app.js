const express = require("express")
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 3000
const responseMiddleware = require("./middlewares/response-middleware");


// database connection
const db = require("./db/db")


// middleware
const header_middleware = require("./middlewares/header")
app.use(header_middleware)
app.all('*', responseMiddleware);
// app.use(responseMiddleware)



// routes
const userRoutes = require("./Routes/user");
app.use("/api/user", userRoutes);
app.use(cors({origin: '*'}));
app.use(express.json())



app.get('/health', (req, res) => {
    res.send({'message':"healthy"})
  })


// Server listener 
app.listen(PORT, (req,res) => {
    console.log(`APP IS LISTNING TO PORT ${PORT}`)
})
