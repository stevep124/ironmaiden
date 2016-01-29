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

.directive('album', function()
{
	return {
		restrict: 'E',
		replace : true,
		template : '<div class="album"><img ng-src="{{ image.url }}"><div class="overlay"><p class="album-title">{{ name }}</p></div></div>',
		scope : {
			images : '=',
			name : '='
		},
		link : function( $scope, $element, $attrs )
		{
			$scope.image = {};

			angular.forEach( $scope.images, function( item )
			{
				if ( item.height === 300 )
				{
					$scope.image = item;
				}
			})
		}
	}
})