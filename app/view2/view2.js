'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl',["$http","$scope","$sce",function($http,$scope,$sce) {
  $scope.products = {};
  $scope.fieldValue = "";
  $scope.data = { fieldValue:''};
 
  $scope.GetDealsClick = function(pValue) {
      var target = '/find';
      $http({
        method:'JSONP',
        url:target,
        params : {
          search:$scope.data.fieldValue
        }
      }).success(function(data, status, headers, config){
        $scope.products = data;
      });
  };
}]);

