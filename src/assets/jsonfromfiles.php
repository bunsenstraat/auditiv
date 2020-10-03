<?php


$dir = __DIR__ ."/Interface_Auditiv/";

$tempos =Array("80bpm","100bpm","120bpm");
$tones =Array("BetonungSchwach","BetonungMittel","BetonungStark");
$beats = Array("BeatNO","BeatMittel","BeatLaut","STUMM");

$evals = Array($tones,$tempos,$beats);
$obs = Array();
foreach(glob($dir.'*.mp3') as $file) {
    # do your thing
    $ob = new stdClass();
    $ob->file = urlencode(basename($file));
    $ob->vals = Array();
    foreach($evals as $k=>$eval){
        foreach($eval as $f => $val){
            if(strstr(
                strtolower($file),
                strtolower($val)
            )){
                $ob->vals[$k] = $f;
            };
        

            
        }
    }
    $ob->vals =  (object) $ob->vals;
    array_push($obs,$ob);
}

echo json_encode($obs);

$r = new stdClass();
$r->data = $obs;

file_put_contents(__DIR__ ."/files.json",json_encode($r));

?>