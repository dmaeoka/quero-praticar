///https://ngmap.github.io/#/!places-auto-complete.html

'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
	'ngRoute',
	'ngAnimate',
	'ngTouch',
	'ngMap',
	'googleplus',
	'ui.bootstrap',
	'myApp.view2',
	'myApp.homeCtrl',
	'myApp.mainCtrl',
	'myApp.headerCtrl',
	'myApp.perfilCtrl',
	'myApp.atividadeCtrl',
	'myApp.minhasAtividadesCtrl',
	'myApp.searchAtividadesCtrl',
	'myApp.version'
]).
config(['$locationProvider', '$routeProvider', '$httpProvider', 'GooglePlusProvider', function($locationProvider, $routeProvider, $httpProvider, GooglePlusProvider) {
	$locationProvider.hashPrefix('!');    
	$routeProvider.when('/home', {
		templateUrl: 'view/home.html',
		controller: 'homeCtrl'
	});
	$routeProvider.when('/view2', {
		templateUrl: 'view/view2.html',
		controller: 'View2Ctrl'
	});
	$routeProvider.when('/perfil', {
		templateUrl: 'view/perfil.html',
		controller: 'perfilCtrl'
	});
	$routeProvider.when('/minhas-atividades', {
		templateUrl: 'view/minhas-atividades.html',
		controller: 'minhasAtividadesCtrl'
	});
	$routeProvider.when('/atividade', {
		templateUrl: 'view/atividade.html',
		controller: 'atividadeCtrl'
	});
	$routeProvider.when('/search', {
		templateUrl: 'view/search-atividade.html',
		controller: 'searchAtividadesCtrl'
	});
	$routeProvider.otherwise({redirectTo: '/home'});
	
	
	$httpProvider.interceptors.push(function($q,$rootScope) {
		return function(promise) {
			//Always disable loader
			$rootScope.hideLoader();
			return promise.then(function(response) {
						// do something on success
						return(response);
				}, function(response) {
						// do something on error
						var $data = response.data;
						var $error = $data.error;				
						if ($error && $error.text)
							console.log("ERROR: " + $error.text);
						else{
							if (response.status=404)
								console.log("Erro ao acessar servidor. Página não encontrada. Veja o log de erros para maiores detalhes");
							else
								console.log("ERRO! veja o log do console");
						}
						return $q.reject(response);
				});
		}
	});
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data){
		/**
		 * The workhorse; converts an object to x-www-form-urlencoded serialization.
		 * @param {Object} obj
		 * @return {String}
		 */ 
		var param = function(obj)
		{
			var query = '';
			var name, value, fullSubName, subName, subValue, innerObj, i;
			
			for(name in obj)
			{
				value = obj[name];
				
				if(value instanceof Array)
				{
					for(i=0; i<value.length; ++i)
					{
						subValue = value[i];
						fullSubName = name + '[' + i + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				}
				else if(value instanceof Object)
				{
					for(subName in value)
					{
						subValue = value[subName];
						fullSubName = name + '[' + subName + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				}
				else if(value !== undefined && value !== null)
				{
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
				}
			}
			
			return query.length ? query.substr(0, query.length - 1) : query;
		};
		
		return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
	
	GooglePlusProvider.init({
		clientId: '831834577706-r318fqfhaj1aeg5qsnukrcq5kvr5qr22.apps.googleusercontent.com',
		apiKey: 'L1gaEKX31moYlK4lGxUpZ0lg'
	});
}]).run(function($rootScope){
	
	//Uma flag que define se o ícone de acesso ao servidor deve estar ativado
	$rootScope.showLoaderFlag = false;
	//Força que o ícone de acesso ao servidor seja ativado
	$rootScope.showLoader = function(){
		$rootScope.showLoaderFlag = true;
	}
	//Força que o ícone de acesso ao servidor seja desativado
	$rootScope.hideLoader = function(){
		$rootScope.showLoaderFlag = false;
	}
})