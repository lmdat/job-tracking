<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
class Otp extends Eloquent{
    
    protected $table = 'otp';
    public $timestamps = false;
    
    protected $fillable = array(
        'user_id',
        'otp_key',
        'otp_hash',
        'expired_at'
        
    );
    
    protected $guarded = array('id');
    
}