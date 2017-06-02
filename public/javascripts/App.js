Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
  var geocoder;
  var map;
  var address = _ad;
  var lnk = "https://maps.google.com/maps?z=12&t=m&q="+_ad;
  function initialize() {
    document.getElementById('navigate').href=lnk;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 12,
      center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

            var infowindow = new google.maps.InfoWindow(
                { content: '<b>'+address+'</b>',
                  size: new google.maps.Size(150,50)
                });

            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map, 
                title:address
            }); 
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });

          } else {
            console.log("No results found");
            // alert("No results found");
          }
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
          // alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  }

new WOW().init();
document.body.onload = initialize;
$(document).ready(function () {
  $('.parallax').scroll(function() {
      var ofs = Math.abs($("#parallax-layer").offset().top).map(0,400,100,0);
      $('.full-bg-img').css({
        "background" : "rgba("+ofs+","+ofs+","+ofs+",0.6)"
      })
  });
  $('.parallax').fire('scroll');
})