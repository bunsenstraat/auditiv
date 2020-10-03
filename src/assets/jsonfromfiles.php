<?php


$dir = "./Interface_Auditiv/";

$tempos =Array("80bpm","100bpm","120bpm");
$tones =Array("BetonungSchwach","BetonungMittel","BetonungStark");
$beats = Array("BeatNO","BeatMittel","BeatLaut","STUMM");

foreach(glob($dir.'*.mp3') as $file) {
    # do your thing
    print_r($file);
}

?>