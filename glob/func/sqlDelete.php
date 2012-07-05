<?php

	/**
	* Self-explanitory
	*/
	
	function sqlDelete($table,$where = 1,$order = NULL,$limit = NULL) {
		global $_con; $table = $_con->tableName($table);
		$sql = 'DELETE FROM `'.$table.'` WHERE '.$where;
		if($order) { $sql .= ' ORDER BY '.$order; }
		if($limit) { $sql .= ' LIMIT '.$limit; }
		$res = mysql_query($sql) or die(err($sql));	
	}
