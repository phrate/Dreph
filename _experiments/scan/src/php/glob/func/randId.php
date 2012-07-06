<?php

	function randId($numerical = true) {
		$id = '';
		if($numerical) {
			$id = rand(1,10000); 	
		}
		return $id;
	}