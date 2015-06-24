<?php
error_reporting(0);
require_once '../../bootstrap.php';

//Create App instance
$app = new \Slim\Slim(array(
    'debug' => true,
    'log.enabled' => true,
    'log.writer' => new \Slim\Extras\Log\DateTimeFileWriter(['path'=>'../../logs'])
));
//$app->log->setEnabled(true);
//$app->log->setLevel(\Slim\Log::DEBUG);

$app->add(new \Slim\Extras\Middleware\Jsonp());

$app->auth = new \Slim\libs\Middleware\Token\TokenAuthentication();

$app->add(new \Slim\libs\Middleware\Token\TokenAuthorization());

//Create template instance
$loader = new Twig_Loader_Filesystem('./views');
$loader->addPath('./views/email_template', 'email_template');
//$loader->addPath('./views/quiz', 'quiz');

$twig = new Twig_Environment($loader, array());


/*-----------------------------------------------------------------------------*/
require_once 'controllers/bootstrap.php';

$app->run();