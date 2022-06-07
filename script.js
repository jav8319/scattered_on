var search=document.querySelector("#searchinput")
var formS=document.querySelector("#formSearch")
var List=document.querySelector("#listHist")
var date0=document.querySelector("#cityDate")
var weatherIcon0=document.querySelector("#cityIcon")
var cityname=document.querySelector("#cityn")
var cityTemp=document.querySelector("#cityT")
var cityhumidity=document.querySelector("#cityH")





var hist=[];

function render() {

    
    List.innerHTML="";

    for (var i=0; i<hist.length;i++) {
        var cityText = hist[i];
    
        var li=document.createElement("li");
        li.setAttribute("class","list-group-item");



        var button=document.createElement('button');
        button.textContent=cityText;
        button.setAttribute("class","container-fluid mx-0 px-0");
      


        li.appendChild(button);
        List.appendChild(li)


    }
    
}

function init() {

    var storedHist=JSON.parse(localStorage.getItem("cityhist"))
    
    
    if(storedHist!==null){
        hist=storedHist;
    }
   

    render();
}

function storeHist0(){

    

    localStorage.setItem("cityhist",JSON.stringify(hist));
    
}

formS.addEventListener("submit", function (event) {
    event.preventDefault();

    var inputText=search.value

    if(inputText===" "){
        return;
    }

    if((JSON.stringify(hist)).includes(inputText)){
        return;
    }
    
    if ((JSON.stringify(hist)).length<9) {
        hist.push(inputText);
    } else {
        hist.splice(0, 0, inputText);
    }
    
        
    
    
    storeHist0();
    render();
})

init();



var country0="";
var lon0="";
var lat0="";




function getApi(event) {
    event.preventDefault();
   


  
  var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+search.value+"&limit=5&appid=f9ec59044da63b2faaf8cef0a819eae9";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
       
        for (var i = 0; i <data.length; i++) {
            
            country0=country0.concat((i+"."+data[i].country+"_"+data[i].state+"     "))
        
         
        }
        
              
        var choice=window.prompt("please enter an option(number)    "+country0)
        
       
   
        if(data[choice]){
            lon0=data[choice].lon
            lat0=data[choice].lat
            weather();
        }else{
            window.alert("incorret")
            return
        }

        
        


        

      
    });
    



    return;

}

formS.addEventListener('submit', getApi);




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
        var date000=new Date()
        var monthday=date000.getMonth()
        var todayday = date000.getDate();
        var yeartoday=date000.getUTCFullYear()



        

        date0.textContent=monthday+"/"+todayday+"/"+yeartoday;
        weatherIcon0.setAttribute("src", "http://openweathermap.org/img/wn/"+icon0+"@2x.png")
        
        cityname.textContent=name0
        cityTemp.textContent="Temp: "+temp0+" F"
        cityhumidity.textContent="Humidity: "+humidity0+" %"



        

       forecast5();

                  
    }) 
    
    
    
   
    
}

function forecast5() {

    var reurl3="api.openweathermap.org/data/2.5/forecast/daily?lat="+lat0+"&lon="+lon0+"&cnt=5&units=imperial&appid=f9ec59044da63b2faaf8cef0a819eae9"

    fetch(reurl3)
    .then(function (response1) {
      return response1.json();
    })
    .then(function (data1){
        
        console.log(data1)
            
 


        

       
        
        
                  
    }) 

    country0=[];

}



