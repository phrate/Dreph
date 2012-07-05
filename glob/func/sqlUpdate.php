<?php
	
	/**
	* sqlUpdate()
	*
	* Makes calling an SQL update query much simpler
	*/
	
	function sqlUpdate($table,$update,$where = 1,$limit = NULL,$err = NULL,$debug = false,$returnQuery = false) {
		global $_con; $table = $_con->tableName($table);
		$query = "UPDATE `".$table."` SET ".$update." WHERE ".$where.";\n";
		if($returnQuery) return $query;
		if($limit) $query .= " LIMIT ".$limit;
		if($debug) { echo '<div class="error_php">'.$query.'</div>'; return false; }
		if($err) 
			mysql_query($query) or die($err);
		else
			mysql_query($query) or die(err().'<br>Query: <u>'.$query.'</u>');
	}
