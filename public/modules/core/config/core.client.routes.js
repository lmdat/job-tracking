'use strict';

angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'public/modules/core/views/dashboard.client.view.html',
            data:{
                requireLogin: true
            }
        });
            
    }
]);