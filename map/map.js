// Initialize the map.
let map;
let geocoder;
let infowindow;


var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
var searchText = document.getElementById("searchText").value;

    console.log(searchText);
    lookupLocation(searchText);
});

function getPlaceData() {
    var input = getElementById("mapsearch");
    t.input.textcontent.addEventListener("onclick");
    prompt(lookupLocation);
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat: 40.72,
            lng: -73.96,
        },
    });


    const iconBase =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons = {
        parking: {
            icon: iconBase + "parking_lot_maps.png",
        },
        library: {
            icon: iconBase + "library_maps.png",
        },
        info: {
            icon: iconBase + "info-i_maps.png",
        },
    };
    const features = [
        {
            position: new google.maps.LatLng(-33.91721, 151.2263),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91539, 151.2282),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91747, 151.22912),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.9191, 151.22907),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91725, 151.23011),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91872, 151.23089),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91784, 151.23094),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91682, 151.23149),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.9179, 151.23463),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91666, 151.23468),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.916988, 151.23364),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
            type: "library",
        },
    ];

    // Create markers.
    for (let i = 0; i < features.length; i++) {
        const marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            map: map,
        });
    }

    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
}

function lookupLocation(location) {
    var requestOptions = {
        method: "GET",
        mode: "no-cors",
    };
    fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=establishment&location=37.76999%2C-122.44696&radius=500&key=${mapsAPIKey}`
    )
        .then((response) => response.json())
        .then((result) => getPlaceId(result));
}

function getPlaceId(result) {
    console.log(result);
    var placeId = result.predictions[0].place_id;
    geocodePlaceId(placeId);
}

function geocodePlaceId(placeId) {
    geocoder
        .geocode({
            placeId: placeId,
        })
        .then(({ results }) => {
            if (results[0]) {
                map.setZoom(11);
                map.setCenter(results[0].geometry.location);
                const marker = new google.maps.Marker({
                    map,
                    position: results[0].geometry.location,
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert("No results found");
            }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
}
window.initMap = initMap;

// Chatgpt API

  function Chatgpt() {
    var chatSearch = document.getElementById('chatSearch');
    var reply = chatSearch.value;

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cgptapiKey}`
      },
            
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'system', 'content': 'You are a user'}, {'role': 'user', 'content': reply}]
      })
    })
    .then(response => response.json())
    .then(data => {
      var chatMessages = document.getElementById('information');
      chatMessages.innerHTML += '<b>You:</b> ' + reply + '<br>';
      chatMessages.innerHTML += '<b>Holiday Help</b> ' + data.choices[0].message.content + '<br>';
    })
    .catch(err => console.error('Error:', err));

    chatSearch.value = '';
  }