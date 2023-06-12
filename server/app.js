const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json()); 
app.use(cors());

const userRoutes = require('./routes/userRoutes')

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.use('/user', userRoutes); 


module.exports = app; 