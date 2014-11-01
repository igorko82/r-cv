// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require angular
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require plugins/all.min
//= require scripts

var myResume = angular.module('myResume', []);

function contactController($scope, $http, $timeout) {

    $scope.formData = {};

    $scope.sendForm = function($event) {
      


      $http({
          method  : 'POST',
          url     : 'http://inweb.mobi/process.php',
          data    : $.param($scope.formData),  // pass in data as strings
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      }).success(function(data, $event) {
              //$event.preventDefault();
              $scope.submitted = true;
              $scope.hide = false; 
              $timeout(function(){
                  //$scope.hide = true;  
                  $scope.theForm.$setPristine();
                  $scope.formData.name = null;
                  $scope.formData.email = null;
                  $scope.formData.message = null;
                  $scope.submitted = false;
              }, 2400);
        });
    }
};
