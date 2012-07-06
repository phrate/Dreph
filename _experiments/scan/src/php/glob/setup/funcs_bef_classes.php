<?php

	global $preIP;

	# Mandatory getDirfiles()
	include $preIP.'glob/func/mandatory/getDirFiles.php';
	
	# Get all functions before classes
	$files = getDirFiles($preIP.'glob/func/bef_classes/');

	foreach($files as $file) {
		include $file;	
	}
	