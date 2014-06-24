$(document).ready(function(){ 

	var myLatlng = new google.maps.LatLng(32.890399,-117.253224);
	var mapOptions = {
	  zoom: 11,
	  center: myLatlng
	}

	//initialize google maps, centered on myLatLng
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	//retrieve and display photos by hashtag
	var getTaggedPics = function(tagname) {

		$.ajax({
			type: 'GET',
			tag: tagname,
			dataType: "jsonp",
			url: 'https://api.instagram.com/v1/tags/'+tagname+'/media/recent?access_token=32643075.f59def8.734afc94b4aa47cfbabb289dc47ec304'
		})
		.done(function(getTaggedPics) {

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

	//retrieve and display photos by geolocation tag, within 1000m
	var getLocationPics = function(lat, langy) {
		$.ajax({
			type: 'GET',
			distance: 1000,
			lat: lat,
			lng: langy,
			dataType: "jsonp",
			url: 'https://api.instagram.com/v1/media/search?lat='+lat+'&lng='+langy+'&access_token=32643075.f59def8.734afc94b4aa47cfbabb289dc47ec304'
		})
		.done(function(getLocationPics) {

			for (x=0; x <=3; x++) {
				var img = document.createElement("img");
				var metaData = document.createElement("div");
				metaData.className = "imgMetaData";

				var date = new Date(getLocationPics.data[x].created_time*1000);	
				var formatted = "Posted on: " +date.toString();

				img.src = getLocationPics.data[x].images.low_resolution.url;
				metaData.innerHTML = formatted;

				$('#column1').append(img);
				$('#column1').append(metaData);
			};

		});
	};

	//Retrieve and display photos of pro surfers
	var getProPics = function(userid) {
		$.ajax({
			type: 'GET',
			distance: 1000,
			count: 20,
			dataType: "jsonp",
			url: 'https://api.instagram.com/v1/users/'+userid+'/media/recent/?access_token=32643075.f59def8.734afc94b4aa47cfbabb289dc47ec304'
		})
		.done(function(getProPics) {

				var img = document.createElement("img");
				var metaData = document.createElement("div");
				metaData.className = "imgMetaData";

				var date = new Date(getProPics.data[x].created_time*1000);	
				var formatted = "Posted on: " +date.toString();

				img.src = getProPics.data[Math.floor((Math.random() * 20) + 0)].images.low_resolution.url;
				metaData.innerHTML = formatted;

				$('#column3').append(img);
				$('#column3').append(metaData);
		});
	};

	//function to add new markers
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
			document.getElementById('title').className= "";
	  		$('#results').show();
	  		var shortened = breakName.replace(/\'/ig, '').replace(/\s/ig, '');

	  		//set column headers
 			$('#column1Title').html('Geotagged at '+breakName+' and surrounding area');
 			$('#column2Title').html('Tagged with #'+shortened);

	  		getTaggedPics(shortened);
	  		getLocationPics(lat, langy);
	  		getProPics(14549197);
	  		getProPics(8139971);
	  		getProPics(5995367);
	  		getProPics(6704228);

		});
	}

	//currently active map markers
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

 	//back button reloads map - currently reloads entire page, could use JS instead
	$('#back').click(function() {
		location.reload();
	});

	//load more button loads four more rows of pictures
	$('#loadMore').click(function() {
			var shortened = breakName.replace(/\'/ig, '').replace(/\s/ig, '');
			getTaggedPics(shortened);
	  		getLocationPics(lat, langy);
	  		//Surfreps
	  		getProPics(442848562);
	  		//Jordy Smith
	  		getProPics(6156937);
	  		//Holly Coffey
	  		getProPics(14272077);
	  		//Jamie O'Brien
	  		getProPics(14406863);
	});
})