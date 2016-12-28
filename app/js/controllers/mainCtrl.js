'use strict';

angular.module('myApp.mainCtrl', ['ngRoute'])
.controller('mainCtrl', ['$scope', 'GooglePlus', 'NgMap',function($scope, GooglePlus, NgMap) {
	//AIzaSyBlXQSyb5uMlTfDbpbnpgPnnfTL2bIXE0s
	var vm = this;
	console.log(vm);
	NgMap.getMap().then(function(map) {
	  vm.showCustomMarker= function(evt) {
		map.customMarkers.foo.setVisible(true);
		map.customMarkers.foo.setPosition(this.getPosition());
	  };
	  vm.closeCustomMarker= function(evt) {
		this.style.display = 'none';
	  };
	});
	
	$scope.login = function () {
		alert();
        GooglePlus.login().then(function (authResult) {
            console.log(authResult);

            GooglePlus.getUser().then(function (user) {
                console.log(user);
            });
        }, function (err) {
            console.log(err);
        });
    };

}]);