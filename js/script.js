var map;
var service;

// Creates a marker on the already generated map using a places object location - lat, long
function createMarker(place) {
  new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
}

// Loops over the places results(array of place objects) and passes the place objects to createMarker
function generateMapMarkers(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

// Makes a request to the Places API for hiking trails within a 5000 meter radius of the center of our generated map
function getHikingTrails() {
  var request = {
    location: map.getCenter(),
    radius: '5000',
    query: 'hiking trails'
  };

  service.textSearch(request, generateMapMarkers);
}

// Gets the user's location from their browser - Their browser must have geolocation enabled for this to work
function getLocation(callback) {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(function (data) {
      callback(data.coords.latitude, data.coords.longitude);
    })
  }
}

// This function is called once the Google maps script is loaded in the html.
// This calls getLocation to retrieve the user's lat and long and then generates a map object with that data
// It then creates a places request object with the generated map then moves on the get hiking trails nearby
function initMap() {
  // Set the location (City or Latitude/Longitude)
  getLocation(function (lat, long) {
    var location = { lat: lat, lng: long };

    // Create a new Map instance
    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 12
    });

    // Create a new PlacesService instance
    service = new google.maps.places.PlacesService(map);

    getHikingTrails();
  });
}

