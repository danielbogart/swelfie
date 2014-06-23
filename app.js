$(document).ready(function(){ 

	var myLatlng = new google.maps.LatLng(32.890399,-117.253224);
	var mapOptions = {
	  zoom: 11,
	  center: myLatlng
	}

	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	//GET function
	var getTaggedPics = function(tagname) {

		$.ajax({
			type: 'GET',
			tag: tagname,
			url: 'https://api.instagram.com/v1/tags/'+tagname+'/media/recent'
		})
		.done(function(data) {
			$('#column1').append(tag-name);
		});
	};

	var newMarker = function newMarker(lat, langy, breakName) {
		this.lat = lat;
		this.langy = langy;
		this.breakName = breakName;

		var makeMarker = new google.maps.Marker({
			position: new google.maps.LatLng(lat,langy),
			title: breakName
		});

		makeMarker.setMap(map);		

		infowindow2 = new google.maps.InfoWindow({
			content: breakName
		});

		infowindow2.open(map,makeMarker);

		google.maps.event.addListener(makeMarker, 'click', function() {
	  		$('#map-canvas').hide();
	  		$('#subTitle').hide();
	  		$('#results').show();
	  		getTaggedPics('oceanbeach');

		});

		//Tag endpoints: http://instagram.com/developer/endpoints/tags/

	}

 	var markers = [
 		newMarker(32.565044,-117.132996, 'Imperial Beach'),
 		newMarker(32.890399, -117.253224, 'Ocean Beach'),
 		newMarker(32.725631, -117.257387, 'Sunset Cliffs'),
 		newMarker(32.749529, -117.253145, 'Ocean Beach'),
 		newMarker(32.771254,-117.253317, 'Mission Beach'),
 		newMarker(32.796799,-117.257694, 'Pacific Beach'),
 		newMarker(32.831171,-117.281291, 'Windansea Beach'),
 		newMarker(32.867909,-117.253825, 'Scripp\'s Beach'),
 		newMarker(32.959094,-117.268177, 'Del Mar/15th Street'),
 		newMarker(33.016383,-117.282337, 'Cardiff Reef'),
 		newMarker(33.034499,-117.292712, 'Swami\'s'),
 		newMarker(33.064832,-117.305598, 'Beacon\'s Beach'),
 		newMarker(33.096332,-117.316809, 'Ponto Jetty'),
 		newMarker(33.147253,-117.3461, 'Tamarack'),
 		newMarker(33.193692,-117.384315, 'Oceanside Pier'),
 		newMarker(32.805077,-117.262253, 'Tourmaline')
 	];

	$('#back').click(function() {
		$('#results').hide();
		$('#map-canvas').show();
		$('#subTitle').show();
	});
})