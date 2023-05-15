function initMap() {
    
    var mapCenter = { lat: 37.7749, lng: -122.4194 }; 

    var map = new google.maps.Map(document.getElementById('map'), {
      center: mapCenter,
      zoom: 12
    });
  
    
    var marker = new google.maps.Marker({
      position: mapCenter,
      map: map,
      title: 'Marker Title'
    });
  }
  