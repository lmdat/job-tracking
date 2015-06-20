<?php
use App\Models\User;
use App\Models\Task;
use App\Models\Progress;
use App\Models\Comment;
use App\Models\Priority;

use App\Libs\Utils\Vii;

$app->get('/dashboard/user/:owner/:power/onwertask-status(/:month)(/:year)(/)', function($owner=null, $power=0, $month=null, $year=null) use($app){
    
    if($month == null)  $month = date('n');
    if($year == null)  $year = date('Y');
    
    $status_name = Vii::getStatusTaskName();
    //Count tasks by status
    $status_counter = [];
    for($i=0;$i<3;$i++){
        $n = Task::where('created_by', '=', $owner)
            ->where('status', '=', $i)
            ->count();
        
        $status_counter[$i] = [
            'name' => strtolower($status_name[strval($i)]),
            'name_text' => $status_name[strval($i)] . ' Tasks',
            'count'=> $n
        ];
    }
    
    //$app->log->debug($status_counter);
    
    $rs = json_encode($status_counter);
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
});

$app->get('/dashboard/user/:owner/:power/assinged-tasks(/:month)(/:year)(/)', function($owner=null, $power=0, $month=null, $year=null) use($app, $db_config){
    
    $fields = [
        'user.id',
        'user.first_name',
        'user.surname',
        'user.title'
        
    ];
    
    if($month == null)  $month = date('n');
    if($year == null)  $year = date('Y');
    
    $users_handle = User::join('task', 'task.user_id', '=', 'user.id')
        ->where('task.created_by', '=', $owner)
        //->whereRaw("DATE_FORMAT(" . $db_config['prefix'] . "task.created, '%Y-%c') = '" . $year . '-' . $month . "'")
        ->select($fields)
        ->groupBy('user.id')
        ->get();
    
    
    $status_name = Vii::getStatusTaskName();
    $users = [];
    foreach($users_handle as $k => $user){
        $task_status = [];
        for($i=0;$i<3;$i++){
            $n = Task::where('user_id', '=', $user->id)
            ->where('status', '=', $i)
            ->count();
            
            $task_status[$i] = [
                'name' => strtolower($status_name[strval($i)]),
                'name_text' => $status_name[strval($i)] . ' Tasks',
                'count'=> $n
            ];
        }
        
        $users[$k] = $user->toArray();
        $users[$k]['task_status'] = $task_status;
        
    }
    
    //Vii::pr($users);
    
    $rs = json_encode($users);
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
});

$app->get('/dashboard/user/:uid/:power/mytask-status(/:month)(/:year)(/)', function($uid=null, $power=0, $month=null, $year=null) use($app){
    
    $fields = [];
    
    if($month == null)  $month = date('n');
    if($year == null)  $year = date('Y');
    
    $status_name = Vii::getStatusTaskName();
    //Count tasks by status
    $status_counter = [];
    for($i=0;$i<3;$i++){
        $n = Task::where('user_id', '=', $uid)
            ->where('status', '=', $i)
            ->count();
        
        $status_counter[$i] = [
            'name' => strtolower($status_name[strval($i)]),
            'name_text' => $status_name[strval($i)] . ' Tasks',
            'count'=> $n
        ];
    }
    
    //$app->log->debug($status_counter);
    
    $rs = json_encode($status_counter);
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
});