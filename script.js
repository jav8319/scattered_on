var search=document.querySelector("#searchinput")
var formS=document.querySelector("#formSearch")
var List=document.querySelector("#listHist")
var date0=document.querySelector("#cityDate")
var weatherIcon0=document.querySelector("#cityIcon")
var cityname=document.querySelector("#cityn")
var cityTemp=document.querySelector("#cityT")
var cityhumidity=document.querySelector("#cityH")
var fday0=document.querySelector("#day0")
var fday1=document.querySelector("#day1")
var fday2=document.querySelector("#day2")
var fday3=document.querySelector("#day3")
var fday4=document.querySelector("#day4")
var fday0t=document.querySelector("#day0t")
var fday1t=document.querySelector("#day1t")
var fday2t=document.querySelector("#day2t")
var fday3t=document.querySelector("#day3t")
var fday4t=document.querySelector("#day4t")
var fday0wi=document.querySelector("#day0wi")
var fday1wi=document.querySelector("#day1wi")
var fday2wi=document.querySelector("#day2wi")
var fday3wi=document.querySelector("#day3wi")
var fday4wi=document.querySelector("#day4wi")
var fday0h=document.querySelector("#day0h")
var fday1h=document.querySelector("#day1h")
var fday2h=document.querySelector("#day2h")
var fday3h=document.querySelector("#day3h")
var fday4h=document.querySelector("#day4h")
var fday0w=document.querySelector("#day0w")
var fday1w=document.querySelector("#day1w")
var fday2w=document.querySelector("#day2w")
var fday3w=document.querySelector("#day3w")
var fday4w=document.querySelector("#day4w")

var hist=[];
var histlon=[];
var histlat=[];

function render() {

    
    List.innerHTML="";

    for (var i=0; i<4;i++) {
        var cityText = hist[i];
        var hlon=histlon[i]
        var hlat=histlat[i]
    
        var li=document.createElement("li");
        li.setAttribute("class","list-group-item");

        var button=document.createElement('button');
        button.textContent=cityText;
        button.setAttribute("data-lat",hlat);
        button.setAttribute("data-lon",hlon);
        button.setAttribute("class","container-fluid mx-0 px-0");
        button.setAttribute("id","but"+i);
      
        li.appendChild(button);
        List.appendChild(li)
    }
}

function init() {


    var storedHist=JSON.parse(localStorage.getItem("cityhist"))
    var storehlat=JSON.parse(localStorage.getItem("cityhlat"))
    var storehlon=JSON.parse(localStorage.getItem("cityhlon"))
    
    
    if(storedHist!==null){
        hist=storedHist;

    }

    if(storehlat!==null){
        histlat=storehlat;
    }
   
    if(storehlon!==null){
        histlon=storehlon;
    }
   

    render();
    renderweather()
}



function renderweather(){

    var element0=document.getElementById("but0")


    lon0 = element0.getAttribute("data-lon");
    lat0= element0.getAttribute("data-lat");

    console.log(lon0)
    console.log(lat0)

    weather2()
    forecast52()
}

function storeHist0(){

    localStorage.setItem("cityhlat",JSON.stringify(histlat));

    localStorage.setItem("cityhlon",JSON.stringify(histlon));

    localStorage.setItem("cityhist",JSON.stringify(hist));
    
}

formS.addEventListener("submit", function (event) {
    event.preventDefault();

    var inputText=search.value
 

    if(inputText===" "){
        return;
    }

    getApi();
    
})

init();


List.addEventListener("click", function(event) {
    var element = event.target;
  
    
    if (element.matches("button") === true) {
     
      lon0 = element.getAttribute("data-lon");
     lat0= element.getAttribute("data-lat");
     
      weather1()
      forecast51()
  
    }
});

var country0="";
var lon0="";
var lat0="";

function getApi() {
   
  var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+search.value+"&limit=5&appid=f9ec59044da63b2faaf8cef0a819eae9";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
       
        for (var i = 0; i <data.length; i++) {
            
            country0=country0.concat((i+"."+data[i].country+"_"+data[i].state+"     "))
                 
        }
            
        var inputText0=search.value

              
        var choice=window.prompt("please enter an option(number)    "+country0)
        
   
        if(data[choice]){
            lon0=data[choice].lon
            lat0=data[choice].lat
            
            histlat.splice(0,0,lat0)
            histlon.splice(0,0,lon0)
            hist.splice(0, 0, inputText0);
            weather();
        }else{
            country0=[];
            window.alert("incorret")
            return
        }

             
    });
    
    return;

}

function weather() {

    var reurl2="https://api.openweathermap.org/data/2.5/weather?lat="+lat0+"&lon="+lon0+"&units=imperial&appid=f9ec59044da63b2faaf8cef0a819eae9"

    fetch(reurl2)
    .then(function (response0) {
      return response0.json();
    })
    .then(function (data0){
                  
        var humidity0=data0.main.humidity
        var temp0=data0.main.temp
        var name0=data0.name
        var icon0=data0.weather[0].icon
        var date00= new Date();
     

        date0.textContent=(new Intl.DateTimeFormat('en-US').format(date00));
        weatherIcon0.setAttribute("src", "http://openweathermap.org/img/wn/"+icon0+"@2x.png")
        
        cityname.textContent=name0
        cityTemp.textContent="Temp: "+temp0+" F"
        cityhumidity.textContent="Humidity: "+humidity0+" %"


       forecast5();

                  
    })   
    
}

function forecast5() {

    var reurl3="https://api.openweathermap.org/data/2.5/forecast?lat="+lat0+"&lon="+lon0+"&cnt=40&units=imperial&appid=f9ec59044da63b2faaf8cef0a819eae9"

    fetch(reurl3)
    .then(function (response1) {
      return response1.json();
    })
    .then(function (data1){
        
        var day0=data1.list[3].dt_txt
        var day0t=data1.list[3].main.temp
        var day0h=data1.list[3].main.humidity
        var day0w=data1.list[3].wind.speed
        var day0wi=data1.list[3].weather[0].icon

        
        fday0.textContent=day0
        
        fday0t.textContent="Temp: "+day0t+" F"
        fday0wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day0wi+"@2x.png")
        fday0h.textContent="Humidity: "+day0h+" %"
        fday0w.textContent="Wind speed: "+day0w+"mph"

        var day1=data1.list[10].dt_txt
        var day1t=data1.list[10].main.temp
        var day1h=data1.list[10].main.humidity
        var day1w=data1.list[10].wind.speed
        var day1wi=data1.list[10].weather[0].icon

        
        fday1.textContent=day1
        fday1t.textContent="Temp: "+day1t+" F"
        fday1wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day1wi+"@2x.png")
        fday1h.textContent="Humidity: "+day1h+" %"
        fday1w.textContent="Wind speed: "+day1w+"mph"

        var day2=data1.list[18].dt_txt
        var day2t=data1.list[18].main.temp
        var day2h=data1.list[18].main.humidity
        var day2w=data1.list[18].wind.speed
        var day2wi=data1.list[18].weather[0].icon

        
        fday2.textContent=day2
        fday2t.textContent="Temp: "+day2t+" F"
        fday2wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day2wi+"@2x.png")
        fday2h.textContent="Humidity: "+day2h+" %"
        fday2w.textContent="Wind speed: "+day2w+"mph"

        var day3=data1.list[26].dt_txt
        var day3t=data1.list[26].main.temp
        var day3h=data1.list[26].main.humidity
        var day3w=data1.list[26].wind.speed
        var day3wi=data1.list[26].weather[0].icon

        
        fday3.textContent=day3
        fday3t.textContent="Temp: "+day3t+" F"
        fday3wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day3wi+"@2x.png")
        fday3h.textContent="Humidity: "+day3h+" %"
        fday3w.textContent="Wind speed: "+day3w+"mph"


        var day4=data1.list[34].dt_txt
        var day4t=data1.list[34].main.temp
        var day4h=data1.list[34].main.humidity
        var day4w=data1.list[34].wind.speed
        var day4wi=data1.list[34].weather[0].icon

        
        fday4.textContent=day4
        fday4t.textContent="Temp: "+day4t+" F"
        fday4wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day4wi+"@2x.png")
        fday4h.textContent="Humidity: "+day4h+" %"
        fday4w.textContent="Wind speed: "+day4w+"mph"



        country0=[];

        
        storeHist0();
        render();
                
    }) 

}

function forecast51() {


    console.log(lon0)
    console.log(lat0)
    var reurl3="https://api.openweathermap.org/data/2.5/forecast?lat="+lat0+"&lon="+lon0+"&cnt=40&units=imperial&appid=f9ec59044da63b2faaf8cef0a819eae9"

  

    fetch(reurl3)
    .then(function (response1) {
      return response1.json();
    })
    .then(function (data1){
        
        var day0=data1.list[3].dt_txt
        var day0t=data1.list[3].main.temp
        var day0h=data1.list[3].main.humidity
        var day0w=data1.list[3].wind.speed
        var day0wi=data1.list[3].weather[0].icon

        
        fday0.textContent=day0
        
        fday0t.textContent="Temp: "+day0t+" F"
        fday0wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day0wi+"@2x.png")
        fday0h.textContent="Humidity: "+day0h+" %"
        fday0w.textContent="Wind speed: "+day0w+"mph"

        var day1=data1.list[10].dt_txt
        var day1t=data1.list[10].main.temp
        var day1h=data1.list[10].main.humidity
        var day1w=data1.list[10].wind.speed
        var day1wi=data1.list[10].weather[0].icon

        
        fday1.textContent=day1
        fday1t.textContent="Temp: "+day1t+" F"
        fday1wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day1wi+"@2x.png")
        fday1h.textContent="Humidity: "+day1h+" %"
        fday1w.textContent="Wind speed: "+day1w+"mph"

        var day2=data1.list[18].dt_txt
        var day2t=data1.list[18].main.temp
        var day2h=data1.list[18].main.humidity
        var day2w=data1.list[18].wind.speed
        var day2wi=data1.list[18].weather[0].icon

        
        fday2.textContent=day2
        fday2t.textContent="Temp: "+day2t+" F"
        fday2wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day2wi+"@2x.png")
        fday2h.textContent="Humidity: "+day2h+" %"
        fday2w.textContent="Wind speed: "+day2w+"mph"

        var day3=data1.list[26].dt_txt
        var day3t=data1.list[26].main.temp
        var day3h=data1.list[26].main.humidity
        var day3w=data1.list[26].wind.speed
        var day3wi=data1.list[26].weather[0].icon

        
        fday3.textContent=day3
        fday3t.textContent="Temp: "+day3t+" F"
        fday3wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day3wi+"@2x.png")
        fday3h.textContent="Humidity: "+day3h+" %"
        fday3w.textContent="Wind speed: "+day3w+"mph"


        var day4=data1.list[34].dt_txt
        var day4t=data1.list[34].main.temp
        var day4h=data1.list[34].main.humidity
        var day4w=data1.list[34].wind.speed
        var day4wi=data1.list[34].weather[0].icon

        
        fday4.textContent=day4
        fday4t.textContent="Temp: "+day4t+" F"
        fday4wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day4wi+"@2x.png")
        fday4h.textContent="Humidity: "+day4h+" %"
        fday4w.textContent="Wind speed: "+day4w+"mph"
                
    }) 

}

function weather1() {

    console.log(lon0)
    console.log(lat0)
    

    var reurl2="https://api.openweathermap.org/data/2.5/weather?lat="+lat0+"&lon="+lon0+"&units=imperial&appid=f9ec59044da63b2faaf8cef0a819eae9"


    fetch(reurl2)
    .then(function (response0) {
      return response0.json();
    })
    .then(function (data0){
        
            
        var humidity0=data0.main.humidity
        var temp0=data0.main.temp
        var name0=data0.name
        var icon0=data0.weather[0].icon
        var date00= new Date();
       

        date0.textContent=(new Intl.DateTimeFormat('en-US').format(date00));
        weatherIcon0.setAttribute("src", "http://openweathermap.org/img/wn/"+icon0+"@2x.png")
        
        cityname.textContent=name0
        cityTemp.textContent="Temp: "+temp0+" F"
        cityhumidity.textContent="Humidity: "+humidity0+" %"

                 
    }) 
     
}

function forecast52() {



    if ((lat0!==null) && (lon0!==null)) {
        var reurl3="https://api.openweathermap.org/data/2.5/forecast?lat="+lat0+"&lon="+lon0+"&cnt=40&units=imperial&appid=f9ec59044da63b2faaf8cef0a819eae9"
    } else {
        var reurl3="https://api.openweathermap.org/data/2.5/forecast?lat=43.6534817&lon=-79.3839347&cnt=40&units=imperial&appid=f9ec59044da63b2faaf8cef0a819eae9"
    }
    

  

    fetch(reurl3)
    .then(function (response1) {
      return response1.json();
    })
    .then(function (data1){
        
        var day0=data1.list[3].dt_txt
        var day0t=data1.list[3].main.temp
        var day0h=data1.list[3].main.humidity
        var day0w=data1.list[3].wind.speed
        var day0wi=data1.list[3].weather[0].icon

        
        fday0.textContent=day0
        
        fday0t.textContent="Temp: "+day0t+" F"
        fday0wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day0wi+"@2x.png")
        fday0h.textContent="Humidity: "+day0h+" %"
        fday0w.textContent="Wind speed: "+day0w+"mph"

        var day1=data1.list[10].dt_txt
        var day1t=data1.list[10].main.temp
        var day1h=data1.list[10].main.humidity
        var day1w=data1.list[10].wind.speed
        var day1wi=data1.list[10].weather[0].icon

        
        fday1.textContent=day1
        fday1t.textContent="Temp: "+day1t+" F"
        fday1wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day1wi+"@2x.png")
        fday1h.textContent="Humidity: "+day1h+" %"
        fday1w.textContent="Wind speed: "+day1w+"mph"

        var day2=data1.list[18].dt_txt
        var day2t=data1.list[18].main.temp
        var day2h=data1.list[18].main.humidity
        var day2w=data1.list[18].wind.speed
        var day2wi=data1.list[18].weather[0].icon

        
        fday2.textContent=day2
        fday2t.textContent="Temp: "+day2t+" F"
        fday2wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day2wi+"@2x.png")
        fday2h.textContent="Humidity: "+day2h+" %"
        fday2w.textContent="Wind speed: "+day2w+"mph"

        var day3=data1.list[26].dt_txt
        var day3t=data1.list[26].main.temp
        var day3h=data1.list[26].main.humidity
        var day3w=data1.list[26].wind.speed
        var day3wi=data1.list[26].weather[0].icon

        
        fday3.textContent=day3
        fday3t.textContent="Temp: "+day3t+" F"
        fday3wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day3wi+"@2x.png")
        fday3h.textContent="Humidity: "+day3h+" %"
        fday3w.textContent="Wind speed: "+day3w+"mph"


        var day4=data1.list[34].dt_txt
        var day4t=data1.list[34].main.temp
        var day4h=data1.list[34].main.humidity
        var day4w=data1.list[34].wind.speed
        var day4wi=data1.list[34].weather[0].icon

        
        fday4.textContent=day4
        fday4t.textContent="Temp: "+day4t+" F"
        fday4wi.setAttribute("src", "http://openweathermap.org/img/wn/"+day4wi+"@2x.png")
        fday4h.textContent="Humidity: "+day4h+" %"
        fday4w.textContent="Wind speed: "+day4w+"mph"

               
    }) 
}

function weather2() {


    if ((lat0!==null) && (lon0!==null)) {
         var reurl2="https://api.openweathermap.org/data/2.5/weather?lat="+lat0+"&lon="+lon0+"&units=imperial&appid=f9ec59044da63b2faaf8cef0a819eae9"
    } else {
        var reurl2="https://api.openweathermap.org/data/2.5/weather?lat=43.6534817&lon=-79.3839347&units=imperial&appid=f9ec59044da63b2faaf8cef0a819eae9"
    }
   


    fetch(reurl2)
    .then(function (response0) {
      return response0.json();
    })
    .then(function (data0){
        
       
            
        var humidity0=data0.main.humidity
        var temp0=data0.main.temp
        var name0=data0.name
        var icon0=data0.weather[0].icon
        var date00= new Date();
        

        date0.textContent=(new Intl.DateTimeFormat('en-US').format(date00));
        weatherIcon0.setAttribute("src", "http://openweathermap.org/img/wn/"+icon0+"@2x.png")
        
        cityname.textContent=name0
        cityTemp.textContent="Temp: "+temp0+" F"
        cityhumidity.textContent="Humidity: "+humidity0+" %"

    }) 
    
}