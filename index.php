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


/*
$app->get('/install', function() use($app){
    //Create the main user once by manually!       
    $data['id'] = App\Libs\Utils\Vii::guid();
    $data['first_name'] = 'Phương';
    $data['surname'] = 'Phạm';
    $data['title'] = 'Manager';
    $data['email'] = 'viphuong@gtvsolutions.vn';
    $data['password'] = \Bcrypt::hashPassword('1234567890');
    $data['salt'] = md5(uniqid() . time());
    $data['main_user'] = 1;
    $data['expired_key'] = '';
    $data['ref_id'] = 0;
    $data['active'] = 1;
    $data['role_id'] = 900;
    
    
    $user = new App\Models\User($data);
    
    if($user->save()){
        echo 'User has created with id: ' . $user->id;
    }
    else{
        echo 'Error';
    }
    
});
*/

$app->run();