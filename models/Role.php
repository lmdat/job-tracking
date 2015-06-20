<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
class Role extends Eloquent{
    
    protected $table = 'role';
    public $timestamps = false;
    
    protected $fillable = array(
        'role_name',
        'alias',
        'powering'
        
    );
    
    protected $guarded = array('id');
    
    
    public function users(){
        return $this->hasMany('App\Models\User', 'role_id');
    }
    
}