'use strict'

$(document).ready(init);

var apiUrl = 'http://api.wunderground.com/api/2a9c2964632db9eb/';

function init() {
  getLocation();
  $('#getWeather').click(getWeather);
}

function getLocation() {
  $.ajax(apiUrl + "geolookup/q/autoip.json", {
    success: function(data) {
      var defaultZipCode = data.location.zip;
      $('#location').val(defaultZipCode);
    }
  }) 
}

function getWeather () {
  var location = $('#location').val();
  var url = apiUrl + 'conditions/q/' + location + '.json';
  

  $.get(url)
  .done(function(data){
    var currentTemp = (data.current_observation.temp_f) + ' ' ;
    var currentImage = data.current_observation.icon_url;
    var currentWind = data.current_observation.wind_string;
    var currentTime = data.current_observation.local_time_rfc822;
    var currentCity = data.current_observation.display_location.full;
    $('#currentTemp').empty();
    $('#currentWind').empty();
    $('#currentTime').empty();
    $('#city').text(currentCity);
    $('#currentTemp').append('Your current temperature is: ')
    $('#currentTemp').append(currentTemp);
    $('#currentTemp').append('<img src="' + currentImage + '" alt="Current Weather condition image">');
    $('#currentWind').append('Wind is currently: ')
    $('#currentWind').append(currentWind);
    $('#currentTime').append('Your current local time is: ')
    $('#currentTime').append(currentTime);
  })
  .fail(function(error){
    console.error(error);
  });
}