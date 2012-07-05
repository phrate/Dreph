<?php

	function fetchList($Sql) {
		return mysql_fetch_array($Sql,MYSQL_ASSOC);	
	}
