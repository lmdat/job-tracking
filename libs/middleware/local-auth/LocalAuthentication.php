<?php
namespace Slim\libs\Middleware;

class LocalAuthentication extends \Slim\Middleware{
    
    
    public function __construct(){

    }
    
    public function call(){
        $app = $this->app;
        
        $isAuthorized = function() use($app){
            
            $uri = $app->request->getResourceUri();
            $parts = explode('/', $uri);
            $n = count($parts);
            $isLoginRoute = false;
            if($n > 0){
                if(preg_match('#^login#i', $parts[$n-1])){
                    $isLoginRoute = true;   
                }
            }
            
            if(!$isLoginRoute && !$app->auth->isAuthenticated()){
                $app->flash('error', 'Password is wrong.');
                return  $app->redirect($app->admin_path . '/login');
            }
            
        };
        
        $app->hook('slim.before.dispatch', $isAuthorized);
        
        $this->next->call();
    }
}
