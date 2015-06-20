'use strict';

var AppConfiguration = (function(){
    
    var appModuleName = "jobTrackingApp";
    var appModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils', 'ui.select', 'widget.scrollbar', 'duScroll', 'ngStorage', 'ngTextTruncate' ];
    
    var registerModule = function(moduleName, dependencies){
        angular.module(moduleName, dependencies || []);
        
        // Add the module to the AngularJS configuration file
		angular.module(appModuleName).requires.push(moduleName);
    };
    
    var globalConfig = {
        apiUrl: 'api/v1',
    };
    
    return {
        config: globalConfig,
        appModuleName: appModuleName,
		appModuleVendorDependencies: appModuleVendorDependencies,
		registerModule: registerModule
    };
    
})();