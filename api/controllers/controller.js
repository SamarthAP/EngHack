//jshint esversion:8

// Google API Key
const GOOGLEAPIKEY = 'AIzaSyARYSwyEt6vuwBLJ7X9H09l8N2yigdO3ME';

// Load Standard Library API
const lib = require('lib');
const sms = lib.utils.sms['@1.0.11'];

// async function to send a text message given a number and message
const sendText = async function(number, message) {
  let result = await sms({
  to: number, // (required)
  body: message // (required)
});
};

const SEARCHTYPES = ["bar", "restaurant", "food"]; // filtering results to maintain result accuracy
var addressHolder = "100 City Centre Dr, Mississauga, ON L5B 2C9";
var cuisineHolder = "Italian";
// var radiusHolder = 50000;

// Load Google Maps API
const googleMaps = require('@google/maps').createClient({
    key: GOOGLEAPIKEY,
});

// Helper function to sort results by rating
function sortByRating(searchResponses) {
  var result = searchResponses.sort(function(a,b) {
    return b.rating-a.rating;
  });

  return result;
}

// Helper function to check if one array contains an element in another array
function arrayContains(arr1, arr2) {
  return arr1.some(function(v) {
    return arr1.indexOf(v) >= 0;
  });
}


// helper function to get the user's location with their permission
window.onload = function() {
  var startPos;
  var locationObject = {};
  var geoSuccess = function(position) {
    startPos = position;
    locationObject.latitude = startPos.coords.latitude;
    locationObject.longitude = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
  return locationObject;
};

// Calling google's API
exports.test = function(req, res) {
    var searchResults = []; // blank array to hold sorted search results

    googleMaps.places({
        query: cuisineHolder + 'restaurants near' + addressHolder,
        // radius: radiusHolder
    }, function (err, response) {
        if (!err) {
            // res.send(response.json.results);
            var searchResult = response.json.results;
            for (var result in searchResult) {
              if (arrayContains(SEARCHTYPES, response.json.results.types)) {
                var placeObject = {};
                placeObject.name = searchResult[result].name;
                placeObject.placeId = searchResult[result].place_id;
                placeObject.address = searchResult[result].formatted_address;
                placeObject.rating = searchResult[result].rating;
                placeObject.priceFactor = searchResult[result].price_level;

                searchResults.push(placeObject);
              }
            }
        } else {
            res.send(err);
        }
        res.send(JSON.stringify(sortByRating(searchResults)));
    });
};
