angular.module('ClickMapCtrls', [])
.controller('ClickMapCtrl', ['$scope', '$http', '$location', '$routeParams', '$timeout', '$window', function($scope, $http, $location, $routeParams, $timeout, $window) {
	$scope.iconSize = 12
	$scope.colors=["black", "blue", "red", "yellow"]
	$scope.icons=[]
	$scope.currentColor=0
	$scope.editing=false
	$scope.newElement=null
	$scope.svgClick=function(e){
		console.log(e)
		$scope.newElement={x:e.offsetX-$scope.iconSize/2,y:e.offsetY-$scope.iconSize/2,color:$scope.colors[$scope.currentColor]}
		$scope.editing=true
		editTop=e.clientY-$scope.iconSize/2+$window.scrollY
		editLeft=e.clientX+$scope.iconSize+$window.scrollX
		$scope.editPanelStyle={top:editTop+"px",left:editLeft+"px"}
		$timeout(function(){
			//timeout allows for the elements to render before giving focus.
			document.getElementById("elementTitle").focus()
		})
	}
	$scope.iconClick=function(e){
		e.stopPropagation()
		//follow link if link
	}
	$scope.chooseIcon=function(index){
		$scope.currentColor=index
	}
	$scope.mouseIn=function(index, e){
		var elementRect = e.target.getBoundingClientRect()
		var top = elementRect.top
		var left = elementRect.right+$scope.iconSize*.5 //Sets the left of the hover tooltip to just past the rightmost part of the icon
		$scope.hover=$scope.icons[index]
		$scope.hoverPosition={top:top+"px",left:left+"px"}
		// console.log(e.target.getBoundingClientRect())
	}
	$scope.mouseOut=function(index){
		$scope.hover=null
	}
	$scope.save=function(){
		if(!$scope.newElement.title){
			$scope.newElement.title=''
		}
		$scope.icons.push($scope.newElement)
		$scope.editing=false
		$scope.newElement=null
	}
	$scope.cancel=function(){
		$scope.editing=false
		$scope.newElement=null
	}
	$scope.keypress=function(keyEvent){
		if(keyEvent.keyCode==13){
			$scope.save()
		}else if(keyEvent.keyCode===27){
			$scope.cancel()
		}
	}
}]).directive('cmClickmap', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/templates/clickmap.html'
	}
})