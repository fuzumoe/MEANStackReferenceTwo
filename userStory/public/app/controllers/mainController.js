angular.module('mainController', [])

        /***
         * 
         * @param {RoutData} $rootScope
         * @param {URL} $location
         * @param {JSON} Auth
         * @returns {null}
         */
        .controller('MainContorller', function ($rootScope, $location, Auth) {
            // console.log("working");
            var vm = this;


            vm.loggedIn = Auth.isLoggedIn();

            $rootScope.$on('$routeChangeStart', function () {

                vm.loggedIn = Auth.isLoggedIn();

                Auth.getUser().then(function (data) {

                    vm.user = data.data;
                });
            });
            /**
             * 
             * @returns {null}
             */
            vm.doLogin = function () {


                vm.processing = true;

                vm.error = '';

                Auth.login(vm.loginData.username, vm.loginData.password)

                        .success(function (data) {

                            vm.processing = false;
                             
                            Auth.getUser().then(function (data) {
                                vm.user = data.user;
                                 
                            });

                             if (data.success) {
                              console.log(data.user.name);
                                $location.path('/');
                            }
                             
                            else{
                            vm.error = data.message;

                            }
                            
                           
                        });
            };
            /**
             * 
             * @returns {null}
             */
            vm.doLogout = function () {
                console.log("working");
                Auth.logout();

                $location.path('/logout');
            };

        });

        