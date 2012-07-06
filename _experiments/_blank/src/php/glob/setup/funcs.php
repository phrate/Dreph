<?php

	# Get all functions
	global $preIP;
	$files = getDirFiles($preIP.'glob/func/');

	foreach($files as $file) {
		include $file;	
	}
