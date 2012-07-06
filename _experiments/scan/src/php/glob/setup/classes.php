<?php

	# Get all classes
	global $preIP;
	$files = getDirFiles($preIP.'glob/class/');

	foreach($files as $file) {
		include $file;	
	}
