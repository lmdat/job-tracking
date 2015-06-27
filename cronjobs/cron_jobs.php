<?php
if(php_sapi_name() != 'cli') die();

define('IS_CRON', 1);

require_once __DIR__ . '/../cron_bootstrap.php';

$loader = new Twig_Loader_Filesystem( __DIR__ . '/views');
$loader->addPath(__DIR__ . '/views/email_template', 'email_template');
//$loader->addPath('./views/quiz', 'quiz');

$twig = new Twig_Environment($loader, array());

$jobs = [
    'remind_user_jobs'
];


foreach($jobs as $job){
    require_once __DIR__ . '/' . $job . '.php';
}