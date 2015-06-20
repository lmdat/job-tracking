'use strict';

angular.module('tasks').directive('onFinishRender', ['$timeout',
    function($timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                if(scope.$last === true){
                    $timeout(function(){
                        scope.$emit('ngScrollTodayTask');
                    });
                }
            }
        };
    }
]);