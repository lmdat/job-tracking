<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
class Progress extends Eloquent{
    
    protected $table = 'progress';
    public $timestamps = false;
    public $incrementing = false;
    
    protected $fillable = array(
        'id',
        'task_id',
        'note',
        'rate',
        'created',
        'modified',
        'created_by',
        'modified_by'
        
    );
    
    
    
    public function task(){
        return $this->belongsTo('App\Models\Task');
    }
    
    public function comments(){
        return $this->hasMany('App\Models\Comment', 'progress_id');
    }
}