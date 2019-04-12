require("dotenv").config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const mongoose = require("mongoose")
mongoose.set("useFindAndModify", false)

mongoose.connect(`mongodb://localhost/idgaf`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const tagRoutes = require('./routes/tag')

app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/tags', tagRoutes)

app.listen(port, () => {
    console.log("listening on port" + port)
})
