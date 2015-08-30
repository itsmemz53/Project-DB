var app = angular.module('dbProject', ['ionic','dbProject.controllers', 'dbProject.services' ]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
        if (window.cordova && window.cordova.logger) {
    window.cordova.logger.__onDeviceReady();
            }
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
}).config(function ($stateProvider, $urlRouterProvider) {

      
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/partials/Login.html',
            controller: "loginUser"

        });
        
        $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/partials/Register.html',
            controller: "registerUser"

        });
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/partials/home.html',
            controller : "Maps"

        });
        $stateProvider.state('logout', {
            url: '/logout',
            templateUrl: '/partials/home.html',
            controller: "logOut"

        });
          
        $stateProvider.state('isAuthenticated', {
            url: '/#',
            cache:false,
            controller: "Authentication"


        });
      
         
        $urlRouterProvider.otherwise('home');

    })