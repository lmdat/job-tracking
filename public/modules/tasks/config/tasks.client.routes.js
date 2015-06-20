'use strict';

angular.module('tasks').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
        .state("task-list", {
            url: '/tasks',
            templateUrl: 'public/modules/tasks/views/list-tasks.client.view.html',
            data:{
                requireLogin: true
            }
        })
        
        .state("user-tasks", {
            url: '/user-tasks/:user_id',
            templateUrl: 'public/modules/tasks/views/user-tasks.client.view.html',
            params: {
                user_id: {
                    value: null,
                    squash:true
                }
            },
            data:{
                requireLogin: true
            }
        })
        
        .state("task-detail", {
            url: '/task-detail/:user_id/:task_id',
            templateUrl: 'public/modules/tasks/views/user-tasks.client.view.html',
            params: {
                user_id: {
                    value: '',
                    squash:true
                },
                task_id: {
                    value: '',
                    squash:true
                }
                
            },
            data:{
                //requireLogin: true
            }
        });
            
    }
]);