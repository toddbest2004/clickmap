angular.module('ClickMapCtrls', [])
.directive('cmClickmap', function($timeout){
	var clickMapCtrl = ['$scope', '$http', '$location', '$routeParams', '$timeout', '$window', function($scope, $http, $location, $routeParams, $timeout, $window) {
		$scope.iconSize = 12
		$scope.colors=["black", "blue", "red", "yellow"]
		$scope.icons=[]
		$scope.image="blank"
		$scope.width=640
		$scope.height=430
		$scope.iconSelectSize=20
		$scope.currentColor=0
		$scope.editing=false
		$scope.editElement=null
		$scope.svgClick=function(e){
			if(!$scope.editable){
				return
			}
			$scope.editElement={isnew:true,x:e.offsetX-$scope.iconSize/2,y:e.offsetY-$scope.iconSize/2,color:$scope.colors[$scope.currentColor]}
			$scope.editing=true
			editTop=e.clientY-$scope.iconSize/2+$window.scrollY
			editLeft=e.clientX+$scope.iconSize+$window.scrollX
			$scope.editPanelStyle={top:editTop+"px",left:editLeft+"px"}
			$timeout(function(){
				//timeout allows for the elements to render before giving focus.
				document.getElementById("elementTitle").focus()
			})
		}
		$scope.iconClick=function(e, index){
			//TODO: currently this just slaps a new icon on top of the old.
			//We need to either update the old icon or delete it.
			e.stopPropagation()
			if($scope.editable){
				console.log($scope.icons[index])
				$scope.editing=true
				$scope.editElement=$scope.icons[index]
				editTop=e.clientY-$scope.iconSize/2+$window.scrollY
				editLeft=e.clientX+$scope.iconSize+$window.scrollX
				$scope.editPanelStyle={top:editTop+"px",left:editLeft+"px"}
				$timeout(function(){
					//timeout allows for the elements to render before giving focus.
					document.getElementById("elementTitle").select()
				})
			}else{
				//follow link if link
			}
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
			if(!$scope.editElement.title){
				$scope.editElement.title=''
			}
			$scope.icons.push($scope.editElement)
			$scope.editing=false
			$scope.editElement=null
		}
		$scope.cancel=function(){
			$scope.editing=false
			$scope.editElement=null
		}
		$scope.keypress=function(keyEvent){
			if(keyEvent.keyCode==13){
				$scope.save()
			}else if(keyEvent.keyCode===27){
				$scope.cancel()
			}
		}
		$scope.saveMap=function(){
			$scope.image="/images/tanaan.png"
		}
		$scope.loadMap=function(){

		}
		$scope.loadImage=function(){
			
		}
	}]

	return {
		scope: {
			editable: "@",
			img: "@",
			mapId: "@",
			width: "@",
			height: "@"
		},
		controller: clickMapCtrl,
		restrict: 'E',
		templateUrl: 'app/templates/clickmap.html',
		link: function($scope, element, attrs){
			//onload events here:
			//get saved map from server if mapId is defined
			//get background image from server if img is defined(and not a saved map)
			//get iconSet if defined
			$timeout(function(){
				if($scope.mapId){
					$scope.loadMap()
					return
				}
				if($scope.img){
					$scope.loadImage()
				}
			})
		}
	}
})