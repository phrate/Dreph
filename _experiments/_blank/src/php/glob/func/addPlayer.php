<?php

	function addPlayer($nickname,$match_id) {
		$id = randId();
		insertSql("player",array(
			'id'       => $id,
			'match_id' => $match_id,
			'nickname' => $nickname,
			'state'    => 0,
			'choice'   => 0
		));	
	}