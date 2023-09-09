var APPID = "57f8796c6c35539aa7eb7722a140f201";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function updateByZip(zip) {

  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + zip +
    "&APPID=" + APPID;
  sendRequest(url)
}

function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
          var data = JSON.parse(xmlhttp.responseText);
          var weather = {};
          weather.icon = data.weather[0].id;
          weather.humidity = data.main.humidity;
          weather.wind = data.wind.speed;
          weather.direction = degreesToDirection(data.wind.deg);
          weather.loc = data.name;
          weather.temp = K2F(data.main.temp);
          update(weather);
        }

    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    }

    function degreesToDirection(degrees) {
      var range = 360/16;
      var low = 360 - range/2;
      var high = (low + range) % 360;
      var angles = [ "N", "NNE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
      for (i in angles) {

        if( degrees >= low && degrees < high )
          return angles[i];

        low = (low + range) % 360;
        high = (high + range) % 360;

      }

      return "N";

    }

function K2F (k) {

  return Math.round (k * (9/5)-459.67);
}


function update(weather) {
    humidity.innerHTML = weather.humidity;
    wind.innerHtml = weather.wind;
    direction.innerHTML = weather.direction;
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    icon.src = "imgs/codes/" + weather.icon + ".png";
}

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

updateByZip("11234");


}
