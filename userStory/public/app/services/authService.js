/**
 * 
 * @param {AngularModuleNAME} authService
 * @param {AngularBuiltInFunctions} param2
 */
angular.module("authService", [])
        /**
         * 
         * @param {httpService} $http
         * @param {PremiseObjectService} $q
         * @param {TokenSerivce} AuthToken
         * @returns {authService_L10.authFactory}
         */
        .factory('Auth', function ($http, $q, AuthToken) {

            var authFactory = {};
            /**
             * login service
             * 
             * @param {String} username
             * @param {String} password
             * @returns {JSON}
             */
            authFactory.login = function (username, password) {

                return $http.post('/api/login', {
                    username: username,
                    password: password
                }).success(function (data) {
                    AuthToken.setToken(data.token);
                    console.log(data.user.name);
                    return data;
                });
            };
            /**
             * logout service
             * @returns {JSON}
             */
            authFactory.logout = function () {
                AuthToken.setToken();
            };
            /**
             * check if logged in function
             * @returns {Boolean}
             */
            authFactory.isLoggedIn = function () {
                if (AuthToken.getToken())
                    return true;
                else
                    return false;
            };
            /**
             * get user object
             * @returns {JSON}
             */
            authFactory.getUser = function () {
                if (AuthToken.getToken())
                    return $http.get('/api/me');
                else
                    return $q.reject({message: "user has no token"});
            };
            return authFactory;
        })
        /**
         * 
         * @param {Browser]} $window = the browser that in which the app is running
         * @returns {authService_L65.authTokenFactory}
         */
        .factory('AuthToken', function ($window) {

            var authTokenFactory = {};
            /**
             * 
             * @returns {String}
             */
            authTokenFactory.getToken = function () {
                var tk = $window.localStorage.getItem('token');
//                console.log(tk.toString());
                return $window.localStorage.getItem('token');
            };
            /**
             * 
             * @param {String} token
             */
            authTokenFactory.setToken = function (token) {
                if (token){
                console.log(token); 
                    $window.localStorage.setItem('token', token);
                    
                }
                else{
                    $window.localStorage.removeItem('token');
                }
            };
            return authTokenFactory;

        }).
           /**
            * 
            * @param {PremiseObjectService} $q
            * @param {URLService} $location
            * @param {String} AuthToken
            * @returns {authService_L93.interceptorFactory}
            */
          factory('AuthInterceptor',function($q,$location,AuthToken){
              
             var interceptorFactory = {};
             /**
              * 
              * @param {type} config
              * @returns {unresolved}
              */
             interceptorFactory.request = function(config){
                 var token = AuthToken.getToken();
                 if(token){
                     config.headers['x-access-token'] = token;
                 }
                 return config;
             };
             /**
              * 
              * @param {JSON} response
              * @returns {PremiseObjectService} $q
              */
             interceptorFactory.responseError = function(response){
                 
                 if(response.status === 403)
                     $location.path('/login');
                 
                 return $q.reject(response);
             };
             
             return interceptorFactory;
        });

