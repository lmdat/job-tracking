<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
class Token extends Eloquent{
    
    protected $table = 'token';
    public $timestamps = false;
    
    protected $fillable = array(
        'first_name',
        'user_id',
        'access_token',
        'expired_at'
        
    );
    
    protected $guarded = array('id');
    
    
    
    public function user(){
        return $this->belongsTo('App\Models\User');
    }
    
}