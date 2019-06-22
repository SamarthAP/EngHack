const googleMaps = require('@google/maps').createClient({
    key: 'AIzaSyARYSwyEt6vuwBLJ7X9H09l8N2yigdO3ME',
});

exports.test = function(req, res) {
    googleMaps.places({
        query: 'restaurants in Sydney',
    }, function (err, response) {
        if (!err) {
            
            res.send(response)
        } else {
            res.send(err)
        }
    })
}

// exports.teest = function(req, res) {
//     googleMaps.findPlace({
//         input: 'restaurants in Sydney',
//         inputtype: 'textquery',
//         fields: ['formatted_address']
//     }, function (err, response) {
//         if (!err) {
//             //console.log(JSON.stringify(response));
            
//             res.send(response)
//         } else {
//             res.send(err)
//         }
//     })
// }