<?php
	
	/**
	* sqlRow()
	*
	* Makes calling an SQL query much simpler
	*/
	
	function sqlRow($table,$select = '*',$where = 1,$order = NULL,$limit = NULL,$debug = false) {
		global $_con; $table = $_con->tableName($table);
		$sql = 'SELECT '.$select.' FROM `'.$table.'` WHERE '.$where;
		if($order) { $sql .= ' ORDER BY '.$order; }
		if($limit) { $sql .= ' LIMIT '.$limit; }
		if($debug) { echo '<div class="error_php">'.$sql.'</div>'; return false; }
		$res = mysql_query($sql) or die(err());
		$row = mysql_fetch_assoc($res);
		if(mysql_num_rows($res)>0) return $row; else return false;
	}
