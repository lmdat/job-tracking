<?php
use App\Models\User;
use App\Models\Task;
use App\Models\Progress;
use App\Models\Comment;
use App\Models\Role;
use App\Models\Otp;
use App\Models\Setting;
use App\Libs\Utils\Vii;

$app->get('/users/except/:except_id(/)', function($except_id=null) use($app) {
    
    $fields = array(
        'user.id',
        'user.first_name',
        'user.surname',
        'user.title',
        'user.email',
        'user.active',
        'role.role_name',
        'role.powering'
    );
    
    $users = User::leftJoin('role', 'user.role_id', '=', 'role.powering')
        ->where('user.id', '!=', $except_id)
        ->where('user.ref_id', '=', $except_id)
        ->select($fields)
        ->get();
    
    
    $app->response()->header("Content-Type", "application/json");
    echo $users->toJson();
});

$app->get('/users/:uid(/)', function($uid=null) use($app){
    $fields = array(
        'user.id',
        'user.first_name',
        'user.surname',
        'user.title',
        'user.email',
        'user.password',
        'user.role_id',
        
    );
    $user = User::where('user.id', '=', $uid)->select($fields)->first();
    $user->password = '';
    $app->response()->header("Content-Type", "application/json");
    echo $user->toJson();
});


$app->get('/users/:uid/role/:role_id(/)', function($uid, $role_id) use($app){
    $fields = array(
        'user.id',
        'user.first_name',
        'user.surname',
        'user.title',
        'user.email'
        
    );
    
    $user = User::where('user.id', '!=', $uid)
        ->where('user.role_id', '<', $role_id)
        ->orderBy('user.first_name', 'ASC')
        ->select($fields)
        ->get();
    
    $rs = '';
    if($user->isEmpty()){
        $app->response->setStatus(204);
    }
    else{
        $rs = $user->toJson();
    }
    
    //$app->log->debug($user->toArray());
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
});



$app->get('/user/:power/roles(/)', function($power=null) use($app){
    
    $roles = Role::where('powering', '<=', $power)->get();
    
    $dash = '';
    for($i=0;$i<$roles->count();$i++){
        $dash .= '--';
        $roles[$i]->role_name = $dash . ' ' . $roles[$i]->role_name;
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo $roles->toJson();
});

//Update User with uid
$app->put('/users/:uid(/)', function($uid=null) use($app){
    $data = json_decode($app->request->getBody(), true);
    
    $user = User::find($uid);
    
    $user->first_name = $data['first_name'];
    $user->surname = $data['surname'];
    $user->title = $data['title'];
    $user->email = $data['email'];
    if($data['password'] != '')
        $user->password = \Bcrypt::hashPassword($data['password']);
    $user->role_id = $data['role_id'];
    //$app->log->debug($data);
    
    $rs = '';
    if(!$user->save()){
        $app->response->setStatus(400);
        $temp['message'] = 'Can not update the user with id: ['. $user->id .']';
        $rs = json_encode($temp);
    }
    else{
        $rs = json_encode(array('id' => $user->id));
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
});


//Create new User
$app->post('/users(/)', function() use($app){
    
    $data = json_decode($app->request->getBody(), true);
    
    $data['id'] = Vii::guid();
    $data['password'] = \Bcrypt::hashPassword($data['password']);
    $data['salt'] = md5(uniqid() . time());
    $data['main_user'] = 0;
    $data['expired_key'] = '';
    $data['active'] = 1;
    
    //$app->log->debug($data);
    
    $user = new User($data);
    $rs = '';
    if(!$user->save()){
        $app->response->setStatus(400);
        $temp['message'] = 'Can not create a new user.';
        $rs = json_encode($temp);
    }else{
        $rs = json_encode(array('id' => $user->id));
    }
        
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
        
});

$app->delete('/users/:uid(/)', function($uid=null) use($app){
    //$app->log->debug($uid);
    
    $task_ids = Task::where('user_id', '=', $uid)->lists('id');
    $app->log->debug($task_ids);
    
    if(count($task_ids) > 0){
        //Delete Progress
        Progress::whereIn('task_id', $task_ids)->delete();
        
        //Delete Comment
        Comment::whereIn('task_id', $task_ids)->delete();
        
        //Delete Task
        Task::where('user_id', '=', $uid)->delete();
    }
    
    User::where('id', '=', $uid)->delete();
            
    $app->response()->header("Content-Type", "application/json");
    echo json_encode(['id' => $uid]);
});

$app->get('/users/active/:uid(/)', function($uid=null) use($app){
    $app->log->debug($uid);
    
    $user = User::find($uid);
    if($user !== null){
        $a = 1 - $user->active;
        User::where('id', '=', $uid)->update(['active' => $a]);
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo json_encode(['id' => $uid]);
});


$app->post('/users/authenticate(/)', function() use($app){
    
    $data = json_decode($app->request->getBody(), true);
    //$data = file_get_contents("php://input");
    //$app->log->debug($data);
    
    $_identity = $data['username'];
    $_credential = $data['password'];
    
    $result = $app->auth->authenticate($_identity, $_credential);
    
    $rs = [];
    
    if(is_integer($result)){
        //$rs['token'] = '';
        //$rs['authorized'] = false;
        if($result == -1){
            $rs['error_msg'] = $_identity . ' is not found.';
        }
        else if($result == -2){
            $rs['error_msg'] = 'Your account is being locked.';
        }
        else{
            $rs['error_msg'] = 'Password is not correct.';
        }
        $app->response->setStatus(401);
    }
    else{
        $rs['token'] = $result;
        $rs['authorized'] = true;
    }
    
    $app->log->debug($rs);
    
    $app->response()->header("Content-Type", "application/json");
    echo json_encode($rs);
    
});

$app->post('/users/acl(/)', function() use($app){
    
    $data = json_decode($app->request->getBody(), true);
    $app->log->debug($data);
    $_route = $data['route'];
    if($_route != '/' && substr($_route, -1) == '/')
		$_route = substr($_route, 0, -1);
    
    $app->log->debug($_route);
    
    $acl = array(
        '/' => array('allow'=>'*'),
        //'/acl' => array('allow'=>'*'),
        //'/signin' => array('allow'=>'*'),
        '/users' => array('allow'=>array(900, 500)),
        '/tasks' => array('allow'=>array(900, 500)),
        '/user-tasks/:user_id' => array('allow'=>array(900, 500)),
        '/task-detail/:user_id/:task_id' => array('allow'=>array(900, 500)),
        '/task-detail/:user_id' => array('allow'=>array(900, 500)),
        '/mytasks' => array('allow'=>'*'),
        '/task-detail' => array('allow'=>array(900, 500)),
                
        '/user/profile' => array('allow'=>'*'),
        '/user/change-password' => array('allow'=>'*'),
        //'/user/forget-password' => array('allow'=>'*'),
        '/setting' => array('allow'=>array(900))
        
    );
    
    
    $rs = json_encode($acl[$_route]); 
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
    $app->log->debug($rs);
    
    
    
});

$app->put('/user/:uid/profile(/)', function($uid=null) use($app){
    
    $data = json_decode($app->request->getBody(), true);
        
    $update_data = array(
        'first_name' => $data['first_name'],
        'surname' => $data['surname']
    );
    
    $affectedRows = User::where('id', '=', $uid)->update($update_data);
        
    $rs = json_encode(array(
        'message'=>'The profile has been updated.'
    )); 

    $app->response()->header("Content-Type", "application/json");
    echo $rs;
});

$app->put('/user/:uid/password(/)', function($uid=null) use($app){
    
    $data = json_decode($app->request->getBody(), true);
        
    $update_data = array(
        'password' => \Bcrypt::hashPassword($data['new_pwd']),
    );
    
    $affectedRows = User::where('id', '=', $uid)->update($update_data);
        
    $rs = json_encode(array(
        'message'=>'Your password has been changed.'
    )); 

    $app->response()->header("Content-Type", "application/json");
    echo $rs;
});

$app->post('/user/forget-password/otp(/)', function() use($app, $twig){
    
    $rs = '';
    
    $mailer = Vii::getMailer();
    
    if($mailer == null){
        $app->response->setStatus(400);
        $rs = json_encode(['message' => 'SMTP setting is not found.']);
    }
    else{
                          
        $data = json_decode($app->request->getBody(), true);

        //$app->log->debug($data);

        $user = User::where('email', '=', $data['email'])->first();
        //$app->log->debug($user->toArray());


        if($user !== null){
            $otp_data = Vii::createOTP();
            //$app->log->debug($otp_data);
            $otp = new Otp([
                'user_id' => $user->id,
                'otp_key' => $otp_data['otp_key'],
                'otp_hash' => $otp_data['otp_hash'],
                'expired_at' => date('Y-m-d H:i:s', strtotime("+30 minutes"))
            ]);

            $otp->save();

            //Send mail
            $mailer->isHTML(true);
            //$mailer->SMTPDebug = 2;
            //$app->log->debug($mailer);

            $mailer->addAddress($user->email, $user->first_name . ' ' . $user->surname);

            $mailer->Subject = 'Job Tracking - Request OTP Code';

            $mailer->Body = $twig->render(
                '@email_template/request-otp.html',
                array(
                    'otp_code'=>$otp_data['otp_code'],
                    'otp_key'=>$otp_data['otp_key'],
                    'expired_at'=>$otp->expired_at
                )
            );


            if($mailer->send()){
                $rs = json_encode([
                    'message' => 'Your OTP code is send to email: '. $data['email'] . '! Please check this email to get the OTP code.',
                    'otp_key' => $otp_data['otp_key']
                ]);
            }
            else{
                $app->response->setStatus(400);
                $rs = json_encode(['message' => 'Send mail error: ' . $mailer->ErrorInfo]);
            }

        }
        else{
            $app->response->setStatus(400);
            $rs = json_encode(['message' => 'Email: '. $data['email'] . ' does not exist!']);
        }
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
});

$app->put('/user/forget-password(/)', function() use($app){
    $data = json_decode($app->request->getBody(), true);
    
    $otp_hash = sha1($data['otp_key'] . '@' . $data['otp_code']);
    
    $otp = Otp::where('otp_key', '=', $data['otp_key'])
        ->where('otp_hash', '=', $otp_hash)
        ->first();
    
    $rs = '';
    if($otp !== null){
        //Timeout
        if(strtotime($otp->expired_at) < time()){
            $app->response->setStatus(400);
            $rs = json_encode([
                'message'=>'OTP code: ' . $data['otp_code'] . ' is expired.'
            ]);
        }
        else{
            $update_data = [
                'password'=>\Bcrypt::hashPassword($data['new_pass'])
            ];
            User::where('id', '=', $otp->user_id)->update($update_data);
            
            $otp->delete();
            
            $rs = json_encode([
                'message'=>'Your password have been renew.'
            ]);
        }
    }
    else{
        $app->response->setStatus(400);
        $rs = json_encode([
            'message'=>'OTP code: ' . $data['otp_code'] . ' is not correct.'
        ]);
    }
    
    //$app->log->debug($data);
    //$app->log->debug($otp->toArray());
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
});

