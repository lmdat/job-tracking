<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
class Comment extends Eloquent{
    
    protected $table = 'comment';
    public $timestamps = false;
    
    protected $fillable = array(
        'task_id',
        'progress_id',
        'comment_by',
        'content',
        'created',
        'modified'
    );
    
    protected $guarded = array('id');
    
    public function progress(){
        return $this->belongsTo('App\Models\Progress');
    }
    
}