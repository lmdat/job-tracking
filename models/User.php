<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
    
class User extends Eloquent{
    
    protected $table = 'user';
    public $timestamps = false;
    public $incrementing = false;
    
    protected $fillable = array(
        'id',
        'first_name',
        'surname',
        'email',
        'title',
        'main_user',
        'ref_id',
        'active',
        'salt',
        'password',
        'role_id'
        
    );
    
    //protected $guarded = ['id'];
    
    
    public function tasks(){
        return $this->hasMany('App\Models\Task', 'user_id');
    }
    
    public function token(){
        return $this->hasOne('App\Models\Token', 'user_id');
    }
    
    public function role(){
        return $this->belongsTo('App\Models\Role');
    }
    
}