<?php namespace App\Libs\Utils;

class Vii{
    
    public static function guid($domain='', $brace=false, $dash=true){
        
        if (function_exists('com_create_guid')){
            $guid = com_create_guid();
            
            if(!$dash)
                $guid = str_replace('-', '', $guid);
            if(!$brace)
                $guid = trim($guid, '{}');
            
            return strtolower($guid);
        }
                
        $src = sha1(uniqid($domain) . time() . ((double)microtime() * 10000));
        $hyphen = ($dash == true) ? '-' : '';
        $guid = substr($src, 0, 8) . $hyphen
                .substr($src, 8, 4) . $hyphen
                .substr($src, 12, 4) . $hyphen
                .substr($src, 16, 4) . $hyphen
                .substr($src, 20, 12);

        return ($brace == true) ? '{' . $guid . '}' : $guid;
    }
    
    public static function pr($obj){
        echo "<pre>";
        print_r($obj);
        echo "</pre>";
    }
    
    public static function createOTP($key_len=9, $code_len=7){
		
		$rs = [];

		$_range = [];
		for($j=0;$j<($key_len/3);$j++){
			while(true){
				$num = mt_rand(100, 999);
				if(!in_array($num, $_range)){
					$_range[] = $num;
					break;
				}
			}
		}
        
		shuffle($_range);
        $_key = implode('', $_range);
		$rs['otp_key'] = $_key;
        
		$_code = '';
		for($i=0;$i<$code_len;$i++){
			$k = 0;
			if($i % 2 == 1)
				$k = 1;
			$_code .= mt_rand($k, 9);
		}
		
		$rs['otp_code'] = $_code;
        $rs['otp_hash'] = sha1($_key . '@' . $_code);
		return $rs;
	}	
    
    public static function getMailer($cfg=null){
        //use App\Models\Setting;
        
        $setting = \App\Models\Setting::find(1);
        $setting_data = json_decode($setting->setting_data, true);
        if($cfg == null)
            $cfg = $setting_data['smtp']; 
        
        $mailer = new \PHPMailer();
        $mailer->isSMTP();
        $mailer->CharSet = 'utf-8';
        if($cfg['secure'] == 'ssl'){
            $mailer->SMTPSecure = 'ssl';
            //$mailer->SMTPSecure = 'tls';
        }
        $mailer->Port = intval($cfg['port']);
        $mailer->Host = $cfg['host_name'];  // Specify main and backup SMTP servers
        if($cfg['username'] != '' && $cfg['password'] != ''){
            $mailer->SMTPAuth = true;               // Enable SMTP authentication
            $mailer->Username = $cfg['username'];   // SMTP username
            $mailer->Password = $cfg['password'];
        }
        $mailer->From = $cfg['email_sender'];
        $mailer->FromName = $cfg['sender_name'];
        
        return $mailer;
        
    }
    
    public static function getStatusTaskName(){
        return ['0'=>'Pending', '1'=>'Ongoing', '2'=>'Completed'];
    }
}
