<?php

	global $_con; if(!$_con) {
		$preIP = "../../";
		include $preIP."glob/setup.php";	
	}
	
	$_page->body();