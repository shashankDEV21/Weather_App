const request=require('request')
const constants=require('../config')
const weatherdata=(address,callback)=>{
  // console.log('insideweatherdata')
const url=constants.openWeatherMap.Base_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY
console.log(url)
request({url,json:true},(err,{body})=>{
   //console.log('heheh')
if(err){
callback("Can't Fetch the data from weather app",undefined)
}
else if(!body.main || !body.main.temp || !body.name || !body.weather) {
   callback("Unable to find required data, try another location", undefined);
}
else{
   callback(undefined,{
       temper:body.main.temp,
        desc:body.weather[0].description,
        cityName:body.name
   })
}
})
}
module.exports=weatherdata