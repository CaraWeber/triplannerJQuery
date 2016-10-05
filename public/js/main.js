// var Hotel = require('../../models/hotel');

function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  // var iconURLs = {
  //   hotel: '/images/lodging_0star.png',
  //   restaurant: '/images/restaurant.png',
  //   activity: '/images/star-3.png'
  // };

  // function drawMarker (type, coords) {
  //   var latLng = new google.maps.LatLng(coords[0], coords[1]);
  //   var iconURL = iconURLs[type];
  //   var marker = new google.maps.Marker({
  //     icon: iconURL,
  //     position: latLng
  //   });
//  marker.setMap(currentMap);
  // }

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);

return currentMap;

};




 var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (map, type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng,
      map: map
    });
      marker.setMap(map);
    return marker
}

$(document).ready(function(){
  var map = initializeMap();



$('.remove').on('click', function() {
  var clear = $(this).prev();
  clear.html("");


if (this.className.includes("removeRestaurant")) {

  var parent = $(this).parent();
  parent.addClass("hidden");
  restCount-=1;
  if (this.id === 'restMarker1') {
      restMarker1.setMap(null);
  }
  else if (this.id === 'restMarker2') {
      restMarker2.setMap(null);
  }
  else if (this.id === 'restMarker3') {
      restMarker3.setMap(null);
  }
}
if(this.id === "removeHotel"){
  var parent = $(this).parent();
  parent.addClass("hidden");
  hotelMarker.setMap(null);
  hotelSele = false;
}
})

var hotelMarker;
var hotelSele = false;
$('#chooseHotel').on('click', function(){
  var hotel = $('#hotel-choices').val();
   
  if(hotelSele) {
    return alert('You have alreaden choosen a hotel.  Please remove hotel selection before choosing a new hotel.');
  }
  hotelSele = true;
  var loc = $('#hotel-choices option:selected').data('loc');
  loc = loc.split(',').map(function(element){
    return Number(element);
  }); 
    $('#hotelSelection').html(hotel);
    $('#hotelSelection').parent().removeClass("hidden");
    hotelMarker = drawMarker(map,'hotel', loc);
   });
  

var restCount = 0;
var restMarker1;
var restMarker2;
var restMarker3;

$('#chooseRestaurant').on('click', function(){
  
  var loc = $('#restaurant-choices option:selected').data('loc');
  loc = loc.split(',').map(function(element){
    return Number(element);
  }); 
if (restCount===0){ 

 console.log(loc);
 restCount++;
  var restaurant = $('#restaurant-choices').val();
  $('#restaurantSelection').html(restaurant);
  var parent = $('#restaurantSelection').parent();
  parent.removeClass("hidden");
  restMarker1 = drawMarker(map,'restaurant', loc);

}
  else if(restCount ===1 ){
 console.log(loc);
  restCount++;
  var restaurant = $('#restaurant-choices').val();
  $('#restaurant2').html(restaurant);
  var parent = $('#restaurant2').parent();
  parent.removeClass("hidden");
  restMarker2 = drawMarker(map,'restaurant', loc);
  }
  else if(restCount === 2 ){

 
    restCount++;
  var restaurant = $('#restaurant-choices').val();
  $('#restaurant3').html(restaurant);
  var parent = $('#restaurant3').parent();
  parent.removeClass("hidden");
  restMarker3 = drawMarker(map,'restaurant', loc);

    }
else {
  alert('You have already choosen three restaurants for this day');
}
});
var num = 0;
var actArr = [];
var markArr = [];

$('#chooseActivity').on('click', function(){
  num++;
  var activity = $('#activity-choices').val();
  $('#actlist').append('<div class = "itinerary-item"><span data-loc="{{activity.place.location}}" class = "title" id="'+num+'">'+activity+'</span><button class="btn btn-xs btn-danger remove btn-circle" id = "bbb">x</button></div>');
  var loc = $('#activity-choices option:selected').data('loc');
  loc = loc.split(',').map(function(element){
    return Number(element);
  }); 
  var aMarker = drawMarker(map,'activity', loc);
  actArr.push(activity);
  markArr.push(aMarker);

});


$('#actDiv').on('click', '#bbb', function(){
  $(this).parent().remove();
  var act = $(this).prev().text();
  console.log("act", act);
  console.log("actArr ", actArr);
  var idx = actArr.indexOf(act);
  console.log("index", idx);
  console.log("value at markAmarkArr[idx]", markArr[idx]);
  console.log("marker array ", markArr);
  markArr[idx].setMap(null);
  

})
 


}); 









