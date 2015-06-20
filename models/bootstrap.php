<?php
$_models = array(
    'User',
    'Task',
    'Token',
    'Role',
    'Priority',
    'Progress',
    'Comment',
    'Setting',
    'Otp'
);

foreach($_models as $k => $model){
    require_once dirname(__FILE__) . '/' . $model . '.php';
}
    