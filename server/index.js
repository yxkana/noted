// index.js
import express from "express"

const app = express()
app.get('/api',(req,res)=>{
    res.send(`<h5 style="color:green">
        Hey Geek! you just deployed serverless express api</h5>`)
})
app.listen(8080,()=>{
    console.log('Server started at http://localhost:8080')
})
module.exports=app