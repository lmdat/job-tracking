'use strict';

angular.module('users').directive('userList', ['User', 'Notify',
    function(User, Notify){
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'public/modules/users/views/list-users.template.html',
            link: function(scope, element, attrs){
                Notify.getMessage('$refreshUserList', function(event, data){
                    //scope.userCtrl.users = User.query();
                    scope.userCtrl.getUserList();
                });
            }
        };
    }
]);



angular.module('users').directive('compareTo', [
    function(){
        return {
            require: "ngModel",
            
            link: function(scope, element, attrs, ctrl){
                var myPassword = '#' + attrs.compareTo;
                element.add(myPassword).on('keyup', function(){
                    
                    scope.$apply(function(){
                        //var v = ();
                        ctrl.$setValidity('pwdMatched', element.val() === $(myPassword).val());
                    });
                });
            }
        };
    }
]);