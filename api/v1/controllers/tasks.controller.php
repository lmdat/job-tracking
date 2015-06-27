<?php
use App\Models\User;
use App\Models\Task;
use App\Models\Progress;
use App\Models\Comment;
use App\Models\Priority;

use App\Libs\Utils\Vii;


$app->get('/user/:uid/tasks(/)', function($uid=null) use($app){
    
    $fields = array(
        'task.id',
        'task.parent',
        'task.task_name',
        'task.start_date',
        'task.end_date',
        'task.description',
        'task.status',
        'task.created',
        'task.priority_id',
        'task.created_by',
        'task.user_id',
        'priority.priority_name',
        'priority.alias as priority_alias'
        
    );
        
    $tasks = Task::leftJoin('priority', 'priority.level', '=', 'task.priority_id')
        ->where('task.user_id', '=', $uid)
        ->orderBy('task.priority_id', 'DESC')
        ->orderBy('task.end_date', 'ASC')
        ->select($fields)
        ->get();
    
    $rs = '';
    if($tasks->isEmpty()){
        $app->response->setStatus(204);
    }
    else{
        $rs = $tasks->toJson();
    }
        
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
    //$app->log->debug($rs);
});

$app->get('/user/:uid/tasks/:tid(/)', function($uid=null, $tid=null) use($app){
    
    
    $fields = array(
        'task.id',
        'task.parent',
        'task.task_name',
        'task.start_date',
        'task.end_date',
        'task.description',
        'task.status',
        'task.created',
        'task.priority_id',
        'task.created_by',
        'task.user_id',
        'priority.priority_name',
        'priority.alias as priority_alias'
        
    );
        
    $task = Task::leftJoin('priority', 'priority.level', '=', 'task.priority_id')
        ->where('task.user_id', '=', $uid)
        ->where('task.id', '=', $tid)
        ->select($fields)
        ->first();
    
    
    $rs = '';
    if($task === null){
        $app->response->setStatus(204);
    }
    else{
        $rs = $task->toJson();
    }
        
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
    //$app->log->debug($rs);
});


$app->get('/user/:uid/tasks/:tid/progress(/)', function($uid=null, $tid=null) use($app){
    
    $progress = Progress::where('progress.task_id', '=', $tid)
        ->where('progress.created_by', '=', $uid)
        ->orderBy('progress.created', 'DESC')
        ->orderBy('progress.rate', 'DESC')
        ->get();
    
    $rs = '';
    if($progress->isEmpty()){
        $app->response->setStatus(204);
    }
    else{
        $rs = $progress->toJson();
    }
    
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
    //$app->log->debug($progress->toArray());
    
});


$app->delete('/user/:uid/tasks/:tid/progress/:pid/comments/:cid(/)', function($uid=null, $tid=null, $pid=null, $cid=null) use($app){
    
    $task = Task::find($tid);
    
    
    $rs = '';
    if($task !== null && $task->user_id == $uid){
        
        Comment::where('task_id', '=', $tid)
            ->where('progress_id', '=', $pid)
            ->where('id', '=', $cid)
            ->delete();
        
        //$app->log->debug(Comment::find($cid)->toArray());    
        $rs = json_encode(array('id'=>$cid));
    }
    else{
        $rs = '[]';
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
});

$app->map('/user/:uid/tasks/:tid/progress/:pid/comments(/)', function($uid=null, $tid=null, $pid=null) use($app){
    
    $rs = '';
    if(!$app->request->isPost()){
        $progress = Progress::find($pid);
        if($progress !== null && ($progress->task_id == $tid && $progress->created_by == $uid)){

            $fields = array(
                'comment.id',
                'comment.task_id',
                'comment.progress_id',
                'comment.comment_by',
                'comment.content',
                'comment.created',
                'comment.modified',
                'user.first_name',
                'user.surname'
            );

            $comments = Comment::leftJoin('user', 'user.id', '=', 'comment.comment_by')
                ->where('task_id', '=', $tid)
                ->where('progress_id', '=', $pid)
                ->select($fields)
                ->get();
            
            $rs = $comments->toJson();
        }
        else{
            $app->response->setStatus(204);
        }
    }
    else{
         
        $data = json_decode($app->request->getBody(), true);
    
        $data['created'] = date('Y-m-d H:i:s');

        $comment = new Comment($data);

        $temp = array();
    
        if(!$comment->save()){
            $app->response->setStatus(400);
            $temp['message'] = 'Can not save the comment.';
        }
        else{
            $temp['id'] = $comment->id;
        }
       
        $rs = json_encode($temp);
        $app->log->debug($data);
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
    
})->via('GET','POST');

/*----------------------------------TASK-------------------------------*/

$app->get('/tasks/priority(/)', function() use($app){
    
    $priority_list = Priority::orderBy('level', 'ASC')->get();
    
    //Vii::pr($priority_list->toArray());
    $app->response()->header("Content-Type", "application/json");
    echo $priority_list->toJson();
    
});

//Get All Tasks for user have $uid
$app->get('/tasks/:uid/date(/:date)(/)', function($uid=null, $date=null) use($app) {
    //echo 'list of tasks';
    //$app->log->debug($app->request->getResourceUri());
    
    $first_day = 1;
    $current_month = date('m');
    $current_year = date('Y');
    $last_day = date('t');
    
    if($date !== null){
        $a = strtotime($date . '-1');
        
        $current_month = date('m', $a);
        $current_year = date('Y', $a);
        $last_day = date('t', $a);
        
    }

    $today = date('Y-m-d');

    $tasks = array();
    for($i=$last_day;$i>=$first_day;$i--){

        $t = date('Y-m-d', mktime(0, 0, 0, $current_month, $i, $current_year));
        $tasks[] = array(
            'date'=>$t,
            'today'=> ($t == $today) ? true : false,
            'list_tasks'=>array()
        );
    }
        
    $max_date = $tasks[0]['date'];
    $min_date = $tasks[count($tasks) - 1]['date'];
    
    $priority_list = Priority::get();
    
   
    
    $handle = Task::where('task.created_by', '=', $uid)
        //->where('task.start_date', '<=', $max_date)
        ->where('task.end_date', '>=', $min_date)
        //->whereBetween('task.end_date', array($min_date, $max_date))
        ->orderBy('task.priority_id', 'DESC')
        ->orderBy('task.end_date', 'ASC')
        ->get();
    
    //$app->log->debug($handle->toArray());
    
    
    if(!$handle->isEmpty()){
        foreach($handle as $id=>$row){

            $temp = $row->toArray();
            $temp['progress_rate'] = 0;
            $temp['assigned_for'] = array(
                'id'=>$row->user->id,
                'first_name'=>$row->user->first_name,
                'surname'=>$row->user->surname,
                'title'=>$row->user->title,
                'email'=>$row->user->email
            );


            foreach($priority_list as $prio){
                if($prio->level == $row->priority_id){
                    $temp['priority_name'] = $prio->priority_name;
                    $temp['priority_alias'] = $prio->alias;
                    break;
                }
            }

            $progress_list = $row->progresses->toArray();
            usort($progress_list, function($a, $b){

                $a_time = strtotime($a['created']);
                $b_time = strtotime($b['created']);

                if ($a_time == $b_time) {
                    return 0;
                }
                return ($a_time > $b_time) ? -1 : 1;
            });



            foreach($tasks as $k=>&$v){
                $_time = strtotime($v['date']);

                if($_time >= strtotime($temp['start_date']) && $_time <= strtotime($temp['end_date'])){
                    $temp['progress_rate'] = 0;
                    $temp['progress_note'] = '';
                    $temp['completed'] = 0;
                    $found = false;
                    if(count($progress_list) > 0){

                        if($_time > strtotime(date('Y-m-d', strtotime($progress_list[0]['created'])))){
                            $temp['progress_rate'] = $progress_list[0]['rate'];
                            if($temp['progress_rate'] == 100){
                                $temp['completed'] = 2;
                            }

                            $temp['progress_note'] = nl2br($progress_list[0]['note']);

                        }
                        else{
                           foreach($progress_list as $k=>$item){
                                $created_date = strtotime(date('Y-m-d', strtotime($item['created'])));
                                if($created_date == $_time || $created_date == strtotime('-1 days', $_time)){

                                    $temp['progress_rate'] = $item['rate'];
                                    if($created_date == $_time && $temp['progress_rate'] == 100){
                                        $temp['completed'] = 1;
                                    }
                                    $temp['progress_note'] = nl2br($item['note']);

                                    $found = true;
                                    break;
                                }
                            }
                        }
                    }
                    
                    $v['list_tasks'][] = $temp;
                    
                }
            }//End foreach $tasks

        }//End foreach $handle
    }//End if
    
    
   //Vii::pr($tasks);

    $app->response()->header("Content-Type", "application/json");
    echo json_encode($tasks);

});

$app->put('/tasks/:uid(/)', function($uid) use($app){
    $data = json_decode($app->request->getBody(), true);
    
    $data['modified'] = date('Y-m-d H:i:s');
    $data['modified_by'] = $uid;
    
    $task = Task::find($data['id']);
    
    $task->task_name = $data['task_name'];
    $task->start_date = $data['start_date'];
    $task->end_date = $data['end_date'];
    $task->description = $data['description'];
    $task->modified = date('Y-m-d H:i:s');
    $task->modified_by = $uid;
    $task->priority_id = $data['priority_id'];
    
    $rs = '';
    if(!$task->save()){
        $app->response->setStatus(400);
        $temp['message'] = 'Can not update task with id: ' . $data['id'];
        $rs = json_encode($temp);
    }
    else{
        $rs = json_encode(array('id'=>$task->id));
    }
    
    $app->log->debug($data);
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;

});

//Get One Task of current user
$app->get('/tasks/:uid/:tid(/)', function($uid=null, $tid=null) use($app){
    //$app->log->debug($uid . ' | ' . $tid);
    
    $task = Task::where('id', '=', $tid)->where('user_id', '=', $uid)->first();
    
    $rs = '';
    if($task === null){
        $app->response->setStatus(204);
    }
    else{
        $rs = $task->toJson();
    }
        
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    //$app->log->debug($rs);
});


//Create New Task by uid
$app->post('/tasks/:uid(/)', function($uid=null) use($app){

    $data = json_decode($app->request->getBody(), true);

    $data['id'] = Vii::guid();
    $data['parent'] = 0;
    $data['status'] = 0;
    $data['created'] = date('Y-m-d H:i:s');
        
    $task = new Task($data);
    
    $rs = '';
    if(!$task->save()){
        $app->response->setStatus(400);
        $temp['message'] = "Can not create new task.";
        $rs = json_encode($temp);
    }
    else{
        $rs = json_encode(array('id' => $task_id));
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
    
    //$app->log->debug($data);
});

$app->delete('/tasks/:uid/:tid(/)', function($uid=null, $tid=null) use($app){
    
    
    $progress_ids = Progress::where('task_id', '=', $tid)->lists('id');
    
    //Delete comments
    Comment::where('task_id', '=', $tid)
        ->whereIn('progress_id', $progress_ids)
        ->delete();
    
    //Delete Progress
    Progress::where('task_id', '=', $tid)->delete();
    
    //Delete Task
    $affectedRows = Task::where('user_id', '=', $uid)
        ->where('id', '=', $tid)
        ->delete();
    
    //$app->log->debug($progress_ids);
    
    $app->response()->header("Content-Type", "application/json");
    echo json_encode(array('id' => $tid));
});


/*-------------------------------------My Task------------------------------------------*/

$app->get('/user/:uid/mytasks(/:status)(/)', function($uid=null, $status=null) use($app){
    
    
    $fields = array(
        'task.id',
        'task.parent',
        'task.task_name',
        'task.start_date',
        'task.end_date',
        'task.description',
        'task.status',
        'task.created',
        'task.priority_id',
        'task.created_by',
        'priority.priority_name',
        'priority.alias as priority_alias'
        
    );
    
    $mytasks = false;
    
    if($status != null){
        $mytasks = Task::leftJoin('priority', 'priority.level', '=', 'task.priority_id')
            ->where('task.user_id', '=', $uid)
            ->where('task.status', '=', $status)
            ->select($fields)
            ->orderBy('task.priority_id', 'DESC')
            ->orderBy('task.end_date', 'ASC')
            ->get();
    }
    else{
        $mytasks = Task::leftJoin('priority', 'priority.level', '=', 'task.priority_id')
            ->where('user_id', '=', $uid)
            ->select($fields)
            ->orderBy('task.priority_id', 'DESC')
            ->orderBy('task.end_date', 'ASC')
            ->get();
    }
    
        
    $app->response()->header("Content-Type", "application/json");
    echo $mytasks->toJson();
    
    $app->log->debug($mytasks->toArray());
});


$app->put('/user/:uid/mytasks(/)', function($uid=null) use($app){
    
    $data = json_decode($app->request->getBody(), true);
    
    $mytask = Task::where('user_id', '=', $uid)
        ->where('id', '=', $data['tid'])
        ->first();
    
    $rs = array();
    
    if($mytask === null){
        $app->response->setStatus(400);
        $rs['error'] = "Task with id: [".$data['tid']."] is not found.";
    }
    else{
        $mytask->status = 1;
        $mytask->save();
        $rs['id'] = $mytask->id;
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo json_encode($rs);
    
    //$app->log->debug($data);
    
});

$app->get('/user/:uid/mytasks/:tid/progress(/)', function($uid=null, $tid=null) use($app){
    
    $fields = array(
        'progress.id',
        'progress.task_id',
        'progress.created_by',
        'progress.note',
        'progress.rate',
        'progress.created',
        
    );
    
    $progress_list = Progress::where('created_by', '=', $uid)
        ->where('task_id', '=', $tid)
        ->orderBy('rate', 'DESC')
        ->orderBy('created', 'DESC')
        ->select($fields)
        ->get();
    
    $app->response()->header("Content-Type", "application/json");
    echo $progress_list->toJson();
    
    $app->log->debug($progress_list->toArray());
});

$app->post('/user/mytasks/progress(/)', function() use($app){
    $data = json_decode($app->request->getBody(), true);
        
    $data['id'] = Vii::guid();
    $data['created'] = date('Y-m-d H:i:s');
    
    $progress = new Progress($data);
    
    $rs = array();
    if(!$progress->save()){
        $app->response->setStatus(401);
        $rs['error'] = 'Can not save the progress.';
    }
    else{
        if($progress->rate == 100){
            $affected_rows = Task::where('id', '=', $progress->task_id)->update(array('status' => 2));
            $rs['task_completed'] = true;
        }
        else{
            $affected_rows = Task::where('id', '=', $progress->task_id)->update(array('status' => 1));
            $rs['task_completed'] = false;
        }
        
        $rs['id'] = $progress->id;
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo json_encode($rs);
    
    //$app->log->debug($data);
});

$app->put('/user/mytasks/progress/:id(/)', function($id=null) use($app){
    
    $data = json_decode($app->request->getBody(), true);

    $progress = Progress::find($data['id']);
    
    $progress->note = $data['note'];
    $progress->rate = $data['rate'];
    $progress->modified = date('Y-m-d H:i:s');
    $progress->modified_by = $data['modified_by'];
    
    
    $rs = array();
    if(!$progress->save()){
        $app->response->setStatus(400);
        $rs['error'] = 'Can not update the progress with id['.$data['id'].'].';
    }
    else{
        if($data['rate'] == 100){
            $affected_rows = Task::where('id', '=', $progress->task_id)->update(array('status' => 2));
            $rs['task_completed'] = true;
        }
        else{
            $affected_rows = Task::where('id', '=', $progress->task_id)->update(array('status' => 1));
            $rs['task_completed'] = false;
        }
        
        $rs['id'] = $progress->id;
        $rs['note'] = $progress->note;
        $rs['rate'] = $progress->rate;
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo json_encode($rs);
    
    //$app->log->debug($id);
});

$app->post('/user/mytasks/progress/comments(/)', function() use($app){
    $data = json_decode($app->request->getBody(), true);
    
    $data['created'] = date('Y-m-d H:i:s');
    
    $comment = new Comment($data);
    
    $rs = array();
    if(!$comment->save()){
        $app->response->setStatus(401);
        $rs['message'] = 'Can not save the comment.';
    }
    else{
        $rs['id'] = $comment->id;
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo json_encode($rs);
   
    //$app->log->debug($data);
});

$app->get('/user/:uid/mytasks/:tid/progress/:pid/comments', function($uid=null, $tid=null, $pid=null) use($app){
    
    $fields = array(
        'comment.id',
        'comment.task_id',
        'comment.progress_id',
        'comment.comment_by',
        'comment.content',
        'comment.created',
        'comment.modified',
        'user.first_name',
        'user.surname'
    );
    
    $comments = Comment::leftJoin('user', 'user.id', '=', 'comment.comment_by')
        ->where('task_id', '=', $tid)
        ->where('progress_id', '=', $pid)
        ->select($fields)
        ->get();
    
    $app->response()->header("Content-Type", "application/json");
    echo $comments->toJson();
    
    //$app->log->debug($comments->toArray());
    
});

$app->delete('/user/:uid/mytasks/:tid/progress/:pid/comments/:cid(/)', function($uid=null, $tid=null, $pid=null, $cid=null) use($app){
    
    $task = Task::find($tid);
        
    $rs = '';
    if($task !== null && $task->user_id == $uid){
        
        Comment::where('task_id', '=', $tid)
            ->where('progress_id', '=', $pid)
            ->where('id', '=', $cid)
            ->delete();
        
        //$app->log->debug(Comment::find($cid)->toArray());    
        $rs = json_encode(array('id'=>$cid));
    }
    else{
        $rs = '{}';
    }
    
    $app->response()->header("Content-Type", "application/json");
    echo $rs;
});
