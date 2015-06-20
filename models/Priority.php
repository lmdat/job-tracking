<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
class Priority extends Eloquent{
    
    protected $table = 'priority';
    public $timestamps = false;
    
    protected $fillable = array(
        'priority_name',
        'level'
        
    );
    
    protected $guarded = array('id');
    
    
    public function tasks(){
        return $this->hasMany('App\Models\Task', 'priority_id');
    }
    
    
    
}