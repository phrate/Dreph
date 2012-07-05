<?php
	
	/**
	* countSql()
	*
	* Makes counting an SQL query much simpler
	*/
	
	function countSql($table,$select = '*',$where = 1,$order = NULL,$limit = NULL) {
		global $_con; $table = $_con->tableName($table);
		$sql = 'SELECT '.$select.' FROM `'.$table.'` WHERE '.$where;
		if($order) { $sql .= ' ORDER BY '.$order; }
		if($limit) { $sql .= ' LIMIT '.$limit; }
		$res = mysql_query($sql) or die(err());
		return mysql_num_rows($res);
	}
