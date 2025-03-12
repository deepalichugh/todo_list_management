require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')

//express app
const app = express()

/** middleware: This parses the incoming JSON payloads from the HTTP request bodies
 * and makes them accessible in req.body. So when the client sends a request with a JSON body,
 * express.json() automatically parses the JSOn and converts it into a JS object */
app.use(express.json())

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/', taskRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('hello');
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db. listening on port 4000!!')
        })
    })
    .catch((err) => console.log(err))
