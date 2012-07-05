<?php

	/*
	*
	* insertSql($table,$array)
	*
	* Uses the $_Tables variable
	* to perform an insert query
	*
	*/
	
	function insertSql($table, $array) {
		
		global $_con; $table = $_con->tableName($table);
		global     $_tables;
		$fields    = $_tables[$table];
		
		$allFields = NULL;
		$Values    = NULL;
									
		foreach($fields as $name) { 
			$allFields .= '`'.$name.'`,';
		}
		
		if($allFields[(strlen($allFields)-1)] == ',') $allFields = substr($allFields,0,(strlen($allFields)-1));
	
		foreach($fields as $name) {
			$Values .= "'".$array[$name]."',";
		}
		
		if($Values[(strlen($Values)-1)] == ',') $Values = substr($Values,0,(strlen($Values)-1));
	
		$query = 'INSERT INTO `'.$table.'`('.$allFields.') VALUES('.$Values.')';
		
		mysql_query($query) or die(err());
	
	}
	
	# Example:
	# insertSql('province',array('id'=>randStrict('province'),'game_id'=>666,'holder_id'=>5));
	#           ^          ^
	#           table      contains field values
