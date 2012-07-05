<?php

	function err($text = NULL) {
	
		if(!$text) $text = mysql_error();
	
		echo "<b>Logic Error:</b><br />";
		echo $text;
		die();
		
	}
