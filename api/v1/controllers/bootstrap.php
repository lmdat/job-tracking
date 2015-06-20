<?php
$controllers = array(
    'users',
    'tasks',
    'dashboard',
    'settings'
);

foreach($controllers as $k => $ctrl){
    require_once dirname(__FILE__) . '/' . $ctrl . '.controller.php';
}
