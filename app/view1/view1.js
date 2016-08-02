'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$http","$scope","$sce",function($http,$scope,$sce) {
  $scope.Products = {};
  $scope.Categories = 'baby-kids-and-toys';
  
  $scope.renderHtml = function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  };
  
  $scope.getPrice = function(deal){
    var firstPrice = deal.options[0].price.formattedAmount;
    
    if (deal.options.length > 1)  {
      return '<p>החל מ-'+ firstPrice +'</p>' ;
    } else {
      return '<p>'+firstPrice+'</p>';
    }
  };
  
  var target = 'https://partner-api.groupon.com/deals.json?nlp';
  $scope.GetGrouponDealsClick = function(item,event) {
    
      $http({
        method:'JSONP',
        url:target,
        params:{
          country_code:'IL',
          tsToken:'IL_AFF_0_209430_515_0',
          CID:'IL_AFF_5600_225_5383_1',
          facets:'category',
          filters:'category:' + $scope.Categories,
          offset:'0',
          limit:'4',
          callback:'JSON_CALLBACK'
        }}).success(function(data, status, headers, config){
        $scope.products = data;
      });
  };
  $scope.GetGrouponDealsClick();
}]);