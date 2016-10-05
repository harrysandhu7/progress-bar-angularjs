(function(angular) {
	'use strict';
	angular.module('progressbar').directive('progressBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/progressbar.html',
			link: function(scope, element, attrs) {
				var limit = !!attrs.barLimit?attrs.barLimit:100;
				scope.label=attrs.barLabel;

				// Updating progress bar percentage and its color
				scope.updateProgress = function () {
					scope.progress = Math.round( (attrs.barValue/limit) * 100 );
					scope.barClass = (scope.progress > 100)? "progress-bar-danger": "progress-bar-info";					
				};

				// Setting observer to listen bar value changes
				attrs.$observe('barValue', function (newVal) {
				    scope.updateProgress();
				});
				scope.updateProgress();
    		}
		};
	});
})(window.angular); 