angular.module('ClickMapCtrls', [])
.controller('ClickMapCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
	$scope.colors=["black", "blue", "red", "yellow"]
	$scope.icons=[]
	$scope.currentColor=0
	$scope.svgClick=function(e){
		$scope.icons.push({x:e.offsetX-4,y:e.offsetY-4,color:$scope.colors[$scope.currentColor]})
		console.log($scope.icons)
	}
	$scope.iconClick=function(e){
		e.stopPropagation()
	}
	$scope.chooseColor=function(index){
		$scope.currentColor=index
	}
}])