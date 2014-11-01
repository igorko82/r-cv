var myResume = angular.module('myResume', []);

function resumeController($scope, $http, $timeout) {

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
              console.log(data);
        });
    }
}



// create angular controller and pass in $scope and $http
            // function resumeController($scope, $http) {
            //     $scope.formData = {};
            //     $scope.message = 'Send';
            //     $scope.processForm = function() {
            //         $http({
            //             method  : 'POST',
            //             url     : 'http://localhost/process.php',
            //             data    : $.param($scope.formData),  // pass in data as strings
            //             headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            //         })
            //             .success(function(data) {
            //                 console.log(data);

            //                 if (!data.success) {
            //                     // if not successful, bind errors to error variables
            //                     $scope.errorName = data.errors.name;
            //                     $scope.errorMail = data.errors.mail;
            //                 } else {
            //                     // if successful, bind success message to message
            //                     $scope.message = data.message;
            //                     $scope.ok = true;
            //                 }
            //             });
            //     };
            // }