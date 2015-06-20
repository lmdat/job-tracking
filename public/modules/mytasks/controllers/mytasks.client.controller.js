'use strict';

var myTaskModuleCtrl = angular.module('mytasks');

myTaskModuleCtrl.controller('MyTasksController', ['$scope', '$rootScope', '$http', 'MyTask', '$localStorage', 
    function($scope, $rootScope, $http, MyTask, $localStorage){
                        
        var me = this;
        
        this.myTasks = [];
                
        this.refreshMyTaskList = function(){

            MyTask.query(
                {
                    uid: $localStorage.auth.user.id
                },
                function(res){
                    me.myTasks = res;
                },
                function(res){
                    me.myTasks = [];
                    //Error
                }
            );
        };
        
        this.error_msg = '';
        this.startMyTask = function(task_id){
            
            MyTask.start({uid:$localStorage.auth.user.id}, {'tid': task_id}, function(res){
                me.error_msg = '';
                me.refreshMyTaskList();
                console.log(res);
                
            }, function(res){
                
                me.error_msg = res.error;
                console.log(res);
                
            });
            
            console.log(this.error_msg );
            
        };
        
        this.selectedItem = '';
        
        this.selectedTask = function(item){
            this.selectedItem = item;
        };
        
        this.isHide = function(item){
            return this.selectedItem !== item;
        };
        
        this.updateProgress = function(task_id){
            $rootScope.$emit('$updateProgress', {tid: task_id});
            console.log('Update Progress, id: ' + task_id);
        };
        
        
        $rootScope.$on('$CompletedProgress', function(event, data){
            me.refreshMyTaskList();
        });
    }
]);

myTaskModuleCtrl.controller('NewTasksController', ['$scope', '$rootScope', '$timeout', 'MyTask', '$localStorage',
    function($scope, $rootScope, $timeout, MyTask, $localStorage){
        var me = this;
        
        this.newTasksList = [];
        this.showTasksList = false;
        
        this.getNewTasksList = function(){
            MyTask.query(
                 {
                     uid: $localStorage.auth.user.id,
                     status: 0
                 },
                 function(res){
                                          
                     $timeout(function(){
                         me.newTasksList = res;
                     });
                     
                     me.showTasksList = true;
                     
                     console.log(res);
                 },
                 function(res){

                 }
            ); 
        };//getNewTasksList
        
        this.error_msg = '';
        this.startNewTask = function(task_id){
            this.showTasksList = false;
            
            MyTask.start(
                {
                    uid:$localStorage.auth.user.id 
                },
                {
                    tid: task_id
                }, 
                function(res){
                    me.error_msg = '';
                    $rootScope.$emit('$refreshOngoingTasks');
                    me.getNewTasksList();
                    console.log(res);
                
                },
                function(res){
                
                    me.error_msg = res.error;
                    console.log(res.error);
                
                }
            );
            
            //console.log(task_id);
            
        };//startNewTask
        
        
        
    }
]);


myTaskModuleCtrl.controller('OngoingTasksController', ['$scope', '$rootScope', '$timeout', 'MyTask', '$localStorage',
    function($scope, $rootScope, $timeout, MyTask, $localStorage){
        var me = this;
        
        this.ongoingTasksList = [];
        
        this.showOngoingTasksList = false;
        
        this.getOngoingTasksList = function(){
            this.showOngoingTasksList = false;
             MyTask.query(
                 {
                     uid: $localStorage.auth.user.id,
                     status: 1
                 },
                 function(res){
                     me.showOngoingTasksList = true;
                     
                     $timeout(function(){
                         me.ongoingTasksList = res;
                     });
                     console.log(res);
                 },
                 function(res){
                     
                 }
             ); 
        };//getOngoingTasksList
        
        
        this.selectedItem = '';
        
        this.selectedTask = function(item){
            this.selectedItem = item;
        };
        
        this.isHide = function(item){
            return this.selectedItem !== item;
        };
        
        this.updateProgress = function(event, task_id){
            
            var offsetTop = angular.element(event.target).closest('.mytask-item').offset().top;
            console.log(task_id);
            $scope.$broadcast('$updateProgress', {tid: task_id, top: offsetTop});

        };//updateProgress
        
        
        
        $rootScope.$on('$refreshOngoingTasks', function(event, data){
            me.getOngoingTasksList();
        });
        
        $scope.$on('$refreshOngoingTasks', function(event, data){
            me.getOngoingTasksList();
        });
        
    }
]);


myTaskModuleCtrl.controller('CompletedTasksController', ['$scope', '$rootScope', 'MyTask', '$localStorage',
    function($scope, $rootScope, MyTask, $localStorage){
        var me = this;
        
        this.completedTasksList = [];
        
        
        this.getCompletedTasksList = function(){
             MyTask.query(
                 {
                     uid: $localStorage.auth.user.id,
                     status: 2
                 },
                 function(res){
                     console.log('Completed');
                     console.log(res);
                     me.completedTasksList = res;
                 },
                 function(res){
                     
                 }
             ); 
        };//getCompletedTasksList
        
        
        this.selectedItem = '';
        
        this.selectedTask = function(item){
            this.selectedItem = item;
        };
        
        this.isHide = function(item){
            return this.selectedItem !== item;
        };
        
        this.viewProgress = function(event, task_id){
            
            var offsetTop = angular.element(event.target).closest('.mytask-item').offset().top;
            console.log(task_id);
            $scope.$broadcast('$viewProgress', {tid: task_id, top: offsetTop});

        };//updateProgress
        
        
        
        $rootScope.$on('$refreshCompletedTasks', function(event, data){
            me.getCompletedTasksList();
        });
        
    }
]);



myTaskModuleCtrl.controller('ProgressController', ['$scope', '$rootScope', '$http', '$interval', '$timeout', 'Progress', 'Comment', '$localStorage', 
    function($scope, $rootScope, $http, $interval, $timeout, Progress, Comment, $localStorage){
        var me = this;
        
        this.showForm = false;
        
        this.showProgressList = false;
        
        $scope.toggleComments = false;
        $scope.showCommentsList = false;
        
        this.selectedTaskId = '';
        
        this.rate = {};
        
        this.progressList = [];
        
        this.user_id = $localStorage.auth.user.id;
            
        this.completedPercent = [];
        this.initCompletedPercent = function(){
            for(var i=5,j=0;i<=100;i+=5,j++){
                this.completedPercent[j] = {text: 'Completed ' + i + '%', value: i}
            }
        }
        
        
        this.getListProgress = function(task_id){
            
            this.toggle_comments = {};
            this.showProgressList = false;
            Progress.query({uid: $localStorage.auth.user.id, tid: task_id}, function(res){
                
                $timeout(function(){
                    
                    me.progressList = res;
                    for(var i=0; i<me.progressList.length;i++){
                        me.progressList[i].created = moment(me.progressList[i].created).format('DD/MM/YYYY hh:mm A');
                    }
                    
                    me.showProgressList = true;
                }, 1000);
                
                
            }, function(res){
                me.showProgressList = false;
                me.progressList = [];
            });
            
        };
        
                
        //Save progress
        this.saveProgress = function(){
            
            //this.progressList = [];
            var progress = new Progress({
                task_id: this.selectedTaskId,
                note: this.note,
                rate: this.rate.selected.value,
                created_by: $localStorage.auth.user.id
                
            });
            
            progress.$save(function(res){
                                
                if(me.rate.selected.value == 100){
                    $rootScope.$emit('$refreshCompletedTasks');
                    $scope.$emit('$refreshOngoingTasks');
                    me.showForm = false;
                }
                else{
                    me.getListProgress(me.selectedTaskId);
                }
                
                me.note = '';
                console.log(res);
                
            }, function(res){
                
                console.log(res);
                
            });
            
            
            console.log(this.rate.selected.value);
        }
        
        $scope.toggleUpdateForm = false;
        this.update_model_content = {};
        this.update_model_rate = {};
        this.update_toggle_form = {};
        
        this.updateProgress = function(item){
            console.log(item.id);
            
            var progress = new Progress({
                id: item.id,
                task_id: item.task_id,
                note: this.update_model_content[item.id],
                rate: this.update_model_rate[item.id].selected.value,
                modified_by: $localStorage.auth.user.id
            });
            
            progress.$update(function(res){
                
                if(res.task_completed == true){
                    $rootScope.$emit('$refreshCompletedTasks');
                    $scope.$emit('$refreshOngoingTasks');
                    me.showForm = false;
                }
                else{
                    item.note = res.note;
                    item.rate = res.rate;
                    me.update_toggle_form[res.id] = false;
                }
                                
                console.log(res);
            }, function(res){
                console.log(res);
            });
        };
        
        this.initUpdateForm = function(item){
            this.update_toggle_form[item.id] = true;
            this.update_model_content[item.id] = item.note;
            this.update_model_rate[item.id] = {};
            this.update_model_rate[item.id].selected = this.completedPercent[(item.rate/5)-1];
        };
        
        
        this.model_comment = {};
        this.postComment = function(progress){
            
            var comment_text = this.model_comment[progress.id];
            
            var comment = new Comment({
                content: comment_text,
                //task_id: this.selectedTaskId,
                task_id: progress.task_id,
                progress_id: progress.id,
                comment_by: $localStorage.auth.user.id
            });
            
            
            comment.$save(function(res){
                
                me.getListComments(progress.id, progress.task_id, true);
                console.log(res);
                
            }, function(res){
                
                console.log('Error');
                console.log(res);
                
            });
            
                        
            this.model_comment[progress.id] = '';
        }
        
        this.deleteComment = function(item, progress){
            
            Comment.delete(
                {
                    uid: $localStorage.auth.user.id,
                    tid: progress.task_id,
                    pid: item.progress_id,
                    cid: item.id
                },
                function(res){
                    me.getListComments(progress.id, progress.task_id, true);
                    console.log(res);
                }
            );
        };
        
        this.comments = {};
        this.toggle_comments = {};
        
        this.getListComments = function(progress_id, task_id, show_comment){
            
            this.toggle_comments[progress_id.toString()] = show_comment;
            //this.comments[progress_id.toString()] = [];
            $scope.showCommentsList = false;
            if(show_comment){
                Comment.query(
                    {
                        uid: $localStorage.auth.user.id,
                        tid: task_id,
                        pid: progress_id
                    }, 
                    function(res){
                        $timeout(function(){
                            for(var i=0; i<res.length;i++){
                                res[i].created = moment(res[i].created).format('DD/MM/YYYY hh:mm A');
                            }
                            me.comments[progress_id.toString()] = res;
                        });
                        
                        $scope.showCommentsList = true;
                        //console.log(res);    
                    },
                    function(res){
                        $scope.showCommentsList = true;
                        console.log('Error');
                        console.log(res);    
                    }
                );
            }
            
        };
        
        var _stopRefreshComments = {};
        var _timeout = 30;//seconds
        this.refreshComments = function(progress_id){
            
            if (angular.isDefined(_stopRefreshComments[progress_id.toString()])) return;
            
            _stopRefreshComments[progress_id.toString()] = $interval(function(){
                if(me.selectedTaskId != '' && me.toggle_comments[progress_id]){
                    me.getListComments(progress_id, me.selectedTaskId, me.toggle_comments[progress_id]);
                    console.log('Start interval for: ' + progress_id.toString());
                }
                else{
                    if (angular.isDefined(_stopRefreshComments[progress_id.toString()])){
                        $interval.cancel(_stopRefreshComments[progress_id.toString()]);
                        _stopRefreshComments[progress_id.toString()] = undefined;
                        console.log('Cancel interval for: ' + progress_id.toString());
                    }
                }
            }, _timeout * 1000);    
            
        };
                
        
        //Load progress list when task is clicked
        $scope.$on('$updateProgress', function(event, data){
            me.showForm = true;
            me.selectedTaskId = data.tid;
            
            me.getListProgress(data.tid);
            
            $timeout(function(){
                angular.element('div#ongoing-progress-list').offset({top: data.top});
            });
        
        });
        
        $scope.$on('$viewProgress', function(event, data){
            me.showForm = true;
            me.selectedTaskId = data.tid;
            
            me.showProgressList = false;
            
            me.getListProgress(data.tid);

            $timeout(function(){
                angular.element('div#completed-progress-list').offset({top: data.top});
            });
        });
    }
]);