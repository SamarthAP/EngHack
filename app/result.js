function setBackground(cuisineImage) {
    var backgroundStyle = document.createElement("style");
    backgroundStyle.innerHTML = `
    #container {
        background-image:
            linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
            ),
            url('./images/${cuisineImage}')
    }
    `
    document.getElementById('container').appendChild(backgroundStyle)
}


function setInfo(name, address, rating, priceFactor, photoRef) {
    document.getElementById('name').textContent = name;
    document.getElementById('address').textContent = address;
    document.getElementById('rating').textContent = 'Rating: ' + rating + '/5'

    var dollars = 'Price level: '
    for (i = 0; i < priceFactor; i++) {
        dollars += '$';
    }
    document.getElementById('priceFactor').textContent = dollars

}

//setInfo('WAGWAN', "@#!@ !@#!#", "3", "3")

var restList;
var index = 0;

fetch('http://localhost:1111/api/test')
.then(data => {return data.json()})
.then(res => {
    restList = res;
    console.log(restList)
    if (restList.length > 0){
        setInfo(restList[0].name, restList[0].address, restList[0].rating, restList[0].priceFactor, restList[0].photoRef)
        console.log(restList[0].cuisine)
        setBackground(restList[0].cuisine + '.png')
    }
})

function nextRest() {
    if (index < restList.length-1) {
        index++;
        setInfo(restList[index].name, restList[index].address, restList[index].rating, restList[index].priceFactor, restList[index].photoRef)
    }
}

function previousRest() {
    if (index > 0) {
        index--;
        setInfo(restList[index].name, restList[index].address, restList[index].rating, restList[index].priceFactor, restList[index].photoRef)
    }
}

function sendText() {
    numbers = document.getElementById('phoneNumbers').value.split('\n');
    console.log(numbers);
    fetch('http://localhost:1111/api/text', {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            phoneNumbers: numbers,
            restaurantAddress: restList[index].address
        })
    }).then(res => {
        console.log("Done!")
    })
    
}


