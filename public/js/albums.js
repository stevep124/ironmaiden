angular.module('IronMaiden',[])

.controller('AlbumCtrl',function($scope, $http) {

	$scope.albums = [];

	$http.get('/ironmaiden').then( function( response ){

		angular.forEach(response.data, function(item)
		{
			$scope.albums.push(item);
		})

	}, function( response ){
		console.error( repsonse );
	})


})