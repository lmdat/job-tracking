'use strict';

angular.module('core').factory('Dashboard', ['$resource',
    function($resource){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/dashboard', {}, {
            update:{
                method: 'PUT'
            },
            
            getMyTaskStatus:{
                url: api_url + '/dashboard/user/:uid/:power/mytask-status/:month/:year',
                params:{ 
                    uid: '@_uid',
                    power: '@_power',
                    month: '@_month',
                    year: '@_year'
                },
                isArray:true,
                method: 'GET'
            },
            
            getOnwerTaskStatus:{
                url: api_url + '/dashboard/user/:owner/:power/onwertask-status/:month/:year',
                params:{
                    owner: '@_owner',
                    power: '@_power',
                    month: '@_month',
                    year: '@_year'
                },
                isArray:true,
                method: 'GET'
            },
            
            getAssignedTasks:{
                url: api_url + '/dashboard/user/:owner/:power/assinged-tasks/:month/:year',
                params:{
                    owner: '@_owner',
                    power: '@_power',
                    month: '@_month',
                    year: '@_year'
                },
                isArray:true,
                method: 'GET'
            }
        });        
    }
]);