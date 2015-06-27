'use strict';

var userModuleCtrl = angular.module('users');
/*
userModuleCtrl.controller('UserController', ['$scope', '$modal', '$log', 'User', '$localStorage',
    function($scope, $modal, $log, User, $localStorage){
        var me = this;
        this.users = [];
        
        User.query(
            {
                except_id: $localStorage.auth.user.id
            },
            function(res){
                me.users = res;
                $log.info(res);
            }
        );
        
    }
]);
*/

userModuleCtrl.controller('UserController', ['$scope', '$modal', '$log', 'User', 'Notify', '$localStorage',
    function($scope, $modal, $log, User, Notify, $localStorage){
        var me = this;
        
        this.showUserList = false;
        this.users = [];        
        
        this.getUserList = function(){
            this.showUserList = false;
            this.users = [];

            User.query(
                {
                    except_id: $localStorage.auth.user.id
                },
                function(res){
                    me.users = res;
                    me.showUserList = true;
                    //$log.info(res);
                }
            );    
        };
         
        
        this.createUserModal = function(size){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'public/modules/users/views/create-user.client.view.html',
                controller: function($scope, $modalInstance){
                    $scope.ok = function(){
                        if(!userForm.$invalid){
                            $modalInstance.close();
                        }
                    };
                    
                    $scope.cancel = function(){
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size
            });
            
            modalInstance.result.then(function(selectedItem){
                //me.getUserList();
            }, function(){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        
        
        this.updateUserModal = function(size, selectedItem){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'public/modules/users/views/edit-user.client.view.html',
                controller: function($scope, $modalInstance, user){
                    $scope.selected_user = user;
                    
                    $scope.ok = function(){
                        if(!userForm.$invalid){
                            $modalInstance.close($scope.user);
                            
                        }
                    };
                    
                    $scope.cancel = function(){
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve:{
                    user: function(){
                        return selectedItem;
                    }
                }
            });
            
            modalInstance.result.then(function(selectedItem){
                //me.getUserList();
            }, function(){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        
        this.deleteUser = function(item){
            if(window.confirm('All data of this user will be removed. Do you really want to delete?')){
                User.delete(
                    {
                        uid: item.id
                    },
                    function(res){
                        Notify.sendMessage('$refreshUserList', {id: res.id});
                        //console.log(res);
                    }
                );
            }
        };
        
        this.activeUser = function(item){
            User.activeUser(
                {
                    uid: item.id
                },
                function(res){
                    Notify.sendMessage('$refreshUserList', {id: res.id});
                    //console.log(res);
                }
            );
        };
    }
]);




userModuleCtrl.controller('CreateUserController', ['$scope', 'User', 'Notify', '$localStorage',
    function($scope, User, Notify, $localStorage){
        
        var me = this;
        var api_url = AppConfiguration.config.apiUrl;
        
        this.showCreateForm = false;
        
        this.roles = [];
        User.getRoles(
            {
                power: $localStorage.auth.user.role_powering
            },function(res){
                me.roles = res;
                me.showCreateForm = true;
                //console.log(res);
            }
        );

        this.role_id = {};
        
        this.createUser = function(valid){
            if(valid){
                var user = new User({
                    first_name: this.first_name,
                    surname: this.surname,
                    title: this.title,
                    email: this.email,
                    password: this.password,
                    role_id: this.role_id.selected.powering,
                    ref_id: $localStorage.auth.user.id
                });

                //console.log(user);

                user.$save(function(res){
                    Notify.sendMessage('$refreshUserList', {id: res.id});
                    console.log(res);
                },function(errorResponse){
                    console.log(errorResponse);
                });
            }
            
        };
    }
]);


userModuleCtrl.controller('UpdateUserController', ['$scope', 'User', 'Notify', '$localStorage',
    function($scope, User, Notify, $localStorage){
        var me = this;
        
        this.showUpdateForm = false;
        this.user = {};
        
        this.roles = [];
        this.role_id = {selected: null};
        User.getRoles(
            {
                power: $localStorage.auth.user.role_powering
            },function(res){
                for(var i=0;i<res.length;i++){
                    if(res[i].powering == $scope.selected_user.powering){
                        me.role_id.selected = res[i];
                        break;
                    }
                }
                me.roles = res;
                //console.log(me.role_id.selected);
            }
        );

        
        
        this.initUpdateForm = function(){
             User.get(
                 {
                     uid: $scope.selected_user.id
                 },
                 function(res){
                     me.user = res;
                     me.user.password = '';
                     me.showUpdateForm = true;
                 }
             );
        };
        
        
        this.updateUser = function(valid){
           if(valid){
               this.user.role_id = this.role_id.selected.powering;
               this.user.$update(
                   {
                       uid: $scope.selected_user.id
                   },
                   function(res){
                       Notify.sendMessage('$refreshUserList', {id: res.id});
                       console.log(res);
                   },
                   function(res){
                       if(res.status == 400){
                           console.log(res.data.message);
                       }
                   }
               );
           }
        };
    }
]);

userModuleCtrl.controller('AclController', ['$scope', '$location', '$stateParams', '$state',
    function($scope, $location, $stateParams, $state){
        this.error_page = window.decodeURIComponent($state.params.error);
        //console.log($location.url());
    }
]);

userModuleCtrl.controller('ProfileController', ['$scope', '$stateParams', '$state', '$localStorage','$timeout', 'User',
    function($scope, $stateParams, $state, $localStorage, $timeout, User){
        var me = this;
        
        this.user = [];
        
        $scope.message = '';
        $scope.error = false;
        this.showProfileForm = false;
        
        this.pwd = '';
        this.confirm_password = '';
        this.showPasswordForm = false;
        
        
        this.getUser = function(){
            this.showProfileForm = false;
            User.get(
                {
                    uid: $localStorage.auth.user.id
                },
                function(res){
                    res.password = '';
                    res.email = '';
                    
                    me.user = res;
                    me.showProfileForm = true;
                }
            );
        };
        
        this.updateProfile = function(){
            $scope.message = '';
            $scope.error = false;
            this.showProfileForm = false;
            User.updateProfile(
                {
                    uid: $localStorage.auth.user.id
                },
                this.user,
                function(res){
                    $scope.message = res.message;
                    $localStorage.auth.user.first_name = me.user.first_name;
                    $localStorage.auth.user.surname = me.user.surname;
                    me.showProfileForm = true;
                },
                function(errorRes){
                    if(errorRes.status == 400){
                        $scope.error = true;
                        $scope.message = errorRes.data.message;
                    }
                }
            );
        };
        
        this.initPasswordForm = function(){
            this.showPasswordForm = false;
            $timeout(function(){
                me.pwd = '';
                me.confirm_password = '';
                me.showPasswordForm = true;
            }, 500);
            
        };
        
        this.updatePassword = function(){
            $scope.message = '';
            $scope.error = false;
            this.showPasswordForm = false;
            
            User.changePassword(
                {
                    uid: $localStorage.auth.user.id
                },
                {'new_pwd': this.pwd},
                function(res){
                    $scope.message = res.message;
                    me.showPasswordForm = true;
                    me.pwd = '';
                    me.confirm_password = '';
                }
            );
            
        };
    }
]);

userModuleCtrl.controller('SettingController', ['$scope', '$stateParams', '$state', 'Setting',
    function($scope, $stateParams, $state, Setting){
        var me = this;
        
        $scope.message = {};
        $scope.error = {};
        
        this.smtp = {};
        this.showSMTPForm = false;
        
        this.schedule = {};
        this.showScheduleForm = false;
        
        this.getSettings = function(){
            this.showSMTPForm = false;
            this.showScheduleForm = false;
            Setting.get(
                {
                },
                function(res){
                    if(angular.isDefined(res.smtp)){
                        me.smtp = res.smtp;
                        
                    }
                    else{
                        me.smtp.secure = 'none';
                        me.smtp.port = 25;
                    }
                    
                    if(angular.isDefined(res.schedule)){
                        me.schedule = res.schedule;
                    }
                    else{
                        me.schedule.remind_monday = false;
                    }

                    me.showSMTPForm = true;
                    me.showScheduleForm = true;
                }
            );
            
        };
        
        this.saveSMTP = function(){
            $scope.message['smtp'] = '';
            $scope.error['smtp'] = false;
            this.showSMTPForm = false;
            
            var setting = new Setting({
                'smtp': this.smtp
            });
            
            setting.$save(
                {
                    section: 'smtp'
                },
                function(res){
                    $scope.message['smtp'] = res.message;
                    me.showSMTPForm = true;
                    //console.log(res);
                }
                
            );
        };
        
        this.saveSchedule = function(){
            $scope.message['schedule'] = '';
            $scope.error['schedule'] = false;
            this.showScheduleForm = false;
            
            var setting = new Setting({
                'schedule': this.schedule
            });
            
            setting.$save(
                {
                    section: 'schedule'
                },
                function(res){
                    $scope.message['schedule'] = res.message;
                    me.showScheduleForm = true;
                    //console.log(res);
                }
                
            );
        };
    }
]);

userModuleCtrl.controller('ForgetPasswordController', ['$scope', '$stateParams', '$state', 'User',
    function($scope, $stateParams, $state, User){
        var me = this;
        
        this.otp = {
            code: '',
            key: ''
        };
        
        this.password = {
            new_pass: '',
            confirm_pass: ''
        };
        
        
        this.email = '';
        this.requestCodeOk = false;
        this.showPasswordForm = false;
        
        $scope.message = {};
        $scope.error = {};
        
               
        this.initOtpForm = function(otp_key){
            this.otp.key = otp_key;
            this.otp.code = '';
            
            this.password.new_pass = '';
            this.password.confirm_pass = '';
            this.showPasswordForm = true;
            
        };
                
        this.requestOtpCode = function(){
            this.requestCodeOk = false;
            this.showPasswordForm = false;
            $scope.message['request_otp'] = '';
            $scope.error['request_otp'] = false;
            
            User.requestOtpCode(
                {
                    email: this.email
                },
                function(res){
                    me.requestCodeOk = true;
                    $scope.message['request_otp'] = res.message;
                    me.initOtpForm(res.otp_key);
                    console.log(res);
                },
                function(res){
                    if(res.status == 400){
                        $scope.message['request_otp'] = res.data.message;
                        $scope.error['request_otp'] = true;
                    }
                }
            );
            
            console.log(this.email);
        };
        
        this.renewPassword = function(){
            this.showPasswordForm = false;
            $scope.message['renew_pass'] = '';
            $scope.error['renew_pass'] = false;
            User.renewPassword(
                {
                    otp_key: this.otp.key,
                    otp_code: this.otp.code,
                    new_pass: this.password.new_pass
                },
                function(res){
                    me.initOtpForm('');
                    $scope.message['renew_pass'] = res.message;
                    //console.log(res);
                },
                function(res){
                    if(res.status == 400){
                        $scope.message['renew_pass'] = res.data.message;
                        $scope.error['renew_pass'] = true;
                    }
                }
            );
        };
        
        
        
    }
]);

