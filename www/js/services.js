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