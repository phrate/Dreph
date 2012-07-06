<?php

	/**
	* sqlCount()
	*
	* Does an sqlRes() and returns count of fields
	*/
	
	function sqlCount($table,$select = '*',$where = 1,$order = NULL,$limit = NULL,$join = NULL) {
		global $_con; $table = $_con->tableName($table);
		$sql = 'SELECT '.$select.' FROM `'.$table.'` '.$join.' WHERE '.$where;
		if($order) { $sql .= ' ORDER BY '.$order; }
		if($limit) { $sql .= ' LIMIT '.$limit; }
		$res = mysql_query($sql) or die(err());
		return mysql_num_rows($res);
	}
