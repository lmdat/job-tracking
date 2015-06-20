'use strict';

angular.module('mytasks').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
        .state("my-tasks", {
            url: '/mytasks',
            templateUrl: 'public/modules/mytasks/views/my-tasks.client.view.html',
            data:{
                requireLogin: true
            }
        });
            
    }
]);