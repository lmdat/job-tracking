<?php
namespace Slim\libs\Middleware\Token;

class TokenAuthorization extends \Slim\Middleware{
    
    private $unAuthorizedUrl = array();
    
    public function __construct(){
        
        $this->unAuthorizedUrl = array(
            '/users/acl',
            '/users/authenticate',
            '/user/forget-password/otp',
            '/user/forget-password'
        );
    }
    
    private function denyAccessUri() {
        $this->app->response->setStatus(401);
        $rs = array(
            'message' => 'The access token is expired. Please sign-in again.'
        );
        
        $this->app->response()->header("Content-Type", "application/json");
        echo json_encode($rs);
    }
    
    public function call(){
        $app = $this->app;
        
        /*$isAuthorized = function() use($app){
            
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
        */
        
        $uri = $app->request->getResourceUri();
        
        if($uri != '/' && substr($uri, -1) == '/'){
            $uri = substr($uri, 0, -1);
        }
        
        if(in_array($uri, $this->unAuthorizedUrl)){
            $this->next->call();
        }
        else{
            
            $access_token = $app->request->headers->get('Authorized-Token');
            
            if($app->auth->validateToken($access_token)){
                $this->next->call();
            }
            else{
                $this->denyAccessUri();
            }
            
            //$this->denyAccessUri();
        }
        
    }
}
