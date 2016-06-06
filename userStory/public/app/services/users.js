angular.module('userService', [])

        .factory('User', function ($http) {
            var userFactory = {};
            userFactory.create = function (userDate) {
                return $http.post('/api/sighnup', userDate);
            };


            userFactory.all = function () {
                return $http.get('/api/users');
            };
            
            return userFactory;
        }); 