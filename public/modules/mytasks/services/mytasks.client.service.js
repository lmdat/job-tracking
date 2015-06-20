angular.module('mytasks').factory('MyTask', ['$resource',
    function($resource){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/user/:uid/mytasks/:status', {uid:'@_uid', status: '@_priority'}, {
            update:{
                method: 'PUT'
            },
            start:{
                method: 'PUT'
            }
            
        });        
    }
]);



angular.module('mytasks').factory('Progress', ['$resource',
    function($resource){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/user/:uid/mytasks/:tid/progress/:id', {uid:'@_uid', tid:'@_tid', id: '@id'}, {
            update:{
                method: 'PUT'
            }
        });        
    }
]);

angular.module('mytasks').factory('Comment', ['$resource',
    function($resource){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/user/:uid/mytasks/:tid/progress/:pid/comments/:cid', {uid:'@_uid', tid:'@_tid', pid: '@_pid', cid: '@_cid'}, {
            update:{
                method: 'PUT'
            }
        });        
    }
]);