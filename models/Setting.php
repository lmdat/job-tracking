<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
class Setting extends Eloquent{
    
    protected $table = 'setting';
    public $timestamps = false;
    
    protected $fillable = array(
        'setting_data'
    );
    
    protected $guarded = array('id');
    
}