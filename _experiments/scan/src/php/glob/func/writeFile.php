<?php

	function writeFile($path,$body,$addTo = false) {
		$fh = fopen($path, 'w') or die();
		fwrite($fh, $body);
		fclose($fh);
	}