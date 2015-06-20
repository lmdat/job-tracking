'use strict';

angular.module('users').factory('Authentication', [
	function() {
		
        /*var me = this;

		me._data = {
			user: false
		};

		return me._data;
        */
        var data = {};
        
        data.user = false;
        data.authorized = false;
        data.access_token = '';
        
        return data;
	}
]);

/*
angular.module('users').factory('AuthenticatedNotify', ['$rootScope',
    function($rootScope){
        var notify = {};
        
        notify.sendMessage = function(){
        };
    }
]);
*/