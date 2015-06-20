'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(AppConfiguration.appModuleName, AppConfiguration.appModuleVendorDependencies)
        
    .config(['$locationProvider', '$httpProvider', '$stateProvider',
        function($locationProvider, $httpProvider, $stateProvider) {
            $locationProvider.hashPrefix('!');
            
                        
            
            //Process error for all responses have status code 401
            $httpProvider.interceptors.push(function($q, $injector){
                return {
                    'response': function(response){
                        
                        return response;
                    },
                    'responseError': function(rejection){
                        if(rejection.status == 401){
                            //console.log(rejection.data.message);
                            //to do here
                            $injector.get('$rootScope').$emit('$tokenExpiredNotify');
                            $injector.get('$state').go('signin', {error_msg: rejection.data.message});
                        }
                        
                        return $q.reject(rejection);
                    }
                };
            });
            
            
        }
    ])

    .run(['$rootScope', '$http', '$state', '$location', '$templateCache', '$localStorage', function($rootScope, $http, $state, $location, $templateCache, $localStorage){
        console.log('Run hook');
        
        //Add Token if page Refresh(F5)
        if(!angular.isUndefined($localStorage.auth)){
            $http.defaults.headers.common['Authorized-Token'] = $localStorage.auth.access_token;
        }
        
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            //if (typeof(current) !== 'undefined'){
            if(angular.isDefined(current)){
                $templateCache.remove(current.templateUrl);
            }
        });
        
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
            
            var requireLogin = false;
            if(!angular.isUndefined(toState.data) && !angular.isUndefined(toState.data.requireLogin)){
                requireLogin = toState.data.requireLogin;
            }
            
            var checkAcl = true;
            if(angular.isDefined(toState.data) && angular.isDefined(toState.data.checkAcl)){
                checkAcl = toState.data.checkAcl;
            }
            
            if(requireLogin && angular.isUndefined($localStorage.auth)){
                event.preventDefault();
                //$state.go('signin', { url: '/signin'});
                $state.go('signin');
                
            }
            else{
                var api_url = AppConfiguration.config.apiUrl;

                /*
                var uncheckAcl = [
                    '/acl',
                    '/acl/:error',
                    '/user/forget-password'
                ];
                */
                
                //console.log('$stateChangeStart');
                //console.log(toState);
                
                //if(uncheckAcl.indexOf(toState.url) == -1){
                if(checkAcl == true){
                    
                    //console.log(toState);
                    $http.post(api_url + '/users/acl', {route: toState.url}).success(function(res){

                        var isAllow = true;

                        if(!angular.isArray(res.allow)){
                            if(res.allow != '*'){
                                isAllow = false;
                            }
                        }
                        else{
                            var rp = $localStorage.auth.user.role_powering;
                            if(res.allow.indexOf(rp) == -1){
                                isAllow = false;
                            }
                        }

                        if(!isAllow){
                            event.preventDefault();
                            $state.go('acl', {error: $location.absUrl()});
                        }

                    }).error(function(res){
                        console.log('Error: '+ toState.url);
                        console.log(res);
                    });
                }
                
            }
		});
    }]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [AppConfiguration.appModuleName]);
});
    