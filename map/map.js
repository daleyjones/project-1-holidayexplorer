// Initialize the map.
let map;
let geocoder;
let infowindow;

// Check if map data exists in local storage and load it
function loadMapFromLocalStorage() {
  const mapData = localStorage.getItem('mapData');
  if (mapData) {
    const parsedMapData = JSON.parse(mapData);
    // Set map center and zoom level from local storage
    map.setCenter(parsedMapData.center);
    map.setZoom(parsedMapData.zoom);
  }
}

// Save map data to local storage
function saveMapToLocalStorage() {
  const mapData = {
    center: map.getCenter(),
    zoom: map.getZoom()
  };
  localStorage.setItem('mapData', JSON.stringify(mapData));
}

// Attach event listener to the search button
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
  var searchText = document.getElementById("searchText").value;
  console.log(searchText);
  lookupLocation(searchText);
});



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: {
      lat: 40.72,
      lng: -73.96,
    },
  });

  // ...Existing code for creating markers

  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();

  // Load map data from local storage
  loadMapFromLocalStorage();

  // Attach event listener to map's idle event to save map data
  map.addListener('idle', saveMapToLocalStorage);
}

// Function to save data to local storage
function save() {
  var searchText = document.getElementById("searchText").value;
  localStorage.setItem("searchText", searchText);
}

// ChatGPT API

function Chatgpt() {
  var chatSearch = document.getElementById('chatSearch');
  var reply = chatSearch.value;

  // ...Existing code for the ChatGPT API

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      'model': 'gpt-3.5-turbo',
      'messages': [{'role': 'system', 'content': 'You are a user'}, {'role': 'user', 'content': reply}]
    })
  })
  .then(response => response.json())
  .then(data => {
    var chatMessages = document.getElementById('information');
    var previousMessages = localStorage.getItem('chatMessages') || '';
    previousMessages += '<b>You:</b> ' + reply + '<br>';
    previousMessages += '<b>Holiday Help:</b> ' + data.choices[0].message.content + '<br>';
    localStorage.setItem('chatMessages', previousMessages);

    chatMessages.innerHTML = previousMessages;
  })
  .catch(err => console.error('Error:', err));

  chatSearch.value = '';
}

// Load chat messages from local storage when the page loads
window.addEventListener('DOMContentLoaded', function() {
  var chatMessages = document.getElementById('information');
  var previousMessages = localStorage.getItem('chatMessages');
  if (previousMessages) {
    chatMessages.innerHTML = previousMessages;
  }

});
// Attach event listener to the save button
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", save);