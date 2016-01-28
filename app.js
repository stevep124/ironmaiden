var express = require('express');
var request = require('request');
var app = express();

//Iron Maiden Artist ID
var artistID = '6mdiAmATAx73kdxrNrnlao';

//Spotify Web API credentials
var clientID = '33f2a5d1a27d48abb81abd86e4297d94';
var clientSecret = 'c0b0be16ca2a4ac8bc2bd1c9ded058df';

app.use(express.static('public'));

//define the route
app.use('/ironmaiden', function(req, res, next ){

	var options = {
	  url: 'https://accounts.spotify.com/api/token',
	  headers: {
	    'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64'))
	  },
	  form: {
	    grant_type: 'client_credentials'
	  },
	  json: true
	};
	
	request.post(options, function(error, response, body) {
	
		var access_token = body.access_token;

		if ( access_token )
		{
		 
			var accessOptions = {
		      url: 'https://api.spotify.com/v1/artists/'+ artistID +'/albums?album_type=album',
		      headers: {
		        'Authorization': 'Bearer ' + access_token
		      },
		      json: true
		    };

		    request.get(accessOptions, function(error, response, body) {
		      
		      	var albums = [];
		      	var names = [];

		      	for (var i = 0; i < body.items.length; i++) {
		      		var album = body.items[i];
		      		var name = album.name.toLowerCase().replace(/\W+/g, '').replace(/\s+$/g, '');
		      		var exists = names.indexOf( name );

		      		if (exists < 0)
					{
						names.push( name );
		      			albums.push( album );
					}
		      	}
		      	      	
		      	res.json( albums );
		    });

		} else {
			var errorMsg = {
				message : 'Access Token not accessible',
				error : error
			}
			res.json( errorMsg );
		}

    })

})

//listen on port for any requests
app.listen(3000, function () {
  console.log('The Iron Maiden App is ready to rock \\m/');
});