<?php

$assets = array(
    
    'timeZone'=>'Asia/Saigon',
    'expiredTokenTime' => 120, //mins
    
    'lib'=>array(
        'cssFiles'=>array(
            'public/lib/bootstrap/dist/css/bootstrap.min.css',
            'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
            'public/lib/angular-ui-select/dist/select.min.css',
            'public/lib/fontawesome/css/font-awesome.min.css',
            
            
        ),
        'jsFiles'=>array(
            'public/lib/jquery/dist/jquery.min.js',
            //'public/lib/bootstrap/dist/js/bootstrap.min.js',
            'public/lib/angular/angular.min.js',
            'public/lib/angular-resource/angular-resource.min.js',
            'public/lib/angular-cookies/angular-cookies.min.js',
            'public/lib/angular-animate/angular-animate.min.js',
            'public/lib/angular-touch/angular-touch.min.js',
            'public/lib/angular-sanitize/angular-sanitize.min.js',
            'public/lib/angular-ui-router/release/angular-ui-router.min.js',
            'public/lib/angular-ui-utils/ui-utils.min.js',
            'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'public/lib/moment/min/moment.min.js',
            'public/lib/angular-ui-select/dist/select.min.js',
            'public/lib/ngscrollbar/ngscrollbar.js',
            'public/lib/angular-scroll/angular-scroll.min.js',
            'public/lib/ngstorage/ngStorage.min.js',
            'public/lib/ng-text-truncate/ng-text-truncate.js'
            
            
        )
    ),
    'local'=>array(
        'cssFiles'=>array(
            'public/local/css/google-font.css',
            'public/local/css/select2.min.css',
            'public/local/css/main.css',
            'public/local/css/animate.css'
        ),
        
        'jsFiles'=>array()
    ),
    'js'=>array(
        'public/config.js',
        'public/application.js',
        
        'public/modules/core/core.client.module.js',
        'public/modules/core/config/core.client.routes.js',
        'public/modules/core/services/core.client.service.js',
        'public/modules/core/controllers/core.client.controller.js',
        
        'public/modules/users/users.client.module.js',
        'public/modules/users/config/users.client.config.js',
        'public/modules/users/config/users.client.routes.js',
        'public/modules/users/services/users.client.service.js',
        'public/modules/users/services/authentication.client.service.js',
        
        'public/modules/users/directives/users.client.directive.js',
        
        'public/modules/users/controllers/users.client.controller.js',
        'public/modules/users/controllers/authentication.client.controller.js',
        
        'public/modules/tasks/tasks.client.module.js',
        'public/modules/tasks/config/tasks.client.config.js',
        'public/modules/tasks/config/tasks.client.routes.js',
        'public/modules/tasks/services/tasks.client.service.js',
        'public/modules/tasks/directives/tasks.client.directive.js',
        'public/modules/tasks/controllers/tasks.client.controller.js',
        
        
        'public/modules/mytasks/mytasks.client.module.js',
        'public/modules/mytasks/config/mytasks.client.config.js',
        'public/modules/mytasks/config/mytasks.client.routes.js',
        'public/modules/mytasks/services/mytasks.client.service.js',
        
        'public/modules/mytasks/controllers/mytasks.client.controller.js'
        
    )
);


/*
$db_local = array(
    'dsn'=>'mysql:host=localhost;dbname=task_tracking_db;charset=utf8',
    'username'=>'root',
    'password'=>''
);

$db_production = array(
    'dsn' => "mysql:host=localhost;dbname=songmi78_mbti_db;charset=utf8",
    'username' => 'songmi78_mbti_u',
    'password' => 'rthb@43170'
);
*/

$db_local = [
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'task_tracking_db',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => 'tt_',
];

$db_production = [
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'songmi78_mbti_db',
    'username'  => 'songmi78_mbti_u',
    'password'  => 'rthb@43170',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => 'tt_',
];

$db_config = $db_local;