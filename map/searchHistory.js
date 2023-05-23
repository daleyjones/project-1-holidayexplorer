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
    searchList.innerHTML = ''; // Clear the list first
    searchHistory.forEach(function (searchText) {
      var searchItem = document.createElement('li');
      searchItem.textContent = searchText;
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

  // search history clear button function
document.getElementById('clearButton').addEventListener('click', clearSearchHistory);

function clearSearchHistory() {
    localStorage.removeItem('searchHistory');
    var searchList = document.getElementById('searchList');
    searchList.textContent = '';
}
  