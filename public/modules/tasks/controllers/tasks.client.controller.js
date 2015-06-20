'use strict';

var taskModuleCtrl = angular.module('tasks');

taskModuleCtrl.controller('TaskController', ['$scope', '$rootScope', '$stateParams', '$location', '$modal', '$log', 'User', 'Task', '$document', '$localStorage',
    function($scope, $rootScope, $stateParams, $location, $modal, $log, User, Task, $document, $localStorage){
        var me = this;
        
        //Months
        var months_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        $scope.months = [];
        this.current_month = moment().month();
        for(var i=0;i<12;i++){
            var selected_month = (i == this.current_month) ? 'selected' : '';
            $scope.months.push({text: months_name[i], value: i, selected: selected_month});
        }
        
               
        //Years
        $scope.years = [];
        this.current_year = moment().year(); 
        for(var j=2015;j<=moment().year();j++){
            var selected_year = (j == this.current_year) ? 'selected' : '';
            $scope.years.push({text: j, value: j, selected: selected_year});
        }
        
        
        this.tasks = [];
        
        this.getTasksList = function(){
            
            Task.query(
                {
                    uid: $localStorage.auth.user.id,
                    date: this.current_year + '-' + (parseInt(this.current_month) + 1)
                },
                function(res){
                    me.tasks = res;
                }
            );
        };
        
        this.changeDate = function(){
            this.getTasksList();
        };
                
                
        this.createTaskModal = function(size){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'public/modules/tasks/views/create-task.client.view.html',
                controller: function($scope, $modalInstance){
                    $scope.ok = function(){
                        if(!taskForm.$invalid){
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
                
            }, function(){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        
        this.updateTaskModal = function(size, selectedItem){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'public/modules/tasks/views/edit-task.client.view.html',
                controller: function($scope, $modalInstance, item){
                    $scope.selected_task = item;
                                        
                    $scope.ok = function(){
                        //if(!taskForm.$invalid){
                            $modalInstance.close();
                        //}
                    };
                    
                    $scope.cancel = function(){
                        $modalInstance.dismiss('cancel');
                    };
                    
                },
                size: size,
                resolve: {
                    item: function(){
                        return selectedItem;
                    }
                }
            });
            
            modalInstance.result.then(
                function(){
                    
                },function(){
                    console.log('Modal dismissed at: ' + new Date());
                }
            );
        };
        
        this.selectedItem = moment().format('YYYY-MM-DD');
        
        this.selectedDate = function(item){
            this.selectedItem = item;
        };
        
        this.isActive = function(item){
            return this.selectedItem === item;
        };
        
        this.deleteTask = function(item){
            
            if(window.confirm('All data of this task will be taken out. Do you really want to delete?')){
                Task.delete(
                    //params list
                    {
                        uid: item.user_id,
                        tid: item.id
                    },
                    function(res){
                        me.getTasksList();
                        //console.log(res);
                    }
                );
            }
        };
        
        /*
        this.initScroll = function(today, id){
            if(today){
                id = moment(id).format('YYYYMMDD');
                var today_item = angular.element(document.getElementById(id));
                //$document.scrollToElementAnimated(today_item);
                //console.log(id);
            }
        }*/
        
        $scope.$on('ngScrollTodayTask', function(event){
            var id = moment().format('YYYYMMDD');
            var today_item = angular.element(document.getElementById(id));
            $document.scrollToElementAnimated(today_item, 50, 800);
        });
        
        $rootScope.$on('$refreshTaskList', function(event, data){
            me.getTasksList();
        });      
    }
]);

taskModuleCtrl.controller('CreateTaskController', ['$scope', '$rootScope', 'User', 'Priority', 'Task', '$localStorage',
    function($scope, $rootScope, User, Priority, Task, $localStorage){
        var me = this;
        
        this.showCreateForm = false;
        
        this.user_id = {};
        
        this.priority_list = Priority.query();
        
        this.users = User.getUsersWithRole(
            {
                uid: $localStorage.auth.user.id,
                role_id: $localStorage.auth.user.role_powering
            },
            function(res){
                me.showCreateForm = true;
            }
        );
        
        this.start_date = moment().format('YYYY-MM-DD');
        
        this.datePicker = {
            opened: {},
            dateFormat: 'yyyy-MM-dd',
            dateOptions: {},
            open: function($event, ele){
                $event.preventDefault();
                $event.stopPropagation();
                me.datePicker.opened[ele] = true;
            }
            
        };
        
        this.createTask = function(){
            var task = new Task({
                task_name: this.task_name,
                priority_id: this.priority_id,
                start_date: moment(this.start_date).format('YYYY-MM-DD'),
                end_date: moment(this.end_date).format('YYYY-MM-DD'),
                description: this.description,
                user_id: this.user_id.selected.id,
                created_by: $localStorage.auth.user.id
                
            });
            
            
            task.$save(
                {
                    uid: $localStorage.auth.user.id
                },
                function(res){
                    $rootScope.$emit('$refreshTaskList');
                //console.log(res.id);
                },function(res){
                    console.log(res);
                }
            );
            
            //console.log(task);
            
        };
        
    }
]);


taskModuleCtrl.controller('UpdateTaskController', ['$scope', '$rootScope', 'User', 'Priority', 'Task', '$localStorage',
    function($scope, $rootScope, User, Priority, Task, $localStorage){
        var me = this;
        
        this.showUpdateForm = false;
                
        this.datePicker = {
            opened: {},
            dateFormat: 'yyyy-MM-dd',
            dateOptions: {},
            open: function($event, ele){
                $event.preventDefault();
                $event.stopPropagation();
                me.datePicker.opened[ele] = true;
            }
            
        };
        
        this.users = [];
        this.user_id = {selected: null};
        
        User.getUsersWithRole(
            {
                uid: $localStorage.auth.user.id,
                role_id: $localStorage.auth.user.role_powering
            },
            function(res){
                me.users = res;

                for(var i=0;i<res.length;i++){
                    if(res[i].id == $scope.selected_task.user_id){
                        me.user_id.selected = res[i];
                        break;
                    }
                }
            }
        );
        
        this.priority_list = Priority.query();
                    
        this.task = {};
                
        this.initUpdateForm = function(){
            console.log($scope.selected_task);
            Task.get(
                {
                    uid: $scope.selected_task.user_id,
                    tid: $scope.selected_task.id
                },
                function(res){
                    me.task = res;
                    me.showUpdateForm = true;
                    
                    console.log(res);
                },
                function(res){
                    //Error
                    console.error(res);
                }
            );
        };
        
        
        this.updateTask = function(){
            
            this.task.user_id = this.user_id.selected.id;
            
            this.task.$update(
                {
                    uid: $localStorage.auth.user.id
                },
                function(res){
                    console.log(res);
                    $rootScope.$emit('$refreshTaskList');
                },
                function(res){
                    
                }
            );  
            
        };
        
    }
]);


taskModuleCtrl.controller('UserTasksController', ['$scope', '$stateParams', '$state', '$timeout', '$interval', 'Task', 'TaskProgress', 'TaskComment', '$localStorage',
    function($scope, $stateParams, $state, $timeout, $interval, Task, TaskProgress, TaskComment, $localStorage){
        var me = this;
        
        this.user_id = $localStorage.auth.user.id;
        
        //console.log($state.params);
        this.showUserTasksList = false;        
        this.userTasksList = [];
        
        this.showProgressList = false;
        $scope.selectedTask = {};
        this.progressList = [];
        
        this.toggleOngoingTaskList = true;
        
        this.showCommentsList = {};
        this.toggleCommentsList = {};
        this.modelCommentText = {};
        $scope.isToggleComments = false;
        this.commentsList = {};
        
        //console.log("$state User Id: " + $state.params.user_id);
        //console.log("$stateParams User Id: " + $stateParams.user_id);
        
        this.getUserTasksList = function(){
            this.toggleOngoingTaskList = true;
            this.showUserTasksList = false;
            $scope.task_message = '';
            $scope.message = '';

            Task.userTasks(
                {
                    uid: $stateParams.user_id
                },
                function(res){
                    
                    $timeout(function(){
                        me.userTasksList = res;
                    });
                    
                    if(res.length == 0){
                        $scope.message_type = 'warning';
                        $scope.task_message = 'No Tasks are found.';
                    }
                    
                    me.showUserTasksList = true;
                    
                    console.log(res);
                    
                },
                function(res){
                    $scope.message_type = 'error';
                    $scope.task_message = res.data.message;
                    me.showUserTasksList = true;
                }
            );
        };
                        
        this.getProgressList = function(item){
            this.showProgressList = false;
            $scope.message_type = '';
            $scope.progress_message = '';
            
            this.toggleCommentsList = {};
            this.showCommentsList = {};
            this.commentsList = {};
            $scope.save_comment_message = {};
            
            
            //console.log($stateParams.user_id + " - " + task_id);
            $scope.selectedTask = item;
            
                       
            TaskProgress.query(
                {uid: $stateParams.user_id, tid: item.id},
                function(res){
                    
                    $timeout(function(){
                        me.progressList = res;
                        for(var i=0; i<me.progressList.length;i++){
                            me.progressList[i].created = moment(me.progressList[i].created).format('DD/MM/YYYY hh:mm A');
                        }
                    });
                    
                    if(res.length == 0){
                        $scope.message_type = 'warning';
                        $scope.progress_message = 'No Updated Progresses are found.';
                    }
                    
                    me.showProgressList = true;
                },
                function(res){
                    $scope.message_type = 'error';
                    $scope.progress_message = res.data.message;
                    me.showProgressList = true;
                }
            );
            
        };
        
        this.getCommentsList = function(item, isShow){
            this.showCommentsList[item.id.toString()] = false;
            this.toggleCommentsList[item.id.toString()] = isShow;
            //this.modelCommentText[item.id.toString()] = '';
            
            //$scope.comment_message = '';
            $scope.save_comment_message[item.id.toString()] = '';
            $scope.message_type = '';
            
            if(isShow){            
                TaskComment.query(
                    {
                        uid: $stateParams.user_id,
                        tid: item.task_id,
                        pid: item.id
                    },
                    function(res){

                        $timeout(function(){
                            
                            for(var i=0; i<res.length;i++){
                                res[i].created = moment(res[i].created).format('DD/MM/YYYY hh:mm A');
                            }
                            me.commentsList[item.id] = res;
                        });

                        if(res.length == 0){
                            $scope.comment_message = 'No comments are found.';
                            $scope.message_type = 'warning';
                        }

                        me.showCommentsList[item.id.toString()] = true;
                        console.log(res);
                    },
                    function(res){
                        $scope.comment_message = res.data.message;
                        $scope.message_type = 'error';
                        me.showCommentsList[item.id.toString()] = true;
                    }
                );
            }
        };
        
        this.saveComment = function(item){
            
            $scope.save_comment_message[item.id.toString()] = '';
            $scope.message_type = '';
            
            var comment = new TaskComment({
                task_id: item.task_id,
                progress_id: item.id,
                content: this.modelCommentText[item.id.toString()],
                comment_by: $localStorage.auth.user.id
                
            });
            
            comment.$save(
                {
                    uid: $stateParams.user_id,
                    tid: item.task_id,
                    pid: item.id
                },
                function(res){
                    me.getCommentsList(item, true);
                    console.log(res);
                },
                function(res){
                    if(res.status == 400){
                        $scope.save_comment_message[item.id.toString()] = res.data.message;
                        $scope.message_type = 'error';
                    }
                    
                }
            );
            
            me.modelCommentText[item.id.toString()] = '';

        };
        
        this.deleteComment = function(item, progress){
            //console.log('User Id: ' + this.user_id);
            //console.log('Task Id: ' + item.task_id);
            //console.log('Progress Id: ' + item.progress_id);
            //console.log('Id: ' + item.id);
            
            TaskComment.delete(
                //Params list
                {
                    uid: $stateParams.user_id,
                    tid: item.task_id,
                    pid: item.progress_id,
                    cid: item.id
                },
                function(res){
                    me.getCommentsList(progress, true);
                    console.log(res);
                }
            );
        };
        
        this.refreshUserTaskList = function(){
            /*
            if(!angular.isUndefined($stateParams.task_id)){
                $state.go('user-tasks', {user_id: $stateParams.user_id});
                return;
            }
            */
            //$state.go($state.current, {}, {reload: true});
            $state.go('user-tasks', {user_id: $stateParams.user_id}, {reload: true});
            
        };
        
        this.showTaskDetail = function(item){
            if(item == null){
                if(angular.isDefined($stateParams.task_id)){
                    this.toggleOngoingTaskList = false;

                    Task.userTask(
                        {
                            uid: $stateParams.user_id, tid: $stateParams.task_id
                        },
                        function(res){
                            //me.toggleOngoingTaskList = false;
                            me.getProgressList(res);
                            console.log(res);
                        },
                        function(res){
                        }
                    );    
                }
            }
            else{
                this.getProgressList(item);
            }
            
        };
        
        
        var _stopRefreshComments = {};
        var _timeout = 30;//seconds
        this.refreshComments = function(item){
            //console.log('Refresh comments list interval');
            if (angular.isDefined(_stopRefreshComments[item.id])) return;
            
            _stopRefreshComments[item.id] = $interval(function(){
                if(me.toggleCommentsList[item.id]){
                    me.getCommentsList(item, me.toggleCommentsList[item.id]);
                    //console.log('Start interval for: ' + item.id);
                }
                else{
                    if (angular.isDefined(_stopRefreshComments[item.id])){
                        $interval.cancel(_stopRefreshComments[item.id]);
                        _stopRefreshComments[item.id] = undefined;
                        //console.log('Cancel interval for: ' + item.id);
                    }
                }
            }, _timeout * 1000);    
            
            
        };
        
    }
]);



