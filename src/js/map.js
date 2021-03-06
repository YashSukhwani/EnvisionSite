document.addEventListener("DOMContentLoaded", () => {
  let s = document.createElement("script");
  document.head.appendChild(s);
  s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPKEY}&callback=initMap`;
});

let error_res = document.getElementById("demo");

var india = {
  lat: 22.0,
  lng: 77.0
};
var pune = {
  lat: 18.509499,
  lng: 73.880115
}
var delhi = {
  lat: 28.572067,
  lng: 77.233389
}
var chandigarh = {
  lat: 30.722864,
  lng: 76.770346
}
var bangalore = {
  lat: 12.975502,
  lng: 77.616245
}
var mumbai = {
  lat: 18.997282,
  lng: 72.824878
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    error_res.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var current = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  var india = {
    lat: 22.0,
    lng: 77.0
  };
  // changed to current after testing
  findRoute(current);
}

// Initialize and add the map
function initMap() {
  // The location of India

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  var image = {
    url: '../assets/icons/Marker3.svg',
    size: new google.maps.Size(71, 71),
    scaledSize: new google.maps.Size(21, 36),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20, 36)
  };

  // The map, centered at India
  let map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4,
      center: india,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  // The marker, positioned at India
  const mumbai_mark = new google.maps.Marker({
    position: mumbai,
    map: map,
    icon: image
  });
  const delhi_mark = new google.maps.Marker({
    position: delhi,
    map: map,
    icon: image
  });
  const bangalore_mark = new google.maps.Marker({
    position: bangalore,
    map: map,
    icon: image
  });
  const chandigarh_mark = new google.maps.Marker({
    position: chandigarh,
    map: map,
    icon: image
  });
  const pune_mark = new google.maps.Marker({
    position: pune,
    map: map,
    icon: image
  });

  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById('right-panel'));

}

let routeHandler = () => {
  getLocation();
};
var form = document.getElementById('mode-submit');
form.addEventListener('click', routeHandler);

function findRoute(current) {

  var modes = document.getElementsByName('mode');
  var chosen_mode;
  for (let i = 0; i < modes.length; i++) {
    if (modes[i].checked)
      chosen_mode = modes[i].value;
  }

  var city = document.getElementById('destination').value;
  var dest;

  if (city == 'Mumbai')
    dest = mumbai;
  else if (city == 'Delhi')
    dest = delhi;
  else if (city == 'Bangalore')
    dest = bangalore;
  else if (city == 'Pune')
    dest = pune;
  else if (city == 'Chandigarh')
    dest = chandigarh;

  console.log(dest);

  let request = {
    origin: current,
    destination: dest,
    travelMode: chosen_mode
  };

  console.log(request);

  directionsService.route(request,
    (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);

        document.getElementById('directions').innerHTML = "Directions to " + city + " Office";

      } else {
        // window.alert('Directions request failed due to ' + status);
        var route = chosen_mode.toLowerCase();
        window.alert(
          `There are no ${route} routes to our ${city} office from your current location.\n
          Contact us for more information.`
        );
      }
    });
}