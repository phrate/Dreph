<?php

	$data = stripslashes(stripslashes($_POST['data']));
	$str  = "/* - Cache for sprites' clickmaps - */"."\n"."var _spriteClickMapCache = ".$data.";";
	$str  = str_replace('":"{','":{',$str);
	$str  = str_replace('}"','}',$str);
	
	function writeFile($path,$body,$addTo = false) {
		$fh = fopen($path, 'w') or die();
		fwrite($fh, $body);
		fclose($fh);
	}
	
	$path = '../js/cache.js';
	$body = $str;
	writeFile($path,$body);