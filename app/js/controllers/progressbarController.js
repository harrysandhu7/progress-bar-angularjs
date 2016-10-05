(function(angular) {
	'use strict';
	angular.module('progressbar').controller('progressbarController',[
		'$scope',
		'$http',
		function($scope, $http){
			// Fetching data from endpoint
			$http.get('http://pb-api.herokuapp.com/bars')
				.success(function(data) {
					// Setting data to scope variable
				    $scope.progressBarData = data;
				})
				.error(function(error, status, headers, config) {
					// Fallback in case of error
				    $scope.progressBarData = {buttons:[46,27,-11,-37],bars:[83,85,81],limit:200};
				});

			// Update progress bar data
			$scope.updateProgressBar= function(delta){
				$scope.progressBarData.bars[$scope.selectedBar] += delta;
				if($scope.progressBarData.bars[$scope.selectedBar] < 0){
					$scope.progressBarData.bars[$scope.selectedBar] =0;
				}
			};
		}
	]);
})(window.angular);