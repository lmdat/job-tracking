'use strict';

var coreModuleCtrl = angular.module('core');

coreModuleCtrl.controller('HeaderController', ['$scope', '$rootScope', '$http', '$state', '$localStorage',
	function($scope, $rootScope, $http, $state, $localStorage) {
        
        var me = this;
        
        this.authentication = $localStorage.auth;
        
        
        this.userMenu = [];
        
        this.initUserMenu = function(){
            var _role = 0;
            if(angular.isDefined(this.authentication)){
                //_role = parseInt(this.authentication.user.role_powering);
                _role = this.authentication.user.role_powering;
            }
            
            //console.log('HeaderController Role: ' + user_role);
            
            this.userMenu = [
                {
                    id: 1,
                    title: 'Profile',
                    url_name: 'user-profile',
                    active_class: '',
                    icon: "<i class='fa fa-street-view'></i>"
                },

                {
                    id: 2,
                    title: 'Change Password',
                    url_name: 'user-change-password',
                    active_class: '',
                    icon: "<i class='fa fa-key'></i>"
                }
            ];
            
            if(_role == 900){
                this.userMenu.push(
                    {
                        id: 3,
                        title: 'Setting',
                        url_name: 'setting',
                        active_class: '',
                        icon: "<i class='fa fa-sliders'></i>"
                    }
                );
                
            }
        };
        
        this.clearAuth = function(){
            delete this.authentication;
            delete $localStorage.auth;
            
            if(!angular.isUndefined($http.defaults.headers.common['Authorized-Token'])){
                $http.defaults.headers.common['Authorized-Token'] = '';
            }
            
            $rootScope.$emit('$signoutNotify');
        }
        
        this.signout = function(){
            
            this.clearAuth();
            $state.go('signin');
            
        };
        
        $rootScope.$on('$tokenExpiredNotify', function(event, data){
            me.clearAuth();
        });
        
        $rootScope.$on('$authenticatedNotifySuccess', function(){
            me.authentication = $localStorage.auth;
            //console.log('$authenticatedNotifySuccess');
            //console.log(me.authentication);
            me.initUserMenu();
        });
       
	}
]);


coreModuleCtrl.controller('SidebarController', ['$scope', '$rootScope', '$state', '$http', '$localStorage',
	function($scope, $rootScope, $state, $http, $localStorage) {
        
        var me = this;
        
        this.authentication = $localStorage.auth;
        
        this.sidebarMenu = [
            {
                id: 1,
                title: 'Dashboard',
                url_name: 'dashboard',
                active_class: 'active',
                icon: "<i class='fa fa-dashboard'></i>"
            }
        ];
        
        
        
        this.initMenu = function(){
            
            var _role = 0;
            if(angular.isDefined(this.authentication)){
                //_role = parseInt(this.authentication.user.role_powering);
                _role = this.authentication.user.role_powering;
            }
            
            //console.log('SidebarController Role: ' + _role);
            
            switch(_role){
                case 900:
                    this.sidebarMenu = [
                        {
                            id: 1,
                            title: 'Dashboard',
                            url_name: 'dashboard',
                            active_class: 'active',
                            icon: "<i class='fa fa-dashboard'></i>"
                        },
                        {
                            id: 2,
                            title: 'My Tasks',
                            url_name: 'my-tasks',
                            active_class: 'active',
                            icon: "<i class='fa fa-th-large'></i>"
                        },
                        {
                            id: 3,
                            title: 'Users',
                            url_name: 'user-list',
                            active_class: 'active',
                            icon: "<i class='fa fa-users'></i>"
                        },
                        {
                            id: 4,
                            title: 'Tasks',
                            url_name: 'task-list',
                            active_class: 'active',
                            icon: "<i class='fa fa-tasks'></i>"
                        }
                    ];
                    break;
                
                case 500:
                    this.sidebarMenu = [
                        {
                            id: 1,
                            title: 'Dashboard',
                            url_name: 'dashboard',
                            active_class: 'active',
                            icon: "<i class='fa fa-dashboard'></i>"
                        },
                        {
                            id: 2,
                            title: 'My Tasks',
                            url_name: 'my-tasks',
                            active_class: 'active',
                            icon: "<i class='fa fa-th-large'></i>"
                        },
                        {
                            id: 3,
                            title: 'Tasks',
                            url_name: 'task-list',
                            active_class: 'active',
                            icon: "<i class='fa fa-tasks'></i>"
                        }
                    ];
                    break;
                
                case 100:
                    this.sidebarMenu = [
                        {
                            id: 1,
                            title: 'Dashboard',
                            url_name: 'dashboard',
                            active_class: 'active',
                            icon: "<i class='fa fa-dashboard'></i>"
                        },
                        {
                            id: 2,
                            title: 'My Tasks',
                            url_name: 'my-tasks',
                            active_class: 'active',
                            icon: "<i class='fa fa-th-large'></i>"
                        }
                    ];
                    break;
                    
              
            }//End Switch
                
            
            //console.log('Menu Items');
            //console.log(this.sidebarMenu);
        };
        
        
        $rootScope.$on('$authenticatedNotifySuccess', function(){
            me.authentication = $localStorage.auth;
            //console.log('Sidebar Controller');
            me.initMenu();
        });
        
        $rootScope.$on('$signoutNotify', function(){
            delete me.authentication;
            delete $localStorage.auth;
            
            me.sidebarMenu = [
                {
                    id: 1,
                    title: 'Dashboard',
                    url_name: 'dashboard',
                    active_class: 'active',
                    icon: "<i class='fa fa-dashboard'></i>"
                }
            ];
        });
        
            
        
    }
]);


coreModuleCtrl.controller('DashBoardController', ['$scope', '$rootScope', '$state', '$timeout', '$localStorage', 'Dashboard',
	function($scope, $rootScope, $state, $timeout, $localStorage, Dashboard) {
        var me = this;
        
        this.user_role = $localStorage.auth.user.role_powering;
        this.tpl_url = "public/modules/core/views/dashboard/default.client.view.html";
        
        if(this.user_role == 900 || this.user_role == 500 || this.user_role == 100){
            this.tpl_url = "public/modules/core/views/dashboard/" + this.user_role + ".client.view.html";
        }
        
        this.yourStatusTasksList = {};
        this.showYourStatusTasksList = false;
        
        this.initData100 = function(){
            this.showYourStatusTasksList = false;
            
            Dashboard.getMyTaskStatus(
                {
                    uid: $localStorage.auth.user.id,
                    power: this.user_role
                    //month: '@_month',
                    //year: '@_year'
                },
                function(res){
                    me.yourStatusTasksList = res;
                    me.showYourStatusTasksList = true;
                    //console.log(res);   
                }
            );
            
        };
        
        this.userTasksList = {}
        this.showUserTasksList = false;
        
        this.onwerStatusTasksList = {};
        this.showOnwerStatusTasksList = false;
        
        this.initData900 = function(){
            this.showOnwerStatusTasksList = false;
            this.showUserTasksList = false;
            
            Dashboard.getOnwerTaskStatus(
                {
                    owner: $localStorage.auth.user.id,
                    power: this.user_role
                    //month: '@_month',
                    //year: '@_year'
                },
                function(res){
                    me.onwerStatusTasksList = res;
                    me.showOnwerStatusTasksList = true;
                    //console.log(res);   
                },
                function(res){
                    console.log(res);
                }
            );

            Dashboard.getAssignedTasks(
                {
                    owner: $localStorage.auth.user.id,
                    power: this.user_role
                    //month: '@_month',
                    //year: '@_year'
                },
                function(res){
                    me.userTasksList = res;
                    me.showUserTasksList = true;
                    console.log(res);   

                    console.log(moment().month());
                    console.log(moment().year());
                }
            );
                
            
        };
        
        this.initData500 = function(){
                
            this.initData100();
            this.initData900();

        };
        
        
        
       
	}
]);