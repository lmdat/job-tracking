<?php
use App\Models\Setting;
use App\Libs\Utils\Vii;

$app->get('/setting(/:section)(/)', function($section=null) use($app){
    
    $setting = Setting::find(1);
    
    if($setting->setting_data == '')
        $app->response->setStatus(204);
    
    $app->response()->header("Content-Type", "application/json");
    echo $setting->setting_data;
    
});

$app->post('/setting/:section(/)', function($section=null) use($app){
    
    $data = json_decode($app->request->getBody(), true);
    
    $app->log->debug($section);
    $app->log->debug($data);
    
    $setting = Setting::find(1);
    
    if($setting->setting_data == ''){
        $temp = [];
        $temp[$section] = $data[$section];
        
        $setting->setting_data = json_encode($temp);
    }
    else{
        $temp = json_decode($setting->setting_data, true);
        $temp[$section] = $data[$section];
        
        $setting->setting_data = json_encode($temp);
    }
    
    $setting->save();
        
    $app->response()->header("Content-Type", "application/json");
    echo json_encode(['message' => '[' . $section . '] data is saved.']);
    
    
});