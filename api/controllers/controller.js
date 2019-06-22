//jshint esversion:8
const axios = require('axios')


// Google API Key
const GOOGLEAPIKEY = 'AIzaSyARYSwyEt6vuwBLJ7X9H09l8N2yigdO3ME';

// Typeform API Key
const TYPEFORMAPIKEY = 'EH9BjBxhQZmsL47bTXypDRS8ZLEdcG1eaPhLJynVvygs';

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

// Typeform Client
const typeform = require('@typeform/api-client').createClient({
    token: TYPEFORMAPIKEY,
})

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
// window.onload = function() {
//   var startPos;
//   var locationObject = {};
//   var geoSuccess = function(position) {
//     startPos = position;
//     locationObject.latitude = startPos.coords.latitude;
//     locationObject.longitude = startPos.coords.longitude;
//   };
//   navigator.geolocation.getCurrentPosition(geoSuccess);
//   return locationObject;
// };

function getTypeformData() {
    const formaz = typeform.forms.get({uid: 'FLdzER'});
    return formaz;
}

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

exports.testtwo = function (req, res) {
  // fetch('https://api.typeform.com/forms/FLdzER/responses', {
  //   headers: {
  //     Authorization: 'bearer EH9BjBxhQZmsL47bTXypDRS8ZLEdcG1eaPhLJynVvygs'
  //   }
  // })
  // .then(resp => {
  //   res.send(resp.json())
  // })
  // https.get('https://api.typeform.com/forms/FLdzER/responses', {
  //   headers: {
  //     Authorization: 'bearer EH9BjBxhQZmsL47bTXypDRS8ZLEdcG1eaPhLJynVvygs'
  //   }
  // }, (resp) => {
  //   res.send(resp.json())
  // })
  var data = {}  

  axios.get('https://api.typeform.com/forms/FLdzER/responses', {
    headers: {
          Authorization: 'bearer EH9BjBxhQZmsL47bTXypDRS8ZLEdcG1eaPhLJynVvygs'
        }
  })
  .then( function (response) {
    return response
  })
  .then((resp) => {
    //console.log(resp.data.items[0].answers[0].choice.label)
    data['cuisine'] = resp.data.items[0].answers[0].choice.label;
    data['priceFactor'] = resp.data.items[0].answers[1].number;
    data['address'] = resp.data.items[0].answers[2].text;
    data['distance'] = resp.data.items[0].answers[3].text
    console.log(data)
    res.send(data)
  }).catch(() => {
    res.send('caught something')
  })
  
}