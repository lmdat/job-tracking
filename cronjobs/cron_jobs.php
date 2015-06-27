<?php
if(php_sapi_name() != 'cli') die();

define('IS_CRON', 1);

require_once __DIR__ . '/../cron_bootstrap.php';

$loader = new Twig_Loader_Filesystem( __DIR__ . '/views');
$loader->addPath(__DIR__ . '/views/email_template', 'email_template');
//$loader->addPath('./views/quiz', 'quiz');

$twig = new Twig_Environment($loader, array());

$cron_list = [
    'remind_job'=>'remind_user_jobs'
];

$arg = $argv[1];

if(isset($cron_list[$arg])){
    require_once __DIR__ . '/' . $cron_list[$arg] . '.php';
}
