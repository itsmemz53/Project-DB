angular.module('dbProject.services',[])
.factory('myService', function ($http) {

        var ergastAPI = {};
         ergastAPI.isAuthenticated = function () {
            var req = {
                method: 'GET',
                url: '/isAuthenticated',
                
            };
            return $http(req);
        }
       ergastAPI.sendProducts = function (userObj) {
            var req = {
                method: 'POST',
                url: '/ProductItems',
                data: userObj
                
            };
            return $http(req);
        }
         ergastAPI.sendSearch = function (userObj) {
            var req = {
                method: 'POST',
                url: '/searchIt',
                data: userObj
                
            };
            return $http(req);
        }
        ergastAPI.getShop = function (userObj) {
            var req = {
                method: 'POST',
                url: '/getShop',
                data: userObj
                
            };
            return $http(req);
        }
       
         ergastAPI.sendShop = function (userObj) {
            var req = {
                method: 'POST',
                url: '/shopProfile',
                data: userObj
                
            };
            return $http(req);
        }
       
         ergastAPI.logout = function () {
            var req = {
                method: 'GET',
                url: '/logout',
                
            };
            return $http(req);
        }
        ergastAPI.login = function (userObj) {
            var req = {
                method: 'POST',
                url: '/login',
                data: userObj
            };
            return $http(req);
        }
        ergastAPI.registerUser = function (data) {
            var req = {
                method: 'POST',
                url: '/register',
                data: data
            };
            return $http(req);

        }

        

        return ergastAPI;
    }) ;