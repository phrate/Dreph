<?php

	function getDirFiles($Path, $Exceptions = array()) {
	
		$Arr = array();
	
		$dir = $Path;
		$files = scandir($dir);
		$num = 0;
		
		while($files[$num] != "" && !in_array($files[$num],$Exceptions)) {
			if($files[$num] != "." && $files[$num] != ".." && substr_count($files[$num],'.') > 0) {
					$file = $files[$num];
					$Arr[] = $Path.$file;
			}
			$num ++;
		}
		
		return $Arr;

	}
