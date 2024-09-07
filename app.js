const express = require('express')
const app = express()
const usersRouter = require('./routes/usersRouters')
app.set('view engine', "ejs")
app.use(express.urlencoded({ extended: true }))
app.use('/', usersRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})