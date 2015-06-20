'use strict';

var userModuleService = angular.module('users');

userModuleService.factory('User', ['$resource',
    function($resource){
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/users/:uid', {
            uid: '@_uid'
        }, {
            query:{
                url: api_url + '/users/except/:except_id',
                params:{
                    except_id: '@_except_id'
                },
                isArray: true,
                methos: 'GET'
            },
            
            update:{
                method: 'PUT'
            },
            
            getRoles:{
                url: api_url + '/user/:power/roles',
                params:{ 
                    power:'@_power'
                },
                isArray: true,
                method: 'GET'
            },
            
            getUsersWithRole:{
                url: api_url + '/users/:uid/role/:role_id',
                params:{ 
                    uid:'@_uid',
                    role_id:'@_role_id'
                },
                isArray: true,
                method: 'GET'
            },
            
            updateProfile:{
                url: api_url + '/user/:uid/profile',
                method: 'PUT'
            },
            
            changePassword:{
                url: api_url + '/user/:uid/password',
                method: 'PUT'
            },
            
            requestOtpCode:{
                url: api_url + '/user/forget-password/otp',
                method: 'POST'
            },
            
            renewPassword:{
                url: api_url + '/user/forget-password',
                method: 'PUT'
            }
            
        });        
    }
]);

userModuleService.factory('Notify', ['$rootScope',
    function($rootScope){
        
        var notify = {};
        
        notify.sendMessage = function(msg, data){
            data = data || {};
            $rootScope.$emit(msg, data);
        };
        
        notify.getMessage = function(msg, func, scope){
            var unbind = $rootScope.$on(msg, func);
            
            if(scope){
                scope.$on('destroy', unbind);
            }
        };
        
        return notify;
        
    }
]);

userModuleService.factory('Setting', ['$resource',
    function($resource){
        
        var api_url = AppConfiguration.config.apiUrl;
        
        return $resource(api_url + '/setting/:section', {section:'@_section'}, {
            update:{
                method: 'PUT'
            }
        });        
    }
]);

