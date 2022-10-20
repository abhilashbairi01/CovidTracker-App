const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 4000
const {mogoUrl}= require('./keys')

require('./models/User');
const requireToken = require('./middleware/requireToken')
app.use(bodyParser.json());
app.use(require('./routes/auth'))


mongoose.connect(mogoUrl,{
    useNewUrlParser: true,
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo Db')
})
mongoose.connection.on('error',(err)=>{
    console.log(" couldn't connect to mongo Db",err)
})

app.get('/about',requireToken,(req, res)=>{
   res.send({email:req.user.email})
})


app.post('/', (req, res) => {
console.log(req.body)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})