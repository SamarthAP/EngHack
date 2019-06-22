//jshint esversion:8
const axios = require('axios');
const https = require('https');
const request = require('request');

// Google API Key
const GOOGLEAPIKEY = 'AIzaSyARYSwyEt6vuwBLJ7X9H09l8N2yigdO3ME';

// Typeform API Key
const TYPEFORMAPIKEY = 'EH9BjBxhQZmsL47bTXypDRS8ZLEdcG1eaPhLJynVvygs';

// Load Standard Library API
const lib = require('lib');
const sms = lib.utils.sms['@1.0.11'];

// async function to send a text message given a number and message
const sendSingleText = async function(number, address) {
  var mapsLink = 'https://maps.google.com/?q=' + address;
  let result = await sms({
  to: number, // (required)
  body: "Here is the link to get directions to the restaurant you've chosen to go to: " + mapsLink
  });
};

exports.sendText = function (req, res) {
  var restaurantAddress = req.body.restaurantAddress;
  for (var number in req.body) {
    var phoneNumber = req.body[number].phoneNumber;
    sendSingleText(phoneNumber, restaurantAddress);
  }
};

const SEARCHTYPES = ["bar", "restaurant", "food"]; // filtering results to maintain result accuracy

// Load Google Maps API
const googleMaps = require('@google/maps').createClient({
    key: GOOGLEAPIKEY,
});

// Typeform Client
const typeform = require('@typeform/api-client').createClient({
    token: TYPEFORMAPIKEY,
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

function getTypeformData() {
    const form = typeform.forms.get({uid: 'FLdzER'});
    return form;
}

// Calling google's API
exports.test = function(req, res) {
    // res.send('Hello');
    var searchResults = []; // blank array to hold sorted search results
    // var typeformData = getTypeformData();
    // console.log(typeformData);
    // var cuisine = typeformData.cuisine;
    // var priceFactor = typeformData.priceFactor;
    // var address = typeformData.address;
    // var radiusKM = typeformData.distance;
    getTypeformData().then((resp) => {
        let cuisine = resp.data.items[0].answers[0].choice.label;
        let priceFactor = resp.data.items[0].answers[1].number;
        let address = resp.data.items[0].answers[2].text;
        let radiusKM = resp.data.items[0].answers[3].text;

      googleMaps.places({
          query: 'Italian restaurants in Mississauga',//cuisine + 'restaurants near' + address,
          radius: Number(radiusKM) * 1000,
          minprice: 0,
          maxprice: Number(priceFactor) - 1
      }, function (err, response) {
          if (!err) {
              var searchResult = response.json.results;
              // console.log(JSON.stringify(searchResult));
              for (var result in searchResult) {
                if (arrayContains(SEARCHTYPES, response.json.results.types)) {
                  var placeObject = {};
                  // getPhoto();
                  placeObject.name = searchResult[result].name;
                  placeObject.placeId = searchResult[result].place_id;
                  placeObject.address = searchResult[result].formatted_address;
                  placeObject.rating = searchResult[result].rating;
                  placeObject.priceFactor = searchResult[result].price_level;
                  placeObject.cuisine = cuisine;
                  placeObject.photoRef = searchResult[result].photos[0].photo_reference;

                  searchResults.push(placeObject);
                }
              }
              res.send(sortByRating(searchResults));
              // console.log(searchResults);
          } else {
              res.send(err);
          }
      });
    });
};

async function getTypeformData() {
  var data = {};
  let json = await axios.get('https://api.typeform.com/forms/FLdzER/responses', {
    headers: {
          Authorization: 'bearer EH9BjBxhQZmsL47bTXypDRS8ZLEdcG1eaPhLJynVvygs'
        }
  });
  return json;
}
