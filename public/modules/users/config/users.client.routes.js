'use strict';

angular.module('users').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
        .state('user-list', {
            url: '/users',
            templateUrl: 'public/modules/users/views/list-users.client.view.html',
            data:{
                requireLogin: true
            }
        })
        .state('signin', {
			url: '/signin',
			templateUrl: 'public/modules/users/views/authentication/signin.client.view.html',
            params:{
                error_msg:{
                    value: '',
                    squash:true
                }
            },
            data:{
                checkAcl: false
            }
		})
        .state('acl', {
			url: '/acl/:error',
			templateUrl: 'public/modules/users/views/authentication/acl.client.view.html',
            data:{
                requireLogin: true,
                checkAcl: false
            }
		})
        
        .state('user-profile', {
			url: '/user/profile',
			templateUrl: 'public/modules/users/views/setting/user-profile.client.view.html',
            data:{
                requireLogin: true
            }
		})

        .state('user-change-password', {
			url: '/user/change-password',
			templateUrl: 'public/modules/users/views/setting/change-pass.client.view.html',
            data:{
                requireLogin: true
            }
		})
        
        .state('user-forget-password', {
			url: '/user/forget-password',
			templateUrl: 'public/modules/users/views/setting/forget-password.client.view.html',
            data:{
                requireLogin: false,
                checkAcl: false
            }
		})
                    
        .state('setting', {
			url: '/setting',
			templateUrl: 'public/modules/users/views/setting/settings.client.view.html',
            data:{
                requireLogin: true
            }
		});
        
            
    }
]);