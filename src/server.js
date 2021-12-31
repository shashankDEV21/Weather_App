const express=require('express')
const app=express()
const hbs=require('hbs')
const path=require('path')
const port=process.env.PORT || 4444

const pubstatic=path.join(__dirname,'../public')
app.use(express.static(pubstatic));
const viewpath=path.join(__dirname,'../template/view')
app.set('view engine','hbs')
app.set('views',viewpath)
const partialpath=path.join(__dirname,'../template/partials')
hbs.registerPartials(partialpath)
const weatherdata=require('../utils/WeatherData')

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App'
    })
})

app.get('/weather',(req,res)=>{
    const address=req.query.address
   
    if(!address){
       return res.send({
           error:'You must enter a valid address'
       })
    }

    weatherdata(address,(error,{temper,desc,cityName}={})=>{
        //console.log("inside app") //abhi hum callback func ke implementation ke ander hai ye baad me chlega pehle weatherdata.js ka conole.log chlega
        if(error){
          
            return res.send({
                error
            })
        }
        console.log(temper,desc,cityName)
        res.send({
            temper,
            desc,
            cityName
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Page Not Found'
    })
})

app.listen(port,()=>{
    console.log("Server is running at http://localhost:4444")
})