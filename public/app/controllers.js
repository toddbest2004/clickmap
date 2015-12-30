angular.module('ClickMapCtrls', [])
.controller('ClickMapCtrl', ['$scope', '$http', '$location', '$routeParams', '$timeout', function($scope, $http, $location, $routeParams, $timeout) {
	$scope.iconSize = 12
	$scope.colors=["black", "blue", "red", "yellow"]
	$scope.icons=[]
	$scope.currentColor=0
	$scope.editing=false
	$scope.newElement=null
	$scope.editTop=0
	$scope.editLeft=0
	$scope.svgClick=function(e){
		$scope.newElement={x:e.offsetX-$scope.iconSize/2,y:e.offsetY-$scope.iconSize/2,color:$scope.colors[$scope.currentColor]}
		$scope.editing=true
		$scope.editTop=e.offsetY-$scope.iconSize/2
		$scope.editLeft=e.offsetX+$scope.iconSize
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
	$scope.mouseIn=function(index){
		$scope.hover=$scope.icons[index]
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
}])