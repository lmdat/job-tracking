'use strict';

angular.module('tasks').factory('Task', ['$resource',
    function($resource){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/tasks/:uid/:tid', {uid:'@_uid', tid:'@_tid'}, {
            
            query:{
                url: api_url + '/tasks/:uid/date/:date',
                params:{ 
                    uid: '@user_id',
                    date: '@_date'
                },
                isArray:true,
                method: 'GET'
            },
            
            update:{
                method: 'PUT'
            },
            
            userTasks:{
                url: api_url + '/user/:uid/tasks',
                params:{ 
                    uid:'@user_id'
                },
                isArray:true,
                method: 'GET'
            },
            
            userTask:{
                url: api_url + '/user/:uid/tasks/:tid',
                params:{ 
                    uid:'@user_id',
                    tid:'@_tid',
                },
                isArray:false,
                method: 'GET'
            }
        }); 
        
        
        
    }
]);

angular.module('tasks').factory('Priority', ['$resource',
    function($resource){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/tasks/priority', {}, {
            update:{
                method: 'PUT'
            }
        });        
    }
]);


angular.module('tasks').factory('TaskProgress', ['$resource',
    function($resource){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/user/:uid/tasks/:tid/progress/:pid', {uid:'@_uid', tid:'@_tid', pid: '@_pid'}, {
            update:{
                method: 'PUT'
            }
        });        
    }
]);

angular.module('tasks').factory('TaskComment', ['$resource',
    function($resource){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/user/:uid/tasks/:tid/progress/:pid/comments/:cid', {uid:'@_uid', tid:'@_tid', pid: '@_pid', cid: '@_cid'}, {
            update:{
                method: 'PUT'
            }
        });        
    }
]);




