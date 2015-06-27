<?php
if(php_sapi_name() != 'cli') die();

if(!defined('IS_CRON')) die();

use App\Models\Setting;
use App\Models\User;
use App\Models\Task;
use App\Libs\Utils\Vii;
/*--------------------------------------------------*/

$setting = Setting::find(1);
$data = json_decode($setting->setting_data, true);

if(!isset($data['smtp'])) die();

$mailer = Vii::getMailer($data['smtp']);

if(isset($data['schedule']) && $data['schedule']['remind_monday'] == true){
    
    $fields = [
        'id',
        'first_name',
        'surname',
        'title',
        'email',
        'role_id'
    ];
    
    $users = User::where('active', '=', 1)
        ->select($fields)
        ->get();
    
    if(!$users->isEmpty()){
        $fields = [
            'task.id',
            'task.task_name',
            'task.status',
            'task.priority_id',
            'task.start_date',
            'task.end_date',
            'priority.priority_name'
        ];
        
        foreach($users as $user){
            
            $tasks = Task::leftJoin('priority', 'priority.level', '=', 'task.priority_id')
                ->where('user_id', '=', $user->id)
                ->where('status', '<', 2)
                ->select($fields)
                ->orderBy('priority_id', 'DESC')
                ->get();
            
            if(!$tasks->isEmpty()){
                if($mailer != null){
                    $mailer->isHTML(true);
                    //$mailer->SMTPDebug = 2;
                    $mailer->Subject = 'Job Tracking - Remind Jobs';
                    $mailer->Body = $twig->render(
                        '@email_template/remind-jobs.html',
                        [
                            'tasks'=>$tasks->toArray()
                        ]
                    );
                    
                    $mailer->ClearAllRecipients();
                    $mailer->addAddress($user->email, $user->first_name . ' ' . $user->surname);
                    
                    //Send mail
                    $mailer->send();
                    
                    /*
                    if($user->email == 'minh_dat_le@yahoo.com'){
                        $mailer->addAddress('viphuong@gtvsolutions.vn', 'Phuong Pham');
                        //echo $mailer->Body;
                        if($mailer->send())
                            echo "Mail Sent";
                    }
                    */
                    
                }//End for
                
            }//End if
            
        }//End for
        
    }//End if
    
}//End if