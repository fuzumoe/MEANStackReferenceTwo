/**
 * 
 * @param {ModuleName} userController
 * @param {DependencyName} userService
 */
angular.module('userController', ['usersService'])
           /**
            * 
            * @param {ControllerName} userMainController
            * @returns {JSON} User
            */
        .controller('userMainController', function (User) {
            var vm = this;
            User.all()
                    .success(function (data) {
                        vm.users = data;
                    });
        })
        /**
         * 
         * @param {ControllerName} User
         * @param {AngularRouting} $location
         * @param {AngulaBroserBidge} $window
         */
        .controller('UserCreateController', function (User, $location, $window){
  
            var vm = this;
//      vm.test = function () {   
//            console.log("working");
//      };
            vm.signUpUser = function () {          
              console.log("working");
                vm.message = '';
                User.create(vm.userData).
                        then(function (response) {
                            vm.userData = {};
                            vm.mesage = response.data.message;
                            $window.localStorage.setItem('token', response.data.token);
                            $location.path('/');
                        });

            };
        });