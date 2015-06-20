<?php
namespace Slim\libs\Middleware;
    
class Authentication{
    
    private $config = array(
        'auth_field' => array(
            'identity' => 'email',
            'credential' => 'password'
        ),
        'admin'=>false,
        'login_route' => '/login'
    );
    
    private $identity;
    
    public function __construct($_config=array()){

        $this->config = array_merge($this->config, $_config);
    }
    
    public function authenticate($_identity, $_credential){
        
        $identity_field = $this->config['auth_field']['identity'];
        $credential_field = $this->config['auth_field']['credential'];
        
        $cond = "active=1 AND $identity_field=?";
        //$identity = $this->db->select('vl_user', $cond, array(':identity'=>$_identity));
        $identity = $this->db->user()->select('*')->where($cond, $_identity);
        
        if(count($identity) == 0){
            return -1; // Idenity no found
        }
        
        if(Bcrypt::checkPassword($_credential, $identity[0][$credential_field])){
            
            if($this->config['admin'] == true){
               $_SESSION['backend.authenticated'] = true;
            }
            else{
                $_SESSION['frontend.authenticated'] = true;
            }
            
            return 1;
        }
        
        return 0; // Wrong password
        
    }
    
    public function isAuthenticated(){
        if($this->config['admin'] == true)
            return isset($_SESSION['backend.authenticated']) && $_SESSION['backend.authenticated'] == true;
        
        return isset($_SESSION['frontend.authenticated']) && $_SESSION['frontend.authenticated'] == true;
    }
    
    public function getId(){
        return isset($identity[0]['id']) ? $identity[0]['id'] : 0;
    }
    
    public function setInfo($k, $v){
        $info = array();
        if(isset($_SESSION['backend.info']))
            $info = $_SESSION['backend.info'];
        
        $info[$k] = $v;
        $_SESSION['backend.info'] = $info;
    }
    
    public function getLoginUrl(){
        if($this->config['admin'] == true){
            return '/admin/' . $this->config['login_route'];
        }
        
        return $this->config['login_route'];
    }
}