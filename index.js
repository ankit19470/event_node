const express = require('express')
const app = express()
const port = 1000
const config=require("./config/db")
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:'50mb'}))
app.use(express.static(__dirname+"/public"))

const cors=require("cors")
app.use(cors())

const routes=require("./routes/apiRoutes")
app.use("/api",routes)

const seeder=require('./config/seeder')
seeder.admin()

app.get('/', (req, res) => {
    res.send("welcome to new project")
})
app.get('/name',(req,res)=>{
    res.send("my name is ankit sharma")
})
app.get('/home',(req,res)=>{
    res.send({
        status:200,
        success:true,
        msg:"default name"
    })
})


app.listen(port, (error) => {
    if (error) {
        console.log('error occured', error);
    } else {
        console.log('server is running at ' + port);
    }
})