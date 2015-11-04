'use strict'

$(document).ready(init);

var apiUrl = 'http://api.wunderground.com/api/2a9c2964632db9eb/';

function init() {
  $.ajax("http://api.wunderground.com/api/2a9c2964632db9eb/geolookup/q/autoip.json", {
    success: function(data) {
      var defaultZipCode = data.location.zip;
      $('#location').val(defaultZipCode);
    }
  }) 
   $('#getWeather').click(getWeather);
}




function getWeather (){
  var location = $('#location').val();
  var url = apiUrl + 'conditions/q/' + location + '.json';
  
  
  // var $currentConditions = $('<div>').addClass('currentConditions').append('<h3>').text('Your Weather Right Now');


  $.get(url)
  .done(function(data){
    var currentTemp = data.current_observation.temperature_string;
    var currentImage = data.current_observation.icon_url;
    console.log(data);
    $('#currentConditions').empty();
    $('#currentConditions').append('<img src="' + currentImage + '" alt="Current Weather condition image">');
    $('#currentConditions').append(currentTemp);
  })
  .fail(function(error){
    console.error(error);
  });



}