<?php
require_once 'bootstrap.php';

//Create App instance
$app = new \Slim\Slim(array(
    'debug' => true,    'log.enabled' => true,
    'log.writer' => new \Slim\Extras\Log\DateTimeFileWriter()
));
//$app->log->setEnabled(true);
//$app->log->setLevel(\Slim\Log::DEBUG);

$app->add(new \Slim\Extras\Middleware\Jsonp());

//Create template instance
$loader = new Twig_Loader_Filesystem('./views');
//$loader->addPath('./views/admin', 'admin');
//$loader->addPath('./views/quiz', 'quiz');

$twig = new Twig_Environment($loader, array());


/*-----------------------------------------------------------------------------*/
$app->get('/', function () use($app, $twig, $assets) {
    echo $twig->render(
        'index.html',
        array(
            'assets'=>$assets
        )
    );
    
});

$app->run();