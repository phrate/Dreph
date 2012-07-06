<?php
	
	/**
	* sqlRow()
	*
	* Makes calling an SQL query much simpler
	*/
	
	function sqlRes($table,$select = '*',$where = 1,$order = NULL,$limit = NULL,$join = NULL) {
		global $_con; $table = $_con->tableName($table);
		$sql = 'SELECT '.$select.' FROM `'.$table.'` '.$join.' WHERE '.$where;
		if($order) { $sql .= ' ORDER BY '.$order; }
		if($limit) { $sql .= ' LIMIT '.$limit; }
		$res = mysql_query($sql) or die(err($sql));
		return $res;
	}
