<?php
namespace Slim\libs\Middleware\Token;

use App\Models\User;
use App\Models\Token;

class TokenAuthentication{
    
    private $config = array(
        'auth_field' => array(
            'identity' => 'email',
            'password' => 'password'
        ),
        'token_expired' => 90 //mins
    );
    
    private $identity;
    
    public function __construct($_config=array()){

        $this->config = array_merge($this->config, $_config);
    }
    
    public function authenticate($_identity, $_password){
        
        $identity_field = $this->config['auth_field']['identity'];
        $password_field = $this->config['auth_field']['password'];
        
        
        $this->identity = User::where($identity_field, '=', $_identity)            
            //->where('active', '=', 1)
            ->first();
        
        if($this->identity === null)
            return -1; // Idenity no found
        
        if($this->identity->active == 0)
            return -2;
        
        $arr_val = $this->identity->toArray();
        
        if(\Bcrypt::checkPassword($_password, $arr_val[$password_field])){
              
            return $this->createToken();
        }
        
        return 0; // Wrong password
    }
    
    public function validateToken($access_token){
        $token = Token::where('access_token', '=', $access_token)
            ->where('expired_at', '>=', date('Y-m-d H:i:s'))
            ->first();
        
        if($token !== null)
            return true;
        
        return false;
    }
    
    private function createToken(){
        $info = array(
            'id'=>$this->identity->id,
            'first_name'=>$this->identity->first_name,
            'surname'=>$this->identity->surname,
            'email'=>$this->identity->email,
            'role_powering'=>$this->identity->role_id
        );
        
        $b64_info = base64_encode(json_encode($info));
        
        $access_token = hash('sha256', time() . substr($this->identity->salt, rand(0,20), 8));

        $token = Token::where('user_id', '=', $this->identity->id)->first();
        
        if($token === null){
            $token = Token::create(array(
                'user_id'=>$this->identity->id,
                'access_token'=>$access_token,
                'expired_at'=>date('Y-m-d H:i:s', strtotime('+' . $this->config['token_expired'] . ' minute'))
                
            ));
            
        }
        else{
            $token->access_token = $access_token;
            $token->expired_at = date('Y-m-d H:i:s', strtotime('+' . $this->config['token_expired'] . ' minute'));
        }
        
        $token->save();

        return $b64_info . '.' . $access_token;
    }
    
    
}