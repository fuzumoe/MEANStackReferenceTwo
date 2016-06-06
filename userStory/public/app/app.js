
angular.module("MyApp",['appRoutes','mainController','authService','userController','usersService','storyService','storyController'])

.config(function($httpProvider){
      $httpProvider.interceptors.push('AuthInterceptor');
});