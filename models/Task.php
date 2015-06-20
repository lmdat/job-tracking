<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
class Task extends Eloquent{
    
    protected $table = 'task';
    public $timestamps = false;
    
    protected $fillable = array(
        'id',
        'parent',
        'task_name',
        'start_date',
        'end_date',
        'description',
        'created',
        'modified',
        'user_id',
        'created_by',
        'modified_by',
        'priority_id',
        'status'
        
    );
    
    public function progresses(){
        return $this->hasMany('App\Models\Progress', 'task_id');
    }
        
    public function user(){
        return $this->belongsTo('App\Models\User');
    }
    
    public function priority(){
        return $this->belongsTo('App\Models\Priority');
    }
    
}