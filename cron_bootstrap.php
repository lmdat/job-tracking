<?php
//error_reporting(0);

require_once dirname(__FILE__) . '/vendor/autoload.php';
require_once dirname(__FILE__) . '/config/config.php';
require_once dirname(__FILE__) . '/libs/bcrypt/Bcrypt.php';
require_once dirname(__FILE__) . '/models/bootstrap.php';
require_once dirname(__FILE__) . '/libs/phpmailer/PHPMailerAutoload.php';
require_once dirname(__FILE__) . '/libs/utils/Vii.php';


/*---------------------------------------------------------------------*/

//Set timezone
date_default_timezone_set($assets['timeZone']);

//Bootstrap Database
use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;
$capsule->addConnection($db_config);

/*
// Set the event dispatcher used by Eloquent models... (optional)
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;
$capsule->setEventDispatcher(new Dispatcher(new Container));
*/
// Make this Capsule instance available globally via static methods... (optional)
$capsule->setAsGlobal();

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
$capsule->bootEloquent();


