<?php

	/*
	*
	* safeVar( $var )
	*
	* Makes any variable safe for SQL insertion
	*
	*/
	
	function safeVar($var,$strip_tags = false,$html_ents = false) {
		if($strip_tags) $var = strip_tags($var);
		if($html_ents) $var = htmlents($var);
		
		$var = addslashes($var);
		return $var;
	}
