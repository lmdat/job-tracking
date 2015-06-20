'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$rootScope', '$http', '$location', '$state', '$state', '$localStorage',
    function($scope, $rootScope, $http, $location, $state, $stateParams, $localStorage){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        $scope.error_msg = '';
        if(!angular.isUndefined($state.params.error_msg)){
            $scope.error_msg = $state.params.error_msg;
        }
        
        this.signin = function(){
            //console.log(api_url + '/users/authenticate');
            
            $http.post(api_url + '/users/authenticate', this.credentials).success(function(res){
                
                //console.log('authentication response');
                //console.log(res);
                
                $scope.error_msg = '';
                
                var token = res.token.split('.');
               
                /*
                Authentication.authorized = res.authorized;
                Authentication.user = JSON.parse(window.atob(token[0]));
                Authentication.access_token = token[1];
                */
                
                var json_user = JSON.parse(window.atob(token[0]));
                json_user.role_powering = parseInt(json_user.role_powering);
                
                $localStorage.auth = {
                    authorized: res.authorized,
                    user: json_user,
                    access_token: token[1]    
                };
                
                //console.log($localStorage.auth);
                
                //Add token to custom header
                $http.defaults.headers.common['Authorized-Token'] = $localStorage.auth.access_token;
                
                //$rootScope.$emit('AuthenticatedNotify');
                $rootScope.$emit('$authenticatedNotifySuccess');
                                
                $location.path('/');
                
            }).error(function(res){
                $scope.error_msg = res.error_msg;
                console.log("ERROR");
                console.log(res);
            });
        };
    }
]);