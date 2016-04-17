<?php

$keyword = $_GET["q"];
$start = $_GET["start"];
$url = "http://search-tweetmap-index-q33canvvuahpzsa6oxaocroy5m.us-west-2.cloudsearch.amazonaws.com/2013-01-01/search?q=" . $keyword . "&start=" . $start;
$my_var = file_get_contents($url);
echo $my_var;

?>