$(document).ready(function(){ 

	var myLatlng = new google.maps.LatLng(32.890399,-117.253224);
	var mapOptions = {
	  zoom: 10,
	  center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  	var ob = new google.maps.Marker({
	    position: myLatlng,
	    title:"Ocean Beach"
	});

	ob.setMap(map);

	var infowindow = new google.maps.InfoWindow({
    	content: "Ocean Beach"
	});
  		infowindow.open(map,ob);

  	google.maps.event.addListener(ob, 'click', function() {
  		//function for clicking ob
  		$('#map-canvas').hide();
  		$('#subTitle').hide();
  		$('#results').show();
	});

	$('#back').click(function() {
		$('#results').hide();
		$('#map-canvas').show();
		$('#subTitle').show();
	});
})