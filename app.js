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
			dataType: "jsonp",
			url: 'https://api.instagram.com/v1/tags/'+tagname+'/media/recent?access_token=32643075.f59def8.734afc94b4aa47cfbabb289dc47ec304'
		})
		.done(function(getTaggedPics) {
			console.log(getTaggedPics);

			for (x=0; x <=3; x++) {
				var img = document.createElement("img");
				var metaData = document.createElement("div");
				metaData.className = "imgMetaData";

				var date = new Date(getTaggedPics.data[x].created_time*1000);	
				var formatted = "Posted on: " +date.toString();

				img.src = getTaggedPics.data[x].images.low_resolution.url;
				metaData.innerHTML = formatted;

				$('#column2').append(img);
				$('#column2').append(metaData);
			};

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
	  		var shortened = breakName.replace(/\'/ig, '').replace(/\s/ig, '');
	  		getTaggedPics(shortened);

		});
	}

 	var markers = [
 		newMarker(32.565044,-117.132996, 'Imperial Beach'),
 		newMarker(32.890399, -117.253224, 'Black\'s Beach'),
 		newMarker(32.725631, -117.257387, 'Sunset Cliffs'),
 		newMarker(32.749529, -117.253145, 'Ocean Beach'),
 		newMarker(32.771254,-117.253317, 'Mission Beach'),
 		newMarker(32.796799,-117.257694, 'Pacific Beach'),
 		newMarker(32.831171,-117.281291, 'Windansea Beach'),
 		newMarker(32.867909,-117.253825, 'Scripp\'s Beach'),
 		newMarker(32.959094,-117.268177, 'Del Mar Beach'),
 		newMarker(33.016383,-117.282337, 'Cardiff Reef'),
 		newMarker(33.034499,-117.292712, 'Swami\'s'),
 		newMarker(33.064832,-117.305598, 'Beacon\'s Beach'),
 		newMarker(33.096332,-117.316809, 'Ponto Jetty'),
 		newMarker(33.147253,-117.3461, 'Tamarack Beach'),
 		newMarker(33.193692,-117.384315, 'Oceanside Pier'),
 		newMarker(32.805077,-117.262253, 'Tourmaline Beach')
 	];

	$('#back').click(function() {
		location.reload();
	});
})