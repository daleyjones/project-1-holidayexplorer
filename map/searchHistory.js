// Retrieve the search history from local storage
function getSearchHistory() {
  var searchHistory = localStorage.getItem('searchHistory');
  if (searchHistory) {
    return JSON.parse(searchHistory);
  }
  return [];
}

// Save search history to local storage
function saveSearchHistory(searchText) {
  var searchHistory = getSearchHistory();
  searchHistory.push(searchText);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Display the search history
function displaySearchHistory() {
  var searchHistory = getSearchHistory();
  var searchList = document.getElementById('searchList');
  searchList.innerHTML = ''; 
  
  
  searchList.style.listStyleType = 'none';
  searchHistory.forEach(function (searchText) {
    var searchItem = document.createElement('li');
    searchItem.textContent = searchText;
    searchItem.addEventListener('click', function () {
      lookUpLocation(searchText);
    });
    searchList.appendChild(searchItem);
  });
}

// Attach event listener to the search button
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function () {
  var searchText = document.getElementById('searchText').value;
  console.log(searchText);
  lookUpLocation(searchText);
  saveSearchHistory(searchText);
  displaySearchHistory(); // Update the search history display
});

// Load search history from local storage when the page loads
window.addEventListener('DOMContentLoaded', function () {
  displaySearchHistory();
});

// Search history clear button function
document.getElementById('clearButton').addEventListener('click', clearSearchHistory);

function clearSearchHistory() {
  localStorage.removeItem('searchHistory');
  var searchList = document.getElementById('searchList');
  searchList.textContent = '';
}

// Look up location and display it on a map
function lookUpLocation(searchText) {
  // Use Google Maps API to perform the location lookup and display it on a map
  // Replace 'YOUR_API_KEY' with your actual Google Maps API key
  var apiKey = 'AIzaSyCX3KEzkPeC4acKtd6s-dkDqTYmwr1ruuE';
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: searchText }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      var location = results[0].geometry.location;
      var mapOptions = {
        center: location,
        zoom: 12
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: searchText
      });
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}
